"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { coreSubjects } from '@/lib/shs-data';
import { BookOpen, GraduationCap, ArrowRight, Trophy, Zap, Gamepad2, Users, Target } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SHSSubjectsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Mark user as SHS level for Challenge Arena
    if (typeof window !== 'undefined') {
      localStorage.setItem('userEducationLevel', 'SHS');
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <GraduationCap className="h-10 w-10 text-violet-600 dark:text-violet-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
            SHS Core Subjects
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Master the core subjects for WASSCE success. Comprehensive topics aligned with the NaCCA curriculum.
        </p>
        <div className="mt-4">
          <Link href="/shs-programmes">
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 text-base px-4 py-2">
              <GraduationCap className="h-4 w-4 mr-2" />
              View SHS Programmes & Electives
              <ArrowRight className="h-4 w-4 ml-2" />
            </Badge>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-violet-600" />
            <div>
              <p className="text-2xl font-bold">{coreSubjects.length}</p>
              <p className="text-sm text-muted-foreground">Core Subjects</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <div>
              <p className="text-2xl font-bold">
                {coreSubjects.reduce((sum, subject) => sum + subject.topics.length, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Topics</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
          <CardContent className="p-4 flex items-center gap-3">
            <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-2xl font-bold">WASSCE</p>
              <p className="text-sm text-muted-foreground">Exam Ready</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Core Subjects Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {coreSubjects.map((subject) => {
          const topicCount = subject.topics.length;
          const gradeGroups = Array.from(new Set(subject.topics.map(t => t.gradeLevel?.split('-')[0]?.trim()).filter(Boolean)));
          
          return (
            <Link key={subject.id} href={`/shs-subjects/${subject.slug}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-xl bg-violet-500/10 group-hover:bg-violet-500/20 transition-colors">
                      <BookOpen className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                    </div>
                    <Badge variant="secondary" className="font-semibold">
                      {topicCount} Topics
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {subject.name}
                  </CardTitle>
                  <CardDescription className="text-base line-clamp-2">
                    {subject.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Grade Levels */}
                    <div className="flex flex-wrap gap-2">
                      {gradeGroups.slice(0, 3).map((grade) => (
                        <Badge key={grade} variant="outline" className="text-xs">
                          {grade}
                        </Badge>
                      ))}
                      {gradeGroups.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{gradeGroups.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Sample Topics */}
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Sample Topics:</p>
                      <ul className="text-sm space-y-1">
                        {subject.topics.slice(0, 3).map((topic) => (
                          <li key={topic.id} className="flex items-center gap-2 text-muted-foreground">
                            <div className="h-1 w-1 rounded-full bg-violet-600" />
                            <span className="line-clamp-1">{topic.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action */}
                    <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-medium pt-2">
                      <span>Start Learning</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Challenge Arena Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <Link href="/challenge-arena">
          <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-violet-500/10 border-2 border-violet-300 dark:border-violet-700">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl -z-0" />
            <CardHeader className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-violet-500 dark:bg-violet-600 shadow-lg group-hover:scale-110 transition-transform">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                        SHS Challenge Arena
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Compete at WASSCE level - Are you ready?</p>
                    </div>
                  </div>
                  <CardDescription className="text-base mb-4">
                    Put your WASSCE preparation to the test! Challenge fellow SHS students, represent your school, 
                    and climb the national leaderboard with advanced level questions.
                  </CardDescription>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
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
                      <Target className="h-4 w-4 text-violet-500" />
                      <span className="font-medium">WASSCE Prep</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-violet-600 dark:text-violet-400 font-bold text-lg pt-4">
                <span>Enter Challenge Arena</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Info Banner */}
      <div className="mt-12 max-w-3xl mx-auto">
        <Card className="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border-2 border-violet-200 dark:border-violet-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-violet-600 dark:bg-violet-500">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">📚 Comprehensive WASSCE Preparation</h3>
                <p className="text-muted-foreground">
                  All core subjects are aligned with the NaCCA SBC curriculum. Click any subject to explore topics, 
                  practice questions, and prepare for your WASSCE exams.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
