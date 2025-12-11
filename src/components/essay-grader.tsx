
'use client';

import * as React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ListChecks, Brain, PenLine, BookCheck } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface EssayGraderProps {
  question: string;
  gradingRubric?: string;
  modelAnswer?: string;
  formatTips?: string[];
  outline?: string[];
  vocabSuggestions?: string[];
  placeholder?: string; // New prop for custom placeholder text
}

export function EssayGrader({ question, gradingRubric, modelAnswer, formatTips, outline, vocabSuggestions, placeholder }: EssayGraderProps) {
  const [studentAnswer, setStudentAnswer] = React.useState('');
  const [showSolution, setShowSolution] = React.useState(false);

  const handleReset = () => {
    setStudentAnswer('');
    setShowSolution(false);
  };
  
  const renderList = (items: string[]) => (
    <ul className="list-disc pl-5 space-y-1">
        {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
  
  const hasPlanningGuide = formatTips || outline || vocabSuggestions;

  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{question}</CardTitle>
        {hasPlanningGuide && (
          <CardDescription>Use the planning guide below to help structure your answer.</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        
        {hasPlanningGuide && (
            <Accordion type="single" collapsible className="w-full">
                {formatTips && (
                    <AccordionItem value="item-1">
                        <AccordionTrigger><div className="flex items-center gap-2"><ListChecks className="h-4 w-4"/><span>Step 1: Review Format/Structure</span></div></AccordionTrigger>
                        <AccordionContent className="prose prose-sm dark:prose-invert text-muted-foreground">
                            {renderList(formatTips)}
                        </AccordionContent>
                    </AccordionItem>
                )}
                {outline && (
                    <AccordionItem value="item-2">
                        <AccordionTrigger><div className="flex items-center gap-2"><Brain className="h-4 w-4"/><span>Step 2: Plan Your Outline</span></div></AccordionTrigger>
                        <AccordionContent className="prose prose-sm dark:prose-invert text-muted-foreground">
                            {renderList(outline)}
                        </AccordionContent>
                    </AccordionItem>
                )}
                {vocabSuggestions && (
                    <AccordionItem value="item-3">
                        <AccordionTrigger><div className="flex items-center gap-2"><PenLine className="h-4 w-4"/><span>Step 3: Consider Vocabulary</span></div></AccordionTrigger>
                        <AccordionContent className="prose prose-sm dark:prose-invert text-muted-foreground">
                            {renderList(vocabSuggestions)}
                        </AccordionContent>
                    </AccordionItem>
                )}
            </Accordion>
        )}

        <div className="pt-4">
          <Label htmlFor={`essay-answer-${question.substring(0, 10)}`} className="font-semibold">{hasPlanningGuide ? 'Step 4: ' : ''}Write Your Answer</Label>
          <Textarea
            id={`essay-answer-${question.substring(0, 10)}`}
            placeholder={placeholder || "Type your answer here..."}
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            rows={10}
            className="mt-2"
          />
        </div>

      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
         <Button onClick={() => setShowSolution(true)} disabled={!studentAnswer || showSolution}>
            Compare with Model Answer
        </Button>
        {showSolution && modelAnswer && (
             <div className="w-full space-y-4 border-t pt-4">
                {gradingRubric && (
                    <div className="p-4 border rounded-lg bg-muted/50">
                        <h4 className="font-semibold text-base mb-2 flex items-center gap-2"><ListChecks className="h-4 w-4"/>Grading Rubric / Key Points</h4>
                        <div className="prose prose-sm dark:prose-invert text-muted-foreground">
                            <p>{gradingRubric}</p>
                        </div>
                    </div>
                )}
                 <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <h4 className="font-semibold text-base mb-2 flex items-center gap-2"><BookCheck className="h-4 w-4"/>Model Answer Outline</h4>
                    <div className="prose prose-sm dark:prose-invert text-foreground">
                         <p>{modelAnswer}</p>
                    </div>
                </div>
                <Button onClick={handleReset} variant="outline" size="sm">Reset</Button>
            </div>
        )}
      </CardFooter>
    </Card>
  );
}
