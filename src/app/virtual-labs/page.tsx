"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { virtualLabExperiments } from '@/lib/virtual-labs-data';
import { FlaskConical, Atom, Dna, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function VirtualLabsPage() {
  const [filter, setFilter] = useState<'All' | 'Biology' | 'Chemistry' | 'Physics' | 'Science'>('All');

  const subjectIcons = {
    Biology: Dna,
    Chemistry: FlaskConical,
    Physics: Zap,
    Science: Atom
  };

  const subjectColors = {
    Biology: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30',
    Chemistry: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/30',
    Physics: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30',
    Science: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30'
  };

  const filteredExperiments = filter === 'All' 
    ? virtualLabExperiments.experiments 
    : virtualLabExperiments.experiments.filter(exp => exp.subject === filter);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FlaskConical className="h-10 w-10 text-violet-600 dark:text-violet-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Virtual Labs
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Interactive science experiments at your fingertips. Explore {virtualLabExperiments.experiments.length} virtual labs covering Biology, Chemistry, and Physics.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {(['All', 'Biology', 'Chemistry', 'Physics', 'Science'] as const).map((subject) => (
          <button
            key={subject}
            onClick={() => setFilter(subject)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === subject
                ? 'bg-violet-600 text-white shadow-lg'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(subjectIcons).map(([subject, Icon]) => {
          const count = virtualLabExperiments.experiments.filter(exp => exp.subject === subject).length;
          return (
            <Card key={subject}>
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className={`h-8 w-8 ${subject === 'Biology' ? 'text-green-600' : subject === 'Chemistry' ? 'text-orange-600' : subject === 'Physics' ? 'text-blue-600' : 'text-purple-600'}`} />
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground">{subject}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Experiments Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiments.map((experiment) => {
          const Icon = subjectIcons[experiment.subject as keyof typeof subjectIcons];
          const colorClass = subjectColors[experiment.subject as keyof typeof subjectColors];
          
          return (
            <Link key={experiment.id} href={`/virtual-labs/${experiment.slug}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Icon className="h-8 w-8" />
                    <Badge className={`${colorClass} border`}>
                      {experiment.subject}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{experiment.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {experiment.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FlaskConical className="h-4 w-4" />
                    <span>Interactive Experiment</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {filteredExperiments.length === 0 && (
        <div className="text-center py-12">
          <FlaskConical className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">No experiments found for {filter}</p>
        </div>
      )}
    </div>
  );
}
