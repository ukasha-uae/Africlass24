import { QuizAttempt } from './types';

const LOCAL_ATTEMPTS_KEY = 'userQuizAttempts';

export const getLocalQuizAttempts = (): QuizAttempt[] => {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(LOCAL_ATTEMPTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as QuizAttempt[];
  } catch (e) {
    console.error('Failed to parse local quiz attempts', e);
    return [];
  }
};

export const saveLocalQuizAttempt = (attempt: QuizAttempt) => {
  if (typeof window === 'undefined') return;
  const attempts = getLocalQuizAttempts();
  // Add an id if not present
  const withId = { ...attempt, id: attempt.id || `${Date.now()}_${Math.random().toString(36).slice(2)}` } as QuizAttempt;
  attempts.push(withId);
  localStorage.setItem(LOCAL_ATTEMPTS_KEY, JSON.stringify(attempts));
};

export const clearLocalQuizAttempts = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LOCAL_ATTEMPTS_KEY);
};

export const removeLocalQuizAttemptById = (id?: string) => {
  if (!id || typeof window === 'undefined') return;
  const attempts = getLocalQuizAttempts();
  const filtered = attempts.filter((a) => a.id !== id);
  localStorage.setItem(LOCAL_ATTEMPTS_KEY, JSON.stringify(filtered));
};
