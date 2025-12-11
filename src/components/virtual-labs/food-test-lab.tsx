
'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { CheckCircle, XCircle, RefreshCw, BookOpen, Shield, Flame, TestTube, Utensils, Egg, Milk, Leaf } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { cn } from '@/lib/utils';
import { TextToSpeech } from '../text-to-speech';

// --- Type Definitions ---
type FoodType = 'Bread' | 'Egg White' | 'Milk' | 'Groundnut Paste';
type ReagentType = 'Iodine Solution' | "Benedict's Solution" | 'Biuret Solution' | 'Ethanol';
type Result = {
    colorClass: string;
    text: string;
};

// --- Data ---
const foodOptions: FoodType[] = ['Bread', 'Egg White', 'Milk', 'Groundnut Paste'];
const reagentOptions: ReagentType[] = ['Iodine Solution', "Benedict's Solution", 'Biuret Solution', 'Ethanol'];
const foodIcons: Record<FoodType, React.ElementType> = {
    'Bread': Utensils,
    'Egg White': Egg,
    'Milk': Milk,
    'Groundnut Paste': Leaf,
};

const resultsMap: Record<FoodType, Partial<Record<ReagentType, Result>>> = {
    'Bread': {
        'Iodine Solution': { colorClass: 'bg-indigo-900', text: 'Blue-black color. Starch is present.' },
        "Benedict's Solution": { colorClass: 'bg-orange-500', text: 'Brick-red precipitate. Reducing sugar is present.' },
    },
    'Egg White': {
        'Biuret Solution': { colorClass: 'bg-purple-500', text: 'Purple/Violet color. Protein is present.' },
    },
    'Milk': {
        "Benedict's Solution": { colorClass: 'bg-orange-400', text: 'Orange precipitate. Reducing sugar is present.' },
        'Biuret Solution': { colorClass: 'bg-purple-400', text: 'Violet color. Protein is present.' },
        'Ethanol': { colorClass: 'bg-white/80 backdrop-blur-sm', text: 'Cloudy white emulsion. Fats/Oils are present.' },
    },
    'Groundnut Paste': {
        'Ethanol': { colorClass: 'bg-white/90 backdrop-blur-sm', text: 'Cloudy white emulsion. Fats/Oils are present.' },
        'Biuret Solution': { colorClass: 'bg-purple-400', text: 'Light violet color. Protein is present.' },
    }
};

const defaultResult: Result = { colorClass: 'bg-blue-200/50', text: 'No significant reaction.' };

// --- Component for Rendering Highlighted Text ---
const HighlightedText = ({ text, sectionId, highlightedSentenceIndex }: {
  text: string;
  sectionId: string;
  highlightedSentenceIndex: number | null;
}) => {
  const sentences = React.useMemo(() => {
    if (!text) return [];
    // A more robust regex to handle various sentence-ending punctuation and spacing.
    const matches = text.match(/[^.!?]+[.!?]+(\s|$)/g);
    return matches ? matches.filter(s => s.trim().length > 0) : [text];
  }, [text]);

  if (highlightedSentenceIndex === null || sectionId === null) {
    return <>{text}</>;
  }

  return (
    <>
      {sentences.map((sentence, index) => (
        <span
          key={index}
          className={cn(
            "transition-colors duration-200",
            index === highlightedSentenceIndex && "bg-yellow-200 dark:bg-yellow-800/50 rounded"
          )}
        >
          {sentence}
        </span>
      ))}
    </>
  );
};


export function FoodTestLab() {
    const { toast } = useToast();
    const [selectedFood, setSelectedFood] = React.useState<FoodType | null>(null);
    const [selectedReagent, setSelectedReagent] = React.useState<ReagentType | null>(null);
    const [isSimulating, setIsSimulating] = React.useState(false);
    const [result, setResult] = React.useState<Result | null>(null);
    const [highlightInfo, setHighlightInfo] = React.useState<{ section: string; sentenceIndex: number } | null>(null);

    // Quiz State
    const [quizAnswer, setQuizAnswer] = React.useState<string | undefined>();
    const [quizFeedback, setQuizFeedback] = React.useState<string | null>(null);
    const [quizAttempts, setQuizAttempts] = React.useState(0);
    const [quizIsCorrect, setQuizIsCorrect] = React.useState<boolean | null>(null);

    const handleStartTest = () => {
        if (!selectedFood || !selectedReagent) {
            toast({ title: 'Setup Incomplete', description: 'Please select both a food and a reagent.', variant: 'destructive' });
            return;
        }

        setIsSimulating(true);
        setResult(null);
        const needsHeat = selectedReagent === "Benedict's Solution";
        toast({ title: 'Test Started...', description: `Testing ${selectedFood} with ${selectedReagent}.${needsHeat ? ' Heat is being applied.' : ''}` });

        setTimeout(() => {
            const outcome = resultsMap[selectedFood]?.[selectedReagent] || defaultResult;
            setResult(outcome);
            setIsSimulating(false);
            toast({ title: 'Test Complete!', description: outcome.text });
        }, 2000);
    };

    const handleReset = () => {
        setSelectedFood(null);
        setSelectedReagent(null);
        setIsSimulating(false);
        setResult(null);
        setQuizAnswer(undefined);
        setQuizFeedback(null);
        setQuizAttempts(0);
        setQuizIsCorrect(null);
        toast({ title: 'Lab Reset', description: 'Ready for a new experiment.' });
    };

    const handleQuizSubmit = () => {
        if (quizIsCorrect !== null) return;
        const isCorrect = quizAnswer === 'Biuret Solution';
        const newAttempts = quizAttempts + 1;
        setQuizAttempts(newAttempts);
        if (isCorrect) {
            setQuizIsCorrect(true);
            setQuizFeedback("Correct! Biuret solution is used to test for proteins. ✅");
        } else {
            if (newAttempts === 1) {
                setQuizFeedback("Not quite. Think about which reagent reacts with protein bonds. Try again! 🔄");
            } else {
                setQuizIsCorrect(false);
                setQuizFeedback("Incorrect. The correct answer is Biuret Solution. 🧠");
            }
        }
    };
    
    const handleGenerateReport = () => {
        if (!selectedFood || !selectedReagent || !result) {
            toast({ title: "Experiment Not Run", description: "Please complete a test to generate a report.", variant: "destructive" });
            return;
        }
         toast({
            title: 'Lab Report Generated (Simulation)',
            description: `Test: ${selectedReagent} on ${selectedFood}. Result: ${result.text}`,
        });
    };

    const FoodIcon = selectedFood ? foodIcons[selectedFood] : Utensils;
    
    const objectiveText = "To learn how to use chemical reagents to test for the presence of carbohydrates (starch and reducing sugars), proteins, and fats in various food samples.";
    const theoryText = "Different foods are made of different nutrients. We can use specific chemical tests to find out which nutrients are present. Iodine Solution tests for starch, turning blue-black if present. Benedict's Solution tests for reducing sugars like glucose and requires heating, changing color from blue to brick-red. Biuret Solution tests for proteins, turning from blue to purple. The Ethanol Emulsion Test is used for fats and oils, forming a cloudy white emulsion.";
    const safetyText = "In a real lab, always wear safety goggles. Handle chemical reagents with care. Biuret and Benedict's solutions can be irritants. Be cautious when using a heat source for the Benedict's test.";


    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Objective</CardTitle>
                        <TextToSpeech 
                            textToSpeak={objectiveText}
                            onSentenceChange={(i) => setHighlightInfo({ section: 'objective', sentenceIndex: i })}
                            onStart={() => setHighlightInfo({ section: 'objective', sentenceIndex: 0 })}
                            onEnd={() => setHighlightInfo(null)}
                        />
                    </div>
                    <CardDescription>
                        <HighlightedText text={objectiveText} sectionId="objective" highlightedSentenceIndex={highlightInfo?.section === 'objective' ? highlightInfo.sentenceIndex : null} />
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Lab Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2"><BookOpen className="h-4 w-4" /><span>Background Theory</span></div>
                            </AccordionTrigger>
                            <AccordionContent className="prose prose-sm dark:prose-invert text-muted-foreground flex items-start gap-2">
                                <div className="flex-grow">
                                    <p><HighlightedText text={theoryText} sectionId="theory" highlightedSentenceIndex={highlightInfo?.section === 'theory' ? highlightInfo.sentenceIndex : null} /></p>
                                </div>
                                <TextToSpeech 
                                    textToSpeak={theoryText}
                                    onSentenceChange={(i) => setHighlightInfo({ section: 'theory', sentenceIndex: i })}
                                    onStart={() => setHighlightInfo({ section: 'theory', sentenceIndex: 0 })}
                                    onEnd={() => setHighlightInfo(null)}
                                    className="flex-shrink-0"
                                />
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2"><Shield className="h-4 w-4" /><span>Safety Precautions</span></div>
                            </AccordionTrigger>
                             <AccordionContent className="prose prose-sm dark:prose-invert text-muted-foreground flex items-start gap-2">
                                <div className="flex-grow">
                                    <p><HighlightedText text={safetyText} sectionId="safety" highlightedSentenceIndex={highlightInfo?.section === 'safety' ? highlightInfo.sentenceIndex : null} /></p>
                                </div>
                                <TextToSpeech 
                                    textToSpeak={safetyText}
                                    onSentenceChange={(i) => setHighlightInfo({ section: 'safety', sentenceIndex: i })}
                                    onStart={() => setHighlightInfo({ section: 'safety', sentenceIndex: 0 })}
                                    onEnd={() => setHighlightInfo(null)}
                                    className="flex-shrink-0"
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Food Test Simulation</CardTitle>
                    <CardDescription>Select a food sample and a reagent, then start the test to observe the result.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Controls */}
                    <div className="space-y-4">
                        <div>
                            <Label className="font-semibold">1. Select Food Sample</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {foodOptions.map(food => <Button key={food} variant={selectedFood === food ? 'default' : 'outline'} onClick={() => setSelectedFood(food)}>{food}</Button>)}
                            </div>
                        </div>
                         <div>
                            <Label className="font-semibold">2. Select Reagent</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {reagentOptions.map(reagent => <Button key={reagent} variant={selectedReagent === reagent ? 'default' : 'outline'} onClick={() => setSelectedReagent(reagent)}>{reagent}</Button>)}
                            </div>
                        </div>
                    </div>
                    
                    {/* Simulation Viewer */}
                    <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg min-h-[250px] space-y-4">
                        <div className="relative h-32 w-24">
                            <TestTube className="h-full w-full text-gray-400" />
                            <div className={cn("absolute inset-x-2 bottom-2 top-8 rounded-b-lg transition-colors duration-1000", result ? result.colorClass : 'bg-transparent')} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                {selectedFood && <FoodIcon className="h-8 w-8 text-black/20 dark:text-white/20" />}
                            </div>
                        </div>
                        {selectedReagent === "Benedict's Solution" && isSimulating && <Flame className="h-8 w-8 text-red-500 animate-pulse" />}
                        <div className="h-8 text-center">
                            {result && <p className="font-semibold text-primary">{result.text}</p>}
                            {isSimulating && <p className="text-muted-foreground animate-pulse">Testing...</p>}
                        </div>
                    </div>
                </CardContent>
                 <CardFooter className="flex flex-col items-center gap-2">
                    <div className="flex w-full gap-4">
                        <Button onClick={handleStartTest} disabled={!selectedFood || !selectedReagent || isSimulating} className="w-full">
                            {isSimulating ? 'Testing...' : 'Start Test'}
                        </Button>
                        <Button variant="outline" onClick={handleReset} className="w-full">Reset</Button>
                    </div>
                     {selectedReagent === "Benedict's Solution" && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                           <Flame className="h-4 w-4 text-orange-500" />
                           <span>Heat is required for Benedict’s solution to work.</span>
                        </div>
                    )}
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Post-Lab Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-2 font-medium">Which reagent is used to test for the presence of protein?</p>
                    <RadioGroup value={quizAnswer} onValueChange={(v) => {setQuizAnswer(v); setQuizIsCorrect(null); setQuizAttempts(0); setQuizFeedback(null);}} disabled={quizIsCorrect !== null}>
                        <div className="flex items-center space-x-2 py-1"><RadioGroupItem value="Iodine Solution" id="q-iodine" /><Label htmlFor="q-iodine">Iodine Solution</Label></div>
                        <div className="flex items-center space-x-2 py-1"><RadioGroupItem value="Biuret Solution" id="q-biuret" /><Label htmlFor="q-biuret">Biuret Solution</Label></div>
                        <div className="flex items-center space-x-2 py-1"><RadioGroupItem value="Ethanol" id="q-ethanol" /><Label htmlFor="q-ethanol">Ethanol</Label></div>
                    </RadioGroup>
                     {quizFeedback && <p className={cn("mt-3 text-sm flex items-center gap-2 p-2 rounded-md", quizIsCorrect ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100", quizIsCorrect === null && "text-blue-700 bg-blue-100")}>{quizIsCorrect ? <CheckCircle /> : !quizIsCorrect && quizAttempts > 1 ? <XCircle /> : <RefreshCw className="animate-spin" />}{quizFeedback}</p>}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleQuizSubmit} disabled={!quizAnswer || quizIsCorrect !== null} size="sm">
                        {quizIsCorrect === true ? "Correct!" : quizIsCorrect === false ? "Answer Shown" : quizAttempts === 1 && quizIsCorrect === null ? "Try Again" : "Check Answer"}
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader><CardTitle>Lab Report</CardTitle></CardHeader>
                <CardFooter><Button variant="secondary" onClick={handleGenerateReport}>Generate Report</Button></CardFooter>
            </Card>
        </div>
    );
}
