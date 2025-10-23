
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
  Alert
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { IconSymbol } from '@/components/IconSymbol';
import * as Haptics from 'expo-haptics';

export default function SettingsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { isDarkMode, toggleTheme, logout } = useApp();

  const handleThemeToggle = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    toggleTheme();
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/auth');
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Settings</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          Platform.OS !== 'ios' && styles.contentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.section, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Appearance</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: isDarkMode ? '#2C2C2E' : '#F2F2F7' }
              ]}>
                <IconSymbol 
                  name={isDarkMode ? "moon.fill" : "sun.max.fill"} 
                  size={20} 
                  color={isDarkMode ? '#FFD60A' : '#FF9500'} 
                />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </Text>
                <Text style={[styles.settingDescription, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
                  {isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                </Text>
              </View>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{ 
                false: theme.dark ? '#39393D' : '#E5E5EA', 
                true: '#34C759' 
              }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={theme.dark ? '#39393D' : '#E5E5EA'}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Account</Text>
          
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => router.push('/account-settings')}
          >
            <View style={styles.settingLeft}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }
              ]}>
                <IconSymbol name="person.fill" size={20} color="#007AFF" />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                  Account Settings
                </Text>
                <Text style={[styles.settingDescription, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
                  Edit profile and preferences
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={theme.dark ? '#98989D' : '#8E8E93'} />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notifications</Text>
          
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => router.push('/notification-settings')}
          >
            <View style={styles.settingLeft}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }
              ]}>
                <IconSymbol name="bell.fill" size={20} color="#FF9500" />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                  Notification Settings
                </Text>
                <Text style={[styles.settingDescription, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
                  Manage reminders and alerts
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={theme.dark ? '#98989D' : '#8E8E93'} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: '#FF3B30' }]}
          onPress={handleLogout}
        >
          <IconSymbol name="arrow.right.square" size={20} color="#FFF" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <Text style={[styles.version, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
          Vault of Tricks v1.0.0
        </Text>
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
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
  },
  switch: {
    transform: Platform.OS === 'ios' ? [{ scaleX: 0.9 }, { scaleY: 0.9 }] : [],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  version: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
  },
});
