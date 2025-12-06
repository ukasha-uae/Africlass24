
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Lightbulb } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";

const recentTopics = [
  { title: "Introduction to Nouns", subject: "English Language", href: "#" },
  { title: "Photosynthesis", subject: "Integrated Science", href: "#" },
  { title: "The Mole Concept", subject: "Integrated Science", href: "#" },
];

const featuredLessons = [
  { title: "Understanding Integers", subject: "Core Mathematics", description: "Master the basics of positive and negative numbers.", href: "/subjects/core-mathematics/integers", image: "https://placehold.co/600x400.png", dataAiHint: "mathematics abstract" },
  { title: "Social and Economic Development", subject: "Social Studies", description: "Learn about the factors that drive development.", href: "/subjects/social-studies/social-economic-development", image: "https://placehold.co/600x400.png", dataAiHint: "community development" },
  { title: "Introduction to ICT", subject: "Computing", description: "Explore the world of Information and Communication Technology.", href: "/subjects/computing/introduction-to-ict", image: "https://placehold.co/600x400.png", dataAiHint: "computer technology" },
];

export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
       <section className="mb-8 rounded-lg bg-card p-6 text-card-foreground shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-primary font-headline">Welcome back, Student!</h1>
          <p className="text-muted-foreground mt-2">Ready to learn something new today? Let's get started.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 font-headline flex items-center"><BookOpen className="mr-2 h-6 w-6" /> Recently Viewed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentTopics.map((topic) => (
            <Card key={topic.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{topic.title}</p>
                  <p className="text-sm text-muted-foreground">{topic.subject}</p>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={topic.href}><ArrowRight className="h-5 w-5" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 font-headline flex items-center"><Lightbulb className="mr-2 h-6 w-6" /> Featured Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLessons.map((lesson) => (
            <Card key={lesson.title} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
               <Image src={lesson.image} alt={lesson.title} width={600} height={400} className="w-full h-40 object-cover" data-ai-hint={lesson.dataAiHint} />
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{lesson.description}</p>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href={lesson.href}>Start Lesson <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
