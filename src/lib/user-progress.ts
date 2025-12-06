import { BookCopy, BrainCircuit, Star } from 'lucide-react';

// This is a mock implementation. In a real app, this would come from a database.
// We'll use localStorage to persist some data for this simulation.

const getStoredProgress = () => {
  if (typeof window === 'undefined') {
    return { completedLessons: [], quizScores: [] };
  }
  const saved = localStorage.getItem('userProgress');
  return saved ? JSON.parse(saved) : { completedLessons: [], quizScores: [] };
};

export const getUserProgress = () => {
  const progress = getStoredProgress();
  const lessonsCompleted = progress.completedLessons.length;
  const quizzesTaken = progress.quizScores.length;
  const totalScore = progress.quizScores.reduce((sum: number, score: number) => sum + score, 0);
  const averageQuizScore = quizzesTaken > 0 ? Math.round(totalScore / quizzesTaken) : 0;
  const points = lessonsCompleted * 10; // Simple points system

  return {
    lessonsCompleted,
    quizzesTaken,
    averageQuizScore,
    points,
  };
};

export const markLessonAsComplete = (lessonId: string) => {
    if (typeof window === 'undefined') return;
    const progress = getStoredProgress();
    if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
        localStorage.setItem('userProgress', JSON.stringify(progress));
    }
};

export const isLessonCompleted = (lessonId: string): boolean => {
    if (typeof window === 'undefined') return false;
    const progress = getStoredProgress();
    return progress.completedLessons.includes(lessonId);
};


export const getAchievements = () => {
  const progress = getUserProgress();

  const allAchievements = [
    {
      id: 'first-steps',
      name: 'First Steps',
      description: 'Complete your first lesson.',
      icon: Star,
      unlocked: progress.lessonsCompleted >= 1,
    },
    {
      id: 'bookworm',
      name: 'Bookworm',
      description: 'Complete 5 lessons.',
      icon: BookCopy,
      unlocked: progress.lessonsCompleted >= 5,
    },
    {
      id: 'quiz-whiz',
      name: 'Quiz Whiz',
      description: 'Complete your first quiz.',
      icon: BrainCircuit,
      unlocked: progress.quizzesTaken >= 1,
    },
  ];

  return allAchievements;
};
