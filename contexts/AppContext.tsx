
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
  loginTimestamp: Date | null;
  updateTrickProgress: (trickId: string, stepId: string, completed: boolean) => void;
  toggleFavorite: (trickId: string) => void;
  getUserProgress: () => UserProgress;
  getRecentlyCompleted: () => Trick[];
  getRecentlyViewed: () => Trick[];
  getAllCompleted: () => Trick[];
  markTrickAsViewed: (trickId: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, realName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  toggleTheme: () => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  randomizeTricks: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tricks, setTricks] = useState<Trick[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loginTimestamp, setLoginTimestamp] = useState<Date | null>(null);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    dailyReminderEnabled: true,
    trickOfTheDayEnabled: true,
    reminderTimes: 1, // Default to once per day
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

  // Setup notifications when authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setupNotifications();
    }
  }, [isAuthenticated, notificationSettings, isLoading]);

  const requestNotificationPermissions = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push notification permissions');
    }
  };

  const setupNotifications = async () => {
    // Cancel all existing notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    const now = new Date();

    // Schedule daily reminder notifications
    if (notificationSettings.dailyReminderEnabled) {
      const incompleteTricks = tricks.filter(t => t.progress > 0 && t.progress < 100);
      if (incompleteTricks.length > 0) {
        const mostRecentIncomplete = incompleteTricks.sort((a, b) => {
          const aLastStep = a.steps.filter(s => s.completed).length;
          const bLastStep = b.steps.filter(s => s.completed).length;
          return bLastStep - aLastStep;
        })[0];

        // Schedule reminders based on user preference
        const timesPerDay = notificationSettings.reminderTimes;
        const hoursInterval = 24 / timesPerDay;

        for (let i = 0; i < timesPerDay; i++) {
          const triggerHour = 9 + (i * hoursInterval); // Start at 9 AM
          await Notifications.scheduleNotificationAsync({
            content: {
              title: '🎩 Time to Practice Magic!',
              body: `Continue learning "${mostRecentIncomplete.title}"`,
              data: { trickId: mostRecentIncomplete.id, type: 'reminder' },
            },
            trigger: {
              hour: Math.floor(triggerHour),
              minute: 0,
              repeats: true,
            },
          });
        }
      }
    }

    // Schedule trick of the day notification (random time between 10 AM and 8 PM)
    if (notificationSettings.trickOfTheDayEnabled) {
      const completedTrickIds = tricks.filter(t => t.progress === 100).map(t => t.id);
      const availableTricks = tricks.filter(t => !completedTrickIds.includes(t.id));
      
      if (availableTricks.length > 0) {
        const randomTrick = availableTricks[Math.floor(Math.random() * availableTricks.length)];
        const randomHour = Math.floor(Math.random() * 10) + 10; // 10 AM to 8 PM
        const randomMinute = Math.floor(Math.random() * 60);

        await Notifications.scheduleNotificationAsync({
          content: {
            title: '✨ Trick of the Day!',
            body: `Check out "${randomTrick.title}" - ${randomTrick.category}`,
            data: { trickId: randomTrick.id, type: 'trickOfTheDay' },
          },
          trigger: {
            hour: randomHour,
            minute: randomMinute,
            repeats: true,
          },
        });
      }
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
          if (trick.viewedAt) {
            trick.viewedAt = new Date(trick.viewedAt);
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
        trick.id === trickId ? { ...trick, viewedAt: new Date() } : trick
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

  const getRecentlyViewed = (): Trick[] => {
    return tricks
      .filter(t => t.viewedAt)
      .sort((a, b) => {
        if (!a.viewedAt || !b.viewedAt) return 0;
        return b.viewedAt.getTime() - a.viewedAt.getTime();
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

  const randomizeTricks = () => {
    setTricks(prevTricks => {
      const shuffled = [...prevTricks];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    if (email && password.length >= 6) {
      const profile: UserProfile = {
        id: 'user-1',
        username: email.split('@')[0],
        realName: 'Magic User',
        email: email,
        profilePicture: 'wand' // Default symbol
      };
      setUserProfile(profile);
      setIsAuthenticated(true);
      setLoginTimestamp(new Date());
      // Randomize tricks on login
      randomizeTricks();
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
        profilePicture: 'wand' // Default symbol
      };
      setUserProfile(profile);
      setIsAuthenticated(true);
      setLoginTimestamp(new Date());
      // Randomize tricks on signup
      randomizeTricks();
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    setLoginTimestamp(null);
    Notifications.cancelAllScheduledNotificationsAsync();
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
        loginTimestamp,
        updateTrickProgress,
        toggleFavorite,
        getUserProgress,
        getRecentlyCompleted,
        getRecentlyViewed,
        getAllCompleted,
        markTrickAsViewed,
        login,
        signup,
        logout,
        updateProfile,
        toggleTheme,
        updateNotificationSettings,
        randomizeTricks
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
