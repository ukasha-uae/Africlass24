
'use client';

import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useCollection, useFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Subject } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from 'react';

import { subjects as localSubjects } from '@/lib/jhs-data';

export default function SubjectsPage() {
  const { firestore } = useFirebase();

  const subjectsQuery = useMemo(
    () => (firestore ? collection(firestore, 'subjects') : null),
    [firestore]
  );

  const { data: subjects, isLoading } = useCollection<Subject>(subjectsQuery);

  const displaySubjects = (subjects && subjects.length > 0) ? subjects : localSubjects;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Explore Your Subjects</h1>
        <p className="text-muted-foreground mt-2">
          Choose a subject to start your learning adventure.
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
          <Link key={subject.id} href={`/subjects/${subject.slug}`} passHref>
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
    </div>
  );
}
