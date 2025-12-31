
import { Player } from './challenge';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name or emoji
  category: 'combat' | 'academic' | 'social' | 'streak';
  xpReward: number;
  condition: (player: Player) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Combat Achievements
  {
    id: 'first_blood',
    title: 'First Blood',
    description: 'Win your first challenge',
    icon: '⚔️',
    category: 'combat',
    xpReward: 100,
    condition: (p) => p.wins >= 1
  },
  {
    id: 'warrior',
    title: 'Warrior',
    description: 'Win 10 challenges',
    icon: '🛡️',
    category: 'combat',
    xpReward: 500,
    condition: (p) => p.wins >= 10
  },
  {
    id: 'gladiator',
    title: 'Gladiator',
    description: 'Win 50 challenges',
    icon: '👑',
    category: 'combat',
    xpReward: 2000,
    condition: (p) => p.wins >= 50
  },

  // Streak Achievements
  {
    id: 'on_fire',
    title: 'On Fire',
    description: 'Reach a 3-game win streak',
    icon: '🔥',
    category: 'streak',
    xpReward: 300,
    condition: (p) => p.winStreak >= 3
  },
  {
    id: 'unstoppable',
    title: 'Unstoppable',
    description: 'Reach a 10-game win streak',
    icon: '🚀',
    category: 'streak',
    xpReward: 1000,
    condition: (p) => p.winStreak >= 10
  },

  // Rating Achievements
  {
    id: 'rising_star',
    title: 'Rising Star',
    description: 'Reach 1200 rating',
    icon: '⭐',
    category: 'academic',
    xpReward: 200,
    condition: (p) => p.rating >= 1200
  },
  {
    id: 'grandmaster',
    title: 'Grandmaster',
    description: 'Reach 1500 rating',
    icon: '🎓',
    category: 'academic',
    xpReward: 5000,
    condition: (p) => p.rating >= 1500
  }
];

export const checkAchievements = (player: Player, currentAchievements: string[] = []): string[] => {
  const newUnlocks: string[] = [];
  
  ACHIEVEMENTS.forEach(achievement => {
    if (!currentAchievements.includes(achievement.id)) {
      if (achievement.condition(player)) {
        newUnlocks.push(achievement.id);
      }
    }
  });
  
  return newUnlocks;
};

export const calculateXP = (
  result: 'win' | 'loss' | 'draw',
  score: number,
  rank: number,
  totalPlayers: number,
  currentStreak: number
): number => {
  let xp = 0;

  // Base XP for participation
  xp += 50;

  // Result Bonus
  if (result === 'win') xp += 100;
  else if (result === 'draw') xp += 30;

  // Score Bonus (10% of score)
  xp += Math.floor(score * 0.1);

  // Rank Bonus (for multiplayer)
  if (totalPlayers > 2) {
    // Top 50% get bonus
    if (rank <= Math.ceil(totalPlayers / 2)) {
      xp += 50 * (totalPlayers - rank + 1);
    }
  }

  // Streak Bonus
  if (currentStreak > 0) {
    xp += currentStreak * 10;
  }

  return xp;
};

/**
 * Calculate coin rewards based on game result, accuracy, and performance
 */
export const calculateCoins = (
  result: 'win' | 'loss' | 'draw',
  accuracy: number, // 0-100 percentage
  score: number,
  rank: number,
  totalPlayers: number,
  currentStreak: number
): number => {
  let coins = 0;

  // Base coins for participation
  coins += 10;

  // Result Bonus
  if (result === 'win') {
    coins += 50; // Win bonus
  } else if (result === 'draw') {
    coins += 20; // Draw bonus
  }

  // Accuracy Bonus (up to 50 coins for 100% accuracy)
  const accuracyBonus = Math.floor(accuracy * 0.5);
  coins += accuracyBonus;

  // Score Bonus (1 coin per 10 points)
  coins += Math.floor(score / 10);

  // Rank Bonus (for multiplayer)
  if (totalPlayers > 2) {
    // Top 3 get extra bonus
    if (rank === 1) coins += 100; // First place
    else if (rank === 2) coins += 50; // Second place
    else if (rank === 3) coins += 25; // Third place
  }

  // Streak Bonus (5 coins per streak)
  if (currentStreak > 0 && result === 'win') {
    coins += currentStreak * 5;
  }

  // Perfect Score Bonus
  if (accuracy === 100) {
    coins += 50; // Perfect accuracy bonus
  }

  return Math.floor(coins);
};

export const getLevel = (xp: number) => {
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;
  const xpForCurrentLevel = 100 * Math.pow(level - 1, 2);
  const xpForNextLevel = 100 * Math.pow(level, 2);
  
  const levelRange = xpForNextLevel - xpForCurrentLevel;
  const progressInLevel = xp - xpForCurrentLevel;
  const progress = levelRange > 0 ? (progressInLevel / levelRange) * 100 : 0;

  return {
    level,
    currentLevelXP: xpForCurrentLevel,
    nextLevelXP: xpForNextLevel,
    progress: Math.min(100, Math.max(0, progress))
  };
};

export const getNextLevelXp = (level: number): number => {
  return Math.pow(level, 2) * 100;
};
