
'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { CheckCircle, XCircle, RefreshCw, BookOpen, Shield, Flame, Move, Atom } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { TextToSpeech } from '../text-to-speech';

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


// --- Type Definitions ---
type MetalSalt = 'Sodium Chloride' | 'Potassium Chloride' | 'Lithium Chloride' | 'Calcium Chloride' | 'Copper (II) Sulfate';
interface SaltInfo {
    colorName: string;
    colorClass: string; // Tailwind CSS class for the flame
    ion: string;
}

// --- Data ---
const salts: Record<MetalSalt, SaltInfo> = {
    'Sodium Chloride': { colorName: 'Intense Yellow', colorClass: 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,1)]', ion: 'Na⁺' },
    'Potassium Chloride': { colorName: 'Lilac (Pale Purple)', colorClass: 'text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,1)]', ion: 'K⁺' },
    'Lithium Chloride': { colorName: 'Bright Red', colorClass: 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,1)]', ion: 'Li⁺' },
    'Calcium Chloride': { colorName: 'Orange-Red', colorClass: 'text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,1)]', ion: 'Ca²⁺' },
    'Copper (II) Sulfate': { colorName: 'Blue-Green', colorClass: 'text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,1)]', ion: 'Cu²⁺' },
};

// --- Visual Components ---
const BunsenBurnerIcon = ({ flameColorClass }: { flameColorClass: string }) => (
    <div className="relative w-24 h-48 flex flex-col items-center">
        {/* Flame */}
        <div className="absolute top-0 w-16 h-24">
            <svg viewBox="0 0 100 150" className="w-full h-full">
                <path d="M 50 150 C 10 100, 10 50, 50 0 C 90 50, 90 100, 50 150" className={cn("fill-current transition-colors duration-500", flameColorClass)} />
            </svg>
        </div>
        {/* Burner */}
        <div className="absolute bottom-0 h-24 w-12">
             <svg width="100%" height="100%" viewBox="0 0 32 32">
                <rect x="10" y="8" width="12" height="16" className="fill-gray-400 dark:fill-gray-600" />
                <rect x="8" y="24" width="16" height="8" className="fill-gray-500 dark:fill-gray-400" />
            </svg>
        </div>
    </div>
);

const WireLoopIcon = ({ isLoaded, saltName }: { isLoaded: boolean, saltName: MetalSalt | null }) => (
    <div className="flex flex-col items-center gap-1">
        <div className="relative w-12 h-20">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gray-400" />
            <div className={cn(
                "absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-gray-400",
                isLoaded && "bg-gray-100"
            )} />
        </div>
        <span className="text-xs h-4">{isLoaded ? saltName : 'Clean Loop'}</span>
    </div>
);


export function FlameTestLab() {
    const { toast } = useToast();
    const isMobile = useIsMobile();
    const [loadedSample, setLoadedSample] = React.useState<MetalSalt | null>(null);
    const [currentFlame, setCurrentFlame] = React.useState<SaltInfo | null>(null);
    const [isSimulating, setIsSimulating] = React.useState(false);
    const [testHistory, setTestHistory] = React.useState<Record<string, SaltInfo>>({});

    // Highlight state
    const [highlightInfo, setHighlightInfo] = React.useState<{ section: string; sentenceIndex: number } | null>(null);

    // Quiz State
    const [quizAnswer, setQuizAnswer] = React.useState<string | undefined>();
    const [quizFeedback, setQuizFeedback] = React.useState<string | null>(null);
    const [quizAttempts, setQuizAttempts] = React.useState(0);
    const [quizIsCorrect, setQuizIsCorrect] = React.useState<boolean | null>(null);

    const handleLoadSample = (sample: MetalSalt) => {
        setLoadedSample(sample);
        setCurrentFlame(null); // Reset flame when a new sample is picked
        toast({ title: 'Sample Picked Up', description: `${sample} on the loop.` });
    };
    
    const handleTestInFlame = () => {
        if (!loadedSample) {
            toast({ title: "No Sample!", description: "Please pick up a salt sample first.", variant: "destructive" });
            return;
        }
        
        setIsSimulating(true);
        const saltInfo = salts[loadedSample];
        setCurrentFlame(saltInfo);
        
        // Record the result of this test
        setTestHistory(prevHistory => ({
            ...prevHistory,
            [loadedSample]: saltInfo,
        }));

        setTimeout(() => {
            setIsSimulating(false);
            // The flame color persists until another sample is loaded
        }, 2000);
    };

    const handleReset = () => {
        setLoadedSample(null);
        setCurrentFlame(null);
        setIsSimulating(false);
        setTestHistory({}); // Reset the history
        setQuizAnswer(undefined);
        setQuizFeedback(null);
        setQuizAttempts(0);
        setQuizIsCorrect(null);
        setHighlightInfo(null);
        toast({ title: 'Lab Reset' });
    };

    const handleQuizSubmit = () => {
        if (quizIsCorrect !== null) return;
        const isCorrect = quizAnswer === 'Electrons moving between energy levels';
        const newAttempts = quizAttempts + 1;
        setQuizAttempts(newAttempts);
        if (isCorrect) {
            setQuizIsCorrect(true);
            setQuizFeedback("Correct! Electrons get excited by heat and emit light as they return to their original energy level. ✅");
        } else {
            if (newAttempts === 1) {
                setQuizFeedback("Not quite right. Think about what happens inside an atom when it's heated. Try again! 🔄");
            } else {
                setQuizIsCorrect(false);
                setQuizFeedback("Incorrect. The colors are produced by electrons moving between energy levels. 🧠");
            }
        }
    };
    
     const handleQuizChange = (value: string) => {
        setQuizAnswer(value);
        if (quizIsCorrect !== null || (quizAttempts > 0 && quizIsCorrect === null)) {
            if (!(quizAttempts === 1 && quizIsCorrect === null)) {
                setQuizAttempts(0);
                setQuizIsCorrect(null);
                setQuizFeedback(null);
            }
        }
    };
    
    const handleGenerateReport = () => {
        const testedItems = Object.keys(testHistory);

        if (testedItems.length === 0) {
            toast({
                title: "No Data to Report",
                description: "Please test at least one salt sample before generating a report.",
                variant: "destructive",
            });
            return;
        }

        const reportDescription = testedItems.map(salt => {
            const saltInfo = testHistory[salt as MetalSalt];
            return `${salt} produced a ${saltInfo.colorName.toLowerCase()} flame.`;
        }).join(' ');

        toast({
            title: 'Lab Report Generated (Simulation)',
            description: `You tested the following: ${reportDescription} Your final quiz result was: ${quizIsCorrect ? 'Correct' : 'Incorrect or not attempted'}.`,
        });
    };

    // Define texts for TTS and display
    const objectiveText = "To identify different metal ions by observing the unique colors they produce when heated in a flame.";
    const theoryText = "The flame test is an analytical procedure used in chemistry to detect the presence of certain elements, primarily metal ions, based on each element's characteristic emission spectrum. When a sample is heated, its electrons jump to higher energy levels. As they fall back to their original levels, they emit light of a specific color, which is unique to that element.";
    const safetyText = "In a real lab, it is crucial to follow safety protocols. Always wear safety goggles and tie back long hair when working with an open flame. Handle the Bunsen burner and hot wire loop with extreme care, and be aware of the chemicals used and their specific hazards.";


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
                <CardHeader><CardTitle>Lab Information</CardTitle></CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="theory">
                            <AccordionTrigger><BookOpen className="h-4 w-4 mr-2"/>Background Theory</AccordionTrigger>
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
                        <AccordionItem value="safety">
                            <AccordionTrigger><Shield className="h-4 w-4 mr-2"/>Safety Precautions</AccordionTrigger>
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
                    <CardTitle>Flame Test Simulation</CardTitle>
                    <CardDescription>1. Click a salt to load the loop. 2. Click the flame to test.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label>1. Select Metal Salt Sample:</Label>
                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-2">
                            {Object.keys(salts).map(salt => (
                                <Button key={salt} variant={loadedSample === salt ? 'default' : 'outline'} onClick={() => handleLoadSample(salt as MetalSalt)}>
                                    {salt}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-around min-h-[250px] p-4 bg-muted/30 rounded-lg">
                        <div className="text-center">
                            <WireLoopIcon isLoaded={!!loadedSample} saltName={loadedSample} />
                        </div>
                        <div className="text-center">
                            <BunsenBurnerIcon flameColorClass={currentFlame ? currentFlame.colorClass : 'text-blue-500'} />
                        </div>
                    </div>
                     {currentFlame && !isSimulating && (
                        <div className="text-center font-semibold text-lg p-2 rounded-md bg-card shadow">
                            Result: <span className={cn(currentFlame.colorClass, "drop-shadow-none")}>{currentFlame.colorName}</span>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                     <Button onClick={handleTestInFlame} disabled={!loadedSample || isSimulating}>
                        {isSimulating ? "Testing..." : "2. Test in Flame"}
                    </Button>
                    <Button variant="outline" onClick={handleReset}>Reset</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Post-Lab Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-medium mb-2">What causes the different colors in a flame test?</p>
                     <RadioGroup value={quizAnswer} onValueChange={handleQuizChange} disabled={quizIsCorrect !== null}>
                        <div className="flex items-center space-x-2 py-1"><RadioGroupItem value="The salt itself is burning" id="q-burn" /><Label htmlFor="q-burn">The salt itself is burning</Label></div>
                        <div className="flex items-center space-x-2 py-1"><RadioGroupItem value="Electrons moving between energy levels" id="q-electrons" /><Label htmlFor="q-electrons">Electrons moving between energy levels</Label></div>
                        <div className="flex items-center space-x-2 py-1"><RadioGroupItem value="Reaction with air" id="q-air" /><Label htmlFor="q-air">A reaction with the air</Label></div>
                     </RadioGroup>
                     {quizFeedback && <p className={cn("mt-3 text-sm flex items-center gap-2 p-2 rounded-md", quizIsCorrect === true && "text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300", quizIsCorrect === false && "text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300", quizIsCorrect === null && quizAttempts === 1 && "text-blue-700 bg-blue-100 dark:bg-blue-900 dark:text-blue-300")}>{quizIsCorrect ? <CheckCircle className="h-5 w-5"/> : !quizIsCorrect && quizAttempts > 1 ? <XCircle className="h-5 w-5"/> : <RefreshCw className="h-5 w-5 animate-spin"/>}{quizFeedback}</p>}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleQuizSubmit} disabled={!quizAnswer || quizIsCorrect !== null} size="sm">
                        {quizIsCorrect === true ? "Correct!" : quizIsCorrect === false ? "Answer Shown" : quizAttempts === 1 && quizIsCorrect === null ? "Try Again" : "Check Answer"}
                    </Button>
                </CardFooter>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Lab Report</CardTitle>
                    <CardDescription>Generate a summary of your last test.</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button variant="secondary" onClick={handleGenerateReport}>Generate Report</Button>
                </CardFooter>
            </Card>

        </div>
    );
}
