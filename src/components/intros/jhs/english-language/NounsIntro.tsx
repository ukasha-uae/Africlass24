'use client';

import React from 'react';
import IntelligentLessonIntro from '@/components/IntelligentLessonIntro';
import { BookOpen, Target, Lightbulb, Award, Trophy } from 'lucide-react';

const NounsIntro = ({ onComplete }: { onComplete?: () => void }) => {
  const scenes = [
    {
      id: 0,
      icon: BookOpen,
      narration: "Welcome to our lesson on Nouns! Nouns are the foundation of every sentence - they name people, places, animals, things, and ideas. Without nouns, we couldn't communicate! Think about it: every sentence needs at least one noun. Today, you'll master all the types of nouns, learn how to form plurals, understand gender, and discover how nouns function in sentences. This knowledge is essential for your BECE examination!",
      visualContent: "Welcome to Nouns: The Foundation of Language",
      highlightWords: ['Nouns', 'foundation', 'people', 'places', 'animals', 'things', 'ideas', 'BECE'],
      teacherTip: "Start by asking students to name nouns they see in the classroom - this makes the concept immediately relatable."
    },
    {
      id: 1,
      icon: Target,
      narration: "You'll learn five main types of nouns! Proper nouns name specific people and places - like Kwame Nkrumah, Accra, or Ghana - and always start with capital letters. Common nouns are general names like boy, city, or school. Concrete nouns are things you can see and touch, like mango or chair. Abstract nouns are ideas and feelings like love or courage. And collective nouns name groups, like team or class. Understanding these types helps you answer BECE questions correctly!",
      visualContent: "Five Types of Nouns: Proper, Common, Concrete, Abstract, Collective",
      highlightWords: ['five types', 'Proper nouns', 'Common nouns', 'Concrete nouns', 'Abstract nouns', 'Collective nouns'],
      teacherTip: "Use Ghanaian examples: Kwame Nkrumah (proper), kenkey (concrete), freedom (abstract), team (collective)."
    },
    {
      id: 2,
      icon: Lightbulb,
      narration: "You'll also master number and gender! Learn how to form regular plurals by adding 's' or 'es', and memorize irregular plurals like children, men, and mice. Understand the difference between countable nouns like books and uncountable nouns like water. Discover gender pairs like king and queen, actor and actress. And learn how to use apostrophes correctly for possessive nouns - like the girl's book or the students' uniforms. These rules appear in almost every BECE exam!",
      visualContent: "Master Number, Gender, and Possessive Forms",
      highlightWords: ['plurals', 'irregular plurals', 'countable', 'uncountable', 'gender pairs', 'apostrophes', 'possessive'],
      teacherTip: "Common BECE mistakes: forgetting apostrophes in possessives, using wrong plural forms, confusing countable/uncountable."
    },
    {
      id: 3,
      icon: Award,
      narration: "Finally, you'll discover how nouns function in sentences! Nouns can be subjects doing the action, objects receiving the action, or complements describing the subject. They can also be objects of prepositions. Understanding these functions helps you write better sentences and answer grammar questions correctly. You'll practice with exercises and past BECE questions to build confidence!",
      visualContent: "Nouns in Action: Subject, Object, Complement, and More",
      highlightWords: ['subjects', 'objects', 'complements', 'functions', 'BECE questions'],
      teacherTip: "Have students identify noun functions in sentences - this active practice improves understanding faster than memorization."
    },
    {
      id: 4,
      icon: Trophy,
      narration: "By the end of this lesson, you'll be able to identify and classify any noun, form plurals correctly, use possessives with proper apostrophes, and understand how nouns work in sentences. This knowledge is your foundation for mastering English grammar and excelling in your BECE examination. Let's begin our journey into the world of nouns!",
      visualContent: "Ready to Master Nouns? Let's Begin!",
      highlightWords: ['identify', 'classify', 'plurals', 'possessives', 'BECE examination'],
      teacherTip: "Encourage students to practice with real examples from their daily lives - this makes learning stick!"
    },
  ];

  return (
    <IntelligentLessonIntro
      lessonTitle="Nouns"
      subject="English Language"
      scenes={scenes}
      onComplete={onComplete}
    />
  );
};

export default NounsIntro;


