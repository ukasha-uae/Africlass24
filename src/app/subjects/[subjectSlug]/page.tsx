
'use client';

import { getSubjectBySlug } from '@/lib/jhs-data';
import { notFound, useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useCollection, useFirebase } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import type { Topic, Lesson } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import CreativeLoading from '@/components/CreativeLoading';
import { useEffect, useState, useMemo } from 'react';

type TopicWithLessons = Topic & { lessons: Lesson[] };

export default function SubjectPage() {
  const params = useParams();
  const subjectSlug = params.subjectSlug as string;
  const { firestore } = useFirebase();

  // We can't store icons in firestore, so we get static info locally.
  const subjectInfo = getSubjectBySlug(subjectSlug);

  const topicsQuery = useMemo(
    () => (firestore ? collection(firestore, `subjects/${subjectSlug}/topics`) : null),
    [firestore, subjectSlug]
  );
  const { data: topics, isLoading: isLoadingTopics } = useCollection<Topic>(topicsQuery);

  const [topicsWithLessons, setTopicsWithLessons] = useState<Record<string, TopicWithLessons[]>>({});
  const [isLoadingLessons, setIsLoadingLessons] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // If we have topics from Firestore, try to load their lessons
      if (topics && topics.length > 0 && firestore) {
        setIsLoadingLessons(true);
        const allTopicsWithLessons: Record<string, TopicWithLessons[]> = {
          'JHS 1': [],
          'JHS 2': [],
          'JHS 3': [],
        };

        try {
          for (const topic of topics) {
            const lessonsColRef = collection(firestore, `subjects/${subjectSlug}/topics/${topic.slug}/lessons`);
            const lessonsSnapshot = await getDocs(lessonsColRef);
            const lessons = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lesson));
            const topicWithLessons = { ...topic, lessons };
            
            const level = (topic as any).jhsLevel || 'JHS 1'; // Fallback level
            if (allTopicsWithLessons[level]) {
              allTopicsWithLessons[level].push(topicWithLessons);
            }
          }
          setTopicsWithLessons(allTopicsWithLessons);
        } catch (e) {
          console.error("Error loading from Firestore, falling back to local", e);
          // Fallback logic below will run if we don't return here, 
          // but we need to be careful about state updates.
        }
        setIsLoadingLessons(false);
        return; 
      }

      // Fallback: If Firestore is loading, wait.
      if (isLoadingTopics && firestore) {
        return;
      }

      // Fallback: If no topics from Firestore (or error/loading finished), use local data
      if (subjectInfo) {
        console.log("Using local subject data");
        const localData: Record<string, TopicWithLessons[]> = {
          'JHS 1': [],
          'JHS 2': [],
          'JHS 3': [],
        };
        
        subjectInfo.curriculum.forEach(levelData => {
            const level = levelData.level;
            if (localData[level]) {
                localData[level] = levelData.topics.map(t => ({
                    ...t,
                    lessons: t.lessons || []
                })) as TopicWithLessons[];
            }
        });
        setTopicsWithLessons(localData);
        setIsLoadingLessons(false);
      }
    };

    loadData();
  }, [topics, firestore, subjectSlug, isLoadingTopics]);


  if (!subjectInfo) {
    notFound();
  }

  const curriculumLevels = ['JHS 1', 'JHS 2', 'JHS 3'];

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex items-center space-x-4 mb-8">
        <subjectInfo.icon className="h-12 w-12 text-primary" />
        <div>
          <h1 className="text-4xl font-bold font-headline">{subjectInfo.name}</h1>
          <p className="text-muted-foreground">{subjectInfo.description}</p>
        </div>
      </div>

      <Tabs defaultValue={curriculumLevels[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {curriculumLevels.map((level) => (
            <TabsTrigger key={level} value={level}>
              {level}
            </TabsTrigger>
          ))}
        </TabsList>
        {(isLoadingTopics || isLoadingLessons) ? (
            curriculumLevels.map((level) => (
              <TabsContent key={level} value={level}>
                <CreativeLoading />
              </TabsContent>
            ))
          ) : (
            curriculumLevels.map((level) => (
              <TabsContent key={level} value={level}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {topicsWithLessons[level]?.map((topic) => (
                  <Card key={topic.id} className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-start">
                        <BookOpen className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                        <span>{topic.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2">
                        {topic.lessons.map((lesson) => (
                          <li key={lesson.id}>
                            <Link
                              href={`/subjects/${subjectSlug}/${topic.slug}/${lesson.slug}`}
                              className="text-primary hover:underline"
                            >
                              {lesson.title}
                            </Link>
                          </li>
                        ))}
                         {topic.lessons.length === 0 && <p className="text-sm text-muted-foreground">No lessons yet.</p>}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
               {(!topicsWithLessons[level] || topicsWithLessons[level].length === 0) && (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No topics found for {level}.</p>
                  </div>
                )}
            </TabsContent>
          ))
        )}
      </Tabs>
    </div>
  );
}
