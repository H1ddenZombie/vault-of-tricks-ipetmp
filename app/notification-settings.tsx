
import React, { useState } from 'react';
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
import { Picker } from '@react-native-picker/picker';

const TIME_OPTIONS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00'
];

export default function NotificationSettingsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { notificationSettings, updateNotificationSettings } = useApp();

  const [dailyReminderEnabled, setDailyReminderEnabled] = useState(notificationSettings.dailyReminderEnabled);
  const [trickOfTheDayEnabled, setTrickOfTheDayEnabled] = useState(notificationSettings.trickOfTheDayEnabled);
  const [reminderTimes, setReminderTimes] = useState(notificationSettings.reminderTimes);
  const [showAddTime, setShowAddTime] = useState(false);
  const [newTime, setNewTime] = useState('09:00');

  const handleSave = () => {
    updateNotificationSettings({
      dailyReminderEnabled,
      trickOfTheDayEnabled,
      reminderTimes
    });
    Alert.alert('Success', 'Notification settings updated successfully');
    router.back();
  };

  const handleAddTime = () => {
    if (reminderTimes.length >= 5) {
      Alert.alert('Limit Reached', 'You can only set up to 5 reminder times per day');
      return;
    }
    if (!reminderTimes.includes(newTime)) {
      setReminderTimes([...reminderTimes, newTime].sort());
      setShowAddTime(false);
    } else {
      Alert.alert('Duplicate', 'This time is already added');
    }
  };

  const handleRemoveTime = (time: string) => {
    if (reminderTimes.length <= 1) {
      Alert.alert('Error', 'You must have at least one reminder time');
      return;
    }
    setReminderTimes(reminderTimes.filter(t => t !== time));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Notification Settings</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          Platform.OS !== 'ios' && styles.contentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.section, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Daily Reminders</Text>
          <Text style={[styles.sectionDescription, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
            Get reminded to practice your magic tricks
          </Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <IconSymbol name="bell.fill" size={24} color={theme.colors.text} />
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Enable Reminders
              </Text>
            </View>
            <Switch
              value={dailyReminderEnabled}
              onValueChange={setDailyReminderEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor="#FFF"
            />
          </View>

          {dailyReminderEnabled && (
            <>
              <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>
                Reminder Times
              </Text>
              {reminderTimes.map((time, index) => (
                <View key={index} style={styles.timeRow}>
                  <View style={styles.timeLeft}>
                    <IconSymbol name="clock" size={20} color={theme.colors.primary} />
                    <Text style={[styles.timeText, { color: theme.colors.text }]}>
                      {time}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveTime(time)}>
                    <IconSymbol name="trash" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              ))}

              {!showAddTime && reminderTimes.length < 5 && (
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
                  onPress={() => setShowAddTime(true)}
                >
                  <IconSymbol name="plus" size={20} color="#FFF" />
                  <Text style={styles.addButtonText}>Add Reminder Time</Text>
                </TouchableOpacity>
              )}

              {showAddTime && (
                <View style={[styles.addTimeContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
                  <Text style={[styles.addTimeLabel, { color: theme.colors.text }]}>
                    Select Time
                  </Text>
                  <View style={[styles.pickerContainer, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
                    <Picker
                      selectedValue={newTime}
                      onValueChange={(itemValue) => setNewTime(itemValue)}
                      style={[styles.picker, { color: theme.colors.text }]}
                      dropdownIconColor={theme.colors.text}
                    >
                      {TIME_OPTIONS.map(time => (
                        <Picker.Item key={time} label={time} value={time} />
                      ))}
                    </Picker>
                  </View>
                  <View style={styles.addTimeButtons}>
                    <TouchableOpacity
                      style={[styles.addTimeButton, { backgroundColor: theme.dark ? '#2C2C2E' : '#E5E5EA' }]}
                      onPress={() => setShowAddTime(false)}
                    >
                      <Text style={[styles.addTimeButtonText, { color: theme.colors.text }]}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.addTimeButton, { backgroundColor: theme.colors.primary }]}
                      onPress={handleAddTime}
                    >
                      <Text style={[styles.addTimeButtonText, { color: '#FFF' }]}>
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          )}
        </View>

        <View style={[styles.section, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Trick of the Day</Text>
          <Text style={[styles.sectionDescription, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
            Discover a random uncompleted trick daily at a random time
          </Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <IconSymbol name="sparkles" size={24} color={theme.colors.text} />
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Enable Trick of the Day
              </Text>
            </View>
            <Switch
              value={trickOfTheDayEnabled}
              onValueChange={setTrickOfTheDayEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor="#FFF"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>

        <View style={[styles.infoBox, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <IconSymbol name="info.circle" size={24} color={theme.colors.primary} />
          <Text style={[styles.infoText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
            Notifications help you stay consistent with your magic practice. You can customize reminder times but the Trick of the Day appears at a random time to keep things exciting!
          </Text>
        </View>
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
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
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
  },
  settingLabel: {
    fontSize: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 10,
    marginBottom: 8,
  },
  timeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 8,
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  addTimeContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  addTimeLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  pickerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  picker: {
    height: 50,
  },
  addTimeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  addTimeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addTimeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  infoBox: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
