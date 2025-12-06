"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen } from 'lucide-react';

const studyTips = [
  'Break your study time into 25-minute chunks with short breaks (Pomodoro).',
  'Try teaching a classmate what you just learned — if you can explain it, you understand it.',
  'Use flashcards for difficult vocabulary: see a word, recall definition.',
  'When stuck, move on to another topic and return later to refresh thinking.'
];

const sampleQuestion = {
  question: 'Which word is a concrete noun?',
  options: ['Happiness', 'Accra', 'Believe', 'Run'],
  answer: 'Accra',
};

export default function CreativeLoading(){
  const hasMounted = useHasMounted();
  const [tipIndex, setTipIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTipIndex(i => (i + 1) % studyTips.length), 3500);
    return () => clearInterval(t);
  }, []);

  const tip = useMemo(() => studyTips[tipIndex], [tipIndex]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-64 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center"><BookOpen className="mr-2 h-5 w-5 text-primary animate-spin" /> Content loading…</CardTitle>
          </CardHeader>
            <CardContent className="flex-grow">
            <div className="grid grid-cols-1 gap-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center space-x-3 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin"/> Preparing best learning content for you…</div>
          </CardFooter>
        </Card>
        <Card className="h-64 flex flex-col">
          <CardHeader>
            <CardTitle>Quick Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{hasMounted ? tip : 'Fetching a tip…'}</p>
            <div className="mt-3 text-xs text-muted-foreground">Tip rotates while we load the lesson — try it out.</div>
          </CardContent>
        </Card>
        <Card className="h-64 flex flex-col">
          <CardHeader>
            <CardTitle>Try a Mini Question</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 font-medium text-sm">{hasMounted ? sampleQuestion.question : 'Sample question...'}</div>
            <RadioGroup value={answer || ''} onValueChange={(v) => { setAnswer(v); setChecked(true); }}>
              {sampleQuestion.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                  <RadioGroupItem id={`mini-${idx}`} value={opt} />
                  <Label htmlFor={`mini-${idx}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
            {checked && (
              <div className={`mt-3 ${answer === sampleQuestion.answer ? 'text-green-600' : 'text-destructive' }`}>
                {answer === sampleQuestion.answer ? 'Nice! That is correct.' : `Not quite. The correct answer is ${sampleQuestion.answer}.`}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-between items-center">
              <div className="text-xs text-muted-foreground">This is just for practice — not graded.</div>
              <Button size="sm" variant="ghost" onClick={() => { setAnswer(null); setChecked(false); }}>Reset</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-col gap-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">What’s next?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Review the lesson objectives for this topic.</li>
              <li>Try a sample question to warm up.</li>
              <li>Check out the lesson's past questions for exam prep.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="h-44 flex items-center justify-center">
          <div className="text-center text-muted-foreground text-sm">
            <div className="mb-2 font-semibold">Loading tips & extra resources</div>
            <div>We fetch content and related practice materials — thanks for your patience!</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
