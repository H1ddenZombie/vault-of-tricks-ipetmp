
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
import { PROFILE_IMAGES } from '@/types/tricks';

export default function AccountSettingsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { userProfile, updateProfile } = useApp();

  const [username, setUsername] = useState(userProfile?.username || '');
  const [realName, setRealName] = useState(userProfile?.realName || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [selectedImage, setSelectedImage] = useState(userProfile?.profilePicture || '🎩');

  const handleSave = () => {
    if (!username || !realName || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    updateProfile({
      username,
      realName,
      email,
      profilePicture: selectedImage
    });

    Alert.alert('Success', 'Profile updated successfully');
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Account Settings</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          Platform.OS !== 'ios' && styles.contentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.section, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Profile Picture</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
            Choose a magic trick symbol
          </Text>
          <View style={styles.imageGrid}>
            {PROFILE_IMAGES.map((image) => (
              <TouchableOpacity
                key={image}
                style={[
                  styles.imageOption,
                  {
                    backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7',
                    borderColor: selectedImage === image ? theme.colors.primary : 'transparent',
                    borderWidth: 3,
                  }
                ]}
                onPress={() => setSelectedImage(image)}
              >
                <Text style={styles.imageText}>{image}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Personal Information</Text>
          
          <Text style={[styles.label, { color: theme.colors.text }]}>Username</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7',
                color: theme.colors.text
              }
            ]}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
          />

          <Text style={[styles.label, { color: theme.colors.text }]}>Real Name</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7',
                color: theme.colors.text
              }
            ]}
            value={realName}
            onChangeText={setRealName}
            placeholder="Enter real name"
            placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
          />

          <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7',
                color: theme.colors.text
              }
            ]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
            keyboardType="email-address"
            autoCapitalize="none"
          />
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
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  saveButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
