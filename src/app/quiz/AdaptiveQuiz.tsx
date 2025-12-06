"use client";

import { useState } from "react";
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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, BrainCircuit } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { addQuizScore } from "@/lib/user-progress-quiz";
import { saveLocalQuizAttempt } from '@/lib/local-quiz-attempts';
import { useFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const formSchema = z.object({
  subject: z.string().min(1, "Please select a subject."),
  topic: z.string().min(1, "Please select a topic."),
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
  const { toast } = useToast();
  const { firestore, user } = useFirebase();

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      topic: "",
      userPerformance: "",
    },
  });

  const selectedSubject = form.watch("subject");
  const topics = selectedSubject ? getTopicsForSubject(selectedSubject) : [];

  const handleFormSubmit: SubmitHandler<QuizFormValues> = async (values) => {
    setIsLoading(true);
    setQuizData(null);
    try {
      const input: AdaptiveQuizInput = { ...values, numberOfQuestions: 5 };
      const result = await generateAdaptiveQuiz(input);
      if (result && result.quizQuestions.length > 0) {
        setQuizData(result);
        setUserAnswers(new Array(result.quizQuestions.length).fill(""));
        setCurrentQuestionIndex(0);
        setQuizFinished(false);
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
    form.reset();
  }

  if (quizData && !quizFinished) {
    const question = quizData.quizQuestions[currentQuestionIndex];
    
    if (question.type === 'multiple-choice') {
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <Progress value={((currentQuestionIndex + 1) / quizData.quizQuestions.length) * 100} className="mb-4" />
              <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
              <CardDescription className="text-lg pt-2">{question.question}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={userAnswers[currentQuestionIndex]} onValueChange={handleAnswerChange}>
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNextQuestion} disabled={!userAnswers[currentQuestionIndex]}>
                {currentQuestionIndex === quizData.quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </CardFooter>
          </Card>
        );
    }
    if (question.type === 'true-false') {
         return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <Progress value={((currentQuestionIndex + 1) / quizData.quizQuestions.length) * 100} className="mb-4" />
              <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
              <CardDescription className="text-lg pt-2">{question.question}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={userAnswers[currentQuestionIndex]} onValueChange={handleAnswerChange}>
                  <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                    <RadioGroupItem value="true" id="option-true" />
                    <Label htmlFor="option-true" className="flex-1 cursor-pointer">True</Label>
                  </div>
                   <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                    <RadioGroupItem value="false" id="option-false" />
                    <Label htmlFor="option-false" className="flex-1 cursor-pointer">False</Label>
                  </div>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNextQuestion} disabled={!userAnswers[currentQuestionIndex]}>
                {currentQuestionIndex === quizData.quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </CardFooter>
          </Card>
        );
    }
  }

  if (quizFinished) {
    const score = calculateScore();
    return (
       <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
          <CardDescription>You scored {score} out of {quizData?.quizQuestions.length || 0}.</CardDescription>
        </CardHeader>
        <CardContent>
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
                    <div key={i} className={`p-3 rounded-md mb-2 ${isCorrect ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                        <p className="font-semibold">{i+1}. {q.question}</p>
                        <p className="text-sm">Your answer: {userAnswers[i]}</p>
                        <p className="text-sm text-primary">Correct answer: {correctAnswerText}</p>
                    </div>
                )
            })}
        </CardContent>
        <CardFooter>
          <Button onClick={resetQuiz}>Try Another Quiz</Button>
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
