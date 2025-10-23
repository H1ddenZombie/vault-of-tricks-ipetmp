
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type TrickCategory = 'Card Tricks' | 'Coin Tricks' | 'Mind Reading' | 'Close Up Magic' | 'Illusions';

export interface TrickStep {
  id: string;
  stepNumber: number;
  instruction: string;
  completed: boolean;
}

export interface Trick {
  id: string;
  title: string;
  category: TrickCategory;
  difficulty: DifficultyLevel;
  description: string;
  summary: string;
  method: string;
  itemsNeeded: string[];
  estimatedTime: number; // in minutes
  steps: TrickStep[];
  isFavorite: boolean;
  progress: number; // 0-100
  completedAt?: Date;
  lastViewedAt?: Date;
}

export interface UserProfile {
  id: string;
  username: string;
  realName: string;
  email: string;
  profilePicture?: string;
}

export interface UserProgress {
  inProgress: number;
  totalStepsLearned: number;
  tricksCompleted: number;
}

export interface NotificationSettings {
  dailyReminderEnabled: boolean;
  trickOfTheDayEnabled: boolean;
  reminderTimes: string[]; // Array of times in HH:MM format
}

export const PROFILE_IMAGES = [
  '🎴', // Card
  '🪙', // Coin
  '🔮', // Crystal ball (mind reading)
  '🎩', // Top hat (magic)
  '✨', // Sparkles (illusions)
  '🎭', // Theater masks
  '🃏', // Joker card
  '🎪', // Circus tent
];
