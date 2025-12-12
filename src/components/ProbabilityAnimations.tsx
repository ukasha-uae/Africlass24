"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Dices, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

// ============================================
// 1. COIN TOSS ANIMATION (Two Coins)
// ============================================

export function TwoCoinTossAnimation() {
  const [step, setStep] = useState(0);
  const totalSteps = 4;
  const [autoNarrate, setAutoNarrate] = useState(true);

  const outcomes = [
    { first: 'H', second: 'H', label: 'HH', heads: 2 },
    { first: 'H', second: 'T', label: 'HT', heads: 1 },
    { first: 'T', second: 'H', label: 'TH', heads: 1 },
    { first: 'T', second: 'T', label: 'TT', heads: 0 }
  ];

  const narrationText = [
    "When we toss two coins, we get four possible outcomes. Let's visualize all of them.",
    "First outcome: Both coins show Heads. We write this as HH. That's 2 heads total.",
    "Second and third outcomes: One head and one tail. We can get HT or TH. These are different outcomes! That's 1 head each.",
    "Fourth outcome: Both coins show Tails. We write this as TT. That's zero heads.",
    "Each outcome has an equal probability of one quarter, or 25 percent. The probability of getting exactly one head is 2 out of 4, which equals one half."
  ];

  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis({
    text: narrationText[step] || '',
    autoPlay: autoNarrate
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => setStep(0);

  return (
    <Card className="my-6 overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            🪙 Two Coins Probability
          </h3>
          {isSupported && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (isSpeaking) stop();
                else speak();
              }}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          )}
        </div>

        <div className="min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {step === 0 && (
                <div className="text-center space-y-6">
                  <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    All Possible Outcomes
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {outcomes.map((outcome, idx) => (
                      <div
                        key={idx}
                        className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700"
                      >
                        <div className="text-4xl mb-2">{outcome.first === 'H' ? '🟡' : '⚫'}</div>
                        <div className="text-4xl mb-2">{outcome.second === 'H' ? '🟡' : '⚫'}</div>
                        <div className="font-bold text-lg text-purple-600 dark:text-purple-400">
                          {outcome.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total: 4 equally likely outcomes
                  </div>
                </div>
              )}

              {step >= 1 && step <= 4 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 inline-block shadow-lg">
                      <div className="flex gap-4 items-center justify-center mb-4">
                        <div className="text-6xl">
                          {outcomes[step - 1].first === 'H' ? '🟡' : '⚫'}
                        </div>
                        <div className="text-6xl">
                          {outcomes[step - 1].second === 'H' ? '🟡' : '⚫'}
                        </div>
                      </div>
                      <div className="text-3xl font-bold mb-2">{outcomes[step - 1].label}</div>
                      <div className="text-lg">
                        {outcomes[step - 1].heads} Head{outcomes[step - 1].heads !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <div className="text-center text-lg">
                      <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Probability:
                      </div>
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        P({outcomes[step - 1].label}) = 1/4 = 0.25 = 25%
                      </div>
                    </div>
                  </div>

                  {step === 4 && (
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border-l-4 border-green-500">
                      <div className="font-bold text-green-700 dark:text-green-400 mb-2">
                        💡 Key Insight: "Exactly One Head"
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
                        P(Exactly 1 Head) = P(HT) + P(TH) = 1/4 + 1/4 = <strong>1/2</strong>
                      </div>
                      <div className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                        We ADD because it's an OR situation (HT OR TH)
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            <Button onClick={prevStep} disabled={step === 0} variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={nextStep} disabled={step === totalSteps} variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button onClick={reset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Step {step} of {totalSteps}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// 2. TREE DIAGRAM VISUALIZATION (Balls Without Replacement)
// ============================================

interface TreeDiagramProps {
  scenario?: 'with-replacement' | 'without-replacement';
}

export function TreeDiagramAnimation({ scenario = 'without-replacement' }: TreeDiagramProps) {
  const [step, setStep] = useState(0);
  const totalSteps = 5;
  const [autoNarrate, setAutoNarrate] = useState(true);

  // Scenario: 3 Red, 2 Blue balls
  const withReplacement = scenario === 'with-replacement';

  const narrationText = withReplacement
    ? [
        "Let's draw two balls WITH replacement. We have 3 red and 2 blue balls in a bag, making 5 total.",
        "First draw: Probability of red is 3 out of 5. Probability of blue is 2 out of 5.",
        "After the first draw, we PUT THE BALL BACK. So for the second draw, probabilities stay the same: 3 out of 5 for red, 2 out of 5 for blue.",
        "Let's calculate all four possible outcomes. Red then Red: 3 fifths times 3 fifths equals 9 over 25.",
        "We multiply along each path to get its probability. Notice how all four outcomes add up to exactly 1, which confirms our calculations are correct."
      ]
    : [
        "Let's draw two balls WITHOUT replacement. We have 3 red and 2 blue balls, making 5 total.",
        "First draw: Probability of red is 3 out of 5. Probability of blue is 2 out of 5.",
        "For the second draw, we DON'T put the ball back! If we drew red first, only 2 red balls remain out of 4 total. The probabilities change!",
        "Let's calculate all outcomes. Red then Red: 3 fifths times 2 fourths equals 6 over 20, which simplifies to 3 over 10.",
        "Notice: Without replacement, the second probability DEPENDS on the first result. This makes the events dependent, not independent."
      ];

  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis({
    text: narrationText[step] || '',
    autoPlay: autoNarrate
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => setStep(0);

  // Calculate probabilities based on scenario
  const getSecondProb = (firstColor: string, secondColor: string) => {
    if (withReplacement) {
      return secondColor === 'R' ? '3/5' : '2/5';
    } else {
      if (firstColor === 'R') {
        return secondColor === 'R' ? '2/4' : '2/4';
      } else {
        return secondColor === 'R' ? '3/4' : '1/4';
      }
    }
  };

  const outcomes = [
    {
      path: 'RR',
      calc: withReplacement ? '3/5 × 3/5 = 9/25' : '3/5 × 2/4 = 6/20 = 3/10',
      color: 'from-red-500 to-red-600'
    },
    {
      path: 'RB',
      calc: withReplacement ? '3/5 × 2/5 = 6/25' : '3/5 × 2/4 = 6/20 = 3/10',
      color: 'from-red-500 to-blue-600'
    },
    {
      path: 'BR',
      calc: withReplacement ? '2/5 × 3/5 = 6/25' : '2/5 × 3/4 = 6/20 = 3/10',
      color: 'from-blue-500 to-red-600'
    },
    {
      path: 'BB',
      calc: withReplacement ? '2/5 × 2/5 = 4/25' : '2/5 × 1/4 = 2/20 = 1/10',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  return (
    <Card className="my-6 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              🌳 Tree Diagram
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {withReplacement ? 'With Replacement' : 'Without Replacement'}
            </p>
          </div>
          {isSupported && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (isSpeaking) stop();
                else speak();
              }}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          )}
        </div>

        <div className="min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {step === 0 && (
                <div className="text-center space-y-6">
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg inline-block">
                    <div className="text-lg font-semibold mb-4">Starting Bag</div>
                    <div className="flex gap-2 justify-center">
                      <div className="text-5xl">🔴</div>
                      <div className="text-5xl">🔴</div>
                      <div className="text-5xl">🔴</div>
                      <div className="text-5xl">🔵</div>
                      <div className="text-5xl">🔵</div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      3 Red • 2 Blue • 5 Total
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                    First Draw
                  </div>
                  <div className="flex justify-center gap-8">
                    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6 shadow-lg">
                      <div className="text-5xl mb-2">🔴</div>
                      <div className="font-bold text-2xl">Red</div>
                      <div className="text-lg mt-2">P = 3/5</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                      <div className="text-5xl mb-2">🔵</div>
                      <div className="font-bold text-2xl">Blue</div>
                      <div className="text-lg mt-2">P = 2/5</div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Second Draw
                    <Badge className="ml-2" variant={withReplacement ? 'default' : 'destructive'}>
                      {withReplacement ? 'Ball Replaced' : 'Ball NOT Replaced'}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="text-center font-semibold text-red-600">If 1st was Red:</div>
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Now: {withReplacement ? '3R, 2B (5 total)' : '2R, 2B (4 total)'}
                        </div>
                        <div>P(Red) = {getSecondProb('R', 'R')}</div>
                        <div>P(Blue) = {getSecondProb('R', 'B')}</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-center font-semibold text-blue-600">If 1st was Blue:</div>
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Now: {withReplacement ? '3R, 2B (5 total)' : '3R, 1B (4 total)'}
                        </div>
                        <div>P(Red) = {getSecondProb('B', 'R')}</div>
                        <div>P(Blue) = {getSecondProb('B', 'B')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step >= 3 && (
                <div className="space-y-4">
                  <div className="text-center text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    All Possible Outcomes
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {outcomes.map((outcome, idx) => (
                      <motion.div
                        key={outcome.path}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: step >= 3 && idx <= step - 3 ? 1 : 0.3, scale: 1 }}
                        transition={{ delay: idx * 0.2 }}
                        className={cn(
                          'bg-gradient-to-br text-white rounded-xl p-4 shadow-lg',
                          outcome.color
                        )}
                      >
                        <div className="text-3xl font-bold mb-2">{outcome.path}</div>
                        <div className="text-sm font-mono">{outcome.calc}</div>
                      </motion.div>
                    ))}
                  </div>
                  {step === totalSteps && (
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border-l-4 border-green-500">
                      <div className="font-bold text-green-700 dark:text-green-400 mb-2">
                        ✓ Verification: Do all probabilities add to 1?
                      </div>
                      <div className="text-gray-700 dark:text-gray-300 font-mono">
                        {withReplacement
                          ? '9/25 + 6/25 + 6/25 + 4/25 = 25/25 = 1 ✓'
                          : '3/10 + 3/10 + 3/10 + 1/10 = 10/10 = 1 ✓'}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            <Button onClick={prevStep} disabled={step === 0} variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={nextStep} disabled={step === totalSteps} variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button onClick={reset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Step {step} of {totalSteps}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// 3. PROBABILITY LAWS COMPARISON TABLE
// ============================================

export function ProbabilityLawsTable() {
  const laws = [
    {
      name: 'Addition Law',
      symbol: 'OR',
      formula: 'P(A or B)',
      mutuallyExclusive: 'P(A) + P(B)',
      nonMutuallyExclusive: 'P(A) + P(B) - P(A and B)',
      example: 'Rolling 2 OR 5 on die',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Multiplication Law',
      symbol: 'AND',
      formula: 'P(A and B)',
      mutuallyExclusive: 'P(A) × P(B)',
      nonMutuallyExclusive: 'Use tree diagram',
      example: 'Heads AND rolling 6',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  return (
    <Card className="my-6 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          📋 Probability Laws Quick Reference
        </h3>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <th className="px-6 py-4 text-left font-bold">Law</th>
                <th className="px-6 py-4 text-center font-bold">Symbol</th>
                <th className="px-6 py-4 text-center font-bold">Independent</th>
                <th className="px-6 py-4 text-center font-bold">Dependent</th>
                <th className="px-6 py-4 text-left font-bold">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {laws.map((law, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-lg">{law.name}</td>
                  <td className="px-6 py-4 text-center">
                    <code className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {law.symbol}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="block px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded font-mono text-sm">
                      {law.mutuallyExclusive}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="block px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded font-mono text-sm">
                      {law.nonMutuallyExclusive}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-sm">{law.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {laws.map((law, idx) => (
            <div
              key={idx}
              className={cn(
                'rounded-xl shadow-lg overflow-hidden transform transition-all',
                'bg-white dark:bg-slate-800'
              )}
            >
              <div className={cn('bg-gradient-to-r text-white p-4', law.color)}>
                <div className="text-2xl font-bold mb-1">{law.name}</div>
                <code className="text-4xl font-bold">{law.symbol}</code>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                    Independent / Mutually Exclusive
                  </div>
                  <code className="block px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded font-mono text-sm">
                    {law.mutuallyExclusive}
                  </code>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                    Dependent / Overlapping
                  </div>
                  <code className="block px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded font-mono text-sm">
                    {law.nonMutuallyExclusive}
                  </code>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                    Example
                  </div>
                  <div className="text-sm">{law.example}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tip */}
        <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg border-l-4 border-purple-500">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-bold text-purple-600 dark:text-purple-400">💡 Memory Trick:</span> 
            OR means ADD, AND means MULTIPLY. For overlapping events, subtract the overlap!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// 4. VENN DIAGRAM - MUTUALLY EXCLUSIVE VS OVERLAPPING
// ============================================

export function MutuallyExclusiveVennDiagram() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [autoNarrate, setAutoNarrate] = useState(true);

  const examples = [
    {
      title: 'Mutually Exclusive',
      eventA: 'Passing Math',
      eventB: 'Failing Math',
      overlapping: false,
      explanation: 'You cannot pass AND fail at the same time. These are mutually exclusive events.',
      formula: 'P(Pass OR Fail) = P(Pass) + P(Fail)',
      colorA: 'rgb(59, 130, 246)', // blue
      colorB: 'rgb(239, 68, 68)', // red
      narration: 'In this example, passing math and failing math are mutually exclusive. You cannot both pass and fail the same exam. The circles do not overlap because there is no scenario where both events happen together.',
      icon: '✅'
    },
    {
      title: 'Non-Mutually Exclusive',
      eventA: 'Passing Math',
      eventB: 'Passing Science',
      overlapping: true,
      explanation: 'You CAN pass both! The overlap represents students who pass BOTH subjects.',
      formula: 'P(Pass Math OR Science) = P(Math) + P(Science) - P(Both)',
      colorA: 'rgb(59, 130, 246)', // blue
      colorB: 'rgb(34, 197, 94)', // green
      narration: 'Here, passing math and passing science can both happen. The overlapping region shows students who pass both subjects. We must subtract this overlap when using the addition law, or we would count these students twice.',
      icon: '❌'
    },
    {
      title: 'Mutually Exclusive',
      eventA: 'Turn Left',
      eventB: 'Turn Right',
      overlapping: false,
      explanation: 'At a junction, you can only turn one direction. These events cannot happen simultaneously.',
      formula: 'P(Left OR Right) = P(Left) + P(Right)',
      colorA: 'rgb(139, 92, 246)', // purple
      colorB: 'rgb(236, 72, 153)', // pink
      narration: 'Turning left and turning right at a junction are mutually exclusive. You can only choose one direction. The separate circles show that these events never occur together.',
      icon: '✅'
    },
    {
      title: 'Non-Mutually Exclusive',
      eventA: "It's Raining",
      eventB: "It's Monday",
      overlapping: true,
      explanation: 'It can rain on a Monday! The overlap represents rainy Mondays.',
      formula: 'P(Rain OR Monday) = P(Rain) + P(Monday) - P(Rain AND Monday)',
      colorA: 'rgb(14, 165, 233)', // sky blue
      colorB: 'rgb(251, 146, 60)', // orange
      narration: "Rain and Monday are not mutually exclusive. It can definitely rain on a Monday. The overlap represents the scenario where both conditions are true - it's raining AND it's Monday.",
      icon: '❌'
    }
  ];

  const current = examples[selectedExample];

  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis({
    text: current.narration,
    autoPlay: autoNarrate
  });

  return (
    <Card className="my-6 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            ⭕ Venn Diagram Visualization
          </h3>
          {isSupported && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (isSpeaking) stop();
                else speak();
              }}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Example Selector */}
        <div className="mb-6 flex flex-wrap gap-2">
          {examples.map((ex, idx) => (
            <Button
              key={idx}
              onClick={() => setSelectedExample(idx)}
              variant={selectedExample === idx ? 'default' : 'outline'}
              size="sm"
              className="text-xs"
            >
              {ex.icon} {ex.title}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedExample}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Title and Badge */}
            <div className="text-center mb-6">
              <div className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {current.title}
              </div>
              <Badge variant={current.overlapping ? 'destructive' : 'default'}>
                {current.overlapping ? 'Can happen together' : 'Cannot happen together'}
              </Badge>
            </div>

            {/* Venn Diagram */}
            <div className="flex justify-center items-center min-h-[300px] mb-6">
              <svg width="400" height="250" viewBox="0 0 400 250" className="max-w-full">
                {/* Rectangle boundary (sample space) */}
                <rect
                  x="20"
                  y="20"
                  width="360"
                  height="210"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-400 dark:text-gray-600"
                  strokeDasharray="5,5"
                />
                <text
                  x="30"
                  y="40"
                  className="text-xs fill-gray-500 dark:fill-gray-400"
                  fontSize="12"
                >
                  Sample Space
                </text>

                {/* Circle A */}
                <circle
                  cx={current.overlapping ? '150' : '130'}
                  cy="125"
                  r="70"
                  fill={current.colorA}
                  fillOpacity="0.5"
                  stroke={current.colorA}
                  strokeWidth="3"
                />
                <text
                  x={current.overlapping ? '120' : '130'}
                  y="125"
                  textAnchor="middle"
                  className="font-bold fill-white dark:fill-white text-sm"
                  fontSize="14"
                >
                  {current.eventA.split(' ').map((word, i) => (
                    <tspan key={i} x={current.overlapping ? '120' : '130'} dy={i === 0 ? 0 : 18}>
                      {word}
                    </tspan>
                  ))}
                </text>

                {/* Circle B */}
                <circle
                  cx={current.overlapping ? '250' : '270'}
                  cy="125"
                  r="70"
                  fill={current.colorB}
                  fillOpacity="0.5"
                  stroke={current.colorB}
                  strokeWidth="3"
                />
                <text
                  x={current.overlapping ? '280' : '270'}
                  y="125"
                  textAnchor="middle"
                  className="font-bold fill-white dark:fill-white text-sm"
                  fontSize="14"
                >
                  {current.eventB.split(' ').map((word, i) => (
                    <tspan key={i} x={current.overlapping ? '280' : '270'} dy={i === 0 ? 0 : 18}>
                      {word}
                    </tspan>
                  ))}
                </text>

                {/* Overlap label (if overlapping) */}
                {current.overlapping && (
                  <>
                    <text
                      x="200"
                      y="125"
                      textAnchor="middle"
                      className="font-bold fill-white text-xs"
                      fontSize="12"
                    >
                      BOTH
                    </text>
                    <text
                      x="200"
                      y="140"
                      textAnchor="middle"
                      className="font-bold fill-white text-xs"
                      fontSize="10"
                    >
                      (Overlap)
                    </text>
                  </>
                )}
              </svg>
            </div>

            {/* Explanation */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg space-y-4">
              <div>
                <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  📝 Explanation:
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {current.explanation}
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  🧮 Formula:
                </div>
                <code className="block px-4 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg font-mono text-sm">
                  {current.formula}
                </code>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick Check */}
        <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border-l-4 border-green-500">
          <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
            🎯 Quick Check: Are these mutually exclusive?
          </p>
          <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <div>1. ✅ Passing Math <strong>OR</strong> Failing Math</div>
            <div>2. ❌ Passing Math <strong>OR</strong> Passing Science (can pass both!)</div>
            <div>3. ✅ Turning left <strong>OR</strong> turning right at a junction</div>
            <div>4. ❌ It's raining <strong>OR</strong> it's Monday (can rain on Monday!)</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
