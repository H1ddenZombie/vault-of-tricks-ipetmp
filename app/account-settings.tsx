
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { IconSymbol } from '@/components/IconSymbol';

export default function AccountSettingsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { userProfile, updateProfile } = useApp();

  const [username, setUsername] = useState(userProfile?.username || '');
  const [realName, setRealName] = useState(userProfile?.realName || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (!username || !realName || !email) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    updateProfile({ username, realName, email });
    Alert.alert('Success', 'Profile updated successfully', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Account Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.avatarSection, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.avatarText}>
              {username.charAt(0).toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity style={[styles.changePhotoButton, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
            <IconSymbol name="camera" size={16} color={theme.colors.primary} />
            <Text style={[styles.changePhotoText, { color: theme.colors.primary }]}>
              Change Photo
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Profile Information</Text>

          <Text style={[styles.label, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>Username</Text>
          <View style={[styles.inputContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
            />
          </View>

          <Text style={[styles.label, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>Real Name</Text>
          <View style={[styles.inputContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              value={realName}
              onChangeText={setRealName}
              placeholder="Real Name"
              placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
            />
          </View>

          <Text style={[styles.label, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>Email</Text>
          <View style={[styles.inputContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Change Password</Text>

          <Text style={[styles.label, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>New Password</Text>
          <View style={[styles.inputContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              value={password}
              onChangeText={setPassword}
              placeholder="Leave blank to keep current"
              placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
              secureTextEntry
            />
          </View>

          <Text style={[styles.label, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>Confirm Password</Text>
          <View style={[styles.inputContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  avatarSection: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  inputContainer: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    fontSize: 16,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
