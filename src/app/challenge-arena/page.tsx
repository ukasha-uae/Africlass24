'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, Zap, Calendar, Users, Target, TrendingUp, 
  Clock, Award, Play, Plus, Eye, Swords, School, Bell,
  BrainCircuit
} from 'lucide-react';
import Link from 'next/link';
import {
  getPlayerProfile,
  createOrUpdatePlayer,
  getMyChallenges,
  getChallengeNotifications,
  getSchoolRankings,
  getMatchHistory,
  initializeChallengeData,
  getAllPlayers,
  Player,
  Challenge,
  SchoolRanking,
} from '@/lib/challenge';
import { GamificationProfile } from '@/components/GamificationProfile';
import { getLevel } from '@/lib/gamification';
import { useFirebase, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useMemo } from 'react';

export default function ChallengeArenaPage() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [schoolRankings, setSchoolRankings] = useState<SchoolRanking[]>([]);
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [matchHistory, setMatchHistory] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('play');

  const { firestore, user } = useFirebase();
  const profileRef = useMemo(() => (user && firestore) ? doc(firestore, `students/${user.uid}`) : null, [user, firestore]);
  const { data: profile } = useDoc<any>(profileRef as any);

  useEffect(() => {
    initializeChallengeData();
  }, []);

  useEffect(() => {
    if (user && profile) {
      loadData(user.uid, profile);
    } else if (!user) {
      // Fallback for dev/testing if no user logged in, or handle loading state
      // For now, we can keep the mock user if no real user is found, or just wait
      // But to satisfy the user request, we prioritize the real user.
      // If no user is logged in, we might want to redirect or show a login prompt, 
      // but for now let's just load the mock data if we are in a dev environment or just wait.
      // Actually, let's just wait for the user to load.
    }
  }, [user, profile]);

  const loadData = (uid: string, userProfile: any) => {
    // Set current user ID for social features
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUserId', uid);
    }

    // Create or get player profile
    // Sync with real profile data
    const playerProfile = createOrUpdatePlayer({
      userId: uid,
      userName: userProfile.studentName || 'Student',
      school: userProfile.schoolName || 'My School', // Assuming schoolName exists, fallback if not
      avatar: userProfile.profilePictureUrl
    });
    
    setPlayer(playerProfile);

    setChallenges(getMyChallenges(uid));
    setNotifications(getChallengeNotifications(uid));
    setSchoolRankings(getSchoolRankings());
    setTopPlayers(getAllPlayers().sort((a, b) => b.rating - a.rating).slice(0, 10));
    setMatchHistory(getMatchHistory(uid));
  };

  const pendingChallenges = challenges.filter(c => 
    c.status === 'pending' && c.opponents.some(o => o.userId === (user?.uid || 'user-1') && o.status === 'invited')
  );

  const activeChallenges = challenges.filter(c => 
    c.status === 'accepted' || c.status === 'in-progress'
  );

  const completedChallenges = challenges.filter(c => c.status === 'completed');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-600';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-600';
    return 'text-muted-foreground';
  };

  if (!player) return null;

  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6 lg:p-8 pb-20">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
              <Trophy className="h-10 w-10 text-yellow-500" />
              Challenge Arena
            </h1>
            <p className="text-muted-foreground">
              Compete with classmates and schools across Ghana
            </p>
          </div>
        </div>
      </div>

      {/* Player Stats */}
      <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16 border-4 border-primary">
              <AvatarFallback className="text-2xl font-bold">
                {player.userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{player.userName}</h2>
              <p className="text-sm text-muted-foreground">{player.school}</p>
              <div className="flex gap-2 mt-1">
                <Badge variant="default" className="gap-1">
                  <Trophy className="h-3 w-3" />
                  Rating: {player.rating}
                </Badge>
                {player.winStreak > 0 && (
                  <Badge variant="secondary" className="gap-1 bg-orange-500 text-white">
                    🔥 {player.winStreak} Win Streak
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{player.wins}</p>
              <p className="text-xs text-muted-foreground">Wins</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{player.losses}</p>
              <p className="text-xs text-muted-foreground">Losses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{player.draws}</p>
              <p className="text-xs text-muted-foreground">Draws</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{player.totalGames}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {pendingChallenges.length > 0 && (
        <Card className="mb-6 border-yellow-500 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-500 animate-pulse" />
              Pending Challenges ({pendingChallenges.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingChallenges.slice(0, 3).map(challenge => (
              <div key={challenge.id} className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <div className="flex-1">
                  <p className="font-semibold">{challenge.creatorName}</p>
                  <p className="text-sm text-muted-foreground">
                    {challenge.subject} • {challenge.questionCount} questions
                  </p>
                  {challenge.scheduledTime && (
                    <p className="text-xs text-muted-foreground">
                      Scheduled: {formatDate(challenge.scheduledTime)}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/challenge-arena/${challenge.id}`}>
                    <Button size="sm" variant="default">Accept</Button>
                  </Link>
                  <Button size="sm" variant="outline">Decline</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="play">Play</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="play" className="space-y-6 mt-6">
          {/* Game Modes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link href="/challenge-arena/practice">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                      <BrainCircuit className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Solo Practice</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Practice on your own to improve your skills
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="secondary">Single player</Badge>
                        <Badge variant="outline">No rating</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/challenge-arena/quick-match">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                      <Zap className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Quick Match</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Find an opponent instantly and start playing
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="secondary">2 players</Badge>
                        <Badge variant="outline">10 questions</Badge>
                        <Badge variant="outline">2 min each</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/challenge-arena/create">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Challenge Friends</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Create custom challenge and invite specific students
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="secondary">Schedule time</Badge>
                        <Badge variant="outline">Custom rules</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/challenge-arena/school-battle">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                      <School className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">School vs School</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Represent your school in inter-school battles
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="secondary">Team battle</Badge>
                        <Badge variant="outline">School pride</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/challenge-arena/tournaments">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                      <Trophy className="h-8 w-8 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Tournaments</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Join competitive tournaments and win prizes
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="secondary">Brackets</Badge>
                        <Badge variant="outline">Prizes</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* AI Boss Battles */}
            <Link href="/challenge-arena/boss-battle">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200 dark:border-purple-900">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                      <BrainCircuit className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">AI Boss Battles</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Challenge intelligent AI opponents
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">Solo</Badge>
                        <Badge variant="outline">Rewards</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Your Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Win Rate</span>
                    <span className="text-sm font-semibold">
                      {player.totalGames > 0 
                        ? Math.round((player.wins / player.totalGames) * 100) 
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{
                        width: `${player.totalGames > 0 
                          ? (player.wins / player.totalGames) * 100 
                          : 0}%`
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold">{player.winStreak}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Best Streak</p>
                    <p className="text-2xl font-bold">{player.highestStreak}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Active Challenges</h2>
          
          {activeChallenges.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <Swords className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>No active challenges</p>
                <Link href="/challenge-arena/quick-match">
                  <Button className="mt-4">Start Playing</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            activeChallenges.map(challenge => (
              <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">
                          vs {challenge.opponents.map(o => o.userName).join(', ')}
                        </h3>
                        <Badge variant={challenge.status === 'in-progress' ? 'default' : 'secondary'}>
                          {challenge.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline">{challenge.subject}</Badge>
                        <Badge variant="outline">{challenge.questionCount} questions</Badge>
                        <Badge variant="outline">{challenge.difficulty}</Badge>
                      </div>
                      {challenge.scheduledTime && (
                        <p className="text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {formatDate(challenge.scheduledTime)}
                        </p>
                      )}
                    </div>
                    <Link href={`/challenge-arena/play/${challenge.id}`}>
                      <Button>
                        <Play className="h-4 w-4 mr-2" />
                        {challenge.status === 'in-progress' ? 'Continue' : 'Start'}
                      </Button>
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {challenge.opponents.filter(o => o.status === 'accepted').length + 1}/{challenge.maxPlayers} players ready
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="rankings" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* School Rankings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5 text-primary" />
                  School Rankings
                </CardTitle>
                <CardDescription>Top performing schools</CardDescription>
              </CardHeader>
              <CardContent>
                {schoolRankings.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No data yet</p>
                ) : (
                  <div className="space-y-3">
                    {schoolRankings.slice(0, 10).map((school) => (
                      <div
                        key={school.school}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                          school.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                          school.rank === 2 ? 'bg-gray-100 text-gray-600' :
                          school.rank === 3 ? 'bg-orange-100 text-orange-600' :
                          'bg-muted'
                        }`}>
                          {school.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{school.school}</p>
                          <p className="text-xs text-muted-foreground">
                            {school.totalWins} wins • {school.totalStudents} students
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{school.points}</p>
                          <p className="text-[10px] text-muted-foreground uppercase">pts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Students */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Top Students
                </CardTitle>
                <CardDescription>Highest rated players</CardDescription>
              </CardHeader>
              <CardContent>
                {topPlayers.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No players yet</p>
                ) : (
                  <div className="space-y-3">
                    {topPlayers.map((p, idx) => (
                      <div
                        key={p.userId}
                        className={`flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors ${
                          p.userId === (user?.uid || 'user-1') ? 'border-primary/50 bg-primary/5' : ''
                        }`}
                      >
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                          idx === 0 ? 'bg-yellow-100 text-yellow-600' :
                          idx === 1 ? 'bg-gray-100 text-gray-600' :
                          idx === 2 ? 'bg-orange-100 text-orange-600' :
                          'bg-muted'
                        }`}>
                          {idx + 1}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {p.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold truncate text-sm">{p.userName}</p>
                            <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                              Lvl {getLevel(p.xp || 0).level}
                            </Badge>
                            {p.userId === (user?.uid || 'user-1') && <Badge variant="outline" className="text-[10px] h-4 px-1">You</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {p.school}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{p.rating}</p>
                          <p className="text-[10px] text-muted-foreground uppercase">rating</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Match History</h2>
          
          {matchHistory.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>No matches played yet</p>
              </CardContent>
            </Card>
          ) : (
            matchHistory.map((match, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {match.type === 'practice' ? (
                          <Badge variant="outline" className="border-orange-500 text-orange-600 bg-orange-50 dark:bg-orange-950/30">
                            PRACTICE
                          </Badge>
                        ) : (
                          <Badge variant={
                            match.result === 'win' ? 'default' :
                            match.result === 'loss' ? 'destructive' : 'secondary'
                          }>
                            {match.result.toUpperCase()}
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {formatDate(match.date)}
                        </span>
                      </div>
                      <p className="font-semibold mb-1">
                        {match.type === 'practice' ? 'Solo Practice Session' : `vs ${match.opponents.join(', ')}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {match.subject} • Score: {match.myScore} • {match.type === 'practice' ? `Time: ${Math.round(match.timeTaken / 1000)}s` : `Rank: #${match.myRank}`}
                      </p>
                    </div>
                    <div className="text-right">
                      {match.type === 'practice' ? (
                        <>
                          <p className="text-lg font-bold text-muted-foreground">--</p>
                          <p className="text-xs text-muted-foreground">rating</p>
                        </>
                      ) : (
                        <>
                          <p className={`text-lg font-bold ${
                            match.ratingChange > 0 ? 'text-green-600' :
                            match.ratingChange < 0 ? 'text-red-600' : ''
                          }`}>
                            {match.ratingChange > 0 ? '+' : ''}{match.ratingChange}
                          </p>
                          <p className="text-xs text-muted-foreground">rating</p>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="profile" className="space-y-4 mt-6">
          <GamificationProfile player={player} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
