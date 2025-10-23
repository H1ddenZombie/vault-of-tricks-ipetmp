
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useApp } from '@/contexts/AppContext';
import { IconSymbol } from '@/components/IconSymbol';
import TrickCard from '@/components/TrickCard';
import { Trick } from '@/types/tricks';

export default function RandomScreen() {
  const theme = useTheme();
  const { tricks } = useApp();
  const [randomTrick, setRandomTrick] = useState<Trick | null>(null);

  const getRandomTrick = () => {
    // Filter out completed tricks
    const incompleteTricks = tricks.filter(t => t.progress < 100);
    
    if (incompleteTricks.length === 0) {
      setRandomTrick(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * incompleteTricks.length);
    setRandomTrick(incompleteTricks[randomIndex]);
  };

  useEffect(() => {
    getRandomTrick();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <IconSymbol name="shuffle" size={32} color={theme.colors.primary} />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Random Trick</Text>
        <Text style={[styles.headerSubtitle, { color: theme.dark ? '#98989D' : '#666' }]}>
          Discover something new
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          Platform.OS !== 'ios' && styles.contentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {randomTrick ? (
          <>
            <TrickCard trick={randomTrick} />
            <TouchableOpacity
              style={[styles.newTrickButton, { backgroundColor: theme.colors.primary }]}
              onPress={getRandomTrick}
              activeOpacity={0.8}
            >
              <IconSymbol name="shuffle" size={20} color="#FFF" />
              <Text style={styles.newTrickButtonText}>Get New Trick</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.emptyState}>
            <IconSymbol name="checkmark.circle.fill" size={64} color="#34C759" />
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
              All Tricks Completed!
            </Text>
            <Text style={[styles.emptyText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              You&apos;ve mastered all the tricks in the vault. Amazing work!
            </Text>
          </View>
        )}
      </ScrollView>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  contentWithTabBar: {
    paddingBottom: 100,
  },
  newTrickButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    marginTop: 12,
  },
  newTrickButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
