
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { useApp } from '@/contexts/AppContext';
import { IconSymbol } from './IconSymbol';
import { Trick } from '@/types/tricks';

interface TrickCardProps {
  trick: Trick;
}

export default function TrickCard({ trick }: TrickCardProps) {
  const theme = useTheme();
  const router = useRouter();
  const { toggleFavorite } = useApp();

  const getBorderColor = () => {
    switch (trick.difficulty) {
      case 'Beginner':
        return '#34C759';
      case 'Intermediate':
        return '#FFD60A';
      case 'Advanced':
        return '#FF3B30';
      default:
        return theme.colors.border;
    }
  };

  const handlePress = () => {
    router.push(`/trick-detail?trickId=${trick.id}`);
  };

  const handleFavoritePress = () => {
    toggleFavorite(trick.id);
  };

  const itemsDisplay = trick.itemsNeeded.length > 1 ? 'Multiple' : trick.itemsNeeded[0];

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { 
          backgroundColor: theme.dark ? '#1C1C1E' : '#FFF',
          borderLeftColor: getBorderColor(),
        }
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{trick.title}</Text>
          <Text style={[styles.category, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
            {trick.category}
          </Text>
        </View>
        <Pressable onPress={handleFavoritePress} style={styles.favoriteButton}>
          <IconSymbol
            name={trick.isFavorite ? 'heart.fill' : 'heart'}
            size={24}
            color={trick.isFavorite ? '#FF3B30' : theme.dark ? '#98989D' : '#8E8E93'}
          />
        </Pressable>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: getBorderColor() + '20' }]}>
            <Text style={[styles.badgeText, { color: getBorderColor() }]}>
              {trick.difficulty}
            </Text>
          </View>
          <View style={[styles.badge, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
            <IconSymbol name="clock" size={12} color={theme.dark ? '#98989D' : '#8E8E93'} />
            <Text style={[styles.badgeText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              {trick.estimatedTime} min
            </Text>
          </View>
          <View style={[styles.badge, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
            <IconSymbol name="cube.box" size={12} color={theme.dark ? '#98989D' : '#8E8E93'} />
            <Text style={[styles.badgeText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              {itemsDisplay}
            </Text>
          </View>
        </View>

        {trick.progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: theme.dark ? '#2C2C2E' : '#E5E5EA' }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${trick.progress}%`,
                    backgroundColor: trick.progress === 100 ? '#34C759' : theme.colors.primary
                  }
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              {Math.round(trick.progress)}%
            </Text>
          </View>
        )}

        {trick.completedAt && <CompletionTime completedAt={trick.completedAt} />}
      </View>
    </TouchableOpacity>
  );
}

function CompletionTime({ completedAt }: { completedAt: Date }) {
  const theme = useTheme();
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diff = now.getTime() - completedAt.getTime();
      
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days >= 1) {
        // Show date after 24 hours
        setTimeString(`Completed ${completedAt.toLocaleDateString()}`);
      } else if (hours > 0) {
        setTimeString(`Completed ${hours}h ${minutes % 60}m ago`);
      } else if (minutes > 0) {
        setTimeString(`Completed ${minutes}m ${seconds % 60}s ago`);
      } else {
        setTimeString(`Completed ${seconds}s ago`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [completedAt]);

  return (
    <View style={styles.completionContainer}>
      <IconSymbol name="checkmark.circle.fill" size={16} color="#34C759" />
      <Text style={[styles.completionText, { color: '#34C759' }]}>
        {timeString}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
  },
  favoriteButton: {
    padding: 4,
  },
  cardContent: {
    gap: 12,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 35,
  },
  completionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  completionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
