
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  Platform
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { IconSymbol } from '@/components/IconSymbol';

export default function SettingsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { isDarkMode, toggleTheme, logout, notificationSettings, updateNotificationSettings } = useApp();
  const [showReminderModal, setShowReminderModal] = useState(false);

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

  const reminderOptions = [
    { value: 1, label: 'Once per day' },
    { value: 2, label: 'Twice per day' },
    { value: 3, label: 'Three times per day' },
    { value: 4, label: 'Four times per day' },
    { value: 5, label: 'Five times per day' },
  ];

  const isIOS = Platform.OS === 'ios';

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Settings</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          !isIOS && styles.contentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.section, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Appearance</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <IconSymbol name="moon.fill" size={24} color={theme.colors.text} />
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor="#FFF"
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notifications</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <IconSymbol name="bell.fill" size={24} color={theme.colors.text} />
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Daily Reminders
              </Text>
            </View>
            <Switch
              value={notificationSettings.dailyReminderEnabled}
              onValueChange={(value) => updateNotificationSettings({ dailyReminderEnabled: value })}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor="#FFF"
            />
          </View>

          {notificationSettings.dailyReminderEnabled && (
            <TouchableOpacity
              style={[styles.settingRow, { marginTop: 8 }]}
              onPress={() => setShowReminderModal(true)}
            >
              <View style={styles.settingLeft}>
                <IconSymbol name="clock.fill" size={24} color={theme.colors.text} />
                <View>
                  <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                    Reminder Frequency
                  </Text>
                  <Text style={[styles.settingSubtext, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
                    {reminderOptions.find(o => o.value === notificationSettings.reminderTimes)?.label}
                  </Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={theme.dark ? '#98989D' : '#8E8E93'} />
            </TouchableOpacity>
          )}

          <View style={[styles.settingRow, { marginTop: 8 }]}>
            <View style={styles.settingLeft}>
              <IconSymbol name="sparkles" size={24} color={theme.colors.text} />
              <View>
                <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                  Trick of the Day
                </Text>
                <Text style={[styles.settingSubtext, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
                  Random time each day
                </Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.trickOfTheDayEnabled}
              onValueChange={(value) => updateNotificationSettings({ trickOfTheDayEnabled: value })}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor="#FFF"
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
              <IconSymbol name="person.fill" size={24} color={theme.colors.text} />
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Account Settings
              </Text>
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

      <Modal
        visible={showReminderModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReminderModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowReminderModal(false)}
        >
          <View style={[styles.modal, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Reminder Frequency</Text>
            <ScrollView style={styles.modalScroll}>
              {reminderOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.modalOption,
                    notificationSettings.reminderTimes === option.value && { backgroundColor: theme.colors.primary + '20' }
                  ]}
                  onPress={() => {
                    updateNotificationSettings({ reminderTimes: option.value });
                    setShowReminderModal(false);
                  }}
                >
                  <Text style={[
                    styles.modalOptionText,
                    { color: notificationSettings.reminderTimes === option.value ? theme.colors.primary : theme.colors.text }
                  ]}>
                    {option.label}
                  </Text>
                  {notificationSettings.reminderTimes === option.value && (
                    <IconSymbol name="checkmark" size={20} color={theme.colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
  settingLabel: {
    fontSize: 16,
  },
  settingSubtext: {
    fontSize: 12,
    marginTop: 2,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    maxHeight: '60%',
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalScroll: {
    maxHeight: 300,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  modalOptionText: {
    fontSize: 16,
  },
});
