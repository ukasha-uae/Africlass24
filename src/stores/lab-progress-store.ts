import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LabCompletion {
  labId: string;
  completedAt: Date;
  score: number;
  timeSpent: number;
  xpEarned: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: Date;
}

interface LabProgressStore {
  completedLabs: Record<string, LabCompletion>;
  totalXP: number;
  streak: number;
  lastCompletedDate: string | null;
  badges: Badge[];
  
  markLabComplete: (labId: string, score: number, timeSpent: number) => number;
  addXP: (amount: number) => void;
  updateStreak: () => void;
  checkForBadges: () => void;
  awardBadge: (badge: Badge) => void;
  getLabCompletion: (labId: string) => LabCompletion | undefined;
  isLabCompleted: (labId: string) => boolean;
}

const calculateXP = (score: number, timeSpent: number): number => {
  // Base XP from score (0-100)
  let xp = score;
  
  // Bonus for completing quickly (max 50 bonus XP)
  const timeBonus = Math.max(0, 50 - Math.floor(timeSpent / 60));
  xp += timeBonus;
  
  // Perfect score bonus
  if (score >= 100) xp += 50;
  
  return Math.floor(xp);
};

export const useLabProgress = create<LabProgressStore>()(
  persist(
    (set, get) => ({
      completedLabs: {},
      totalXP: 0,
      streak: 0,
      lastCompletedDate: null,
      badges: [],

      markLabComplete: (labId: string, score: number, timeSpent: number): number => {
        const xpEarned = calculateXP(score, timeSpent);
        
        set((state) => ({
          completedLabs: {
            ...state.completedLabs,
            [labId]: {
              labId,
              completedAt: new Date(),
              score,
              timeSpent,
              xpEarned,
            },
          },
          totalXP: state.totalXP + xpEarned,
        }));
        
        get().updateStreak();
        get().checkForBadges();
        
        return xpEarned;
      },

      addXP: (amount: number) => {
        set((state) => ({
          totalXP: state.totalXP + amount,
        }));
      },

      updateStreak: () => {
        const today = new Date().toDateString();
        const lastDate = get().lastCompletedDate;
        
        if (lastDate === today) {
          // Already completed today
          return;
        }
        
        if (lastDate) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toDateString();
          
          if (lastDate === yesterdayStr) {
            // Streak continues
            set((state) => ({
              streak: state.streak + 1,
              lastCompletedDate: today,
            }));
          } else {
            // Streak broken
            set({
              streak: 1,
              lastCompletedDate: today,
            });
          }
        } else {
          // First completion
          set({
            streak: 1,
            lastCompletedDate: today,
          });
        }
      },

      checkForBadges: () => {
        const state = get();
        const completedCount = Object.keys(state.completedLabs).length;
        const newBadges: Badge[] = [];

        // First Lab Badge
        if (completedCount === 1 && !state.badges.find(b => b.id === 'first-lab')) {
          newBadges.push({
            id: 'first-lab',
            name: 'First Steps',
            description: 'Complete your first virtual lab',
            icon: '🎓',
            earnedAt: new Date(),
          });
        }

        // 5 Labs Badge
        if (completedCount >= 5 && !state.badges.find(b => b.id === 'lab-enthusiast')) {
          newBadges.push({
            id: 'lab-enthusiast',
            name: 'Lab Enthusiast',
            description: 'Complete 5 virtual labs',
            icon: '🔬',
            earnedAt: new Date(),
          });
        }

        // 10 Labs Badge
        if (completedCount >= 10 && !state.badges.find(b => b.id === 'lab-master')) {
          newBadges.push({
            id: 'lab-master',
            name: 'Lab Master',
            description: 'Complete 10 virtual labs',
            icon: '🏆',
            earnedAt: new Date(),
          });
        }

        // Perfect Score Badge
        const hasPerfectScore = Object.values(state.completedLabs).some(lab => lab.score >= 100);
        if (hasPerfectScore && !state.badges.find(b => b.id === 'perfectionist')) {
          newBadges.push({
            id: 'perfectionist',
            name: 'Perfectionist',
            description: 'Score 100% on any lab',
            icon: '⭐',
            earnedAt: new Date(),
          });
        }

        // 7 Day Streak Badge
        if (state.streak >= 7 && !state.badges.find(b => b.id === 'week-warrior')) {
          newBadges.push({
            id: 'week-warrior',
            name: 'Week Warrior',
            description: 'Maintain a 7-day streak',
            icon: '🔥',
            earnedAt: new Date(),
          });
        }

        if (newBadges.length > 0) {
          set((state) => ({
            badges: [...state.badges, ...newBadges],
          }));
        }
      },

      awardBadge: (badge: Badge) => {
        set((state) => ({
          badges: [...state.badges, { ...badge, earnedAt: new Date() }],
        }));
      },

      getLabCompletion: (labId: string) => {
        return get().completedLabs[labId];
      },

      isLabCompleted: (labId: string) => {
        return !!get().completedLabs[labId];
      },
    }),
    {
      name: 'virtual-lab-progress',
    }
  )
);
