'use client';

import { useState, useEffect } from 'react';
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Brain, 
  FileText, 
  Award, 
  ListChecks,
  CheckCircle,
  X,
  Lightbulb
} from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import LessonCompleteQuiz from './LessonCompleteQuiz';

interface CarouselLessonProps {
  lesson: any;
  subjectSlug: string;
  topicSlug: string;
  lessonSlug: string;
  educationLevel: 'Primary' | 'JHS' | 'SHS' | null;
  localQuizzes?: any[];
  introComponent?: React.ReactNode;
  onExit?: () => void;
}

export function CarouselLesson({
  lesson,
  subjectSlug,
  topicSlug,
  lessonSlug,
  educationLevel,
  localQuizzes,
  introComponent,
  onExit
}: CarouselLessonProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [introCompleted, setIntroCompleted] = useState(false);

  // Enable immersive mode on mount, disable on unmount
  useEffect(() => {
    document.body.classList.add('immersive-lesson-mode');
    return () => {
      document.body.classList.remove('immersive-lesson-mode');
    };
  }, []);

  // Build slides array
  const buildSlides = () => {
    const slides: any[] = [];

    // Slide 0: Objectives (if exists)
    if (lesson.objectives && lesson.objectives.length > 0) {
      slides.push({
        type: 'objectives',
        title: '🎯 Lesson Objectives',
        icon: Lightbulb,
        content: lesson.objectives
      });
    }

    // Slides: Key Concepts (each concept = 1 slide)
    if (lesson.keyConcepts && lesson.keyConcepts.length > 0) {
      lesson.keyConcepts.forEach((concept: any, i: number) => {
        slides.push({
          type: 'concept',
          title: concept.title,
          icon: Brain,
          content: concept.content,
          conceptIndex: i
        });
      });
    }

    // Slide: Summary
    if (lesson.summary) {
      slides.push({
        type: 'summary',
        title: 'Summary',
        icon: FileText,
        content: lesson.summary
      });
    }

    // Slides: WASSCE/BECE Past Questions (each question = 1 slide)
    if (lesson.pastQuestions && lesson.pastQuestions.length > 0) {
      lesson.pastQuestions.forEach((pq: any, i: number) => {
        slides.push({
          type: 'pastQuestion',
          title: `${educationLevel === 'SHS' ? 'WASSCE' : educationLevel === 'JHS' ? 'BECE' : 'Past'} Question ${i + 1}`,
          icon: Award,
          content: pq,
          questionIndex: i,
          totalQuestions: lesson.pastQuestions.length
        });
      });
    }

    // Slide: Practice Activities
    if (lesson.activities && lesson.activities.questions && lesson.activities.questions.length > 0) {
      slides.push({
        type: 'activities',
        title: 'Practice Activities',
        icon: ListChecks,
        content: lesson.activities.questions
      });
    }

    // Slide: End of Lesson Quiz
    if (localQuizzes && localQuizzes.length > 0) {
      slides.push({
        type: 'quiz',
        title: 'End of Lesson Quiz',
        icon: CheckCircle,
        content: localQuizzes
      });
    }

    return slides;
  };

  const slides = buildSlides();
  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;

  const handleNext = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const handleIntroComplete = () => {
    setIntroCompleted(true);
  };

  // Show intro first
  if (introComponent && !introCompleted) {
    return React.cloneElement(introComponent as React.ReactElement, {
      onComplete: handleIntroComplete
    });
  }

  return (
    <div className="immersive-container fixed inset-0 flex flex-col bg-background z-50">
      {/* Minimal Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-2 py-2 md:px-4 md:py-3 shadow-lg flex-shrink-0">
        <div className="flex items-center justify-between gap-2">
          {/* Exit button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            className="text-white hover:bg-white/20 p-2 h-8 w-8"
            aria-label="Exit lesson"
          >
            <X className="h-5 w-5" />
          </Button>
          
          {/* Title - centered */}
          <div className="flex-1 text-center min-w-0 px-1">
            <h1 className="text-sm md:text-lg font-bold truncate">{lesson.title}</h1>
          </div>
          
          {/* Progress indicator */}
          <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs flex-shrink-0">
            {currentSlideIndex + 1}/{totalSlides}
          </Badge>
        </div>
      </div>

      {/* Thin Progress Bar */}
      <div className="bg-gray-200 dark:bg-gray-800 h-1 flex-shrink-0">
        <div 
          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Main Content Area with Side Navigation */}
      <div className="flex-1 relative overflow-hidden">
        {/* Left Arrow - Always visible on sides */}
        <button
          onClick={handlePrevious}
          disabled={currentSlideIndex === 0}
          className={`absolute left-0 top-0 bottom-0 z-30 w-10 md:w-14 flex items-center justify-center
            ${currentSlideIndex === 0 
              ? 'opacity-20 cursor-not-allowed' 
              : 'opacity-70 hover:opacity-100 active:bg-violet-100/50 dark:active:bg-violet-900/50'
            } transition-all touch-manipulation`}
          aria-label="Previous slide"
        >
          <div className={`p-1.5 md:p-2.5 rounded-full shadow-md ${currentSlideIndex > 0 ? 'bg-violet-600 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-500'}`}>
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </div>
        </button>

        {/* Right Arrow - Always visible on sides */}
        <button
          onClick={handleNext}
          disabled={currentSlideIndex === totalSlides - 1}
          className={`absolute right-0 top-0 bottom-0 z-30 w-10 md:w-14 flex items-center justify-center
            ${currentSlideIndex === totalSlides - 1 
              ? 'opacity-20 cursor-not-allowed' 
              : 'opacity-70 hover:opacity-100 active:bg-violet-100/50 dark:active:bg-violet-900/50'
            } transition-all touch-manipulation`}
          aria-label="Next slide"
        >
          <div className={`p-1.5 md:p-2.5 rounded-full shadow-md ${currentSlideIndex < totalSlides - 1 ? 'bg-violet-600 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-500'}`}>
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </div>
        </button>

        {/* Slide Content - with padding for side arrows */}
        <div className="h-full overflow-y-auto px-11 md:px-16 py-2 md:py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Card className="border border-violet-200 dark:border-violet-800 shadow-md h-full flex flex-col">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 p-2.5 md:p-4 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    {currentSlide.icon && (
                      <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow flex-shrink-0">
                        <currentSlide.icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm md:text-lg leading-tight">{currentSlide.title}</CardTitle>
                      {currentSlide.type === 'concept' && (
                        <CardDescription className="text-xs">
                          Concept {currentSlide.conceptIndex + 1} of {lesson.keyConcepts.length}
                        </CardDescription>
                      )}
                      {currentSlide.type === 'pastQuestion' && (
                        <CardDescription className="text-xs">
                          Question {currentSlide.questionIndex + 1} of {currentSlide.totalQuestions}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-2.5 md:p-4 flex-1 overflow-y-auto">
                  {/* Objectives */}
                  {currentSlide.type === 'objectives' && (
                    <ul className="space-y-2">
                      {currentSlide.content.map((obj: string, i: number) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 p-2 bg-violet-50 dark:bg-violet-900/20 rounded-lg"
                        >
                          <span className="text-violet-600 dark:text-violet-400 font-bold flex-shrink-0">•</span>
                          <span className="text-sm md:text-base">{obj}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* Key Concept */}
                  {currentSlide.type === 'concept' && (
                    <div className="prose prose-sm md:prose dark:prose-invert max-w-none">
                      <MarkdownRenderer 
                        content={currentSlide.content}
                        id={`concept-${currentSlide.conceptIndex}`}
                      />
                    </div>
                  )}

                  {/* Summary */}
                  {currentSlide.type === 'summary' && (
                    <div className="prose prose-sm md:prose dark:prose-invert max-w-none bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-3 md:p-5 rounded-lg border border-blue-200 dark:border-blue-800">
                      <MarkdownRenderer 
                        content={currentSlide.content}
                        id="summary"
                      />
                    </div>
                  )}

                  {/* Past Question */}
                  {currentSlide.type === 'pastQuestion' && (
                    <div className="space-y-3">
                      <div className="p-3 md:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-300 dark:border-amber-700">
                        <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2 text-sm md:text-base">
                          Question:
                        </h4>
                        <div className="text-sm">
                          <MarkdownRenderer content={currentSlide.content.question} />
                        </div>
                      </div>

                      <details className="p-3 md:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-300 dark:border-green-700">
                        <summary className="cursor-pointer font-semibold text-green-900 dark:text-green-100 text-sm md:text-base hover:text-green-700 dark:hover:text-green-300">
                          💡 View Solution
                        </summary>
                        <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800 text-sm">
                          <MarkdownRenderer content={currentSlide.content.solution} />
                        </div>
                      </details>
                    </div>
                  )}

                  {/* Practice Activities */}
                  {currentSlide.type === 'activities' && (
                    <div>
                      <p className="text-muted-foreground mb-4 text-sm md:text-base">
                        Complete these {currentSlide.content.length} practice exercises to reinforce your understanding.
                      </p>
                      <LessonCompleteQuiz 
                        lessonId={`${lesson.id}-activities`}
                        subjectSlug={subjectSlug}
                        topicSlug={topicSlug}
                        lessonSlug={lessonSlug}
                        localQuizzes={currentSlide.content}
                      />
                    </div>
                  )}

                  {/* End of Lesson Quiz */}
                  {currentSlide.type === 'quiz' && (
                    <div>
                      <p className="text-muted-foreground mb-4 text-sm md:text-base">
                        Complete this quiz to test your understanding and mark this lesson as complete.
                      </p>
                      <LessonCompleteQuiz 
                        lessonId={lesson.id}
                        subjectSlug={subjectSlug}
                        topicSlug={topicSlug}
                        lessonSlug={lessonSlug}
                        localQuizzes={currentSlide.content}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
