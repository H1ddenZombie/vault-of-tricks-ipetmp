
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Pressable
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { IconSymbol } from '@/components/IconSymbol';
import { Trick } from '@/types/tricks';

export default function TrickDetailScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { trickId } = useLocalSearchParams();
  const { tricks, updateTrickProgress, toggleFavorite, markTrickAsViewed } = useApp();
  const [showMethod, setShowMethod] = useState(false);
  
  const trick = tricks.find(t => t.id === trickId) as Trick | undefined;

  useEffect(() => {
    if (trick) {
      markTrickAsViewed(trick.id);
    }
  }, [trick?.id]);

  if (!trick) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>Trick not found</Text>
      </View>
    );
  }

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

  const handleStepToggle = (stepId: string, currentState: boolean) => {
    updateTrickProgress(trick.id, stepId, !currentState);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: getBorderColor() }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Pressable onPress={() => toggleFavorite(trick.id)} style={styles.favoriteButton}>
            <IconSymbol
              name={trick.isFavorite ? 'heart.fill' : 'heart'}
              size={28}
              color={trick.isFavorite ? '#FF3B30' : theme.colors.text}
            />
          </Pressable>
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>{trick.title}</Text>
        <Text style={[styles.category, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
          {trick.category}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          Platform.OS !== 'ios' && styles.contentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.summaryCard, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <View style={styles.summaryHeader}>
            <IconSymbol name="sparkles" size={24} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 0 }]}>
              What You&apos;ll Learn
            </Text>
          </View>
          <Text style={[styles.summaryText, { color: theme.dark ? '#E5E5EA' : '#3C3C43' }]}>
            {trick.summary}
          </Text>

          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: getBorderColor() + '20' }]}>
              <Text style={[styles.badgeText, { color: getBorderColor() }]}>
                {trick.difficulty}
              </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
              <IconSymbol name="clock" size={14} color={theme.dark ? '#98989D' : '#8E8E93'} />
              <Text style={[styles.badgeText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
                {trick.estimatedTime} min
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.dark ? '#2C2C2E' : '#E5E5EA' }]} />

          <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Items Needed:</Text>
          {trick.itemsNeeded.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={[styles.itemBullet, { backgroundColor: theme.colors.primary + '30' }]}>
                <IconSymbol name="checkmark" size={12} color={theme.colors.primary} />
              </View>
              <Text style={[styles.itemText, { color: theme.dark ? '#E5E5EA' : '#3C3C43' }]}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.methodCard, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <TouchableOpacity
            style={styles.methodHeader}
            onPress={() => setShowMethod(!showMethod)}
            activeOpacity={0.7}
          >
            <View style={styles.methodHeaderLeft}>
              <View style={[styles.methodIconContainer, { backgroundColor: '#FFD60A' + '20' }]}>
                <IconSymbol name="lightbulb.fill" size={24} color="#FFD60A" />
              </View>
              <View style={styles.methodTitleContainer}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 0 }]}>
                  The Method
                </Text>
                <Text style={[styles.methodSubtitle, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
                  {showMethod ? 'Tap to hide' : 'Learn the secret before you start'}
                </Text>
              </View>
            </View>
            <View style={[styles.chevronContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
              <IconSymbol
                name={showMethod ? 'chevron.up' : 'chevron.down'}
                size={16}
                color={theme.dark ? '#98989D' : '#8E8E93'}
              />
            </View>
          </TouchableOpacity>
          {showMethod && (
            <View style={styles.methodContent}>
              <View style={[styles.methodDivider, { backgroundColor: theme.dark ? '#2C2C2E' : '#E5E5EA' }]} />
              <View style={[styles.methodTextContainer, { backgroundColor: theme.dark ? '#2C2C2E' + '50' : '#F2F2F7' }]}>
                <Text style={[styles.methodText, { color: theme.dark ? '#E5E5EA' : '#3C3C43' }]}>
                  {trick.method}
                </Text>
              </View>
              <View style={[styles.methodTip, { backgroundColor: theme.colors.primary + '10' }]}>
                <IconSymbol name="info.circle.fill" size={16} color={theme.colors.primary} />
                <Text style={[styles.methodTipText, { color: theme.colors.primary }]}>
                  Practice this method slowly before attempting the full trick
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={[styles.progressCard, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <View style={styles.progressHeader}>
            <View style={styles.progressHeaderLeft}>
              <IconSymbol name="chart.bar.fill" size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 0 }]}>
                Your Progress
              </Text>
            </View>
            <Text style={[styles.progressPercent, { color: theme.colors.primary }]}>
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
          <Text style={[styles.progressText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
            {trick.steps.filter(s => s.completed).length} of {trick.steps.length} steps completed
          </Text>
          {trick.completedAt && (
            <CompletionTime completedAt={trick.completedAt} />
          )}
        </View>

        <View style={[styles.stepsCard, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <View style={styles.stepsHeader}>
            <IconSymbol name="list.bullet" size={20} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 0 }]}>
              Step-by-Step Instructions
            </Text>
          </View>
          <Text style={[styles.stepsSubtitle, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
            Complete each step to master this trick
          </Text>
          <View style={[styles.divider, { backgroundColor: theme.dark ? '#2C2C2E' : '#E5E5EA', marginTop: 12 }]} />
          {trick.steps.map((step, index) => (
            <TouchableOpacity
              key={step.id}
              style={[
                styles.stepItem,
                { borderBottomColor: theme.dark ? '#2C2C2E' : '#E5E5EA' },
                index === trick.steps.length - 1 && { borderBottomWidth: 0 }
              ]}
              onPress={() => handleStepToggle(step.id, step.completed)}
              activeOpacity={0.7}
            >
              <View style={styles.stepLeft}>
                <View style={[
                  styles.checkbox,
                  {
                    backgroundColor: step.completed ? '#34C759' : 'transparent',
                    borderColor: step.completed ? '#34C759' : (theme.dark ? '#98989D' : '#8E8E93')
                  }
                ]}>
                  {step.completed && (
                    <IconSymbol name="checkmark" size={16} color="#FFF" />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepNumber, { color: theme.colors.primary }]}>
                    Step {step.stepNumber}
                  </Text>
                  <Text style={[
                    styles.stepInstruction,
                    { color: theme.colors.text },
                    step.completed && { textDecorationLine: 'line-through', opacity: 0.6 }
                  ]}>
                    {step.instruction}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
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
    <View style={[styles.completionBadge, { backgroundColor: '#34C759' + '20' }]}>
      <IconSymbol name="checkmark.circle.fill" size={16} color="#34C759" />
      <Text style={[styles.completionTime, { color: '#34C759' }]}>
        {timeString}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  favoriteButton: {
    padding: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  contentWithTabBar: {
    paddingBottom: 100,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemBullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 20,
    flex: 1,
  },
  methodCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  methodIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodTitleContainer: {
    flex: 1,
  },
  methodSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  chevronContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodContent: {
    marginTop: 16,
  },
  methodDivider: {
    height: 1,
    marginBottom: 16,
  },
  methodTextContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  methodText: {
    fontSize: 16,
    lineHeight: 24,
  },
  methodTip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  methodTipText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  progressCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressPercent: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
  },
  completionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  completionTime: {
    fontSize: 14,
    fontWeight: '600',
  },
  stepsCard: {
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  stepsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepsSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  stepItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  stepLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  stepContent: {
    flex: 1,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepInstruction: {
    fontSize: 16,
    lineHeight: 22,
  },
});
