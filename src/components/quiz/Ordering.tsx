"use client";

import React, { useState, useEffect } from 'react';
import type { OrderingQuiz } from '@/lib/types';

import type { QuizStyle } from '@/lib/types';

interface OrderingProps {
  quiz: OrderingQuiz;
  userAnswer: number[];
  onAnswerChange: (v: number[]) => void;
  style?: QuizStyle;
}

export default function Ordering({ quiz, userAnswer, onAnswerChange, style }: OrderingProps) {
  const [order, setOrder] = useState<number[]>(userAnswer || quiz.items.map((_, i) => i));

  useEffect(() => { onAnswerChange(order); }, [order]);

  const onDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };
  const onDrop = (e: React.DragEvent, dropIndex: number) => {
    const start = Number(e.dataTransfer.getData('text/plain'));
    if (isNaN(start)) return;
    const newOrder = [...order];
    const [moved] = newOrder.splice(start, 1);
    newOrder.splice(dropIndex, 0, moved);
    setOrder(newOrder);
  };
  const allowDrop = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className={`space-y-2 ${style === 'compact' ? 'text-sm' : ''}`}>
      {order.map((o, i) => (
        <div
          key={i}
          draggable
          onDragStart={(e) => onDragStart(e, i)}
          onDragOver={allowDrop}
          onDrop={(e) => onDrop(e, i)}
          className="p-2 rounded border border-border bg-card cursor-move"
        >
          {quiz.items[o]}
        </div>
      ))}
    </div>
  );
}
