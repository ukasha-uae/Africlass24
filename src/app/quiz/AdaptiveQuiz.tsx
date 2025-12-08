"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  generateAdaptiveQuiz,
  type AdaptiveQuizInput,
  type AdaptiveQuizOutput,
} from "@/ai/flows/adaptive-quiz";
import { subjects, getTopicsForSubject } from "@/lib/jhs-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, BrainCircuit, Clock, Trophy, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import Matching from '@/components/quiz/Matching';
import MultipleSelect from '@/components/quiz/MultipleSelect';
import Ordering from '@/components/quiz/Ordering';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { addQuizScore } from "@/lib/user-progress-quiz";
import { saveLocalQuizAttempt } from '@/lib/local-quiz-attempts';
import { useFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const formSchema = z.object({
  subject: z.string().min(1, "Please select a subject."),
  topic: z.string().min(1, "Please select a topic."),
  difficulty: z.enum(["easy", "medium", "hard"]),
  timedMode: z.boolean().default(false),
  userPerformance: z
    .string()
    .min(10, "Please describe your performance in at least 10 characters."),
});

type QuizFormValues = z.infer<typeof formSchema>;
type QuizQuestion = AdaptiveQuizOutput["quizQuestions"][0];

export default function AdaptiveQuiz() {
  const [quizData, setQuizData] = useState<AdaptiveQuizOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timedMode, setTimedMode] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);
  const { toast } = useToast();
  const { firestore, user } = useFirebase();

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      topic: "",
      difficulty: "medium",
      timedMode: false,
      userPerformance: "",
    },
  });

  const selectedSubject = form.watch("subject");
  const topics = selectedSubject ? getTopicsForSubject(selectedSubject) : [];

  // Timer effect
  useEffect(() => {
    if (timedMode && timeLeft > 0 && !quizFinished) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timedMode && timeLeft === 0 && !quizFinished && quizData) {
      setTimeExpired(true);
      finishQuiz();
    }
  }, [timeLeft, timedMode, quizFinished]);

  const handleFormSubmit: SubmitHandler<QuizFormValues> = async (values) => {
    setIsLoading(true);
    setQuizData(null);
    setTimeExpired(false);
    try {
      const numQuestions = values.difficulty === 'easy' ? 5 : values.difficulty === 'medium' ? 10 : 15;
      const input: AdaptiveQuizInput = { 
        subject: values.subject,
        topic: values.topic,
        userPerformance: values.userPerformance,
        numberOfQuestions: numQuestions 
      };
      const result = await generateAdaptiveQuiz(input);
      if (result && result.quizQuestions.length > 0) {
        setQuizData(result);
        setUserAnswers(new Array(result.quizQuestions.length).fill(""));
        setCurrentQuestionIndex(0);
        setQuizFinished(false);
        setTimedMode(values.timedMode);
        
        // Set timer based on difficulty (30 seconds per question)
        if (values.timedMode) {
          setTimeLeft(result.quizQuestions.length * 30);
        }
      } else {
         toast({
          title: "Error",
          description: "Could not generate a quiz. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = value;
    setUserAnswers(newAnswers);
  };
  
  const handleNextQuestion = () => {
    if (quizData && currentQuestionIndex < quizData.quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };
  
  const finishQuiz = () => {
    const score = calculateScore();
    const totalQuestions = quizData?.quizQuestions.length || 0;
    if (totalQuestions > 0) {
        const percentage = Math.round((score / totalQuestions) * 100);
        // Build a lightweight report for the attempt so it can be saved to Firestore or locally
        const report = quizData?.quizQuestions.map((q, i) => ({
          index: i,
          question: q.question,
          userAnswer: userAnswers[i],
          correctAnswer: q.type === 'multiple-choice' ? q.correctAnswer : String(q.correctAnswer),
          isCorrect: q.type === 'multiple-choice' ? (userAnswers[i] === q.correctAnswer) : ((userAnswers[i] === 'true') === q.correctAnswer),
        })) || [];
        addQuizScore(percentage);
        toast({
            title: "Quiz Complete!",
            description: `You scored ${percentage}%. Your progress has been updated.`
        });

        // Save to Firestore for authenticated users
        if (firestore && user) {
          try {
            const attemptsRef = collection(firestore, `users/${user.uid}/quizAttempts`);
            // Build a lightweight report for the attempt
            const report = quizData?.quizQuestions.map((q, i) => ({
              index: i,
              question: q.question,
              userAnswer: userAnswers[i],
              correctAnswer: q.type === 'multiple-choice' ? q.correctAnswer : String(q.correctAnswer),
              isCorrect: q.type === 'multiple-choice' ? (userAnswers[i] === q.correctAnswer) : ((userAnswers[i] === 'true') === q.correctAnswer),
            })) || [];
            addDoc(attemptsRef, {
              subject: form.getValues('subject'),
              topic: form.getValues('topic'),
              createdAt: serverTimestamp(),
              scorePercent: percentage,
              rawScore: score,
              total: totalQuestions,
              report,
            });
          } catch (err) {
            console.error('Failed to save adaptive quiz attempt to Firestore', err);
            toast({ title: 'Save failed', description: 'Could not save your attempt to the server. Your score will be kept locally.' });
            // Save local copy for later migration
            saveLocalQuizAttempt({
              createdAt: new Date().toISOString(),
              scorePercent: percentage,
              rawScore: score,
              total: totalQuestions,
              report,
              // include basic metadata
              subjectSlug: form.getValues('subject'),
              topicSlug: form.getValues('topic'),
            });
          }
        } else if (!user) {
          saveLocalQuizAttempt({
            createdAt: new Date().toISOString(),
            scorePercent: percentage,
            rawScore: score,
            total: totalQuestions,
            report,
            subjectSlug: form.getValues('subject'),
            topicSlug: form.getValues('topic'),
          });
          toast({ title: 'Not signed in', description: 'This attempt is saved locally. Sign in to save to your profile.' });
        }
    }
    setQuizFinished(true);
  }

  const calculateScore = () => {
    if (!quizData) return 0;
    return quizData.quizQuestions.reduce((score, question, index) => {
      const userAnswer = userAnswers[index];
      let isCorrect = false;
      if (question.type === 'multiple-choice') {
        isCorrect = userAnswer === question.correctAnswer;
      } else if (question.type === 'true-false') {
        isCorrect = (userAnswer === 'true') === question.correctAnswer;
      }
      return score + (isCorrect ? 1 : 0);
    }, 0);
  };
  
  const resetQuiz = () => {
    setQuizData(null);
    setIsLoading(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizFinished(false);
    setTimeLeft(0);
    setTimedMode(false);
    setTimeExpired(false);
    form.reset();
  }
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (quizData && !quizFinished) {
    const question = quizData.quizQuestions[currentQuestionIndex];
    
    // Common navigation buttons
    const navButtons = (
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>
        <Button onClick={handleNextQuestion} disabled={!userAnswers[currentQuestionIndex] || userAnswers[currentQuestionIndex]?.length === 0}>
          {currentQuestionIndex === quizData.quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
        </Button>
      </CardFooter>
    );

    if (question.type === 'multiple-choice') {
      return (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <Progress value={((currentQuestionIndex + 1) / quizData.quizQuestions.length) * 100} className="flex-1" />
              {timedMode && (
                <Badge variant={timeLeft < 60 ? "destructive" : "secondary"} className="ml-4 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(timeLeft)}
                </Badge>
              )}
            </div>
            <CardTitle>Question {currentQuestionIndex + 1} of {quizData.quizQuestions.length}</CardTitle>
            <CardDescription className="text-lg pt-2">{question.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={userAnswers[currentQuestionIndex]} onValueChange={handleAnswerChange}>
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-md hover:bg-muted border border-transparent hover:border-primary transition-all">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          {navButtons}
        </Card>
      );
    }
    if (question.type === 'true-false') {
      return (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <Progress value={((currentQuestionIndex + 1) / quizData.quizQuestions.length) * 100} className="flex-1" />
              {timedMode && (
                <Badge variant={timeLeft < 60 ? "destructive" : "secondary"} className="ml-4 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(timeLeft)}
                </Badge>
              )}
            </div>
            <CardTitle>Question {currentQuestionIndex + 1} of {quizData.quizQuestions.length}</CardTitle>
            <CardDescription className="text-lg pt-2">{question.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={userAnswers[currentQuestionIndex]} onValueChange={handleAnswerChange}>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-muted border border-transparent hover:border-primary transition-all">
                <RadioGroupItem value="true" id="option-true" />
                <Label htmlFor="option-true" className="flex-1 cursor-pointer">True</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-muted border border-transparent hover:border-primary transition-all">
                <RadioGroupItem value="false" id="option-false" />
                <Label htmlFor="option-false" className="flex-1 cursor-pointer">False</Label>
              </div>
            </RadioGroup>
          </CardContent>
          {navButtons}
        </Card>
      );
    }
    if (question.type === 'matching') {
      return (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <Progress value={((currentQuestionIndex + 1) / quizData.quizQuestions.length) * 100} className="flex-1" />
              {timedMode && (
                <Badge variant={timeLeft < 60 ? "destructive" : "secondary"} className="ml-4 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(timeLeft)}
                </Badge>
              )}
            </div>
            <CardTitle>Question {currentQuestionIndex + 1} of {quizData.quizQuestions.length}</CardTitle>
            <CardDescription className="text-lg pt-2">{question.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <Matching
              quiz={question}
              userAnswer={userAnswers[currentQuestionIndex] || {}}
              onAnswerChange={(ans) => {
                const newAnswers = [...userAnswers];
                newAnswers[currentQuestionIndex] = ans;
                setUserAnswers(newAnswers);
              }}
            />
          </CardContent>
          {navButtons}
        </Card>
      );
    }
    if (question.type === 'multiple-select') {
      return (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <Progress value={((currentQuestionIndex + 1) / quizData.quizQuestions.length) * 100} className="flex-1" />
              {timedMode && (
                <Badge variant={timeLeft < 60 ? "destructive" : "secondary"} className="ml-4 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(timeLeft)}
                </Badge>
              )}
            </div>
            <CardTitle>Question {currentQuestionIndex + 1} of {quizData.quizQuestions.length}</CardTitle>
            <CardDescription className="text-lg pt-2">{question.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <MultipleSelect
              quiz={question}
              userAnswer={userAnswers[currentQuestionIndex] || []}
              onAnswerChange={(ans) => {
                const newAnswers = [...userAnswers];
                newAnswers[currentQuestionIndex] = ans;
                setUserAnswers(newAnswers);
              }}
            />
          </CardContent>
          {navButtons}
        </Card>
      );
    }
    if (question.type === 'ordering') {
      return (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <Progress value={((currentQuestionIndex + 1) / quizData.quizQuestions.length) * 100} className="flex-1" />
              {timedMode && (
                <Badge variant={timeLeft < 60 ? "destructive" : "secondary"} className="ml-4 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(timeLeft)}
                </Badge>
              )}
            </div>
            <CardTitle>Question {currentQuestionIndex + 1} of {quizData.quizQuestions.length}</CardTitle>
            <CardDescription className="text-lg pt-2">{question.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <Ordering
              quiz={question}
              userAnswer={userAnswers[currentQuestionIndex] || []}
              onAnswerChange={(ans) => {
                const newAnswers = [...userAnswers];
                newAnswers[currentQuestionIndex] = ans;
                setUserAnswers(newAnswers);
              }}
            />
          </CardContent>
          {navButtons}
        </Card>
      );
    }
  }

  if (quizFinished) {
    const score = calculateScore();
    const percentage = Math.round((score / (quizData?.quizQuestions.length || 1)) * 100);
    
    return (
       <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
              <CardDescription className="text-lg mt-2">
                {timeExpired ? "Time's up! " : ""}You scored {score} out of {quizData?.quizQuestions.length || 0}
              </CardDescription>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary flex items-center gap-2">
                <Trophy className="h-12 w-12" />
                {percentage}%
              </div>
              <Badge variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"} className="mt-2">
                {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Job!" : "Keep Practicing!"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Review your answers below. Correct answers are shown in green, incorrect in red.
              </AlertDescription>
            </Alert>
            
            {quizData?.quizQuestions.map((q, i) => {
                let isCorrect = false;
                let correctAnswerText = '';
                if(q.type === 'multiple-choice') {
                    isCorrect = userAnswers[i] === q.correctAnswer;
                    correctAnswerText = q.correctAnswer;
                } else if(q.type === 'true-false') {
                    isCorrect = (userAnswers[i] === 'true') === q.correctAnswer;
                    correctAnswerText = q.correctAnswer ? 'True' : 'False';
                }

                return (
                    <Card key={i} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base flex items-center gap-2">
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                            Question {i+1}
                          </CardTitle>
                          <Badge variant={isCorrect ? "default" : "destructive"}>
                            {isCorrect ? "Correct" : "Incorrect"}
                          </Badge>
                        </div>
                        <p className="text-sm mt-2">{q.question}</p>
                      </CardHeader>
                      <CardContent className="space-y-2 pt-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Your answer:</span>
                          <Badge variant={isCorrect ? "outline" : "destructive"}>
                            {userAnswers[i] || "Not answered"}
                          </Badge>
                        </div>
                        {!isCorrect && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Correct answer:</span>
                            <Badge variant="default">{correctAnswerText}</Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                )
            })}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={resetQuiz} className="flex-1">
            <BrainCircuit className="mr-2 h-4 w-4" />
            Try Another Quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BrainCircuit className="mr-2" />
          Create Your Adaptive Quiz
        </CardTitle>
        <CardDescription>
          Tell us about your learning journey, and we'll generate a personalized
          quiz to help you improve.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.slug} value={subject.name}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedSubject}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic.slug} value={topic.title}>
                          {topic.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="easy">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Easy</Badge>
                          <span className="text-sm text-muted-foreground">5 questions</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Medium</Badge>
                          <span className="text-sm text-muted-foreground">10 questions</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="hard">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Hard</Badge>
                          <span className="text-sm text-muted-foreground">15 questions</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Higher difficulty means more questions to answer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timedMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Timed Mode
                    </FormLabel>
                    <FormDescription>
                      Challenge yourself with a 30-second timer per question
                    </FormDescription>
                  </div>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userPerformance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe Your Strengths and Weaknesses</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'I am good at algebra but struggle with geometry. I often make mistakes in calculating angles.'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Quiz...
                </>
              ) : (
                "Generate Quiz"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
