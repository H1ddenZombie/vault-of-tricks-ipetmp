
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Trick } from '@/types/tricks';
import { useApp } from '@/contexts/AppContext';
import { IconSymbol } from './IconSymbol';

interface TrickCardProps {
  trick: Trick;
}

export default function TrickCard({ trick }: TrickCardProps) {
  const theme = useTheme();
  const router = useRouter();
  const { toggleFavorite, markTrickAsViewed } = useApp();

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
    markTrickAsViewed(trick.id);
    router.push({
      pathname: '/trick-detail',
      params: { trickId: trick.id }
    });
  };

  const handleFavoritePress = () => {
    toggleFavorite(trick.id);
  };

  const displayItemsNeeded = trick.itemsNeeded.length > 1 ? 'Multiple' : trick.itemsNeeded[0];

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.dark ? '#1C1C1E' : '#FFF',
          borderColor: getBorderColor(),
        }
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{trick.title}</Text>
          <Text style={[styles.category, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
            {trick.category}
          </Text>
        </View>
        <Pressable onPress={handleFavoritePress} style={styles.favoriteButton}>
          <IconSymbol
            name={trick.isFavorite ? 'heart.fill' : 'heart'}
            size={24}
            color={trick.isFavorite ? '#FF3B30' : (theme.dark ? '#98989D' : '#8E8E93')}
          />
        </Pressable>
      </View>

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
            {displayItemsNeeded}
          </Text>
        </View>
      </View>

      {trick.progress > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              Progress
            </Text>
            <Text style={[styles.progressPercent, { color: theme.colors.text }]}>
              {Math.round(trick.progress)}%
            </Text>
          </View>
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
          {trick.completedAt && (
            <CompletionTime completedAt={trick.completedAt} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

function CompletionTime({ completedAt }: { completedAt: Date }) {
  const theme = useTheme();
  const [timeString, setTimeString] = React.useState('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diff = now.getTime() - completedAt.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days >= 1) {
        setTimeString(`Completed: ${completedAt.toLocaleDateString()}`);
      } else if (hours > 0) {
        setTimeString(`Completed: ${hours}h ${minutes % 60}m ago`);
      } else if (minutes > 0) {
        setTimeString(`Completed: ${minutes}m ${seconds % 60}s ago`);
      } else {
        setTimeString(`Completed: ${seconds}s ago`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [completedAt]);

  return (
    <Text style={[styles.completionTime, { color: '#34C759' }]}>
      ✓ {timeString}
    </Text>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
  },
  favoriteButton: {
    padding: 4,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  completionTime: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
});
