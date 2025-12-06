// This is a mock implementation. In a real app, this would come from a database.
// We'll use localStorage to persist some data for this simulation.

const getStoredProgress = () => {
  if (typeof window === 'undefined') {
    return { completedLessons: [], quizScores: [] };
  }
  const saved = localStorage.getItem('userProgress');
  return saved ? JSON.parse(saved) : { completedLessons: [], quizScores: [] };
};

const saveProgress = (progress: any) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('userProgress', JSON.stringify(progress));
};

export const addQuizScore = (score: number) => {
    const progress = getStoredProgress();
    progress.quizScores.push(score);
    saveProgress(progress);
};
