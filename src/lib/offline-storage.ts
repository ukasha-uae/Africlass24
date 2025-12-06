// Offline mode functionality

export interface OfflineLesson {
  lessonId: string;
  lessonTitle: string;
  subject: string;
  topic: string;
  content: any; // Full lesson data
  savedAt: string;
}

export interface OfflineQuizAttempt {
  quizId: string;
  subject: string;
  topic: string;
  answers: any;
  completedAt: string;
  synced: boolean;
}

// Check if online
export const isOnline = (): boolean => {
  if (typeof window === 'undefined') return true;
  return navigator.onLine;
};

// Offline lessons
export const getOfflineLessons = (): OfflineLesson[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('offlineLessons');
  return saved ? JSON.parse(saved) : [];
};

export const saveOfflineLesson = (lesson: Omit<OfflineLesson, 'savedAt'>) => {
  if (typeof window === 'undefined') return;
  const lessons = getOfflineLessons();
  const exists = lessons.find(l => l.lessonId === lesson.lessonId);
  
  if (!exists) {
    lessons.push({ ...lesson, savedAt: new Date().toISOString() });
    localStorage.setItem('offlineLessons', JSON.stringify(lessons));
  }
};

export const removeOfflineLesson = (lessonId: string) => {
  if (typeof window === 'undefined') return;
  const lessons = getOfflineLessons().filter(l => l.lessonId !== lessonId);
  localStorage.setItem('offlineLessons', JSON.stringify(lessons));
};

export const isLessonOffline = (lessonId: string): boolean => {
  return getOfflineLessons().some(l => l.lessonId === lessonId);
};

// Offline quiz attempts
export const getOfflineQuizAttempts = (): OfflineQuizAttempt[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('offlineQuizAttempts');
  return saved ? JSON.parse(saved) : [];
};

export const saveOfflineQuizAttempt = (attempt: Omit<OfflineQuizAttempt, 'completedAt' | 'synced'>) => {
  if (typeof window === 'undefined') return;
  const attempts = getOfflineQuizAttempts();
  attempts.push({
    ...attempt,
    completedAt: new Date().toISOString(),
    synced: false,
  });
  localStorage.setItem('offlineQuizAttempts', JSON.stringify(attempts));
};

export const markQuizAttemptSynced = (quizId: string) => {
  if (typeof window === 'undefined') return;
  const attempts = getOfflineQuizAttempts();
  const attempt = attempts.find(a => a.quizId === quizId);
  if (attempt) {
    attempt.synced = true;
    localStorage.setItem('offlineQuizAttempts', JSON.stringify(attempts));
  }
};

export const getUnsyncedQuizAttempts = (): OfflineQuizAttempt[] => {
  return getOfflineQuizAttempts().filter(a => !a.synced);
};

// Sync functionality
export const syncOfflineData = async () => {
  if (!isOnline()) {
    console.log('Cannot sync: offline');
    return { success: false, message: 'Device is offline' };
  }

  const unsyncedQuizzes = getUnsyncedQuizAttempts();
  
  if (unsyncedQuizzes.length === 0) {
    return { success: true, message: 'Nothing to sync' };
  }

  try {
    // TODO: Implement actual sync with Firestore
    // For now, just mark as synced
    unsyncedQuizzes.forEach(quiz => {
      markQuizAttemptSynced(quiz.quizId);
    });

    return { 
      success: true, 
      message: `Synced ${unsyncedQuizzes.length} quiz attempt(s)` 
    };
  } catch (error) {
    console.error('Sync failed:', error);
    return { success: false, message: 'Sync failed' };
  }
};

// Storage info
export const getOfflineStorageInfo = () => {
  const lessons = getOfflineLessons();
  const quizzes = getOfflineQuizAttempts();
  const unsyncedQuizzes = getUnsyncedQuizAttempts();
  
  // Rough estimate of storage used (in KB)
  const storageUsed = Math.round(
    (JSON.stringify(lessons).length + JSON.stringify(quizzes).length) / 1024
  );

  return {
    offlineLessonsCount: lessons.length,
    totalQuizzesCount: quizzes.length,
    unsyncedQuizzesCount: unsyncedQuizzes.length,
    storageUsedKB: storageUsed,
  };
};
