
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { IconSymbol } from '@/components/IconSymbol';
import TrickCard from '@/components/TrickCard';

export default function AllCompletedScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { getAllCompleted } = useApp();

  const allCompleted = getAllCompleted();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Completed Tricks</Text>
        <Text style={[styles.headerSubtitle, { color: theme.dark ? '#98989D' : '#666' }]}>
          {allCompleted.length} tricks completed
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          Platform.OS !== 'ios' && styles.contentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {allCompleted.length > 0 ? (
          allCompleted.map(trick => (
            <TrickCard key={trick.id} trick={trick} />
          ))
        ) : (
          <View style={[styles.emptyCard, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
            <IconSymbol name="sparkles" size={48} color={theme.dark ? '#98989D' : '#8E8E93'} />
            <Text style={[styles.emptyText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              No completed tricks yet
            </Text>
            <Text style={[styles.emptySubtext, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              Start learning tricks to see them here!
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
  headerTop: {
    marginBottom: 16,
  },
  backButton: {
    padding: 4,
    alignSelf: 'flex-start',
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
  emptyCard: {
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
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
  emptyText: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
