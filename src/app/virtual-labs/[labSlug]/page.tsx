"use client";

import { virtualLabExperiments } from '@/lib/virtual-labs-data';
import { ArrowLeft, FlaskConical, CheckCircle2, ArrowRight, Trophy } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function VirtualLabPage({ params }: { params: Promise<{ labSlug: string }> }) {
  const [mounted, setMounted] = useState(false);
  const [experimentCompleted, setExperimentCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const resolvedParams = use(params);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const experiment = virtualLabExperiments.experiments.find(exp => exp.slug === resolvedParams.labSlug);
  
  if (!experiment) {
    notFound();
  }

  const LabComponent = experiment.component;

  const subjectColors = {
    Biology: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30',
    Chemistry: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/30',
    Physics: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30',
    Science: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30'
  };

  const handleCompleteExperiment = () => {
    setExperimentCompleted(true);
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  // Generic quiz questions for all labs (can be customized per lab in future)
  const quizQuestions: QuizQuestion[] = [
    {
      question: "What was the main objective of this experiment?",
      options: [
        "To observe the physical properties",
        "To test chemical reactions",
        "To understand scientific principles through hands-on exploration",
        "To collect data only"
      ],
      correctAnswer: 2,
      explanation: "Virtual lab experiments help students understand scientific principles through interactive exploration and observation."
    },
    {
      question: "Why is it important to follow the procedure carefully?",
      options: [
        "To save time",
        "To ensure accurate and reliable results",
        "To finish quickly",
        "To impress others"
      ],
      correctAnswer: 1,
      explanation: "Following experimental procedures carefully ensures that results are accurate, reliable, and can be reproduced."
    },
    {
      question: "What should you do after completing an experiment?",
      options: [
        "Forget about it immediately",
        "Only write down the final answer",
        "Analyze the results and draw conclusions",
        "Start a new experiment"
      ],
      correctAnswer: 2,
      explanation: "After an experiment, it's crucial to analyze results, compare with expected outcomes, and draw meaningful conclusions from the observations."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/virtual-labs">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Virtual Labs
        </Button>
      </Link>

      {/* Lab Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <FlaskConical className="h-8 w-8 text-violet-600 dark:text-violet-400" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{experiment.title}</h1>
              <Badge className={`${subjectColors[experiment.subject as keyof typeof subjectColors]} border`}>
                {experiment.subject}
              </Badge>
            </div>
            <p className="text-muted-foreground">{experiment.description}</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-4 mt-4">
          <div className={`flex items-center gap-2 ${!experimentCompleted ? 'text-violet-600 font-semibold' : 'text-green-600'}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${!experimentCompleted ? 'bg-violet-600 text-white' : 'bg-green-600 text-white'}`}>
              {experimentCompleted ? <CheckCircle2 className="h-5 w-5" /> : '1'}
            </div>
            <span>Experiment</span>
          </div>
          <div className="flex-1 h-1 bg-secondary" />
          <div className={`flex items-center gap-2 ${showQuiz ? 'text-violet-600 font-semibold' : 'text-muted-foreground'}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${showQuiz ? 'bg-violet-600 text-white' : 'bg-secondary'}`}>
              2
            </div>
            <span>Post-Lab Quiz</span>
          </div>
        </div>
      </div>

      {/* Experiment Section */}
      {!showQuiz && (
        <>
          <Card>
            <CardContent className="p-6">
              <LabComponent />
            </CardContent>
          </Card>

          {/* Complete Experiment Button */}
          {!experimentCompleted && (
            <div className="mt-6 text-center">
              <Button size="lg" onClick={handleCompleteExperiment} className="bg-violet-600 hover:bg-violet-700">
                Mark Experiment as Complete
                <CheckCircle2 className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Post-Lab Quiz CTA */}
          {experimentCompleted && (
            <Alert className="mt-6 bg-green-500/10 border-green-500/30">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-100 mb-1">Experiment Completed!</p>
                    <p className="text-sm">Test your understanding with the post-lab quiz.</p>
                  </div>
                  <Button onClick={handleStartQuiz} className="bg-violet-600 hover:bg-violet-700">
                    Start Post-Lab Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </>
      )}

      {/* Post-Lab Quiz Section */}
      {showQuiz && (
        <Card>
          <CardHeader>
            <CardTitle>Post-Lab Quiz</CardTitle>
            <CardDescription>Test your understanding of the experiment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {quizQuestions.map((q, index) => (
              <Card key={index} className={`border-2 ${
                quizAnswers[index] !== undefined 
                  ? quizAnswers[index] === q.correctAnswer 
                    ? 'border-green-500 bg-green-500/5' 
                    : 'border-red-500 bg-red-500/5'
                  : 'border-border'
              }`}>
                <CardHeader>
                  <CardTitle className="text-base">
                    Question {index + 1}: {q.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {q.options.map((option, optionIndex) => (
                    <Button
                      key={optionIndex}
                      variant={quizAnswers[index] === optionIndex ? "default" : "outline"}
                      className={`w-full justify-start text-left h-auto py-3 ${
                        quizAnswers[index] !== undefined && optionIndex === q.correctAnswer
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : quizAnswers[index] === optionIndex && optionIndex !== q.correctAnswer
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : ''
                      }`}
                      onClick={() => handleAnswerSelect(index, optionIndex)}
                      disabled={quizAnswers[index] !== undefined}
                    >
                      <span className="font-semibold mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                      {option}
                    </Button>
                  ))}
                  {quizAnswers[index] !== undefined && (
                    <Alert className={quizAnswers[index] === q.correctAnswer ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'}>
                      <AlertDescription>
                        {quizAnswers[index] === q.correctAnswer ? (
                          <span className="text-green-700 dark:text-green-400 font-medium">✓ Correct!</span>
                        ) : (
                          <span className="text-red-700 dark:text-red-400 font-medium">✗ Incorrect. The correct answer is {String.fromCharCode(65 + q.correctAnswer)}.</span>
                        )}
                        <div className="mt-2 text-sm">{q.explanation}</div>
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Quiz Results */}
            {quizAnswers.length === quizQuestions.length && (
              <Card className="bg-violet-500/5 border-violet-200 dark:border-violet-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-amber-600" />
                    Quiz Complete!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">
                    Your Score: {quizAnswers.filter((ans, idx) => ans === quizQuestions[idx].correctAnswer).length} / {quizQuestions.length}
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={() => setShowQuiz(false)} variant="outline">
                      Back to Experiment
                    </Button>
                    <Button 
                      onClick={() => {
                        setQuizAnswers([]);
                      }}
                      className="bg-violet-600 hover:bg-violet-700"
                    >
                      Retry Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
