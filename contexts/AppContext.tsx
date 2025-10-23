
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trick, UserProfile, UserProgress, NotificationSettings } from '@/types/tricks';
import { generateAllTricks } from '@/data/tricksData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

interface AppContextType {
  tricks: Trick[];
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  notificationSettings: NotificationSettings;
  updateTrickProgress: (trickId: string, stepId: string, completed: boolean) => void;
  toggleFavorite: (trickId: string) => void;
  getUserProgress: () => UserProgress;
  getRecentlyCompleted: () => Trick[];
  getAllCompleted: () => Trick[];
  getRecentlyViewed: () => Trick[];
  markTrickAsViewed: (trickId: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, realName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  toggleTheme: () => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  getRandomIncompleteTrick: () => Trick | null;
  getLastIncompleteTrick: () => Trick | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tricks, setTricks] = useState<Trick[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    dailyReminderEnabled: true,
    trickOfTheDayEnabled: true,
    reminderTimes: ['09:00', '18:00'],
  });

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
    requestNotificationPermissions();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveData();
    }
  }, [tricks, userProfile, isAuthenticated, isDarkMode, notificationSettings]);

  // Schedule notifications when settings change
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      scheduleNotifications();
    }
  }, [notificationSettings, isAuthenticated, isLoading]);

  const requestNotificationPermissions = async () => {
    if (Platform.OS === 'web') return;
    
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
  };

  const scheduleNotifications = async () => {
    if (Platform.OS === 'web') return;

    // Cancel all existing notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule daily reminder notifications
    if (notificationSettings.dailyReminderEnabled) {
      for (const time of notificationSettings.reminderTimes) {
        const [hours, minutes] = time.split(':').map(Number);
        
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Time to Practice! 🎩',
            body: 'Continue learning your magic tricks and master new skills!',
            data: { type: 'daily_reminder' },
          },
          trigger: {
            hour: hours,
            minute: minutes,
            repeats: true,
          },
        });
      }
    }

    // Schedule trick of the day notification (random time between 10 AM and 8 PM)
    if (notificationSettings.trickOfTheDayEnabled) {
      const randomHour = Math.floor(Math.random() * 10) + 10; // 10-19 (10 AM - 7 PM)
      const randomMinute = Math.floor(Math.random() * 60);
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Trick of the Day! ✨',
          body: 'Discover a new magic trick to learn today!',
          data: { type: 'trick_of_the_day' },
        },
        trigger: {
          hour: randomHour,
          minute: randomMinute,
          repeats: true,
        },
      });
    }
  };

  const loadData = async () => {
    try {
      const [storedTricks, storedProfile, storedAuth, storedTheme, storedNotificationSettings] = await Promise.all([
        AsyncStorage.getItem('tricks'),
        AsyncStorage.getItem('userProfile'),
        AsyncStorage.getItem('isAuthenticated'),
        AsyncStorage.getItem('isDarkMode'),
        AsyncStorage.getItem('notificationSettings')
      ]);

      if (storedTricks) {
        const parsedTricks = JSON.parse(storedTricks);
        // Convert date strings back to Date objects
        parsedTricks.forEach((trick: Trick) => {
          if (trick.completedAt) {
            trick.completedAt = new Date(trick.completedAt);
          }
          if (trick.lastViewedAt) {
            trick.lastViewedAt = new Date(trick.lastViewedAt);
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

      if (storedNotificationSettings) {
        setNotificationSettings(JSON.parse(storedNotificationSettings));
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
        AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode)),
        AsyncStorage.setItem('notificationSettings', JSON.stringify(notificationSettings))
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

  const markTrickAsViewed = (trickId: string) => {
    setTricks(prevTricks =>
      prevTricks.map(trick =>
        trick.id === trickId ? { ...trick, lastViewedAt: new Date() } : trick
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

  const getAllCompleted = (): Trick[] => {
    return tricks
      .filter(t => t.completedAt)
      .sort((a, b) => {
        if (!a.completedAt || !b.completedAt) return 0;
        return b.completedAt.getTime() - a.completedAt.getTime();
      });
  };

  const getRecentlyViewed = (): Trick[] => {
    return tricks
      .filter(t => t.lastViewedAt)
      .sort((a, b) => {
        if (!a.lastViewedAt || !b.lastViewedAt) return 0;
        return b.lastViewedAt.getTime() - a.lastViewedAt.getTime();
      })
      .slice(0, 5);
  };

  const getRandomIncompleteTrick = (): Trick | null => {
    const incompleteTricks = tricks.filter(t => t.progress < 100);
    if (incompleteTricks.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * incompleteTricks.length);
    return incompleteTricks[randomIndex];
  };

  const getLastIncompleteTrick = (): Trick | null => {
    const incompleteTricks = tricks
      .filter(t => t.progress > 0 && t.progress < 100)
      .sort((a, b) => {
        if (!a.lastViewedAt || !b.lastViewedAt) return 0;
        return b.lastViewedAt.getTime() - a.lastViewedAt.getTime();
      });
    
    return incompleteTricks.length > 0 ? incompleteTricks[0] : null;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    if (email && password.length >= 6) {
      const profile: UserProfile = {
        id: 'user-1',
        username: email.split('@')[0],
        realName: 'Magic User',
        email: email,
        profilePicture: '🎩'
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
        profilePicture: '🎩'
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
    if (Platform.OS !== 'web') {
      Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updates });
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const updateNotificationSettings = (settings: Partial<NotificationSettings>) => {
    setNotificationSettings(prev => ({ ...prev, ...settings }));
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
        notificationSettings,
        updateTrickProgress,
        toggleFavorite,
        getUserProgress,
        getRecentlyCompleted,
        getAllCompleted,
        getRecentlyViewed,
        markTrickAsViewed,
        login,
        signup,
        logout,
        updateProfile,
        toggleTheme,
        updateNotificationSettings,
        getRandomIncompleteTrick,
        getLastIncompleteTrick,
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
