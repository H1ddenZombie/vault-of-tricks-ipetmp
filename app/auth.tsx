
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { IconSymbol } from '@/components/IconSymbol';

export default function AuthScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { login, signup } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [realName, setRealName] = useState('');

  const handleSubmit = async () => {
    if (isLogin) {
      if (!email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      const success = await login(email, password);
      if (success) {
        router.replace('/(tabs)/');
      } else {
        Alert.alert('Error', 'Invalid credentials. Password must be at least 6 characters.');
      }
    } else {
      if (!username || !realName || !email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      const success = await signup(username, realName, email, password);
      if (success) {
        router.replace('/(tabs)/');
      } else {
        Alert.alert('Error', 'Signup failed. Please check your information.');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
            <IconSymbol name="sparkles" size={48} color="#FFF" />
          </View>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Vault of Tricks
          </Text>
          <Text style={[styles.subtitle, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
            Master the art of magic
          </Text>
        </View>

        <View style={[styles.form, { backgroundColor: theme.dark ? '#1C1C1E' : '#FFF' }]}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                isLogin && { backgroundColor: theme.colors.primary }
              ]}
              onPress={() => setIsLogin(true)}
            >
              <Text style={[
                styles.tabText,
                { color: isLogin ? '#FFF' : theme.colors.text }
              ]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                !isLogin && { backgroundColor: theme.colors.primary }
              ]}
              onPress={() => setIsLogin(false)}
            >
              <Text style={[
                styles.tabText,
                { color: !isLogin ? '#FFF' : theme.colors.text }
              ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {!isLogin && (
            <>
              <View style={[styles.inputContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
                <IconSymbol name="person" size={20} color={theme.dark ? '#98989D' : '#8E8E93'} />
                <TextInput
                  style={[styles.input, { color: theme.colors.text }]}
                  placeholder="Username"
                  placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>

              <View style={[styles.inputContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
                <IconSymbol name="person.fill" size={20} color={theme.dark ? '#98989D' : '#8E8E93'} />
                <TextInput
                  style={[styles.input, { color: theme.colors.text }]}
                  placeholder="Real Name"
                  placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
                  value={realName}
                  onChangeText={setRealName}
                />
              </View>
            </>
          )}

          <View style={[styles.inputContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
            <IconSymbol name="envelope" size={20} color={theme.dark ? '#98989D' : '#8E8E93'} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Email"
              placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#F2F2F7' }]}>
            <IconSymbol name="lock" size={20} color={theme.dark ? '#98989D' : '#8E8E93'} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Password"
              placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>
              {isLogin ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    borderRadius: 20,
    padding: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
