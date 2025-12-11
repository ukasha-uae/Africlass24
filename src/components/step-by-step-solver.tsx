
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, CheckCircle, RefreshCw } from 'lucide-react';
import { Progress } from './ui/progress';

interface Step {
  title: string;
  explanation: React.ReactNode;
}

interface StepByStepSolverProps {
  problemTitle: string;
  problemDescription: React.ReactNode;
  steps: Step[];
  finalAnswer: React.ReactNode;
}

export function StepByStepSolver({ problemTitle, problemDescription, steps, finalAnswer }: StepByStepSolverProps) {
  const [currentStep, setCurrentStep] = React.useState(0); // 0 is the problem, 1 is the first step, etc.
  const totalSteps = steps.length;

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };
  
  const handleReset = () => {
    setCurrentStep(0);
  }

  const progressPercentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <Card className="shadow-lg bg-muted/20">
      <CardHeader>
        <CardTitle className="text-lg">{problemTitle}</CardTitle>
        <CardDescription>{problemDescription}</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[150px] p-4 bg-background rounded-md flex flex-col justify-center">
        {currentStep === 0 && (
          <div className="text-center text-muted-foreground italic">
            <p>Ready to solve? Click "Show First Step" to begin.</p>
          </div>
        )}
        {currentStep > 0 && currentStep <= totalSteps && (
          <div className="space-y-2">
            <h4 className="font-semibold text-primary">{steps[currentStep - 1].title}</h4>
            <div className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none">
              {steps[currentStep - 1].explanation}
            </div>
          </div>
        )}
        {currentStep > totalSteps && ( // This state is not reachable with current logic, but good for future
            <div className="text-center text-green-600 font-bold flex items-center justify-center gap-2">
                <CheckCircle />
                <p>Solution Complete!</p>
            </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4 p-4">
        <div className="w-full">
            <Progress value={progressPercentage} className="h-2"/>
            <p className="text-xs text-muted-foreground text-center mt-1">Step {currentStep} of {totalSteps}</p>
        </div>
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentStep === 0}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          {currentStep < totalSteps ? (
             <Button size="sm" onClick={handleNext}>
                {currentStep === 0 ? 'Show First Step' : 'Next Step'} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button size="sm" onClick={handleReset} variant="secondary">
                <RefreshCw className="mr-1 h-4 w-4"/> Reset
            </Button>
          )}
        </div>
        {currentStep === totalSteps && (
            <Card className="w-full bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800">
                <CardHeader className="p-3">
                    <CardTitle className="text-base text-green-700 dark:text-green-300">Final Answer</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 prose prose-sm dark:prose-invert text-green-800 dark:text-green-200">
                    {finalAnswer}
                </CardContent>
            </Card>
        )}
      </CardFooter>
    </Card>
  );
}
