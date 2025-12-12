"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, TrendingUp, BarChart3, Calculator, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

// ============================================
// HELPER FUNCTIONS
// ============================================

// Convert number to ordinal (1st, 2nd, 3rd, 4th, etc.)
function getOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ============================================
// 1. MEAN CALCULATOR ANIMATION
// ============================================

interface MeanCalculatorProps {
  data: number[];
  showCalculation?: boolean;
}

export function MeanCalculatorAnimation({ data, showCalculation = true }: MeanCalculatorProps) {
  const [step, setStep] = useState(0);
  const totalSteps = 3;
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [autoNarrate, setAutoNarrate] = useState(true);

  const sum = data.reduce((a, b) => a + b, 0);
  const mean = sum / data.length;

  // Narration text for each step
  const narrationText = [
    `Let's calculate the mean. Here are your data values: ${data.join(', ')}`,
    `First, we add all the values together. ${data.join(' plus ')} equals ${sum}`,
    `Next, count how many values we have. There are ${data.length} numbers in total`,
    `Finally, divide the sum by the count. ${sum} divided by ${data.length} equals ${mean.toFixed(2)}. The mean is ${mean.toFixed(2)}`
  ];

  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis({
    text: narrationText[step] || '',
    autoPlay: autoNarrate,
    rate: 0.9,
  });

  // Auto-scroll into view when step changes
  useEffect(() => {
    if (step > 0 && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [step]);

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <Card ref={cardRef} className="my-6 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            Mean Calculator
          </h3>
          <div className="flex gap-2 w-full sm:w-auto">
            {isSupported && (
              <Button 
                size="sm" 
                onClick={isSpeaking ? stop : speak} 
                variant={isSpeaking ? "default" : "outline"}
                className="flex-1 sm:flex-none"
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            )}
            <Button size="sm" onClick={handlePrevious} disabled={step === 0} className="flex-1 sm:flex-none">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleReset} variant="outline" className="flex-1 sm:flex-none">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleNext} disabled={step === totalSteps} className="flex-1 sm:flex-none">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center mb-4">
          <Badge variant="secondary" className="text-xs">
            Step {step} of {totalSteps}
          </Badge>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex items-center justify-center min-h-[350px]"
            >
              {/* Step 0: Show Data */}
              {step === 0 && (
                <div className="space-y-6 text-center w-full">
                  <div className="text-lg font-semibold text-muted-foreground">
                    Your Data Values
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {data.map((value, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gray-300 dark:bg-gray-700 flex items-center justify-center font-bold text-base sm:text-xl"
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Click Next to start calculating</p>
                </div>
              )}

              {/* Step 1: Sum */}
              {step === 1 && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold mb-4">Step 1: Add All Values</div>
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600 break-words">
                      {data.join(' + ')}
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-green-600 mt-4">
                      = {sum}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Count */}
              {step === 2 && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold mb-4">Step 2: Count the Values</div>
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                    <div className="text-sm text-muted-foreground mb-2">Number of values</div>
                    <div className="text-5xl font-bold text-purple-600">
                      n = {data.length}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Result */}
              {step === 3 && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold mb-4">Step 3: Calculate Mean</div>
                  <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-lg text-white">
                    <div className="text-sm mb-2">Divide Sum by Count</div>
                    <div className="text-2xl sm:text-3xl font-bold mb-2">
                      Mean = {sum} ÷ {data.length}
                    </div>
                    <div className="text-4xl sm:text-5xl font-bold mt-4">
                      = {mean.toFixed(2)}
                    </div>
                    <div className="text-sm opacity-90 mt-4">
                      On average, the value is {mean.toFixed(2)}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// 2. MEDIAN FINDER ANIMATION
// ============================================

interface MedianFinderProps {
  data: number[];
  showSteps?: boolean;
}

export function MedianFinderAnimation({ data, showSteps = true }: MedianFinderProps) {
  const [step, setStep] = useState(0);
  const [autoNarrate, setAutoNarrate] = useState(true);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const isOdd = n % 2 === 1;
  const medianIndex = isOdd ? Math.floor(n / 2) : -1;
  const median = isOdd 
    ? sorted[medianIndex] 
    : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;

  const totalSteps = 4;

  // Narration text for each step
  const narrationText = [
    `Let's find the median. Here are your data values: ${data.join(', ')}`,
    `Step 1: First, we arrange the values in ascending order. ${sorted.join(', ')}`,
    `Step 2: Count the values. We have ${n} numbers, which is ${isOdd ? 'an odd' : 'an even'} number. ${isOdd ? `The median position is ${getOrdinal(medianIndex + 1)}` : `We'll average the ${getOrdinal(n/2)} and ${getOrdinal(n/2 + 1)} values`}`,
    `The median is the middle value, which is ${median}`,
    `The median is ${median}. This means half the values are below ${median} and half are above it`
  ];

  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis({
    text: narrationText[step] || '',
    autoPlay: autoNarrate,
    rate: 0.9,
  });

  // Auto-scroll into view when step changes
  useEffect(() => {
    if (step > 0 && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [step]);

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <Card ref={cardRef} className="my-6 overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            Median Finder
          </h3>
          <div className="flex gap-2 w-full sm:w-auto">
            {isSupported && (
              <Button 
                size="sm" 
                onClick={isSpeaking ? stop : speak} 
                variant={isSpeaking ? "default" : "outline"}
                className="flex-1 sm:flex-none"
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            )}
            <Button size="sm" onClick={handlePrevious} disabled={step === 0} className="flex-1 sm:flex-none">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleReset} variant="outline" className="flex-1 sm:flex-none">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleNext} disabled={step === totalSteps} className="flex-1 sm:flex-none">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center mb-4">
          <Badge variant="secondary" className="text-xs">
            Step {step} of {totalSteps}
          </Badge>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex items-center justify-center min-h-[350px]"
            >
              {/* Step 0: Original Data */}
              {step === 0 && (
                <div className="space-y-6 text-center w-full">
                  <div className="text-lg font-semibold text-muted-foreground">
                    Original Data (Unsorted)
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {data.map((value, index) => (
                      <div
                        key={`orig-${index}`}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gray-300 dark:bg-gray-700 flex items-center justify-center font-bold text-sm sm:text-base"
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Click Next to arrange in order</p>
                </div>
              )}

              {/* Step 1: Sorted Data */}
              {step === 1 && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold text-green-600">
                    Step 1: Arrange in Order ✓
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {sorted.map((value, index) => (
                      <div
                        key={`sort-${index}`}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-400 flex items-center justify-center font-bold text-white shadow text-sm sm:text-base"
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Position Info */}
              {step === 2 && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold mb-4">Step 2: Find Position</div>
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-md mx-auto">
                    <div className="text-sm text-muted-foreground mb-2">Number of values</div>
                    <div className="text-3xl font-bold mb-4">
                      n = {n}
                    </div>
                    <div className="text-lg text-purple-600 mb-2">
                      {isOdd ? 'Odd number of values' : 'Even number of values'}
                    </div>
                    {isOdd ? (
                      <div className="text-base">Position = (n+1)÷2 = {getOrdinal(medianIndex + 1)} value</div>
                    ) : (
                      <div className="text-base">Average of {getOrdinal(n/2)} and {getOrdinal(n/2 + 1)} values</div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Highlight Median */}
              {step === 3 && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold mb-4">Step 3: Identify Median</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {sorted.map((value, index) => {
                      const isMedianValue = isOdd 
                        ? index === medianIndex 
                        : index === n / 2 - 1 || index === n / 2;
                      
                      return (
                        <div
                          key={`highlight-${index}`}
                          className={cn(
                            "w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center font-bold text-white shadow text-sm sm:text-base transition-all",
                            isMedianValue ? "bg-purple-500 scale-110" : "bg-blue-400"
                          )}
                        >
                          {value}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-sm text-purple-600 font-semibold">
                    {isOdd ? '↑ The middle value' : '↑ Average these two values'}
                  </p>
                </div>
              )}

              {/* Step 4: Result */}
              {step === 4 && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold mb-4">Median Result</div>
                  <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg text-white max-w-md mx-auto">
                    <div className="text-sm mb-2 opacity-90">The Median is</div>
                    <div className="text-5xl font-bold mb-4">{median}</div>
                    <div className="text-base opacity-90">
                      {isOdd ? 'The middle value when arranged in order' : 'Average of the two middle values'}
                    </div>
                    {!isOdd && (
                      <div className="text-sm mt-3 opacity-80">
                        ({sorted[n / 2 - 1]} + {sorted[n / 2]}) ÷ 2 = {median}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// 3. MODE COUNTER ANIMATION
// ============================================

interface ModeCounterProps {
  data: number[];
  showFrequency?: boolean;
}

export function ModeCounterAnimation({ data, showFrequency = true }: ModeCounterProps) {
  const [step, setStep] = useState(0);
  const [autoNarrate, setAutoNarrate] = useState(true);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Calculate frequencies
  const frequencies = data.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const sortedValues = Object.keys(frequencies)
    .map(Number)
    .sort((a, b) => a - b);

  const maxFreq = Math.max(...Object.values(frequencies));
  const modes = sortedValues.filter(val => frequencies[val] === maxFreq);

  const totalSteps = sortedValues.length + 1;

  // Narration text for each step
  const getNarration = () => {
    if (step === 0) return `Let's find the mode. Here are your data values: ${data.join(', ')}`;
    if (step <= sortedValues.length) {
      const value = sortedValues[step - 1];
      const freq = frequencies[value];
      return `The value ${value} appears ${freq} ${freq === 1 ? 'time' : 'times'}`;
    }
    return `The mode is ${modes.length > 1 ? 'multimodal with values' : ''} ${modes.join(' and ')}. ${modes.length > 1 ? 'These values' : 'This value'} appear${modes.length === 1 ? 's' : ''} most frequently, ${maxFreq} times`;
  };

  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis({
    text: getNarration(),
    autoPlay: autoNarrate,
    rate: 0.9,
  });

  // Auto-scroll into view when step changes
  useEffect(() => {
    if (step > 0 && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [step]);

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <Card ref={cardRef} className="my-6 overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
            Mode Counter
          </h3>
          <div className="flex gap-2 w-full sm:w-auto">
            {isSupported && (
              <Button 
                size="sm" 
                onClick={isSpeaking ? stop : speak} 
                variant={isSpeaking ? "default" : "outline"}
                className="flex-1 sm:flex-none"
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            )}
            <Button size="sm" onClick={handlePrevious} disabled={step === 0} className="flex-1 sm:flex-none">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleReset} variant="outline" className="flex-1 sm:flex-none">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleNext} disabled={step === totalSteps} className="flex-1 sm:flex-none">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center mb-4">
          <Badge variant="secondary" className="text-xs">
            Step {step} of {totalSteps}
          </Badge>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex items-center justify-center min-h-[350px]"
            >
              {/* Step 0: Show Data */}
              {step === 0 && (
                <div className="space-y-6 text-center w-full">
                  <div className="text-lg font-semibold text-muted-foreground">
                    Your Data Values
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
                    {data.map((value, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 rounded-lg bg-orange-300 dark:bg-orange-700 flex items-center justify-center font-bold text-sm"
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Click Next to count frequencies</p>
                </div>
              )}

              {/* Steps 1 to sortedValues.length: Count each value's frequency */}
              {step > 0 && step <= sortedValues.length && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold mb-4">
                    Counting Frequency: {sortedValues[step - 1]}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                    {sortedValues.slice(0, step).map((value) => (
                      <div
                        key={value}
                        className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow border-2 border-gray-200 dark:border-gray-700"
                      >
                        <div className="text-center font-bold text-2xl mb-2">
                          {value}
                        </div>
                        <div className="text-center text-sm text-muted-foreground">
                          Appears: {frequencies[value]} {frequencies[value] === 1 ? 'time' : 'times'}
                        </div>
                        <div className="mt-2 flex gap-1 justify-center">
                          {Array.from({ length: frequencies[value] }).map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-5 rounded-t bg-orange-500"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Final Step: Show Mode Result */}
              {step > sortedValues.length && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold mb-4">Mode Identified!</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-6">
                    {sortedValues.map((value) => {
                      const isMode = modes.includes(value);
                      return (
                        <div
                          key={value}
                          className={cn(
                            "p-4 rounded-lg shadow border-2 transition-all",
                            isMode 
                              ? "bg-orange-500 border-orange-600 scale-105" 
                              : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                          )}
                        >
                          <div className={cn(
                            "text-center font-bold text-2xl mb-2",
                            isMode ? "text-white" : ""
                          )}>
                            {value}
                          </div>
                          <div className={cn(
                            "text-center text-sm",
                            isMode ? "text-white font-semibold" : "text-muted-foreground"
                          )}>
                            {frequencies[value]} {frequencies[value] === 1 ? 'time' : 'times'}
                            {isMode && " ⭐"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg text-white max-w-md mx-auto">
                    <div className="text-sm mb-2">
                      {modes.length === 1 ? 'Mode (Most Frequent)' : 'Modes (Bimodal)'}
                    </div>
                    <div className="text-5xl font-bold mb-2">
                      {modes.join(', ')}
                    </div>
                    <div className="text-base opacity-90">
                      Appears {maxFreq} {maxFreq === 1 ? 'time' : 'times'}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// 4. RANGE VISUALIZER ANIMATION
// ============================================

interface RangeVisualizerProps {
  data: number[];
  showMinMax?: boolean;
  unit?: string;
}

export function RangeVisualizerAnimation({ data, showMinMax = true, unit = '' }: RangeVisualizerProps) {
  const [step, setStep] = useState(0);
  const [autoNarrate, setAutoNarrate] = useState(true);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const sorted = [...data].sort((a, b) => a - b);

  // Scale for visualization
  const scale = 300 / (max - min + 10);

  const totalSteps = 4;

  // Narration text for each step
  const narrationText = [
    `Let's calculate the range. Here are your data values: ${data.join(', ')}`,
    `Step 1: The data is plotted on a number line from smallest to largest`,
    `Step 2: Identify the minimum value, which is ${min}, and the maximum value, which is ${max}`,
    `Step 3: The range spans from ${min} to ${max}`,
    `The range is ${max} minus ${min}, which equals ${range}. This shows the spread of your data`
  ];

  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis({
    text: narrationText[step] || '',
    autoPlay: autoNarrate,
    rate: 0.9,
  });

  // Auto-scroll into view when step changes
  useEffect(() => {
    if (step > 0 && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [step]);

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <Card ref={cardRef} className="my-6 overflow-hidden bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            Range Visualizer
          </h3>
          <div className="flex gap-2 w-full sm:w-auto">
            {isSupported && (
              <Button 
                size="sm" 
                onClick={isSpeaking ? stop : speak} 
                variant={isSpeaking ? "default" : "outline"}
                className="flex-1 sm:flex-none"
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            )}
            <Button size="sm" onClick={handlePrevious} disabled={step === 0} className="flex-1 sm:flex-none">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleReset} variant="outline" className="flex-1 sm:flex-none">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleNext} disabled={step === totalSteps} className="flex-1 sm:flex-none">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center mb-4">
          <Badge variant="secondary" className="text-xs">
            Step {step} of {totalSteps}
          </Badge>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex items-center justify-center min-h-[350px]"
            >
              {/* Step 0: Show Data */}
              {step === 0 && (
                <div className="space-y-6 text-center w-full">
                  <div className="text-lg font-semibold text-muted-foreground">
                    Your Data Values
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
                    {data.map((value, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-400 flex items-center justify-center font-bold text-white text-sm sm:text-base"
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Click Next to visualize on number line</p>
                </div>
              )}

              {/* Step 1: Number Line with All Points */}
              {step === 1 && (
                <div className="space-y-6 w-full p-4">
                  <div className="text-lg font-semibold text-center mb-6">
                    Step 1: Plot on Number Line
                  </div>
                  <div className="relative h-32 max-w-lg mx-auto">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 -translate-y-1/2" />
                    {sorted.map((value, index) => {
                      const position = ((value - min) / (max - min || 1)) * 100;
                      return (
                        <div
                          key={index}
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                          style={{ left: `${position}%` }}
                        >
                          <div className="w-4 h-4 rounded-full bg-blue-500" />
                          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap">
                            {value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Identify Min and Max */}
              {step === 2 && (
                <div className="space-y-6 w-full p-4">
                  <div className="text-lg font-semibold text-center mb-6">
                    Step 2: Identify Minimum and Maximum
                  </div>
                  <div className="relative h-32 max-w-lg mx-auto">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 -translate-y-1/2" />
                    {sorted.map((value, index) => {
                      const position = ((value - min) / (max - min || 1)) * 100;
                      const isMin = value === min;
                      const isMax = value === max;
                      return (
                        <div
                          key={index}
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                          style={{ left: `${position}%` }}
                        >
                          <div className={cn(
                            "rounded-full",
                            isMin ? "w-5 h-5 bg-red-500" :
                            isMax ? "w-5 h-5 bg-green-500" :
                            "w-4 h-4 bg-blue-400"
                          )} />
                          <div className={cn(
                            "absolute top-6 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap",
                            isMin ? "text-red-600" : isMax ? "text-green-600" : ""
                          )}>
                            {value}
                            {isMin && " (Min)"}
                            {isMax && " (Max)"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between max-w-lg mx-auto mt-8">
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <div className="text-xs text-red-600 dark:text-red-400">Minimum</div>
                      <div className="text-2xl font-bold text-red-600">{min}</div>
                    </div>
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <div className="text-xs text-green-600 dark:text-green-400">Maximum</div>
                      <div className="text-2xl font-bold text-green-600">{max}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Calculate Range */}
              {step === 3 && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold mb-4">Step 3: Calculate the Range</div>
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-md mx-auto">
                    <div className="text-sm text-muted-foreground mb-2">Formula</div>
                    <div className="text-xl font-bold mb-4">
                      Range = Maximum - Minimum
                    </div>
                    <div className="text-lg text-purple-600 mb-2">
                      = {max} - {min}
                    </div>
                    <div className="text-3xl font-bold text-purple-600">
                      = {range}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Result with Interpretation */}
              {step === 4 && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold mb-4">Range Result</div>
                  <div className="p-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-lg text-white max-w-md mx-auto">
                    <div className="text-sm mb-2 opacity-90">Data Spread (Range)</div>
                    <div className="text-5xl font-bold mb-4">{range}{unit}</div>
                    <div className="text-base opacity-90">
                      {range < 10 ? '✓ Low variability - Data is consistent' : 
                       range < 30 ? '~ Moderate variability - Some spread' : 
                       '⚠ High variability - Data is spread out'}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-4">
                    The range tells us how spread out our data is from smallest to largest value
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// 5. COMPARISON CHART ANIMATION
// ============================================

interface ComparisonChartProps {
  measures: {
    mean?: number;
    median?: number;
    mode?: number | null;
    range?: number;
  };
  data: number[];
  outlier?: number;
}

export function ComparisonChartAnimation({ measures, data, outlier }: ComparisonChartProps) {
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowChart(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const maxValue = Math.max(
    measures.mean || 0,
    measures.median || 0,
    measures.mode || 0,
    measures.range || 0
  );

  const getBarWidth = (value?: number | null) => {
    if (!value) return 0;
    return (value / maxValue) * 100;
  };

  return (
    <Card className="my-6 overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-center">
          Measures Comparison
        </h3>

        <div className="space-y-4">
          {/* Mean */}
          {measures.mean !== undefined && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Mean (Average)</span>
                <span className="font-bold text-blue-600">{measures.mean.toFixed(2)}</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={showChart ? { width: `${getBarWidth(measures.mean)}%` } : {}}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-end pr-2"
              >
                <span className="text-white text-xs font-bold">{measures.mean.toFixed(2)}</span>
              </motion.div>
            </div>
          )}

          {/* Median */}
          {measures.median !== undefined && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Median (Middle)</span>
                <span className="font-bold text-purple-600">{measures.median.toFixed(2)}</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={showChart ? { width: `${getBarWidth(measures.median)}%` } : {}}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-end pr-2"
              >
                <span className="text-white text-xs font-bold">{measures.median.toFixed(2)}</span>
              </motion.div>
            </div>
          )}

          {/* Mode */}
          {measures.mode !== null && measures.mode !== undefined && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Mode (Most Frequent)</span>
                <span className="font-bold text-orange-600">{measures.mode}</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={showChart ? { width: `${getBarWidth(measures.mode)}%` } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-end pr-2"
              >
                <span className="text-white text-xs font-bold">{measures.mode}</span>
              </motion.div>
            </div>
          )}

          {/* Range */}
          {measures.range !== undefined && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Range (Spread)</span>
                <span className="font-bold text-green-600">{measures.range}</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={showChart ? { width: `${getBarWidth(measures.range)}%` } : {}}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-end pr-2"
              >
                <span className="text-white text-xs font-bold">{measures.range}</span>
              </motion.div>
            </div>
          )}
        </div>

        {/* Outlier Alert */}
        {outlier && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg"
          >
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <span className="text-2xl">⚠️</span>
              <div>
                <div className="font-bold">Outlier Detected!</div>
                <div className="text-sm">
                  Value {outlier} is an extreme outlier. The median ({measures.median?.toFixed(2)}) 
                  is more representative than the mean ({measures.mean?.toFixed(2)}) in this case.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
// ============================================
// 6. GROUPED DATA MEDIAN ANIMATION
// ============================================

interface GroupedDataMedianProps {
  classIntervals: string[];
  frequencies: number[];
  showSteps?: boolean;
}

export function GroupedDataMedianAnimation({ 
  classIntervals, 
  frequencies, 
  showSteps = true 
}: GroupedDataMedianProps) {
  const [step, setStep] = useState(0);
  const [autoNarrate, setAutoNarrate] = useState(true);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Calculate cumulative frequencies
  const cumulativeFrequencies = frequencies.reduce((acc, freq, index) => {
    const prevSum = index > 0 ? acc[index - 1] : 0;
    return [...acc, prevSum + freq];
  }, [] as number[]);

  const n = cumulativeFrequencies[cumulativeFrequencies.length - 1];
  const nBy2 = n / 2;

  // Find median class (first class where cumulative frequency >= n/2)
  const medianClassIndex = cumulativeFrequencies.findIndex(cf => cf >= nBy2);
  
  // Extract lower boundary and class width from median class interval
  const medianClassInterval = classIntervals[medianClassIndex];
  const [lowerBound, upperBound] = medianClassInterval.split('-').map(Number);
  const classWidth = upperBound - lowerBound + 1;
  
  const L = lowerBound; // Lower boundary of median class
  const fm = frequencies[medianClassIndex]; // Frequency of median class
  const cfb = medianClassIndex > 0 ? cumulativeFrequencies[medianClassIndex - 1] : 0; // Cumulative frequency before median class
  const h = classWidth;

  // Median formula: L + ((n/2 - cfb) / fm) * h
  const median = L + ((nBy2 - cfb) / fm) * h;

  const totalSteps = 5;

  // Narration text for each step
  const narrationText = [
    `Let's find the median from grouped data. We have ${classIntervals.length} class intervals with a total of ${n} observations`,
    `Step 1: First, we calculate the cumulative frequencies by adding up the frequencies as we go`,
    `Step 2: Find n over 2, which is ${n} divided by 2, equals ${nBy2}. We need to find the class where cumulative frequency reaches or exceeds ${nBy2}`,
    `Step 3: The median class is ${medianClassInterval} because its cumulative frequency ${cumulativeFrequencies[medianClassIndex]} is the first to reach or exceed ${nBy2}`,
    `Step 4: Using the formula, Median equals L plus, n over 2 minus C F B, divided by f m, times h`,
    `The median is ${median.toFixed(2)}. This means the middle value of this grouped data falls at ${median.toFixed(2)}`
  ];

  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis({
    text: narrationText[step] || '',
    autoPlay: autoNarrate,
    rate: 0.9,
  });

  // Auto-scroll into view when step changes
  useEffect(() => {
    if (step > 0 && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [step]);

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <Card ref={cardRef} className="my-6 overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
            Grouped Data Median
          </h3>
          <div className="flex gap-2 w-full sm:w-auto">
            {isSupported && (
              <Button 
                size="sm" 
                onClick={isSpeaking ? stop : speak} 
                variant={isSpeaking ? "default" : "outline"}
                className="flex-1 sm:flex-none"
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            )}
            <Button size="sm" onClick={handlePrevious} disabled={step === 0} className="flex-1 sm:flex-none">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleReset} variant="outline" className="flex-1 sm:flex-none">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleNext} disabled={step === totalSteps} className="flex-1 sm:flex-none">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center mb-4">
          <Badge variant="secondary" className="text-xs">
            Step {step} of {totalSteps}
          </Badge>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex items-center justify-center min-h-[350px]"
            >
              {/* Step 0: Original Data */}
              {step === 0 && (
                <div className="space-y-6 w-full p-4">
                  <div className="text-lg font-semibold text-center mb-4">Original Grouped Data</div>
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                      <thead>
                        <tr className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                          <th className="px-6 py-4 text-left font-bold text-base">Class Interval</th>
                          {classIntervals.map((interval, idx) => (
                            <th key={idx} className="px-6 py-4 text-center font-bold text-base">{interval}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 dark:bg-slate-700/50">
                          <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-200">Frequency</td>
                          {frequencies.map((freq, idx) => (
                            <td key={idx} className="px-6 py-4 text-center font-bold text-xl text-indigo-600 dark:text-indigo-400">
                              {freq}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Total observations: n = {n}
                  </p>
                </div>
              )}

              {/* Step 1: Cumulative Frequency Table */}
              {step === 1 && (
                <div className="space-y-6 w-full p-4">
                  <div className="text-lg font-semibold text-center mb-4">
                    Step 1: Calculate Cumulative Frequency
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg max-w-2xl mx-auto border border-gray-200 dark:border-gray-700">
                      <thead>
                        <tr className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                          <th className="px-6 py-4 text-center font-bold">Class Interval</th>
                          <th className="px-6 py-4 text-center font-bold">Frequency (f)</th>
                          <th className="px-6 py-4 text-center font-bold">Cumulative Frequency (CF)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {classIntervals.map((interval, idx) => (
                          <tr key={idx} className="hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                            <td className="px-6 py-4 text-center font-semibold text-gray-700 dark:text-gray-200">
                              {interval}
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-lg text-indigo-600 dark:text-indigo-400">
                              {frequencies[idx]}
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-lg text-green-600 dark:text-green-400">
                              {cumulativeFrequencies[idx]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Step 2: Find n/2 */}
              {step === 2 && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold mb-4">Step 2: Find n/2</div>
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-md mx-auto">
                    <div className="text-sm text-muted-foreground mb-2">Total observations</div>
                    <div className="text-3xl font-bold mb-4">n = {n}</div>
                    <div className="text-sm text-muted-foreground mb-2">Divide by 2</div>
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      n/2 = {n}/2 = {nBy2}
                    </div>
                    <div className="text-sm text-muted-foreground mt-4">
                      We need to find the class where CF ≥ {nBy2}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Identify Median Class */}
              {step === 3 && (
                <div className="space-y-6 w-full p-4">
                  <div className="text-lg font-semibold text-center mb-4">
                    Step 3: Identify Median Class
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg max-w-2xl mx-auto border border-gray-200 dark:border-gray-700">
                      <thead>
                        <tr className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                          <th className="px-6 py-4 text-center font-bold">Class Interval</th>
                          <th className="px-6 py-4 text-center font-bold">Frequency</th>
                          <th className="px-6 py-4 text-center font-bold">Cumulative Frequency</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {classIntervals.map((interval, idx) => {
                          const isMedianClass = idx === medianClassIndex;
                          return (
                            <tr 
                              key={idx}
                              className={cn(
                                "transition-all duration-300",
                                isMedianClass 
                                  ? "bg-purple-100 dark:bg-purple-900/40 ring-2 ring-purple-500 ring-inset" 
                                  : "hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                              )}
                            >
                              <td className="px-6 py-4 text-center font-semibold text-gray-700 dark:text-gray-200">
                                {interval}
                                {isMedianClass && " ⭐"}
                              </td>
                              <td className="px-6 py-4 text-center font-bold text-lg text-indigo-600 dark:text-indigo-400">
                                {frequencies[idx]}
                              </td>
                              <td className={cn(
                                "px-6 py-4 text-center font-bold",
                                isMedianClass ? "text-purple-600 dark:text-purple-400 text-2xl" : "text-green-600 dark:text-green-400 text-lg"
                              )}>
                                {cumulativeFrequencies[idx]}
                                {isMedianClass && <span className="ml-2 text-sm">≥ {nBy2}</span>}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl max-w-md mx-auto border-2 border-purple-300 dark:border-purple-700">
                    <div className="font-bold text-lg text-purple-600 dark:text-purple-400">✨ Median Class: {medianClassInterval}</div>
                  </div>
                </div>
              )}

              {/* Step 4: Apply Formula */}
              {step === 4 && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold mb-4">Step 4: Apply the Formula</div>
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-lg mx-auto space-y-4">
                    <div className="text-sm text-muted-foreground">Median Formula for Grouped Data:</div>
                    <div className="text-lg font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded">
                      Median = L + ((n/2 - CFb) / fm) × h
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <div className="text-xs text-muted-foreground">L (Lower boundary)</div>
                        <div className="font-bold">{L}</div>
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <div className="text-xs text-muted-foreground">n/2</div>
                        <div className="font-bold">{nBy2}</div>
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <div className="text-xs text-muted-foreground">CFb (CF before)</div>
                        <div className="font-bold">{cfb}</div>
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <div className="text-xs text-muted-foreground">fm (Frequency)</div>
                        <div className="font-bold">{fm}</div>
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded col-span-2">
                        <div className="text-xs text-muted-foreground">h (Class width)</div>
                        <div className="font-bold">{h}</div>
                      </div>
                    </div>
                    <div className="text-base text-purple-600 font-mono p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                      = {L} + (({nBy2} - {cfb}) / {fm}) × {h}
                    </div>
                    <div className="text-base text-purple-600 font-mono p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                      = {L} + ({nBy2 - cfb} / {fm}) × {h}
                    </div>
                    <div className="text-base text-purple-600 font-mono p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                      = {L} + {((nBy2 - cfb) / fm).toFixed(2)} × {h}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Final Result */}
              {step === 5 && (
                <div className="space-y-6 text-center w-full p-4">
                  <div className="text-lg font-semibold mb-4">Median Result</div>
                  <div className="p-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg text-white max-w-md mx-auto">
                    <div className="text-sm mb-2 opacity-90">The Median is</div>
                    <div className="text-5xl font-bold mb-4">{median.toFixed(2)}</div>
                    <div className="text-base opacity-90">
                      From grouped data with {n} observations
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground max-w-lg mx-auto mt-4">
                    This means that 50% of the observations fall below {median.toFixed(2)} and 50% fall above it
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// 7. DECISION TREE COMPONENT
// ============================================

export function MeasureDecisionTree() {
  return (
    <Card className="my-6 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          🎯 Which Measure Should I Use?
        </h3>
        
        <div className="flex flex-col items-center space-y-4">
          {/* Root Question */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-4 shadow-lg max-w-md w-full text-center">
            <div className="font-bold text-lg">Is the data categorical?</div>
            <div className="text-sm opacity-90">(non-numerical: colors, categories)</div>
          </div>

          {/* First Branch */}
          <div className="flex flex-col sm:flex-row gap-8 w-full max-w-3xl">
            {/* YES Branch */}
            <div className="flex-1 flex flex-col items-center space-y-3">
              <div className="text-2xl font-bold text-green-600">✓ YES</div>
              <div className="h-12 w-1 bg-green-500"></div>
              <div className="bg-green-500 text-white rounded-xl p-6 shadow-lg w-full text-center transform hover:scale-105 transition-transform">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-bold text-xl">Use MODE</div>
                <div className="text-sm opacity-90 mt-2">Most frequent value</div>
              </div>
            </div>

            {/* NO Branch */}
            <div className="flex-1 flex flex-col items-center space-y-3">
              <div className="text-2xl font-bold text-blue-600">✗ NO</div>
              <div className="h-12 w-1 bg-blue-500"></div>
              
              {/* Second Question */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl p-4 shadow-lg w-full text-center">
                <div className="font-bold">Are there extreme outliers?</div>
                <div className="text-sm opacity-90">(very large/small values)</div>
              </div>

              {/* Sub-branches */}
              <div className="flex gap-4 w-full">
                {/* YES to outliers */}
                <div className="flex-1 flex flex-col items-center space-y-2">
                  <div className="text-lg font-bold text-purple-600">YES</div>
                  <div className="h-8 w-1 bg-purple-500"></div>
                  <div className="bg-purple-500 text-white rounded-xl p-4 shadow-lg w-full text-center transform hover:scale-105 transition-transform">
                    <div className="text-xl mb-1">📈</div>
                    <div className="font-bold">MEDIAN</div>
                    <div className="text-xs opacity-90 mt-1">Not affected by outliers</div>
                  </div>
                </div>

                {/* NO to outliers */}
                <div className="flex-1 flex flex-col items-center space-y-2">
                  <div className="text-lg font-bold text-orange-600">NO</div>
                  <div className="h-8 w-1 bg-orange-500"></div>
                  <div className="bg-orange-500 text-white rounded-xl p-4 shadow-lg w-full text-center transform hover:scale-105 transition-transform">
                    <div className="text-xl mb-1">🎯</div>
                    <div className="font-bold">MEAN</div>
                    <div className="text-xs opacity-90 mt-1">Most accurate average</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// 8. COMPREHENSIVE COMPARISON TABLE
// ============================================

export function MeasuresComparisonTable() {
  const measures = [
    {
      name: "Mean",
      icon: "🎯",
      formula: "Σx / n",
      bestFor: "Evenly distributed numerical data",
      outliers: "Yes",
      outliersIcon: "⚠️",
      categorical: "No",
      categoricalIcon: "✗",
      examples: "Test scores, heights, weights",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Median",
      icon: "📈",
      formula: "Middle value",
      bestFor: "Skewed data, outliers present",
      outliers: "No",
      outliersIcon: "✓",
      categorical: "No",
      categoricalIcon: "✗",
      examples: "House prices, salaries, income",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Mode",
      icon: "📊",
      formula: "Most frequent",
      bestFor: "Categorical data, discrete values",
      outliers: "No",
      outliersIcon: "✓",
      categorical: "Yes",
      categoricalIcon: "✓",
      examples: "Favorite colors, shoe sizes, popular choice",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Range",
      icon: "📏",
      formula: "Max - Min",
      bestFor: "Measuring spread/consistency",
      outliers: "Yes",
      outliersIcon: "⚠️",
      categorical: "No",
      categoricalIcon: "✗",
      examples: "Temperature variation, quality control",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <Card className="my-6 overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          📋 Comprehensive Comparison of Statistical Measures
        </h3>

        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <th className="px-6 py-4 text-left font-bold">Measure</th>
                <th className="px-6 py-4 text-center font-bold">Formula</th>
                <th className="px-6 py-4 text-left font-bold">Best For</th>
                <th className="px-6 py-4 text-center font-bold">Affected by Outliers?</th>
                <th className="px-6 py-4 text-center font-bold">Works with Categories?</th>
                <th className="px-6 py-4 text-left font-bold">Example Situations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {measures.map((measure, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{measure.icon}</span>
                      <span className="font-bold text-lg">{measure.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <code className="px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded font-mono text-sm">
                      {measure.formula}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-sm">{measure.bestFor}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "px-3 py-1 rounded-full font-semibold text-sm",
                      measure.outliers === "Yes" 
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" 
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    )}>
                      {measure.outliersIcon} {measure.outliers}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "px-3 py-1 rounded-full font-semibold text-sm",
                      measure.categorical === "Yes" 
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                        : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                    )}>
                      {measure.categoricalIcon} {measure.categorical}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{measure.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet View - Cards */}
        <div className="lg:hidden space-y-4">
          {measures.map((measure, idx) => (
            <div key={idx} className={cn(
              "rounded-xl shadow-lg overflow-hidden bg-gradient-to-br",
              idx === 0 && "from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30",
              idx === 1 && "from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30",
              idx === 2 && "from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30",
              idx === 3 && "from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30"
            )}>
              <div className={cn("bg-gradient-to-r text-white p-4", measure.color)}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{measure.icon}</span>
                  <div>
                    <div className="font-bold text-xl">{measure.name}</div>
                    <code className="text-sm opacity-90">{measure.formula}</code>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Best For</div>
                  <div className="text-sm">{measure.bestFor}</div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Outliers</div>
                    <span className={cn(
                      "inline-block px-2 py-1 rounded text-xs font-semibold",
                      measure.outliers === "Yes" 
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" 
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    )}>
                      {measure.outliersIcon} {measure.outliers}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Categories</div>
                    <span className={cn(
                      "inline-block px-2 py-1 rounded text-xs font-semibold",
                      measure.categorical === "Yes" 
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                        : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                    )}>
                      {measure.categoricalIcon} {measure.categorical}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Examples</div>
                  <div className="text-sm">{measure.examples}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// 9. QUICK REFERENCE TABLE
// ============================================

export function QuickReferenceTable() {
  const measures = [
    {
      name: "Mean",
      symbol: "x̄",
      formula: "Σx ÷ n",
      whenToUse: "Balanced data, no outliers",
      icon: "🎯",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Median",
      symbol: "M",
      formula: "Middle value",
      whenToUse: "Data with outliers",
      icon: "📈",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Mode",
      symbol: "Mo",
      formula: "Most frequent",
      whenToUse: "Categorical data",
      icon: "📊",
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Range",
      symbol: "R",
      formula: "Max - Min",
      whenToUse: "Check spread/consistency",
      icon: "📏",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <Card className="my-6 overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          📋 Quick Reference Table
        </h3>

        {/* Desktop View - Horizontal Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <th className="px-6 py-4 text-left font-bold">Measure</th>
                <th className="px-6 py-4 text-center font-bold">Symbol</th>
                <th className="px-6 py-4 text-center font-bold">Formula</th>
                <th className="px-6 py-4 text-left font-bold">When to Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {measures.map((measure, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{measure.icon}</span>
                      <span className="font-bold text-lg">{measure.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <code className="text-2xl font-serif font-bold text-indigo-600 dark:text-indigo-400">
                      {measure.symbol}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <code className="px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg font-mono text-sm font-semibold">
                      {measure.formula}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{measure.whenToUse}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Interactive Cards */}
        <div className="md:hidden grid gap-4">
          {measures.map((measure, idx) => (
            <div 
              key={idx} 
              className={cn(
                "rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 active:scale-95",
                "bg-white dark:bg-slate-800 border-2 border-transparent hover:border-indigo-400"
              )}
            >
              <div className={cn("bg-gradient-to-r text-white p-4", measure.color)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{measure.icon}</span>
                    <div>
                      <div className="font-bold text-xl">{measure.name}</div>
                      <code className="text-3xl font-serif opacity-90">{measure.symbol}</code>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <code className="text-sm font-mono font-bold">{measure.formula}</code>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-gray-50 to-white dark:from-slate-700 dark:to-slate-800">
                <div className="flex items-start gap-2">
                  <span className="text-indigo-500 dark:text-indigo-400 font-bold text-sm mt-0.5">💡</span>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Best For</div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{measure.whenToUse}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tip */}
        <div className="mt-6 p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg border-l-4 border-indigo-500">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">💡 Pro Tip:</span> Remember the easy rule: 
            Mean for balance, Median for outliers, Mode for categories, Range for spread!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}