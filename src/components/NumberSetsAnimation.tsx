"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, VolumeX, Layers, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

// ============================================
// NUMBER SETS HIERARCHY ANIMATION
// ============================================

// Set configuration with colors and properties
const numberSets = [
  { symbol: 'ℕ', name: 'Natural Numbers', color: '#7c3aed', bgColor: '#ede9fe', examples: ['1', '2', '3', '4', '5'] },
  { symbol: '𝕎', name: 'Whole Numbers', color: '#db2777', bgColor: '#fce7f3', examples: ['0', '1', '2', '3', '4'] },
  { symbol: 'ℤ', name: 'Integers', color: '#059669', bgColor: '#d1fae5', examples: ['-3', '-2', '-1', '0', '1', '2'] },
  { symbol: 'ℚ', name: 'Rational Numbers', color: '#d97706', bgColor: '#fef3c7', examples: ['½', '-3', '0.75', '⅔'] },
  { symbol: 'ℝ', name: 'Real Numbers', color: '#2563eb', bgColor: '#dbeafe', examples: ['π', '√2', '-3', '0.5', '7'] },
];

const irrationalExamples = ['π', '√2', 'e', '√3'];

export function NumberSetsAnimation() {
  const [step, setStep] = useState(0);
  const totalSteps = 6;
  const cardRef = useRef<HTMLDivElement>(null);
  const [autoNarrate, setAutoNarrate] = useState(true);
  const [activeSet, setActiveSet] = useState<number>(-1);

  // Intelligent teacher narration for each step
  const narrationText = [
    "Welcome! Today we'll explore the beautiful world of number sets. Just like a family tree shows how relatives are connected, mathematicians organize numbers into sets that are nested inside each other. Each set has special properties. Let's discover them together!",
    
    "Let's start with the Natural Numbers, represented by the fancy letter N. These are the counting numbers: 1, 2, 3, 4, 5, and so on. Think of counting mangoes at the market, or goals scored in a football match. Natural numbers are the most basic numbers we use every day!",
    
    "Next comes the Whole Numbers, shown by the letter W. What's the difference? We simply add zero! So whole numbers are: 0, 1, 2, 3, 4, and onwards. Why is zero important? Imagine your mobile phone credit - sometimes it shows zero cedis remaining! Zero represents 'nothing' but it's still a valid number.",
    
    "Now meet the Integers, symbolized by Z. Here we add negative numbers! So integers include: negative 3, negative 2, negative 1, zero, 1, 2, 3, and so on. Think of temperature: Accra might be 30 degrees, but some countries drop to negative 10! Or think of a bank account - you can have positive balance or go into debt with negative balance.",
    
    "The Rational Numbers, shown by Q, include any number that can be written as a fraction - one integer divided by another. This includes: one-half, three-quarters, negative 5, and even 0.333 repeating which equals one-third. Every integer is rational too because 5 equals 5 over 1!",
    
    "Finally, the Real Numbers, represented by R, contain ALL numbers on the number line. This includes rationals AND irrational numbers like pi, the square root of 2, and e. Irrational numbers have decimals that go on forever without repeating! The real numbers form the complete number line from negative infinity to positive infinity.",
    
    "Now you can see the complete hierarchy! Natural numbers fit inside Whole numbers, which fit inside Integers, which fit inside Rationals, which all fit inside Real numbers. It's like Russian nesting dolls - each set contains all the sets inside it! Irrational numbers are separate - they're real but NOT rational."
  ];

  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis({
    text: narrationText[step] || '',
    autoPlay: false,
    rate: 0.9,
  });

  useEffect(() => {
    if (step > 0 && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [step]);

  // Auto-narrate when step changes
  useEffect(() => {
    if (autoNarrate) {
      const timer = setTimeout(() => {
        speak();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [step, autoNarrate, speak]);

  // Update active set based on step
  useEffect(() => {
    if (step >= 1 && step <= 5) {
      setActiveSet(step - 1);
    } else if (step === 6) {
      setActiveSet(-1); // Show all
    } else {
      setActiveSet(-1);
    }
  }, [step]);

  const handleNext = () => {
    if (step < totalSteps) {
      stop();
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      stop();
      setStep(step - 1);
    }
  };

  const toggleNarration = () => {
    if (isSpeaking) {
      stop();
      setAutoNarrate(false);
    } else {
      setAutoNarrate(true);
      speak();
    }
  };

  const handleReset = () => {
    stop();
    setStep(0);
  };

  // Number bubble component - plain CSS for stability
  const NumberBubble = ({ value, color }: { value: string; color: string }) => (
    <div
      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-white text-sm sm:text-base shadow-lg"
      style={{ backgroundColor: color }}
    >
      {value}
    </div>
  );

  // Nested set visualization component - using CSS transitions for stability
  const NestedSetVisualization = ({ highlightIndex = -1, showAll = false }: { highlightIndex?: number; showAll?: boolean }) => {
    const sets = numberSets.slice().reverse();
    
    return (
      <div className="relative w-full max-w-xs sm:max-w-sm mx-auto aspect-square">
        {/* Nested rectangles - always render all, control visibility with CSS */}
        {sets.map((set, index) => {
          const actualIndex = 4 - index;
          const isVisible = showAll || (highlightIndex >= 0 && actualIndex <= highlightIndex);
          const isHighlighted = showAll || actualIndex === highlightIndex;
          const inset = index * 12;
          
          return (
            <div
              key={set.symbol}
              className="absolute rounded-2xl border-[3px] transition-opacity duration-500"
              style={{
                backgroundColor: set.bgColor,
                borderColor: set.color,
                top: `${inset}%`,
                left: `${inset}%`,
                right: `${inset}%`,
                bottom: `${inset}%`,
                opacity: isVisible ? (isHighlighted ? 1 : 0.7) : 0,
                boxShadow: isHighlighted && isVisible ? `0 0 15px ${set.color}30` : 'none'
              }}
            >
              {/* Symbol badge */}
              <div
                className="absolute top-2 left-2 sm:top-3 sm:left-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-white text-sm sm:text-lg"
                style={{ backgroundColor: set.color }}
              >
                {set.symbol}
              </div>
              
              {/* Set name */}
              <div
                className="absolute top-2 sm:top-3 left-11 sm:left-14 text-[10px] sm:text-xs font-semibold"
                style={{ color: set.color }}
              >
                {set.name}
              </div>
            </div>
          );
        })}

        {/* Irrational numbers indicator (only in final step) */}
        <div
          className="absolute -right-2 sm:right-2 top-1/4 w-20 sm:w-24 p-2 rounded-lg border-2 border-dashed transition-opacity duration-500"
          style={{ 
            backgroundColor: '#fee2e2', 
            borderColor: '#dc2626',
            opacity: showAll ? 1 : 0
          }}
        >
          <div className="text-[10px] sm:text-xs font-semibold text-red-600 mb-1">Irrational</div>
          <div className="flex flex-wrap gap-1">
            {['π', '√2'].map((ex, i) => (
              <span key={i} className="text-[9px] sm:text-xs bg-red-100 px-1 rounded text-red-700">{ex}</span>
            ))}
          </div>
          <div className="text-[8px] sm:text-[10px] text-red-500 mt-1">(ℝ but not ℚ)</div>
        </div>
      </div>
    );
  };

  // Examples display component - plain CSS
  const ExamplesDisplay = ({ setIndex }: { setIndex: number }) => {
    const set = numberSets[setIndex];
    return (
      <div className="mt-4 p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 shadow-lg max-w-sm mx-auto">
        <div className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: set.color }}>
          <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: set.color }}>
            {set.symbol}
          </span>
          Examples of {set.name}:
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {set.examples.map((ex, i) => (
            <NumberBubble key={i} value={ex} color={set.color} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card ref={cardRef} className="my-6 overflow-hidden bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-violet-950/30 dark:via-blue-950/30 dark:to-cyan-950/30">
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-violet-600" />
            Number Sets Hierarchy
          </h3>
          <div className="flex gap-2 w-full sm:w-auto">
            {isSupported && (
              <Button 
                size="sm" 
                onClick={toggleNarration} 
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

        {/* Progress indicator */}
        <div className="text-center mb-4">
          <Badge variant="secondary" className="text-xs">
            Step {step} of {totalSteps}
          </Badge>
          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: totalSteps + 1 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i === step ? "bg-violet-600 w-4" : i < step ? "bg-violet-400" : "bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="relative overflow-hidden min-h-[450px] sm:min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="w-full"
            >
              {/* Step 0: Introduction */}
              {step === 0 && (
                <div className="space-y-6 text-center p-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-xl sm:text-2xl font-bold text-violet-700 dark:text-violet-400"
                  >
                    The Family of Numbers 🔢
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto"
                  >
                    Just like a family tree, numbers are organized into sets that fit inside each other!
                  </motion.p>

                  <div className="flex flex-wrap justify-center gap-3 mt-6">
                    {numberSets.map((set, i) => (
                      <motion.div
                        key={set.symbol}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex flex-col items-center justify-center shadow-lg"
                        style={{ backgroundColor: set.bgColor, border: `3px solid ${set.color}` }}
                      >
                        <span className="text-lg sm:text-xl font-bold" style={{ color: set.color }}>{set.symbol}</span>
                        <span className="text-[8px] sm:text-[10px] font-medium" style={{ color: set.color }}>{set.name.split(' ')[0]}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex items-center justify-center gap-2 text-violet-600 mt-4"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm">Click Next to discover each set!</span>
                  </motion.div>
                </div>
              )}

              {/* Steps 1-5: Individual Sets */}
              {step >= 1 && step <= 5 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-lg sm:text-xl"
                      style={{ backgroundColor: numberSets[step - 1].color }}
                    >
                      <span className="text-2xl sm:text-3xl">{numberSets[step - 1].symbol}</span>
                      {numberSets[step - 1].name}
                    </motion.div>
                  </div>

                  <NestedSetVisualization highlightIndex={step - 1} />
                  <ExamplesDisplay setIndex={step - 1} />
                  
                  {/* Relationship indicator */}
                  {step > 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="text-center text-xs sm:text-sm text-muted-foreground"
                    >
                      <span className="font-bold" style={{ color: numberSets[step - 2].color }}>
                        {numberSets[step - 2].symbol}
                      </span>
                      {' ⊂ '}
                      <span className="font-bold" style={{ color: numberSets[step - 1].color }}>
                        {numberSets[step - 1].symbol}
                      </span>
                      <span className="ml-2 opacity-70">
                        ({numberSets[step - 2].name} is a subset of {numberSets[step - 1].name})
                      </span>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 6: Complete Overview */}
              {step === 6 && (
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center text-lg sm:text-xl font-bold text-violet-700 dark:text-violet-400"
                  >
                    Complete Number Set Hierarchy
                  </motion.div>

                  <NestedSetVisualization showAll />

                  {/* Relationship chain */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="text-center mt-4 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl"
                  >
                    <div className="text-xs sm:text-sm font-semibold mb-2 text-muted-foreground">
                      The Complete Subset Chain:
                    </div>
                    <div className="flex items-center justify-center flex-wrap gap-1 text-sm sm:text-base font-bold">
                      {numberSets.map((set, i) => (
                        <React.Fragment key={set.symbol}>
                          <span 
                            className="px-2 py-1 rounded"
                            style={{ backgroundColor: set.bgColor, color: set.color }}
                          >
                            {set.symbol}
                          </span>
                          {i < numberSets.length - 1 && (
                            <span className="text-gray-400">⊂</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mt-2">
                      ℕ ⊂ 𝕎 ⊂ ℤ ⊂ ℚ ⊂ ℝ (Each set contains all sets before it)
                    </div>
                  </motion.div>

                  {/* Key insight */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.4 }}
                    className="bg-gradient-to-r from-violet-100 to-blue-100 dark:from-violet-900/30 dark:to-blue-900/30 p-4 rounded-xl text-center"
                  >
                    <div className="text-sm font-semibold text-violet-700 dark:text-violet-400 mb-1">
                      💡 Key Insight
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      Every natural number is also a whole number, integer, rational, AND real number!
                      <br />
                      For example: <span className="font-bold text-violet-600">5 ∈ ℕ, 𝕎, ℤ, ℚ, ℝ</span>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick reference footer */}
        <div className="mt-4 pt-4 border-t border-violet-200 dark:border-violet-800">
          <div className="flex flex-wrap justify-center gap-2">
            {numberSets.map((set) => (
              <div
                key={set.symbol}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-xs",
                  activeSet === numberSets.indexOf(set) ? "ring-2 ring-offset-1" : "opacity-60"
                )}
                style={{ 
                  backgroundColor: set.bgColor, 
                  color: set.color,
                  ['--tw-ring-color' as string]: set.color
                }}
              >
                <span className="font-bold">{set.symbol}</span>
                <span className="hidden sm:inline">{set.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default NumberSetsAnimation;
