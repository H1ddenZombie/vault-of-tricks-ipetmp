
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
  itemsNeeded: string[];
  estimatedTime: number; // in minutes
  steps: TrickStep[];
  isFavorite: boolean;
  progress: number; // 0-100
  completedAt?: Date;
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
