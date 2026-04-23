import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import { ThemeColors } from '../theme/colors';
// import { useRegister } from '../auth/hook/userAuth';
// import { setAuthToken } from '../api/api';

interface RegisterScreenProps {
  navigation: any;
  route: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation, route }) => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(colors, isDark), [colors, isDark]);

  const role: string = route?.params?.role ?? 'healthai';
  const roleName = role === 'healthai' ? 'Health AI' : 'BeautiCare';
  const accentColor = role === 'healthai' ? colors.primary : '#F43F5E';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // const registerMutation = useRegister();

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Mock Registration (REVERTED)
    Alert.alert('Success', 'Account created successfully (Mock)', [
      { text: 'Start Exploring', onPress: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: role === 'healthai' ? 'HealthAiMain' : 'BeautiCareMain' }],
        });
      }}
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <KeyboardAvoidingView style={styles.flex1} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color={isDark ? '#F1F5F9' : '#0F172A'} />
            </TouchableOpacity>
          </View>

          <View style={styles.titleSection}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join {roleName} and start your journey</Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL</Text>
              <View style={styles.inputContainer}>
                <Icon name="email-outline" size={20} color="#64748B" />
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#94A3B8"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <View style={styles.inputContainer}>
                <Icon name="lock-outline" size={20} color="#64748B" />
                <TextInput
                  style={styles.input}
                  placeholder="Create password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#64748B" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
              <View style={styles.inputContainer}>
                <Icon name="lock-check-outline" size={20} color="#64748B" />
                <TextInput
                  style={styles.input}
                  placeholder="Repeat password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.registerBtn, { backgroundColor: accentColor }]} 
              onPress={handleRegister}
              disabled={false}
            >
              <Text style={styles.registerBtnText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLinkText}>
                Already have an account? <Text style={{ color: accentColor, fontWeight: '800' }}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const createDynamicStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: isDark ? '#0F172A' : '#F8FAFC' },
    flex1: { flex: 1 },
    scrollContent: { paddingBottom: 40 },
    header: { padding: 24 },
    backBtn: {
      backgroundColor: isDark ? '#1E293B' : '#E2E8F0',
      padding: 10,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    titleSection: { padding: 24 },
    title: { fontSize: 32, fontWeight: '800', color: isDark ? '#F1F5F9' : '#0F172A' },
    subtitle: { fontSize: 16, color: '#64748B', marginTop: 8 },
    formSection: { paddingHorizontal: 24 },
    inputGroup: { marginBottom: 20 },
    inputLabel: { fontSize: 12, fontWeight: '700', color: '#64748B', marginBottom: 8, letterSpacing: 1 },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#1E293B' : '#FFF',
      borderRadius: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: isDark ? '#334155' : '#E2E8F0',
      height: 56
    },
    input: { flex: 1, marginLeft: 12, color: isDark ? '#F1F5F9' : '#0F172A', fontSize: 15 },
    registerBtn: { height: 60, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginTop: 10, elevation: 4 },
    registerBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
    loginLink: { marginTop: 24, alignItems: 'center' },
    loginLinkText: { color: isDark ? '#94A3B8' : '#64748B', fontSize: 14 }
  });

export default RegisterScreen;
