'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  School, 
  Trophy, 
  Swords, 
  Users, 
  TrendingUp, 
  Target,
  Crown,
  Medal,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { 
  getSchoolRankings, 
  getPlayerProfile, 
  createChallenge, 
  SchoolRanking, 
  Player 
} from '@/lib/challenge';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SchoolBattlePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [rankings, setRankings] = useState<SchoolRanking[]>([]);
  const [mySchool, setMySchool] = useState<SchoolRanking | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load data
    const allRankings = getSchoolRankings();
    setRankings(allRankings);
    
    const currentPlayer = getPlayerProfile('user-1'); // Mock user
    setPlayer(currentPlayer);
    
    if (currentPlayer) {
      const schoolData = allRankings.find(r => r.school === currentPlayer.school);
      setMySchool(schoolData || null);
    }
  }, []);

  const handleStartBattle = async () => {
    if (!player?.isVerified) {
      toast({
        title: 'Verification Required',
        description: 'You must verify your student status to represent your school.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Create a school battle challenge
      // In a real app, this would find a player from a rival school
      // For now, we'll create a challenge that looks for an opponent
      
      const challenge = createChallenge({
        type: 'school',
        subject: 'general', // Mixed subjects for school battles
        difficulty: 'medium',
        questionCount: 10,
        timeLimit: 45,
        creatorId: player?.userId || 'user-1',
        creatorName: player?.userName || 'Unknown',
        creatorSchool: player?.school || 'Unknown',
        opponents: [], // Open for matchmaking
        maxPlayers: 2,
      });

      toast({
        title: 'Finding Rival School...',
        description: 'Searching for a worthy opponent!',
      });

      // Simulate matchmaking delay
      setTimeout(() => {
        router.push(`/challenge-arena/play/${challenge.id}`);
      }, 1500);
      
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to start battle',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  if (!player) return null;

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-5xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
            <School className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">School Battle Arena</h1>
            <p className="text-muted-foreground">Defend your school's honor!</p>
          </div>
        </div>
      </div>

      {!player.isVerified && (
        <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50 dark:bg-red-950/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Verification Required</AlertTitle>
          <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span>
              To prevent mischief and ensure fair play, you must verify your student status before representing <strong>{player.school}</strong>.
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white hover:bg-red-50 border-red-200 text-red-600 whitespace-nowrap"
              onClick={() => {
                // Mock verification for demo
                const updatedPlayer = { ...player, isVerified: true };
                localStorage.setItem('challengePlayers', JSON.stringify([
                  updatedPlayer,
                  ...getSchoolRankings().flatMap(() => []) // This is just a placeholder, real update logic needed
                ]));
                // For demo simplicity, we just reload to pick up the change or update state
                // In a real app, this would open a modal to upload ID card
                setPlayer(updatedPlayer);
                toast({
                  title: "Verification Successful",
                  description: "You are now a verified student of " + player.school,
                });
              }}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Verify Now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* My School Stats */}
        <Card className="md:col-span-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-background">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {player.school}
                  {player.isVerified && <ShieldCheck className="h-5 w-5 text-blue-500" />}
                  {mySchool?.rank === 1 && <Crown className="h-6 w-6 text-yellow-500 fill-yellow-500" />}
                </h2>
                <p className="text-muted-foreground">Your Contribution: {player.wins * 3} pts</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-600">#{mySchool?.rank || '-'}</div>
                <div className="text-sm text-muted-foreground">National Rank</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-background/50 p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Trophy className="h-4 w-4" />
                  <span>Points</span>
                </div>
                <p className="text-2xl font-bold">{mySchool?.points || 0}</p>
              </div>
              <div className="bg-background/50 p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                  <span>Students</span>
                </div>
                <p className="text-2xl font-bold">{mySchool?.totalStudents || 0}</p>
              </div>
              <div className="bg-background/50 p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Swords className="h-4 w-4" />
                  <span>Wins</span>
                </div>
                <p className="text-2xl font-bold">{mySchool?.totalWins || 0}</p>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleStartBattle}
              disabled={loading || !player.isVerified}
            >
              {loading ? (
                'Matching...'
              ) : !player.isVerified ? (
                <>
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Verify to Battle
                </>
              ) : (
                <>
                  <Swords className="mr-2 h-5 w-5" />
                  Battle for {player.school}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Top Rival */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              Top Rival
            </CardTitle>
          </CardHeader>
          <CardContent>
            {rankings.length > 1 ? (
              <div className="text-center py-4">
                <div className="h-16 w-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <School className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-bold text-lg mb-1">
                  {rankings.find(r => r.school !== player.school)?.school}
                </h3>
                <Badge variant="secondary" className="mb-4">Rank #{rankings.find(r => r.school !== player.school)?.rank}</Badge>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points Gap</span>
                    <span className="font-bold text-red-600">
                      {Math.abs((mySchool?.points || 0) - (rankings.find(r => r.school !== player.school)?.points || 0))}
                    </span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Win 5 more battles to overtake them!
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No rivals found yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            School Leaderboard
          </CardTitle>
          <CardDescription>Top performing schools in Ghana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rankings.map((school, index) => (
              <div 
                key={school.school}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  school.school === player.school 
                    ? 'bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800' 
                    : 'bg-card'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full font-bold
                    ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-muted text-muted-foreground'}
                  `}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-bold">{school.school}</p>
                    <div className="flex gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" /> {school.totalStudents}
                      </span>
                      <span className="flex items-center gap-1">
                        <Swords className="h-3 w-3" /> {school.totalWins} wins
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{school.points}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
