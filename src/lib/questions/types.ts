// Shared types for question banks
export type EducationLevel = 'Primary' | 'JHS' | 'SHS';
export type ClassLevel = 'JHS 1' | 'JHS 2' | 'JHS 3' | 'SHS 1' | 'SHS 2' | 'SHS 3' | 'Primary 1' | 'Primary 2' | 'Primary 3' | 'Primary 4' | 'Primary 5' | 'Primary 6';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface ChallengeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  classLevel?: ClassLevel;
  level: EducationLevel;
  explanation?: string;
  topic?: string;
}
