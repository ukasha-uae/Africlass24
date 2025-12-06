'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Clock, Trophy, Target, Zap, CheckCircle2, 
  XCircle, Award, TrendingUp, TrendingDown,
  ChevronRight, Home, RotateCcw, BrainCircuit, Users,
  Volume2, VolumeX
} from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  getChallenge,
  getPlayerProfile,
  submitChallengeAnswers,
  completeChallenge,
  Challenge,
  GameQuestion,
  Player,
  PlayerAnswer,
} from '@/lib/challenge';
import { useSoundEffects } from '@/hooks/use-sound-effects';
import { useFirebase } from '@/firebase/provider';

export default function QuizBattlePage() {
  const params = useParams();
  const router = useRouter();
  const { playSound, isMuted, toggleMute } = useSoundEffects();
  const { user } = useFirebase();
  const challengeId = params.challengeId as string;
  
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per question
  const [gamePhase, setGamePhase] = useState<'loading' | 'waiting' | 'playing' | 'results'>('loading');
  const [results, setResults] = useState<any>(null);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!user) return;
    const challengeData = getChallenge(challengeId);
    if (!challengeData) {
      router.push('/challenge-arena');
      return;
    }
    setChallenge(challengeData);
    setPlayer(getPlayerProfile(user.uid));
    
    if (challengeData.status === 'pending') {
      setGamePhase('waiting');
    } else {
      setGamePhase('playing');
    }
  }, [challengeId, user, router]);

  // Timer countdown
  useEffect(() => {
    if (gamePhase !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNextQuestion();
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gamePhase, currentQuestionIndex]);

  const handleAnswerSelect = (answerId: string) => {
    if (!challenge || selectedAnswer) return; // Prevent changing answer once selected
    setSelectedAnswer(answerId);

    const currentQuestion = challenge.questions[currentQuestionIndex];
    const isCorrect = currentQuestion.correctAnswer === answerId;
    
    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('wrong');
    }

    // Auto-advance after a short delay
    setTimeout(() => {
      handleNextQuestion(answerId);
    }, 1000); // Increased delay slightly to let sound play
  };

  const handleNextQuestion = (answerToSubmit?: string) => {
    const answer = answerToSubmit || selectedAnswer;
    if (!challenge || !answer) return;

    const currentQuestion = challenge.questions[currentQuestionIndex];
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));

    if (currentQuestionIndex < challenge.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(120);
    } else {
      // Submit all answers and complete challenge
      finishChallenge({
        ...userAnswers,
        [currentQuestion.id]: answer
      });
    }
  };

  const finishChallenge = (answersMap: Record<string, string>) => {
    if (!challenge || gamePhase === 'results' || !user) return;

    // Convert to PlayerAnswer[]
    const playerAnswers: PlayerAnswer[] = challenge.questions.map(q => {
      const answer = answersMap[q.id];
      const isCorrect = answer === q.correctAnswer;
      return {
        questionId: q.id,
        answer,
        isCorrect,
        timeSpent: 0, // We don't track per-question time yet
        points: isCorrect ? q.points : 0
      };
    });

    // Calculate total time taken
    const totalTimeTaken = Date.now() - startTime;

    // Submit answers with total time override
    submitChallengeAnswers(challengeId, user.uid, playerAnswers, totalTimeTaken);

    // Fetch updated challenge to get results
    const updatedChallenge = getChallenge(challengeId);
    if (updatedChallenge && updatedChallenge.results) {
      setResults(updatedChallenge.results);
      
      // Check for win and trigger confetti
      const myResult = updatedChallenge.results.find(r => r.userId === user.uid);
      if (myResult?.rank === 1) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
    
    setGamePhase('results');
    playSound('complete');
  };

  if (gamePhase === 'loading' || !challenge || !player) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading challenge...</p>
        </div>
      </div>
    );
  }

  if (gamePhase === 'waiting') {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-8 relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div className="relative bg-background rounded-full p-6 border-4 border-primary">
            <Clock className="h-12 w-12 text-primary animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Waiting for Opponent</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          We've sent the challenge invitation. The game will start as soon as your opponent accepts.
        </p>

        <div className="grid grid-cols-2 gap-8 mb-8 w-full max-w-md">
          <div className="flex flex-col items-center">
            <Avatar className="h-20 w-20 border-4 border-primary mb-3">
              <AvatarFallback>{player.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="font-bold">{player.userName}</p>
            <Badge variant="outline" className="mt-1">Ready</Badge>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-20 w-20 rounded-full border-4 border-dashed border-muted-foreground flex items-center justify-center mb-3 bg-muted/30">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-bold text-muted-foreground">Opponent</p>
            <Badge variant="secondary" className="mt-1 animate-pulse">Waiting...</Badge>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.push('/challenge-arena')}>
            Cancel Challenge
          </Button>
          <Button onClick={() => {
            // For demo purposes, simulate opponent accepting
            setGamePhase('playing');
          }}>
            Start Anyway (Demo)
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = challenge.questions[currentQuestionIndex];

  // Safety check for missing questions
  if (!currentQuestion && gamePhase === 'playing') {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <XCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Error Loading Question</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn't load the question data. This might happen if the selected subject doesn't have enough questions available yet.
        </p>
        <Button onClick={() => router.push('/challenge-arena')}>
          Return to Arena
        </Button>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / challenge.questions.length) * 100;
  const timeProgress = (timeLeft / 120) * 100;

  if (gamePhase === 'results' && results) {
    // Deduplicate results to prevent key collisions from legacy data
    const uniqueResults = results.reduce((acc: any[], current: any) => {
      if (!acc.find(item => item.userId === current.userId)) {
        acc.push(current);
      }
      return acc;
    }, []);

    const myResult = uniqueResults.find((r: any) => r.userId === user?.uid);
    const ratingChange = myResult?.ratingChange || 0;
    const isWin = myResult?.rank === 1;
    const isPodium = myResult?.rank <= 3;
    const isPractice = challenge.type === 'practice';

    return (
      <div className="container mx-auto p-3 sm:p-6 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Results Header */}
          <Card className={`mb-6 ${
            isPractice ? 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900' :
            isWin ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900' :
            isPodium ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900' :
            'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900'
          }`}>
            <CardContent className="p-6 sm:p-8 text-center">
              {isPractice ? (
                <>
                  <BrainCircuit className="h-20 w-20 text-orange-500 mx-auto mb-4" />
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">Practice Complete!</h1>
                  <p className="text-lg text-muted-foreground">Great job sharpening your skills.</p>
                </>
              ) : isWin ? (
                <>
                  <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">Victory!</h1>
                  <p className="text-lg text-muted-foreground">You won the challenge!</p>
                </>
              ) : isPodium ? (
                <>
                  <Award className="h-20 w-20 text-blue-500 mx-auto mb-4" />
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">Nice Work!</h1>
                  <p className="text-lg text-muted-foreground">Rank #{myResult?.rank}</p>
                </>
              ) : (
                <>
                  <Target className="h-20 w-20 text-gray-500 mx-auto mb-4" />
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">Challenge Complete</h1>
                  <p className="text-lg text-muted-foreground">Rank #{myResult?.rank}</p>
                </>
              )}

              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold">{myResult?.score}</p>
                  <p className="text-sm text-muted-foreground">Points</p>
                </div>
                
                {!isPractice && (
                  <>
                    <div className="h-12 w-px bg-border" />
                    <div className="text-center">
                      <p className={`text-3xl font-bold ${
                        ratingChange > 0 ? 'text-green-600' :
                        ratingChange < 0 ? 'text-red-600' : ''
                      }`}>
                        {ratingChange > 0 ? '+' : ''}{ratingChange}
                      </p>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                  </>
                )}

                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <p className="text-3xl font-bold">{myResult?.correctAnswers}/{challenge.questions.length}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard or Performance Summary */}
          {!isPractice ? (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
                <div className="space-y-3">
                  {uniqueResults.map((result: any, idx: number) => (
                    <div
                      key={result.userId}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        result.userId === user?.uid ? 'bg-primary/10 border-2 border-primary' : 'bg-muted'
                      }`}
                    >
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                        result.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                        result.rank === 2 ? 'bg-gray-100 text-gray-600' :
                        result.rank === 3 ? 'bg-orange-100 text-orange-600' :
                        'bg-background'
                      }`}>
                        {result.rank}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {challenge.type === 'school' 
                            ? result.school.substring(0, 2).toUpperCase()
                            : result.userName.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold flex items-center">
                          {challenge.type === 'school' ? result.school : result.userName}
                          {result.userId === user?.uid && (
                            <Badge variant="secondary" className="ml-2">You</Badge>
                          )}
                        </div>
                        {challenge.type === 'school' && (
                           <p className="text-xs text-muted-foreground">Represented by {result.userName}</p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {result.correctAnswers}/{challenge.questions.length} correct • {result.timeTaken}s
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{result.score}</p>
                        <p className={`text-sm ${
                          result.ratingChange > 0 ? 'text-green-600' :
                          result.ratingChange < 0 ? 'text-red-600' : 'text-muted-foreground'
                        }`}>
                          {result.ratingChange > 0 ? <TrendingUp className="h-3 w-3 inline" /> : <TrendingDown className="h-3 w-3 inline" />}
                          {result.ratingChange > 0 ? '+' : ''}{result.ratingChange}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Performance Summary</h2>
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <div className="p-3 bg-background rounded-full">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time Taken</p>
                      <p className="text-xl font-bold">{myResult?.totalTime ? Math.round(myResult.totalTime / 1000) : 0}s</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                      <p className="text-xl font-bold">{Math.round((myResult?.correctAnswers / challenge.questions.length) * 100)}%</p>
                    </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/challenge-arena" className="flex-1">
              <Button variant="outline" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Back to Arena
              </Button>
            </Link>
            <Link href={isPractice ? "/challenge-arena/practice" : "/challenge-arena/quick-match"} className="flex-1">
              <Button className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                {isPractice ? "Practice Again" : "Play Again"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-3 sm:p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-semibold">
                  Question {currentQuestionIndex + 1} of {challenge.questions.length}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggleMute}
                  title={isMuted ? "Unmute Sound" : "Mute Sound"}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-primary" />
                  )}
                </Button>
                <div className="flex items-center gap-2">
                  <Clock className={`h-5 w-5 ${timeLeft <= 30 ? 'text-red-500 animate-pulse' : 'text-muted-foreground'}`} />
                  <span className={`font-mono font-bold ${timeLeft <= 30 ? 'text-red-500' : ''}`}>
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <Progress 
              value={timeProgress} 
              className={`h-1 ${timeLeft <= 30 ? '[&>div]:bg-red-500' : ''}`}
            />
          </CardContent>
        </Card>

        {/* Opponent Info */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {player.userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{player.userName}</p>
                  <p className="text-sm text-muted-foreground">Rating: {player.rating}</p>
                </div>
              </div>
              
              {challenge.type === 'practice' ? (
                <Badge variant="secondary" className="text-lg px-4 py-1">
                  Practice Mode
                </Badge>
              ) : (
                <>
                  <Badge variant="outline" className="text-lg">VS</Badge>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold">{challenge.opponents[0]?.userName || 'Opponent'}</p>
                      <p className="text-sm text-muted-foreground">
                        Rating: {getPlayerProfile(challenge.opponents[0]?.userId)?.rating || '???'}
                      </p>
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {(challenge.opponents[0]?.userName || 'O').split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary">{challenge.subject}</Badge>
                <Badge variant="outline">{challenge.difficulty}</Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                const showResult = !!selectedAnswer;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={!!selectedAnswer}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      isSelected
                        ? (isCorrect 
                            ? 'border-green-500 bg-green-50 dark:bg-green-950/20 font-semibold' 
                            : 'border-red-500 bg-red-50 dark:bg-red-950/20 font-semibold')
                        : showResult
                          ? (isCorrect 
                              ? 'border-green-500 bg-green-50 dark:bg-green-950/20' // Reveal correct answer
                              : 'border-border opacity-50 cursor-not-allowed')
                          : 'border-border hover:border-primary/50 hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        isSelected
                          ? (isCorrect 
                              ? 'border-green-500 bg-green-500 text-white' 
                              : 'border-red-500 bg-red-500 text-white')
                          : showResult && isCorrect
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-muted-foreground'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {isSelected && (
                        isCorrect 
                          ? <CheckCircle2 className="h-5 w-5 text-green-500" />
                          : <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Button - Hidden for auto-advance, but kept in DOM for accessibility/fallback if needed, or removed entirely */}
        {/* <Button
          onClick={() => handleNextQuestion()}
          disabled={!selectedAnswer}
          className="w-full h-14 text-lg hidden"
          size="lg"
        >
          ...
        </Button> */}

        {/* Score Preview */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your Progress</span>
              <div className="flex gap-4">
                <span>
                  <CheckCircle2 className="h-4 w-4 inline text-green-500 mr-1" />
                  {Object.keys(userAnswers).length} answered
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
