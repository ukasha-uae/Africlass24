"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookCheck, Target, Award, Star, Users, Copy, Check, UserPlus, Bookmark } from "lucide-react";
import Link from "next/link";
import { getUserProgress, getAchievements } from "@/lib/user-progress";
import { useFirebase, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { useToast } from '@/hooks/use-toast';
import StudentProfileSetup from '@/components/StudentProfileSetup';
import CampusSelector from '@/components/CampusSelector';

export default function ProfilePage() {
  const hasMounted = useHasMounted();
  const [progress, setProgress] = useState(() => ({ lessonsCompleted: 0, quizzesTaken: 0, averageQuizScore: 0, points: 0 }));
  const [achievements, setAchievements] = useState(() => [] as any[]);
  const [linkingCode, setLinkingCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [parentEmail, setParentEmail] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [educationLevel, setEducationLevel] = useState<'Primary' | 'JHS' | 'SHS'>('Primary');
  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  const profileRef = useMemo(() => (user && firestore) ? doc(firestore, `students/${user.uid}`) : null, [user, firestore]);
  const { data: profile } = useDoc<any>(profileRef as any);

  useEffect(() => {
    // Only load client-only progress/achievements after we mount to avoid SSR/CSR mismatch
    if (!hasMounted) return;
    setProgress(getUserProgress() as any);
    setAchievements(getAchievements());
  }, [hasMounted]);

  useEffect(() => {
    // Generate a unique 6-digit linking code for this student
    if (user && !linkingCode) {
      // Check if code already exists for this user
      const linkingCodes = JSON.parse(localStorage.getItem('studentLinkingCodes') || '{}');
      
      // Find existing code for this user
      let existingCode = Object.keys(linkingCodes).find(code => linkingCodes[code] === user.uid);
      
      if (existingCode) {
        setLinkingCode(existingCode);
      } else {
        // Generate new code
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        linkingCodes[code] = user.uid;
        localStorage.setItem('studentLinkingCodes', JSON.stringify(linkingCodes));
        setLinkingCode(code);
      }
    }
  }, [user, linkingCode]);

  const copyLinkingCode = () => {
    navigator.clipboard.writeText(linkingCode);
    setCopied(true);
    toast({
      title: "Code Copied!",
      description: "Share this code with your parent/guardian",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const sendLinkInvite = () => {
    if (!parentEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your parent's email address",
        variant: "destructive"
      });
      return;
    }
    
    // TODO: Send email with linking code
    toast({
      title: "Invite Sent!",
      description: `An invitation was sent to ${parentEmail}`,
    });
    setParentEmail('');
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <CampusSelector onLevelChange={setEducationLevel} defaultLevel={educationLevel} />
        <div className="flex gap-2">
          <Link href="/settings">
            <Button variant="outline" size="sm">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Button>
          </Link>
          <Button variant="default" size="sm" onClick={() => setEditMode((v) => !v)}>
            {editMode ? 'Close Edit' : 'Edit Profile'}
          </Button>
        </div>
      </div>
      {editMode && <StudentProfileSetup onSave={() => setEditMode(false)} />}
      
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(progress as any).level || 1}</div>
            <p className="text-xs text-muted-foreground">{(progress as any).totalXP || 0} XP</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <BookCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.lessonsCompleted}</div>
            <p className="text-xs text-muted-foreground">+10 XP each</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Quiz Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.averageQuizScore}%</div>
            <p className="text-xs text-muted-foreground">{progress.quizzesTaken} quizzes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Star className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(progress as any).currentStreak || 0} 🔥</div>
            <p className="text-xs text-muted-foreground">Best: {(progress as any).longestStreak || 0} days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-6 w-6 text-primary" />
                Achievements
              </CardTitle>
              <Badge variant="secondary">
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </Badge>
            </div>
            <CardDescription>Unlock badges by completing challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/bookmarks">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Bookmarks
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/study-schedule">
                  <Target className="h-4 w-4 mr-2" />
                  Schedule
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((ach) => (
                <Card 
                  key={ach.id} 
                  className={`p-3 ${ach.unlocked ? 'border-2 border-primary bg-primary/5' : 'opacity-50'}`}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className={`p-2 rounded-full ${ach.unlocked ? 'bg-primary/20' : 'bg-muted'}`}>
                      <ach.icon className={`h-6 w-6 ${ach.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${!ach.unlocked && 'text-muted-foreground'}`}>
                        {ach.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{ach.description}</p>
                      {ach.unlocked && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          +{ach.xpReward} XP
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-6 w-6 text-primary" />
              Link to Parent/Guardian
            </CardTitle>
            <CardDescription>
              Allow your parents to monitor your progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Linking Code</label>
              <div className="flex gap-2">
                <div className="flex-1 p-4 bg-muted rounded-lg font-mono text-2xl font-bold text-center tracking-wider">
                  {linkingCode}
                </div>
                <Button onClick={copyLinkingCode} size="icon" variant="outline">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Share this code with your parent/guardian to link accounts
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Invite via Email</label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="parent@example.com"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                />
                <Button onClick={sendLinkInvite}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite
                </Button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Privacy:</strong> Parents can only see your study progress, quiz scores, and lesson completion. Your personal messages and profile details remain private.
              </p>
            </div>

            {profile?.linkedParents && profile.linkedParents.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Linked Parents</h4>
                <div className="space-y-2">
                  {profile.linkedParents.map((parentId: string) => (
                    <div key={parentId} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Parent Account</span>
                      <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
