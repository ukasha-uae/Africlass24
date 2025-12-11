
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, BookOpen, ArrowRight, Sparkles, 
  Users, Trophy, Target, Brain
} from "lucide-react";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const campuses = [
    {
      id: 'primary',
      name: 'Primary School',
      shortName: 'Primary',
      description: 'Class 1-6: Building Strong Foundations',
      gradient: 'from-green-500 to-emerald-500',
      icon: BookOpen,
      features: ['Age-Appropriate Content', 'Fun Learning Games', 'Basic Skills Building', 'Parent Monitoring'],
      href: '/subjects/primary',
      studentCount: '5,000+',
      classes: 'Class 1-6'
    },
    {
      id: 'jhs',
      name: 'Junior High School',
      shortName: 'JHS',
      description: 'Basic Education Certificate Examination (BECE) Preparation',
      gradient: 'from-blue-500 to-cyan-500',
      icon: BookOpen,
      features: ['Interactive Lessons', 'School Battles', 'Progress Tracking', 'BECE Practice'],
      href: '/subjects/jhs',
      studentCount: '12,000+',
      classes: 'JHS 1-3'
    },
    {
      id: 'shs',
      name: 'Senior High School',
      shortName: 'SHS',
      description: 'West African Senior School Certificate Examination (WASSCE) Preparation',
      gradient: 'from-violet-500 to-purple-500',
      icon: GraduationCap,
      features: ['NSMQ-Style Battles', 'Virtual Labs', 'Past Questions', 'WASSCE Prep'],
      href: '/subjects/shs',
      studentCount: '10,000+',
      classes: 'SHS 1-3'
    }
  ];

  const stats = [
    { label: 'Active Students', value: '27,000+', icon: Users },
    { label: 'Success Rate', value: '96%', icon: Trophy },
    { label: 'Education Levels', value: '3', icon: Target },
    { label: 'AI-Powered', value: 'Yes', icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-12 w-12 text-violet-600 dark:text-violet-400" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 dark:from-violet-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              SmartC24
            </h1>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Ghana's Premier Learning Platform
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Your complete educational journey from Primary School through SHS. Master concepts with AI-powered lessons, 
            NSMQ-style competitions, interactive practice, and comprehensive exam preparation.
          </p>
          <div className="flex gap-2 justify-center items-center mt-4">
            <span className="text-sm text-muted-foreground">Covering:</span>
            <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">Primary</span>
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">JHS</span>
            <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium">SHS</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="text-center p-6 hover:shadow-lg transition-shadow">
                <Icon className="h-8 w-8 mx-auto mb-2 text-violet-600 dark:text-violet-400" />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Campus Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Campus</h2>
          <p className="text-center text-muted-foreground mb-8">Select your education level to access tailored content and features</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {campuses.map((campus) => {
              const Icon = campus.icon;
              return (
                <Card 
                  key={campus.id}
                  className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-violet-500"
                >
                  <CardContent className="p-8">
                    <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${campus.gradient} mb-6`}>
                      <Icon className="h-12 w-12 text-white" />
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{campus.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${campus.gradient} text-white font-semibold`}>
                          {campus.shortName}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{campus.description}</p>
                      <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">{campus.classes}</p>
                    </div>

                    <div className="space-y-2 mb-6">
                      {campus.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${campus.gradient}`}></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {campus.studentCount} students
                      </span>
                      <Link 
                        href={campus.href}
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            const levelMap: Record<string, string> = {
                              'primary': 'Primary',
                              'jhs': 'JHS',
                              'shs': 'SHS'
                            };
                            localStorage.setItem('userEducationLevel', levelMap[campus.id]);
                          }
                        }}
                      >
                        <Button 
                          size="lg"
                          className={`bg-gradient-to-r ${campus.gradient} hover:opacity-90 transition-opacity`}
                        >
                          Enter Campus
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Explore Additional Features</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/challenge-arena">
              <Button variant="outline" size="lg">
                Challenge Arena
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/study-groups">
              <Button variant="outline" size="lg">
                Study Groups
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/virtual-labs">
              <Button variant="outline" size="lg">
                Virtual Labs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/past-questions">
              <Button variant="outline" size="lg">
                Past Questions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
