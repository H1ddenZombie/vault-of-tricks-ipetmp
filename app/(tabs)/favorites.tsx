
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useApp } from '@/contexts/AppContext';
import { IconSymbol } from '@/components/IconSymbol';
import TrickCard from '@/components/TrickCard';

export default function FavoritesScreen() {
  const theme = useTheme();
  const { tricks } = useApp();

  const favoriteTricks = tricks.filter(t => t.isFavorite);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Favorites</Text>
        <Text style={[styles.headerSubtitle, { color: theme.dark ? '#98989D' : '#666' }]}>
          {favoriteTricks.length} favorite tricks
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          Platform.OS !== 'ios' && styles.contentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {favoriteTricks.length > 0 ? (
          favoriteTricks.map(trick => (
            <TrickCard key={trick.id} trick={trick} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <IconSymbol name="heart" size={64} color={theme.dark ? '#98989D' : '#8E8E93'} />
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
              No Favorites Yet
            </Text>
            <Text style={[styles.emptyText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              Tap the heart icon on any trick to add it to your favorites
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
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
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
