
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BookOpen, ArrowRight, Trophy, Target, Calendar, 
  TrendingUp, Flame, Award, Brain, Clock
} from "lucide-react";
import Link from 'next/link';
import { subjects } from '@/lib/jhs-data';
import { useEffect, useState, useMemo } from 'react';
import { useFirebase, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { getUserProgress } from '@/lib/user-progress';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [todayDate, setTodayDate] = useState('');
  const [progress, setProgress] = useState(() => ({ lessonsCompleted: 0, quizzesTaken: 0, averageQuizScore: 0, points: 0 }));
  const [loading, setLoading] = useState(true);
  const { firestore, user } = useFirebase();
  const profileRef = useMemo(() => (user && firestore) ? doc(firestore, `students/${user.uid}`) : null, [user, firestore]);
  const { data: profile } = useDoc<any>(profileRef as any);

  useEffect(() => {
    setMounted(true);
    setTodayDate(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setLoading(true);
    const userProgress = getUserProgress();
    setProgress(userProgress as any);
    setTimeout(() => setLoading(false), 600); // Simulate loading for skeleton
  }, [mounted]);

  // Get real subjects from jhs-data
  const quickAccessSubjects = subjects.slice(0, 6);

  // Get actual featured lessons from different subjects
  const featuredLessons = [
    {
      ...subjects[0].curriculum[0].topics[0].lessons[0], // English - Parts of Speech
      subject: subjects[0].name,
      icon: subjects[0].icon,
      href: `/subjects/${subjects[0].slug}/${subjects[0].curriculum[0].topics[0].slug}/${subjects[0].curriculum[0].topics[0].lessons[0].slug}`
    },
    {
      ...subjects[1].curriculum[0].topics[0].lessons[0], // Mathematics - first lesson
      subject: subjects[1].name,
      icon: subjects[1].icon,
      href: `/subjects/${subjects[1].slug}/${subjects[1].curriculum[0].topics[0].slug}/${subjects[1].curriculum[0].topics[0].lessons[0].slug}`
    },
    {
      ...subjects[2].curriculum[0].topics[0].lessons[0], // Science - first lesson
      subject: subjects[2].name,
      icon: subjects[2].icon,
      href: `/subjects/${subjects[2].slug}/${subjects[2].curriculum[0].topics[0].slug}/${subjects[2].curriculum[0].topics[0].lessons[0].slug}`
    }
  ];

  if (!mounted) return null;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {/* Hero Welcome Section */}
      <section className="mb-8 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8 border">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-primary font-headline mb-2">
              Welcome Back{profile?.studentName ? `, ${profile.studentName.split(' ')[0]}` : ''}! 🎓
            </h1>
            <p className="text-muted-foreground text-lg">{todayDate}</p>
            <p className="text-muted-foreground mt-2">
              Your journey to BECE excellence continues today. Let's achieve your goals!
            </p>
          </div>
          <div className="flex gap-4">
            <Card className="p-4 bg-background/50 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-5 w-5 text-orange-500" />
                <p className="text-sm text-muted-foreground">Study Streak</p>
              </div>
              <p className="text-2xl font-bold">{(progress as any).currentStreak || 0} days</p>
              {(progress as any).currentStreak >= 3 && (
                <div className="absolute -right-2 -top-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  🔥
                </div>
              )}
            </Card>
            <Card className="p-4 bg-background/50">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <p className="text-sm text-muted-foreground">Level {(progress as any).level || 1}</p>
              </div>
              <p className="text-2xl font-bold">{(progress as any).totalXP || 0} XP</p>
              <Progress value={((progress as any).xpProgress || 0)} className="mt-2 h-1" />
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 font-headline flex items-center">
          <Target className="mr-2 h-6 w-6" /> Quick Start
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="h-full p-6 flex flex-col items-center text-center gap-2 mobile-tap-target">
                  <Skeleton className="h-8 w-8 mb-2" />
                  <Skeleton className="h-5 w-16" />
                </Card>
              ))
            : quickAccessSubjects.map((subject) => {
                const Icon = subject.icon;
                return (
                  <Link key={subject.id} href={`/subjects/${subject.slug}`}>
                    <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full mobile-tap-target">
                      <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                        <div className="p-3 rounded-full bg-primary/10">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <p className="font-semibold text-sm">{subject.name}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
        </div>
      </section>

      {/* Today's Goal */}
      <section className="mb-8">
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Learning Goal
            </CardTitle>
            <CardDescription>Complete at least 2 lessons today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-semibold">{progress.lessonsCompleted % 2} / 2 lessons</span>
              </div>
              <Progress value={(progress.lessonsCompleted % 2) * 50} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Featured Lessons */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 font-headline flex items-center">
          <Brain className="mr-2 h-6 w-6" /> Start Learning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLessons.map((lesson) => {
            const Icon = lesson.icon;
            return (
              <Card key={lesson.id} className="overflow-hidden hover:shadow-xl transition-all hover:scale-105 border-2">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                  <Icon className="h-16 w-16 text-primary" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{lesson.subject}</Badge>
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      15 min
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {lesson.introduction?.substring(0, 100)}...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" size="lg">
                    <Link href={lesson.href}>
                      Start Lesson <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* BECE Preparation */}
      <section className="mb-8">
        <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-2 border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-amber-600" />
              BECE Preparation
            </CardTitle>
            <CardDescription>Get ready for your exams with targeted practice</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button asChild variant="default">
              <Link href="/past-questions">
                <BookOpen className="mr-2 h-4 w-4" />
                Past Questions
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/quiz">
                <TrendingUp className="mr-2 h-4 w-4" />
                Practice Quizzes
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/subjects">
                <Target className="mr-2 h-4 w-4" />
                All Subjects
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
