
'use client';

import { getSubjectBySlug } from '@/lib/jhs-data';
import { notFound, useParams } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Target, Lightbulb, ListChecks, FileText, BookOpen, Brain, Award, Bookmark, BookmarkCheck, Download, DownloadCloud, StickyNote, CheckSquare } from 'lucide-react';
import Link from 'next/link';
import ReadAloud from '@/components/ReadAloud';
import LessonCompleteQuiz from '@/components/LessonCompleteQuiz';
import LessonVisual, { ConceptCard, TipCard, ExampleCard, SuccessCard } from '@/components/LessonVisual';
import { IconGrid, FloatingIcon } from '@/components/AnimatedIcons';
import { useFirebase } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Lesson } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { 
  addBookmark, 
  removeBookmark, 
  isBookmarked, 
  getLessonNote, 
  saveNote,
  getChecklist,
  addChecklistItem,
  toggleChecklistItem,
  deleteChecklistItem
} from '@/lib/lesson-tools';
import { 
  saveOfflineLesson, 
  removeOfflineLesson, 
  isLessonOffline, 
  isOnline 
} from '@/lib/offline-storage';
import { useToast } from '@/hooks/use-toast';

export default function LessonPage() {
  const params = useParams();
  const subjectSlug = params.subjectSlug as string;
  const topicSlug = params.topicSlug as string;
  const lessonSlug = params.lessonSlug as string;

  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [firestoreLesson, setFirestoreLesson] = useState<Lesson | null>(null);
  const [isFirestoreLoading, setIsFirestoreLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [savedOffline, setSavedOffline] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [checklistItems, setChecklistItems] = useState<any[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  
  const subjectInfo = getSubjectBySlug(subjectSlug);

  // Calculate local lesson synchronously
  const localTopic = subjectInfo?.curriculum
      .flatMap(c => c.topics)
      .find(t => t.slug === topicSlug);
  const localLesson = localTopic?.lessons.find(l => l.slug === lessonSlug) || null;

  // STABILITY FIX: If local lesson exists, use it immediately and ignore Firestore.
  // This prevents flickering and async state updates from interfering with local development.
  const lesson = localLesson || firestoreLesson;

  // Load bookmark, offline, and notes state
  useEffect(() => {
    if (lesson) {
      setBookmarked(isBookmarked(lesson.id));
      setSavedOffline(isLessonOffline(lesson.id));
      const note = getLessonNote(lesson.id);
      if (note) setNoteContent(note.content);
      setChecklistItems(getChecklist(lesson.id));
    }
  }, [lesson]);

  useEffect(() => {
    // If we already have the lesson locally, no need to fetch from Firestore.
    if (localLesson) {
        setIsFirestoreLoading(false);
        return;
    }

    const fetchFirestoreLesson = async () => {
      if (!firestore) {
        // Wait for firestore to initialize
        return;
      }

      try {
        const lessonsRef = collection(firestore, `subjects/${subjectSlug}/topics/${topicSlug}/lessons`);
        const lessonsSnapshot = await getDocs(lessonsRef);
        const lessons = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lesson));
        const found = lessons.find(l => l.slug === lessonSlug) || null;
        if (found) {
            setFirestoreLesson(found);
        }
      } catch (error) {
        console.error("Error fetching lesson from Firestore:", error);
      } finally {
        setIsFirestoreLoading(false);
      }
    };

    fetchFirestoreLesson();
  }, [firestore, subjectSlug, topicSlug, lessonSlug, localLesson]);

  // Only show loading if we don't have a lesson AND we are still trying to fetch one
  if (!lesson && isFirestoreLoading && !localLesson) {
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-96 w-full" />
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        </div>
    )
  }

  if (!lesson) {
    notFound();
  }
  
  if (!subjectInfo) {
      return <div>Subject not found</div>;
  }

  if (!lesson) {
    notFound();
  }
  
  if (!subjectInfo) {
      notFound();
  }

  const introductionId = `lesson-${lesson.slug}-intro`;
  const summaryId = `lesson-${lesson.slug}-summary`;

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(lesson.id);
      setBookmarked(false);
      toast({ title: 'Bookmark removed' });
    } else {
      addBookmark({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        subject: subjectInfo.name,
        topic: localTopic?.title || '',
        bookmarkedAt: new Date().toISOString(),
        href: `/subjects/${subjectSlug}/${topicSlug}/${lessonSlug}`
      });
      setBookmarked(true);
      toast({ title: 'Lesson bookmarked!' });
    }
  };

  const handleSaveOffline = () => {
    if (savedOffline) {
      removeOfflineLesson(lesson.id);
      setSavedOffline(false);
      toast({ title: 'Removed from offline storage' });
    } else {
      saveOfflineLesson({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        subject: subjectInfo.name,
        topic: localTopic?.title || '',
        content: lesson
      });
      setSavedOffline(true);
      toast({ title: 'Saved for offline reading!' });
    }
  };

  const handleSaveNote = () => {
    saveNote({
      lessonId: lesson.id,
      content: noteContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    toast({ title: 'Note saved!' });
  };

  const handleAddChecklistItem = () => {
    if (!newChecklistItem.trim()) return;
    const item = addChecklistItem({
      lessonId: lesson.id,
      title: newChecklistItem,
      completed: false
    });
    if (item) {
      setChecklistItems([...checklistItems, item]);
      setNewChecklistItem('');
    }
  };

  const handleToggleChecklistItem = (id: string) => {
    toggleChecklistItem(id);
    setChecklistItems(getChecklist(lesson.id));
  };

  const handleDeleteChecklistItem = (id: string) => {
    deleteChecklistItem(id);
    setChecklistItems(getChecklist(lesson.id));
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Link
        href={`/subjects/${subjectSlug}`}
        className="inline-flex items-center text-primary mb-4 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to {subjectInfo.name}
      </Link>
      <div className="relative">
        <FloatingIcon icon="lightbulb" position="tr" size="lg" />
        <FloatingIcon icon="brain" position="br" size="md" />
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 className="text-4xl font-bold font-headline">{lesson.title}</h1>
          <div className="flex items-center gap-2">
            <Button
              variant={bookmarked ? "default" : "outline"}
              size="sm"
              onClick={handleBookmark}
              className="flex items-center gap-2"
            >
              {bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button
              variant={savedOffline ? "secondary" : "outline"}
              size="sm"
              onClick={handleSaveOffline}
              className="flex items-center gap-2"
            >
              {savedOffline ? <DownloadCloud className="h-4 w-4" /> : <Download className="h-4 w-4" />}
              {savedOffline ? 'Saved' : 'Save Offline'}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <p className="text-lg text-muted-foreground">
            From topic: {topicSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </p>
          {bookmarked && <Badge variant="secondary" className="text-xs">📌 Bookmarked</Badge>}
          {savedOffline && <Badge variant="secondary" className="text-xs">💾 Offline</Badge>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {lesson.objectives && lesson.objectives.length > 0 && (
            <LessonVisual type="objective" title="🎯 Lesson Objectives" icon="target">
              <ul className="space-y-2">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </LessonVisual>
          )}

          {lesson.introduction && (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                    <Lightbulb className="h-6 w-6 mr-3 text-primary" />
                    Introduction
                </CardTitle>
                <ReadAloud textId={introductionId} />
                </CardHeader>
                <CardContent>
                <MarkdownRenderer id={introductionId} content={lesson.introduction} className="leading-relaxed" />
                </CardContent>
            </Card>
          )}

          {lesson.keyConcepts && lesson.keyConcepts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                Key Concepts
              </h2>
              <div className="space-y-4">
                {lesson.keyConcepts.map((concept, i) => {
                  const conceptId = `${lesson.id}-concept-${i}`;
                  return (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{concept.title}</h3>
                        <ReadAloud textId={conceptId} />
                      </div>
                      <ConceptCard title="" icon="brain">
                        <MarkdownRenderer id={conceptId} content={concept.content} />
                      </ConceptCard>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {lesson.activities && lesson.activities.questions && lesson.activities.questions.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ListChecks className="h-6 w-6 text-primary" />
                Practice Activities
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5" />
                    {lesson.activities.questions.length} Interactive Practice Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Complete these practice exercises to reinforce your understanding of the concepts. 
                    These activities include multiple choice, fill-in-the-blank, matching, and other question types.
                  </p>
                  <LessonCompleteQuiz 
                    lessonId={`${lesson.id}-activities`}
                    subjectSlug={subjectSlug}
                    topicSlug={topicSlug}
                    lessonSlug={lessonSlug}
                    localQuizzes={lesson.activities.questions}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="space-y-6">
            {lesson.summary && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Summary
                  </h3>
                  <ReadAloud textId={summaryId} />
                </div>
                <LessonVisual type="summary" icon="fileText">
                  <MarkdownRenderer id={summaryId} content={lesson.summary} />
                </LessonVisual>
              </div>
            )}

            {lesson.pastQuestions && lesson.pastQuestions.length > 0 && (
                <Card className="border-2 border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                          <Award className="h-5 w-5" />
                          BECE Past Questions
                        </CardTitle>
                        <ReadAloud textId={`${lesson.id}-pastquestions`} />
                    </CardHeader>
                    <CardContent id={`${lesson.id}-pastquestions`} className="text-foreground">
                        {lesson.pastQuestions.map((pq, i) => (
                            <div key={i} className="mb-4 p-4 rounded-lg bg-background/50 border">
                                <p className="font-semibold text-amber-900 dark:text-amber-100">{pq.question}</p>
                                <details className="mt-2 text-sm">
                                    <summary className="cursor-pointer hover:text-primary font-medium">View Solution</summary>
                                    <p className="pt-2 pl-4 border-l-2 border-amber-500/30 mt-2">{pq.solution}</p>
                                </details>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

             <LessonCompleteQuiz 
                lessonId={lesson.id}
                subjectSlug={subjectSlug}
                topicSlug={topicSlug}
                lessonSlug={lessonSlug}
                localQuizzes={lesson.endOfLessonQuiz}
             />

            {/* Personal Notes Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StickyNote className="h-5 w-5 text-primary" />
                    My Notes
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNotes(!showNotes)}
                  >
                    {showNotes ? 'Hide' : 'Show'}
                  </Button>
                </CardTitle>
              </CardHeader>
              {showNotes && (
                <CardContent className="space-y-3">
                  <Textarea
                    placeholder="Add your personal notes about this lesson..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                  <Button
                    onClick={handleSaveNote}
                    disabled={!noteContent.trim()}
                    className="w-full"
                  >
                    Save Note
                  </Button>
                </CardContent>
              )}
            </Card>

            {/* Study Checklist Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  Study Checklist
                  {checklistItems.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {checklistItems.filter(item => item.completed).length}/{checklistItems.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add checklist item..."
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddChecklistItem()}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                  />
                  <Button
                    onClick={handleAddChecklistItem}
                    disabled={!newChecklistItem.trim()}
                    size="sm"
                  >
                    Add
                  </Button>
                </div>

                {checklistItems.length > 0 && (
                  <div className="space-y-2">
                    {checklistItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 p-2 rounded-md bg-muted/50 hover:bg-muted"
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => handleToggleChecklistItem(item.id)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <span className={`flex-1 text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {item.title}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteChecklistItem(item.id)}
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {checklistItems.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No checklist items yet. Add items to track your study progress!
                  </p>
                )}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
