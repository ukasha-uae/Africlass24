"use client";

import React from 'react';
import type { QuizStyle } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props { value: QuizStyle; onChange: (v: QuizStyle) => void }

export default function QuizStyleSelect({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Label className="text-sm">Style</Label>
      <Select value={value} onValueChange={(v) => onChange(v as QuizStyle)}>
        <SelectTrigger className="min-w-[160px]">
          <SelectValue placeholder="Quiz style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="classic">Classic (full layout)</SelectItem>
          <SelectItem value="card">Card (boxed answers)</SelectItem>
          <SelectItem value="compact">Compact (smaller spacing)</SelectItem>
          <SelectItem value="timed">Timed (automatic progression)</SelectItem>
          <SelectItem value="visual">Visual (image-focused)</SelectItem>
          <SelectItem value="rapid">Rapid (short timed questions)</SelectItem>
          <SelectItem value="image-first">Image First (big images)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
