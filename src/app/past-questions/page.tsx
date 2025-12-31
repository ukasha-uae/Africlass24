'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ArrowRight, BrainCircuit, BookOpen, Search, Award, ExternalLink } from "lucide-react";
import Link from "next/link";
import { subjects } from '@/lib/jhs-data';
import { coreSubjects } from '@/lib/shs-data';
import { useState, useMemo } from 'react';
import CampusSelector from '@/components/CampusSelector';

interface PastQuestion {
  question: string;
  solution: string;
  subject: string;
  subjectSlug: string;
  topic: string;
  topicSlug: string;
  lesson: string;
  lessonSlug: string;
  lessonId: string;
}

export default function PastQuestionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [educationLevel, setEducationLevel] = useState<'JHS' | 'SHS'>('JHS');

  // Aggregate all past questions from lessons based on education level
  const allPastQuestions = useMemo(() => {
    const questions: PastQuestion[] = [];
    
    const currentSubjects = educationLevel === 'JHS' ? subjects : coreSubjects;
    
    currentSubjects.forEach(subject => {
      if (educationLevel === 'JHS' && 'curriculum' in subject) {
        // JHS structure with curriculum levels
        subject.curriculum.forEach((curriculumLevel: any) => {
          curriculumLevel.topics.forEach((topic: any) => {
            topic.lessons.forEach((lesson: any) => {
              if (lesson.pastQuestions && lesson.pastQuestions.length > 0) {
                lesson.pastQuestions.forEach((pq: any) => {
                  questions.push({
                    ...pq,
                    subject: subject.name,
                    subjectSlug: subject.slug,
                    topic: topic.title,
                    topicSlug: topic.slug,
                    lesson: lesson.title,
                    lessonSlug: lesson.slug,
                    lessonId: lesson.id
                  });
                });
              }
            });
          });
        });
      } else if (educationLevel === 'SHS' && 'topics' in subject) {
        // SHS structure with topics directly
        subject.topics.forEach((topic: any) => {
          // For SHS, topics don't have lessons in the same way, so we'll treat topics as lesson containers
          // This is a placeholder - you may need to adjust based on actual SHS data structure
          questions.push({
            question: `${topic.name} - Practice Questions`,
            solution: 'Check WASSCE past papers for detailed solutions',
            subject: subject.name,
            subjectSlug: subject.slug,
            topic: topic.name,
            topicSlug: topic.slug,
            lesson: topic.name,
            lessonSlug: topic.slug,
            lessonId: topic.id
          });
        });
      }
    });
    
    return questions;
  }, [educationLevel]);

  // Filter questions by search and subject
  const filteredQuestions = useMemo(() => {
    return allPastQuestions.filter(q => {
      const matchesSearch = searchQuery === '' || 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.lesson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject;
      
      return matchesSearch && matchesSubject;
    });
  }, [allPastQuestions, searchQuery, selectedSubject]);

  // Get unique subjects with past questions
  const subjectsWithQuestions = useMemo(() => {
    const subjectSet = new Set(allPastQuestions.map(q => q.subject));
    return Array.from(subjectSet);
  }, [allPastQuestions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/30 dark:from-slate-900 dark:via-amber-950/30 dark:to-orange-950/30 relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-300/20 via-orange-300/20 to-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-300/20 via-amber-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto p-4 md:p-6 lg:p-8 pb-20 relative z-10">
        {/* Premium Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-5xl sm:text-6xl animate-pulse">📝</div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 dark:from-amber-400 dark:via-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
                  {educationLevel === 'JHS' ? 'BECE' : 'WASSCE'} Past Questions
                </h1>
              </div>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                Comprehensive database of <span className="font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{allPastQuestions.length}</span> {educationLevel === 'JHS' ? 'BECE' : 'WASSCE'} past questions
              </p>
            </div>
            <CampusSelector onLevelChange={(level: 'Primary' | 'JHS' | 'SHS') => setEducationLevel(level as 'JHS' | 'SHS')} defaultLevel={educationLevel} />
          </div>
        </div>

        {/* Premium Adaptive Quiz Card */}
        <Card className="mb-8 bg-gradient-to-br from-violet-500/10 via-indigo-500/10 to-purple-500/10 backdrop-blur-xl border-2 border-violet-200/30 dark:border-violet-800/30 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3">
              <div className="text-3xl">🧠</div>
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">Adaptive AI Quiz</span>
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Generate a personalized quiz based on your strengths and weaknesses
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <Button asChild size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <Link href="/quiz">
                Create Adaptive Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Premium Filters */}
        <Card className="mb-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 border-amber-200/30 dark:border-amber-800/30 shadow-xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <Input
                    placeholder="Search questions, topics, or lessons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-2 border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-400"
                  />
                </div>
              </div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full md:w-[250px] h-12 border-2">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects ({allPastQuestions.length})</SelectItem>
                  {subjectsWithQuestions.map(subject => (
                    <SelectItem key={subject} value={subject}>
                      {subject} ({allPastQuestions.filter(q => q.subject === subject).length})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Premium Results Count */}
        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border-2 border-amber-200/50 dark:border-amber-800/50 backdrop-blur-sm">
          <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <span className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
            Showing <span className="font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{filteredQuestions.length}</span> questions
          </span>
        </div>

        {/* Premium Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <Card className="p-12 text-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 border-amber-200/30 dark:border-amber-800/30 shadow-xl">
              <div className="text-6xl mb-4 opacity-50">📚</div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">No past questions found</p>
            </Card>
          ) : (
            filteredQuestions.map((q, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 border-amber-200/50 dark:border-amber-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-orange-500 group-hover:w-2 transition-all"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">{q.subject}</Badge>
                        <Badge variant="outline" className="border-2">{q.topic}</Badge>
                        <span className="text-xs text-slate-600 dark:text-slate-400">• {q.lesson}</span>
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-900 to-orange-900 dark:from-amber-100 dark:to-orange-100 bg-clip-text text-transparent">
                        {q.question}
                      </CardTitle>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="hover:bg-gradient-to-r hover:from-amber-500/10 hover:to-orange-500/10 border-2 border-transparent hover:border-amber-300 dark:hover:border-amber-700 transition-all hover:scale-105">
                      <Link href={`/subjects/jhs/${q.subjectSlug}/${q.topicSlug}/${q.lessonSlug}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Lesson
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition-colors flex items-center gap-2">
                      <span>View Solution</span>
                      <ArrowRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="mt-4 p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border-2 border-amber-200/50 dark:border-amber-800/50 backdrop-blur-sm">
                      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">{q.solution}</p>
                    </div>
                  </details>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    )
}
