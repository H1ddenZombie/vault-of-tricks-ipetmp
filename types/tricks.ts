
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
  summary: string; // New: detailed summary
  method: string; // New: method description
  itemsNeeded: string[];
  estimatedTime: number; // in minutes
  steps: TrickStep[];
  isFavorite: boolean;
  progress: number; // 0-100
  completedAt?: Date;
  viewedAt?: Date; // New: track when trick was last viewed
}

export interface UserProfile {
  id: string;
  username: string;
  realName: string;
  email: string;
  profilePicture?: string; // Will be a symbol identifier
}

export interface UserProgress {
  inProgress: number;
  totalStepsLearned: number;
  tricksCompleted: number;
}

export interface NotificationSettings {
  dailyReminderEnabled: boolean;
  trickOfTheDayEnabled: boolean;
  reminderTimes: number[]; // Number of reminders per day (1-5)
  lastReminderDate?: Date;
  lastTrickOfTheDayDate?: Date;
}

// Profile picture symbols for magic tricks
export const PROFILE_SYMBOLS = [
  { id: 'cards', icon: 'suit.spade.fill', name: 'Cards' },
  { id: 'coin', icon: 'dollarsign.circle.fill', name: 'Coin' },
  { id: 'wand', icon: 'wand.and.stars', name: 'Wand' },
  { id: 'hat', icon: 'crown.fill', name: 'Hat' },
  { id: 'rabbit', icon: 'hare.fill', name: 'Rabbit' },
  { id: 'sparkles', icon: 'sparkles', name: 'Sparkles' },
  { id: 'star', icon: 'star.fill', name: 'Star' },
  { id: 'eye', icon: 'eye.fill', name: 'Eye' },
] as const;
