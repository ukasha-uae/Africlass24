'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Swords, Zap, Trophy, BrainCircuit, ArrowLeft, Star
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AI_BOSSES,
  createBossChallenge,
  AIBoss
} from '@/lib/challenge';
import { useFirebase } from '@/firebase/provider';

export default function BossBattlePage() {
  const router = useRouter();
  const { user } = useFirebase();
  
  const [selectedBoss, setSelectedBoss] = useState<AIBoss | null>(null);
  const [subject, setSubject] = useState('Mathematics');
  const [isStarting, setIsStarting] = useState(false);

  const subjects = [
    'Mathematics',
    'English Language',
    'Integrated Science',
    'Social Studies',
    'Religious & Moral Education',
    'Creative Arts',
    'French',
    'Ghanaian Language',
    'ICT',
  ];

  const handleStartBattle = () => {
    if (!selectedBoss || !user) return;
    
    setIsStarting(true);
    
    // Create the challenge
    const challenge = createBossChallenge(user.uid, selectedBoss.id, subject);
    
    if (challenge) {
      // Redirect to play
      router.push(`/challenge-arena/play/${challenge.id}`);
    } else {
      setIsStarting(false);
    }
  };

  return (
    <div className="container mx-auto p-3 sm:p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push('/challenge-arena')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BrainCircuit className="h-8 w-8 text-purple-500" />
              AI Boss Battles
            </h1>
            <p className="text-muted-foreground">Challenge intelligent opponents to test your skills</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Boss Selection */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Select Your Opponent</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AI_BOSSES.map((boss) => (
                <Card 
                  key={boss.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedBoss?.id === boss.id 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20 ring-2 ring-purple-500 ring-offset-2' 
                      : 'hover:border-purple-200'
                  }`}
                  onClick={() => setSelectedBoss(boss)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-4xl bg-background rounded-full p-2 shadow-sm">
                        {boss.avatar}
                      </div>
                      <Badge variant={
                        boss.difficulty === 'easy' ? 'secondary' :
                        boss.difficulty === 'medium' ? 'default' :
                        boss.difficulty === 'hard' ? 'destructive' : 'outline'
                      } className={boss.difficulty === 'insane' ? 'border-purple-500 text-purple-500' : ''}>
                        {boss.difficulty.toUpperCase()}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg">{boss.name}</h3>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">{boss.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {boss.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-medium text-yellow-600 dark:text-yellow-500">
                      <Star className="h-3 w-3 fill-current" />
                      Reward: {boss.xpReward} XP
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Battle Setup */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Battle Setup</CardTitle>
                <CardDescription>Configure your match</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedBoss ? (
                  <div className="p-4 bg-muted rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{selectedBoss.avatar}</div>
                      <div>
                        <p className="font-bold text-sm">VS {selectedBoss.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedBoss.title}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Difficulty:</span>
                        <span className="font-medium capitalize">{selectedBoss.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span className="font-medium">{selectedBoss.accuracy * 100}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Win Reward:</span>
                        <span className="font-medium text-yellow-600">{selectedBoss.xpReward} XP</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                    Select an opponent to see details
                  </div>
                )}

                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700" 
                  size="lg"
                  disabled={!selectedBoss || isStarting}
                  onClick={handleStartBattle}
                >
                  {isStarting ? (
                    <>Starting...</>
                  ) : (
                    <>
                      <Swords className="h-4 w-4 mr-2" />
                      Start Battle
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
