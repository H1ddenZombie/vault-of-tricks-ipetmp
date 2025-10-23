
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
  const { tricks, updateTrickProgress, toggleFavorite } = useApp();
  const [showMethod, setShowMethod] = useState(false);
  
  const trick = tricks.find(t => t.id === trickId) as Trick | undefined;

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
        <View style={[styles.infoCard, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Summary</Text>
          <Text style={[styles.description, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
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

          <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Items Needed:</Text>
          {trick.itemsNeeded.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={[styles.bullet, { color: theme.colors.primary }]}>•</Text>
              <Text style={[styles.itemText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
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
              <IconSymbol name="lightbulb.fill" size={24} color="#FFD60A" />
              <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 0 }]}>
                The Method
              </Text>
            </View>
            <IconSymbol
              name={showMethod ? 'chevron.up' : 'chevron.down'}
              size={20}
              color={theme.dark ? '#98989D' : '#8E8E93'}
            />
          </TouchableOpacity>
          {showMethod && (
            <View style={styles.methodContent}>
              <Text style={[styles.methodText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
                {trick.method}
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.progressCard, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Progress</Text>
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
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Steps</Text>
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
    <Text style={[styles.completionTime, { color: '#34C759' }]}>
      ✓ {timeString}
    </Text>
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
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
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
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: {
    fontSize: 18,
    marginRight: 8,
    lineHeight: 24,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 24,
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
  },
  methodContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  methodText: {
    fontSize: 16,
    lineHeight: 24,
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
  completionTime: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  stepsCard: {
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
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
