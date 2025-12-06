"use client";

import React, { useState, useMemo } from 'react';
import type { MatchingQuiz } from '@/lib/types';

import type { QuizStyle } from '@/lib/types';

interface MatchingProps {
  quiz: MatchingQuiz;
  userAnswer: { [left: number]: number };
  onAnswerChange: (v: { [left: number]: number }) => void;
  style?: QuizStyle;
}

export default function Matching({ quiz, userAnswer, onAnswerChange, style }: MatchingProps) {
  const left = quiz.pairs.map(p => p.left);
  const rightShuffled = useMemo(() => quiz.pairs.map(p => p.right).sort(() => Math.random() - 0.5), [quiz.pairs]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);

  const selectPair = (leftIndex: number, rightText: string) => {
    const rightIndex = quiz.pairs.findIndex(p => p.right === rightText);
    if (rightIndex < 0) return;
    const newMap = { ...(userAnswer || {}) };
    newMap[leftIndex] = rightIndex;
    onAnswerChange(newMap);
  };

  return (
    <div className="space-y-4">
      {quiz.question && <p className="font-semibold mb-2">{quiz.question}</p>}
      <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md text-sm">
        <p className="font-medium text-blue-900 dark:text-blue-100">📌 Instructions:</p>
        <ol className="list-decimal list-inside mt-1 text-blue-800 dark:text-blue-200 space-y-1">
          <li>Click on an item in the LEFT column</li>
          <li>Then click on its matching item in the RIGHT column</li>
          <li>Your match will appear below the left item</li>
        </ol>
      </div>
      <div className={`grid grid-cols-2 gap-4 ${style === 'compact' ? 'text-sm' : ''}`}>
        <div>
          <p className="font-semibold text-center mb-2 text-muted-foreground">LEFT COLUMN</p>
          {left.map((l, i) => (
          <div key={i} onClick={() => setSelectedLeft(i)} className={`p-2 rounded cursor-pointer hover:bg-muted ${selectedLeft === i ? 'bg-muted' : ''}`}>
            <span className="font-medium">{l}</span>
            {typeof userAnswer?.[i] !== 'undefined' && (
              <div className="text-sm text-muted-foreground">→ {quiz.pairs[userAnswer[i]].right}</div>
            )}
          </div>
        ))}
        </div>
        <div>
          <p className="font-semibold text-center mb-2 text-muted-foreground">RIGHT COLUMN</p>
          {rightShuffled.map((r, ri) => (
            <div key={ri} className="p-2 rounded hover:bg-muted cursor-pointer" onClick={() => {
              if (selectedLeft === null) return;
              selectPair(selectedLeft, r);
              setSelectedLeft(null);
            }}>
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
