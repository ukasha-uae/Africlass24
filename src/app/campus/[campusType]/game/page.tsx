"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import MultipleSelect from '@/components/quiz/MultipleSelect';
import Ordering from '@/components/quiz/Ordering';
import Matching from '@/components/quiz/Matching';
import { getCampusConfig, isValidCampus } from "@/lib/campus-config";
import { SHSQuestions } from '@/lib/shs-questions';
import { JHSQuestions } from '../../../../lib/jhs-questions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Trophy, CheckCircle2, XCircle } from "lucide-react";

const campusQuestions: Record<string, any[]> = {
  shs: SHSQuestions,
  jhs: JHSQuestions,
};

export default function CampusGamePage() {
  const params = useParams();
  const campusType = (params.campusType as string) || "shs";
  
  // Validate campus
  if (!isValidCampus(campusType)) {
    return (
      <div className="container mx-auto p-6 min-h-screen flex items-center justify-center">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Invalid campus type. Please return to the <Link href="/campus" className="underline">campus selector</Link>.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  const campus = getCampusConfig(campusType)!;
  const Icon = campus.icon;
  const questions = campusQuestions[campusType] || campusQuestions["shs"];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  function handleAnswer(answer: any) {
    setSelected(answer);
    let correct = false;
    if (question.type === 'multiple_select') {
      correct = Array.isArray(answer) && Array.isArray(question.answers) && answer.sort().join(',') === question.answers.sort().join(',');
    } else if (question.type === 'ordering') {
      correct = Array.isArray(answer) && Array.isArray(question.correctOrder) && answer.join(',') === question.correctOrder.join(',');
    } else if (question.type === 'matching') {
      correct = true; // For demo, always true
    } else if (question.type === 'mcq') {
      correct = answer === question.answer;
    }
    if (correct) setScore(score + 1);
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 800);
  }

  // Type guards
  type MultipleSelectQuizType = { type: "multiple_select"; question: string; options: string[]; answers: string[] };
  type OrderingQuizType = { type: "ordering"; question: string; items: string[]; correctOrder: number[] };
  type MatchingQuizType = { type: "matching"; question: string; pairs: { left: string; right: string }[] };
  type MCQQuizType = { type: "mcq"; question: string; options: string[]; answer: string };

  function isMultipleSelect(q: any): q is MultipleSelectQuizType {
    return q.type === "multiple_select" && typeof q.question === "string" && Array.isArray(q.options) && Array.isArray(q.answers);
  }
  function isOrdering(q: any): q is OrderingQuizType {
    return q.type === "ordering" && typeof q.question === "string" && Array.isArray(q.items) && Array.isArray(q.correctOrder);
  }
  function isMatching(q: any): q is MatchingQuizType {
    return q.type === "matching" && typeof q.question === "string" && Array.isArray(q.pairs);
  }
  function isMCQ(q: any): q is MCQQuizType {
    return q.type === "mcq" && typeof q.question === "string" && Array.isArray(q.options) && typeof q.answer === "string";
  }

  const progress = ((current + 1) / questions.length) * 100;
  const percentage = finished ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{campus.displayName} Game</h1>
              <p className="text-sm text-muted-foreground">Test your knowledge</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{score}</p>
            <p className="text-xs text-muted-foreground">Score</p>
          </div>
        </div>
        
        {!finished && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {current + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      {/* Game Content */}
      <div className="max-w-2xl mx-auto">
        {!finished ? (
          <Card>
            <CardContent className="pt-6">
              {isMultipleSelect(question) && (
                <MultipleSelect quiz={question} userAnswer={selected || []} onAnswerChange={handleAnswer} />
              )}
              {isOrdering(question) && (
                <Ordering quiz={question} userAnswer={selected || []} onAnswerChange={handleAnswer} />
              )}
              {isMatching(question) && (
                <Matching quiz={question} userAnswer={selected || {}} onAnswerChange={handleAnswer} />
              )}
              {isMCQ(question) && (
                <div>
                  <p className="mb-6 text-lg font-semibold">{question.question}</p>
                  <div className="grid gap-3">
                    {question.options.map((opt: string) => {
                      const isSelected = selected === opt;
                      const isCorrect = opt === question.answer;
                      const showResult = !!selected;
                      
                      return (
                        <button
                          key={opt}
                          className={`px-4 py-3 rounded-lg border-2 font-medium transition text-left ${
                            showResult
                              ? isCorrect
                                ? "border-green-500 bg-green-50 text-green-900"
                                : isSelected
                                ? "border-red-500 bg-red-50 text-red-900"
                                : "border-gray-200 bg-gray-50"
                              : "border-gray-200 hover:border-primary hover:bg-primary/5"
                          }`}
                          disabled={!!selected}
                          onClick={() => handleAnswer(opt)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt}</span>
                            {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                            {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-yellow-100">
                  <Trophy className="h-12 w-12 text-yellow-600" />
                </div>
              </div>
              <CardTitle className="text-3xl">🎉 Game Complete!</CardTitle>
              <CardDescription className="text-lg">
                You've finished the {campus.displayName} challenge
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-3xl font-bold text-primary">{score}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-3xl font-bold">{questions.length - score}</p>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-3xl font-bold">{percentage}%</p>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => { setCurrent(0); setScore(0); setFinished(false); setSelected(null); }}
                  className="flex-1"
                >
                  Play Again
                </Button>
                <Link href="/campus" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Campus Selector
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
