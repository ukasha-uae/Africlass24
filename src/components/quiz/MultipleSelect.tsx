"use client";

import React from 'react';
import type { MultipleSelectQuiz } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';

interface MultipleSelectProps {
  quiz: MultipleSelectQuiz;
  userAnswer: string[];
  onAnswerChange: (value: string[]) => void;
  style?: QuizStyle;
}

import type { QuizStyle } from '@/lib/types';

export default function MultipleSelect({ quiz, userAnswer, onAnswerChange, style }: MultipleSelectProps) {
  const current = userAnswer || [];

  const toggle = (opt: string, checked: boolean | null) => {
    const next = new Set(current);
    if (checked) next.add(opt); else next.delete(opt);
    onAnswerChange(Array.from(next));
  };

  return (
    <div className="space-y-2">
      <p className="mb-2 font-semibold">{quiz.question}</p>
      {quiz.options.map((opt, i) => (
        <div key={i} className={`flex items-center gap-2 ${style === 'compact' ? 'p-1 text-sm' : 'p-2'} rounded-md hover:bg-muted ${style === 'card' ? 'border border-border p-3 shadow-sm hover:shadow-md' : ''}`}>
          <Checkbox checked={current.includes(opt)} onCheckedChange={(c) => toggle(opt, Boolean(c))} />
          <span>{opt}</span>
        </div>
      ))}
    </div>
  );
}
