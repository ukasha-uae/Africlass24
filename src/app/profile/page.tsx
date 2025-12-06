"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookCheck, Target, Award, Star } from "lucide-react";
import { getUserProgress, getAchievements } from "@/lib/user-progress";
import { useFirebase, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useHasMounted } from '@/hooks/use-has-mounted';

export default function ProfilePage() {
  const hasMounted = useHasMounted();
  const [progress, setProgress] = useState(() => ({ lessonsCompleted: 0, quizzesTaken: 0, averageQuizScore: 0, points: 0 }));
  const [achievements, setAchievements] = useState(() => [] as any[]);
  const { firestore, user } = useFirebase();
  const profileRef = useMemo(() => (user && firestore) ? doc(firestore, `students/${user.uid}`) : null, [user, firestore]);
  const { data: profile } = useDoc<any>(profileRef as any);

  useEffect(() => {
    // Only load client-only progress/achievements after we mount to avoid SSR/CSR mismatch
    if (!hasMounted) return;
    setProgress(getUserProgress());
    setAchievements(getAchievements());
  }, [hasMounted]);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col items-center space-y-4 mb-8">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profile?.profilePictureUrl || "https://placehold.co/100x100.png"} alt={profile?.studentName || "Student Name"} />
          <AvatarFallback>{profile?.studentName?.charAt(0)?.toUpperCase() || 'SN'}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-2xl font-bold font-headline">{profile?.studentName || 'Student Name'}</h1>
          <p className="text-muted-foreground">{profile?.studentClass || 'JHS student'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <BookCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.lessonsCompleted}</div>
            <p className="text-xs text-muted-foreground">Keep up the great work!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Quiz Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.averageQuizScore}%</div>
            <p className="text-xs text-muted-foreground">Based on {progress.quizzesTaken} quizzes taken.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.points}</div>
            <p className="text-xs text-muted-foreground">+10 for each lesson</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-6 w-6 text-primary" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((ach) => (
              <div key={ach.id} className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${ach.unlocked ? 'bg-accent' : 'bg-muted'}`}>
                  <ach.icon className={`h-6 w-6 ${ach.unlocked ? 'text-accent-foreground' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <p className={`font-semibold ${!ach.unlocked && 'text-muted-foreground'}`}>{ach.name}</p>
                  <p className={`text-sm ${ach.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
