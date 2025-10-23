
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trick, UserProfile, UserProgress } from '@/types/tricks';
import { generateAllTricks } from '@/data/tricksData';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextType {
  tricks: Trick[];
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  updateTrickProgress: (trickId: string, stepId: string, completed: boolean) => void;
  toggleFavorite: (trickId: string) => void;
  getUserProgress: () => UserProgress;
  getRecentlyCompleted: () => Trick[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, realName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tricks, setTricks] = useState<Trick[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveData();
    }
  }, [tricks, userProfile, isAuthenticated, isDarkMode]);

  const loadData = async () => {
    try {
      const [storedTricks, storedProfile, storedAuth, storedTheme] = await Promise.all([
        AsyncStorage.getItem('tricks'),
        AsyncStorage.getItem('userProfile'),
        AsyncStorage.getItem('isAuthenticated'),
        AsyncStorage.getItem('isDarkMode')
      ]);

      if (storedTricks) {
        const parsedTricks = JSON.parse(storedTricks);
        // Convert date strings back to Date objects
        parsedTricks.forEach((trick: Trick) => {
          if (trick.completedAt) {
            trick.completedAt = new Date(trick.completedAt);
          }
        });
        setTricks(parsedTricks);
      } else {
        setTricks(generateAllTricks());
      }

      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      }

      if (storedAuth) {
        setIsAuthenticated(JSON.parse(storedAuth));
      }

      if (storedTheme) {
        setIsDarkMode(JSON.parse(storedTheme));
      }
    } catch (error) {
      console.log('Error loading data:', error);
      setTricks(generateAllTricks());
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem('tricks', JSON.stringify(tricks)),
        AsyncStorage.setItem('userProfile', JSON.stringify(userProfile)),
        AsyncStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated)),
        AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
      ]);
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const updateTrickProgress = (trickId: string, stepId: string, completed: boolean) => {
    setTricks(prevTricks => {
      return prevTricks.map(trick => {
        if (trick.id === trickId) {
          const updatedSteps = trick.steps.map(step =>
            step.id === stepId ? { ...step, completed } : step
          );
          
          const completedSteps = updatedSteps.filter(s => s.completed).length;
          const progress = (completedSteps / updatedSteps.length) * 100;
          const isFullyCompleted = progress === 100;
          
          return {
            ...trick,
            steps: updatedSteps,
            progress,
            completedAt: isFullyCompleted && !trick.completedAt ? new Date() : trick.completedAt
          };
        }
        return trick;
      });
    });
  };

  const toggleFavorite = (trickId: string) => {
    setTricks(prevTricks =>
      prevTricks.map(trick =>
        trick.id === trickId ? { ...trick, isFavorite: !trick.isFavorite } : trick
      )
    );
  };

  const getUserProgress = (): UserProgress => {
    const inProgress = tricks.filter(t => t.progress > 0 && t.progress < 100).length;
    const totalStepsLearned = tricks.reduce((sum, trick) => 
      sum + trick.steps.filter(s => s.completed).length, 0
    );
    const tricksCompleted = tricks.filter(t => t.progress === 100).length;

    return { inProgress, totalStepsLearned, tricksCompleted };
  };

  const getRecentlyCompleted = (): Trick[] => {
    return tricks
      .filter(t => t.completedAt)
      .sort((a, b) => {
        if (!a.completedAt || !b.completedAt) return 0;
        return b.completedAt.getTime() - a.completedAt.getTime();
      })
      .slice(0, 5);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    if (email && password.length >= 6) {
      const profile: UserProfile = {
        id: 'user-1',
        username: email.split('@')[0],
        realName: 'Magic User',
        email: email,
        profilePicture: undefined
      };
      setUserProfile(profile);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = async (username: string, realName: string, email: string, password: string): Promise<boolean> => {
    // Simple mock signup
    if (username && realName && email && password.length >= 6) {
      const profile: UserProfile = {
        id: 'user-1',
        username,
        realName,
        email,
        profilePicture: undefined
      };
      setUserProfile(profile);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updates });
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <AppContext.Provider
      value={{
        tricks,
        userProfile,
        isAuthenticated,
        isDarkMode,
        updateTrickProgress,
        toggleFavorite,
        getUserProgress,
        getRecentlyCompleted,
        login,
        signup,
        logout,
        updateProfile,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
