
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

export default function AccountScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { userProfile, getUserProgress, getRecentlyCompleted } = useApp();

  const progress = getUserProgress();
  const recentlyCompleted = getRecentlyCompleted();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Account</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          Platform.OS !== 'ios' && styles.contentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.profileCard, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.avatarText}>
              {userProfile?.username.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.username, { color: theme.colors.text }]}>
              {userProfile?.username}
            </Text>
            <Text style={[styles.email, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              {userProfile?.email}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => router.push('/account-settings')}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Progress</Text>
        <View style={styles.progressGrid}>
          <View style={[styles.progressCard, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
            <Text style={[styles.progressNumber, { color: theme.colors.primary }]}>
              {progress.inProgress}
            </Text>
            <Text style={[styles.progressLabel, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              In Progress
            </Text>
          </View>
          <View style={[styles.progressCard, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
            <Text style={[styles.progressNumber, { color: theme.colors.primary }]}>
              {progress.totalStepsLearned}
            </Text>
            <Text style={[styles.progressLabel, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              Steps Learned
            </Text>
          </View>
          <View style={[styles.progressCard, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
            <Text style={[styles.progressNumber, { color: '#34C759' }]}>
              {progress.tricksCompleted}
            </Text>
            <Text style={[styles.progressLabel, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              Completed
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recently Completed</Text>
        {recentlyCompleted.length > 0 ? (
          recentlyCompleted.map(trick => (
            <TrickCard key={trick.id} trick={trick} />
          ))
        ) : (
          <View style={[styles.emptyCard, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
            <IconSymbol name="sparkles" size={32} color={theme.dark ? '#98989D' : '#8E8E93'} />
            <Text style={[styles.emptyText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              No completed tricks yet
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
  },
  content: {
    padding: 20,
  },
  contentWithTabBar: {
    paddingBottom: 100,
  },
  profileCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  editButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  progressCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  progressNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  emptyCard: {
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  emptyText: {
    fontSize: 14,
    marginTop: 12,
  },
});
