
'use client';

import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Trophy, Zap, Gamepad2, Users } from 'lucide-react';
import { useCollection, useFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Subject } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useParams, notFound } from 'next/navigation';

import { subjects as localSubjects } from '@/lib/jhs-data';
import { primarySubjects } from '@/lib/primary-data';
import { coreSubjects as shsSubjects } from '@/lib/shs-data';

type EducationLevel = 'primary' | 'jhs' | 'shs';
type PrimaryClass = 'Class 1' | 'Class 2' | 'Class 3' | 'Class 4' | 'Class 5' | 'Class 6' | 'All';

export default function LevelSubjectsPage() {
  const params = useParams();
  const levelParam = params.level as string;
  const { firestore } = useFirebase();
  const [selectedClass, setSelectedClass] = useState<PrimaryClass>('All');
  
  // Validate level parameter - default to jhs if invalid
  const isValidLevel = ['primary', 'jhs', 'shs'].includes(levelParam?.toLowerCase());
  const educationLevel = (isValidLevel ? levelParam.toLowerCase() : 'jhs') as EducationLevel;

  // Store education level in localStorage for consistent experience
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const capitalizedLevel = educationLevel.charAt(0).toUpperCase() + educationLevel.slice(1);
      localStorage.setItem('userEducationLevel', capitalizedLevel === 'Primary' ? 'Primary' : capitalizedLevel.toUpperCase());
    }
  }, [educationLevel]);

  const subjectsQuery = useMemo(
    () => (firestore && educationLevel === 'jhs' ? collection(firestore, 'subjects') : null),
    [firestore, educationLevel]
  );

  const { data: subjects, isLoading } = useCollection<Subject>(subjectsQuery);

  // Determine which subjects to display based on education level
  const getDisplaySubjects = () => {
    if (educationLevel === 'primary') {
      // For Primary, filter subjects by selected class
      if (selectedClass === 'All') {
        return primarySubjects;
      }
      // Filter topics by class level
      return primarySubjects.map((subject: any) => ({
        ...subject,
        topics: subject.topics.filter((topic: any) => topic.gradeLevel === selectedClass)
      })).filter((subject: any) => subject.topics.length > 0);
    }
    if (educationLevel === 'shs') {
      // For SHS, use SHS subjects
      return shsSubjects;
    }
    // For JHS, use Firestore or local data
    return (subjects && subjects.length > 0) ? subjects : localSubjects;
  };

  const displaySubjects = getDisplaySubjects();

  const primaryClasses: PrimaryClass[] = ['All', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'];

  // Get level display name
  const getLevelName = () => {
    switch (educationLevel) {
      case 'primary': return 'Primary School';
      case 'jhs': return 'JHS';
      case 'shs': return 'SHS';
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {/* Class Selector for Primary */}
      {educationLevel === 'primary' && (
        <div className="mb-6">
          <p className="text-center text-sm text-muted-foreground mb-3">Select Class Level</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {primaryClasses.map((cls) => (
              <Button
                key={cls}
                variant={selectedClass === cls ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedClass(cls)}
                className={selectedClass === cls ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {cls}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">
          {getLevelName()} Subjects
        </h1>
        <p className="text-muted-foreground mt-2">
          {educationLevel === 'primary' 
            ? `Explore ${selectedClass === 'All' ? 'all Primary School' : selectedClass} subjects and topics`
            : 'Choose a subject to start your learning adventure.'}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (!displaySubjects || displaySubjects.length === 0) && (
          <>
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </>
        )}
        {displaySubjects && displaySubjects.map((subject) => (
          <Link key={subject.id} href={`/subjects/${educationLevel}/${subject.slug}`} passHref>
            <Card className="h-full flex flex-col hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex-grow">
                <div className="flex items-center mb-4">
                   <BookOpen className="h-8 w-8 text-primary mr-4" />
                  <CardTitle className="font-headline">{subject.name}</CardTitle>
                </div>
                <CardDescription>{subject.description}</CardDescription>
              </CardHeader>
              <div className="p-6 pt-0 mt-auto">
                 <div className="flex items-center text-primary font-semibold">
                    View Topics
                    <ArrowRight className="ml-2 h-4 w-4" />
                 </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Challenge Arena Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <Link href="/challenge-arena">
          <Card className={`relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group border-2 ${
            educationLevel === 'primary' 
              ? 'bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/10 border-green-300 dark:border-green-700'
              : educationLevel === 'jhs'
              ? 'bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 border-blue-300 dark:border-blue-700'
              : 'bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-violet-500/10 border-violet-300 dark:border-violet-700'
          }`}>
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -z-0 ${
              educationLevel === 'primary'
                ? 'bg-gradient-to-br from-green-400/20 to-emerald-400/20'
                : educationLevel === 'jhs'
                ? 'bg-gradient-to-br from-blue-400/20 to-cyan-400/20'
                : 'bg-gradient-to-br from-violet-400/20 to-purple-400/20'
            }`} />
            <CardHeader className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform ${
                      educationLevel === 'primary'
                        ? 'bg-green-500 dark:bg-green-600'
                        : educationLevel === 'jhs'
                        ? 'bg-blue-500 dark:bg-blue-600'
                        : 'bg-violet-500 dark:bg-violet-600'
                    }`}>
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                        educationLevel === 'primary'
                          ? 'from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400'
                          : educationLevel === 'jhs'
                          ? 'from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400'
                          : 'from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400'
                      }`}>
                        {getLevelName()} Challenge Arena
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {educationLevel === 'primary'
                          ? 'Fun learning games and friendly competitions!'
                          : 'Battle, compete, and climb the leaderboard!'}
                      </p>
                    </div>
                  </div>
                  <CardDescription className="text-base mb-4">
                    {educationLevel === 'primary'
                      ? 'Have fun while learning! Play educational games, earn badges, and compete with classmates in a safe, friendly environment.'
                      : 'Test your knowledge in exciting multiplayer quiz battles. Challenge your friends, compete with other schools, and prove you\'re the best in Ghana!'}
                  </CardDescription>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {educationLevel === 'primary' ? (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Gamepad2 className="h-4 w-4 text-green-500" />
                          <span className="font-medium">Fun Games</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">Earn Badges</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">Class Challenges</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Zap className="h-4 w-4 text-orange-500" />
                          <span className="font-medium">Practice Mode</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">Quick Match</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-green-500" />
                          <span className="font-medium">School Battles</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          <span className="font-medium">Leaderboards</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Gamepad2 className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">Practice Mode</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className={`flex items-center gap-3 font-bold text-lg pt-4 ${
                educationLevel === 'primary'
                  ? 'text-green-600 dark:text-green-400'
                  : educationLevel === 'jhs'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-violet-600 dark:text-violet-400'
              }`}>
                <span>Enter Challenge Arena</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
