
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { IconSymbol } from '@/components/IconSymbol';
import { PROFILE_SYMBOLS } from '@/types/tricks';

export default function AccountSettingsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { userProfile, updateProfile } = useApp();

  const [username, setUsername] = useState(userProfile?.username || '');
  const [realName, setRealName] = useState(userProfile?.realName || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [selectedSymbol, setSelectedSymbol] = useState(userProfile?.profilePicture || 'wand');

  const handleSave = () => {
    if (!username || !realName || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    updateProfile({
      username,
      realName,
      email,
      profilePicture: selectedSymbol
    });

    Alert.alert('Success', 'Profile updated successfully', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const isIOS = Platform.OS === 'ios';

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
          !isIOS && styles.contentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.section, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Profile Picture</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
            Choose a magic symbol
          </Text>
          <View style={styles.symbolGrid}>
            {PROFILE_SYMBOLS.map((symbol) => (
              <TouchableOpacity
                key={symbol.id}
                style={[
                  styles.symbolButton,
                  {
                    backgroundColor: selectedSymbol === symbol.id 
                      ? theme.colors.primary 
                      : (theme.dark ? '#2C2C2E' : '#F2F2F7')
                  }
                ]}
                onPress={() => setSelectedSymbol(symbol.id)}
              >
                <IconSymbol 
                  name={symbol.icon} 
                  size={32} 
                  color={selectedSymbol === symbol.id ? '#FFF' : theme.colors.text} 
                />
                <Text style={[
                  styles.symbolName,
                  { color: selectedSymbol === symbol.id ? '#FFF' : theme.colors.text }
                ]}>
                  {symbol.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Profile Information</Text>
          
          <View style={styles.inputGroup}>
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
          </View>

          <View style={styles.inputGroup}>
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
          </View>

          <View style={styles.inputGroup}>
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
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  symbolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  symbolButton: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  symbolName: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
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
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
