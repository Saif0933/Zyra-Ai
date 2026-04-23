import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
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

interface LoginScreenProps {
  navigation: any;
  route: any;
}

// import { setAuthToken } from '../api/api';
// import { useGoogleLogin, useLogin } from '../auth/hook/userAuth';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(colors, isDark), [colors, isDark]);

  const role: string = route?.params?.role ?? 'healthai';
  const isHealthAi = role === 'healthai';

  const roleName = isHealthAi ? 'Health AI' : 'BeautiCare';
  const roleIcon = isHealthAi ? 'heart-pulse' : 'face-woman-shimmer';
  const accentColor = isHealthAi ? colors.primary : '#F43F5E';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // const loginMutation = useLogin();
  // const googleLoginMutation = useGoogleLogin();

  const isLoading = false;

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: '366048809349-79cao6kbjs96np7k7mkao9hbgi9uavkh.apps.googleusercontent.com',
      offlineAccess: true, 
      scopes: ['profile', 'email'],
    });
  }, []);

  const onGoogleButtonPress = async () => {
    // Mock Google Sign-In (REVERTED)
    navigation.reset({
      index: 0,
      routes: [{ name: role === 'healthai' ? 'HealthAiMain' : 'BeautiCareMain' }],
    });
  };

  const validateEmail = (text: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleLogin = () => {
    let hasError = false;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email.trim())) {
      setEmailError('Invalid email');
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      hasError = true;
    }

    if (hasError) return;

    // Mock Login (REVERTED)
    navigation.reset({
      index: 0,
      routes: [{ name: role === 'healthai' ? 'HealthAiMain' : 'BeautiCareMain' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#0F172A' : '#F8FAFC'} />

      <View style={[styles.bgDecor1, { backgroundColor: `${accentColor}15` }]} />
      <View style={[styles.bgDecor2, { backgroundColor: `${accentColor}10` }]} />

      <KeyboardAvoidingView style={styles.flex1} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={22} color={isDark ? '#F1F5F9' : '#0F172A'} />
            </TouchableOpacity>
          </View>

          <View style={styles.roleBadge}>
            <View style={[styles.roleBadgeIcon, { backgroundColor: accentColor }]}>
              <Icon name={roleIcon} size={18} color="#fff" />
            </View>
            <Text style={[styles.roleBadgeText, { color: accentColor }]}>
              {roleName.toUpperCase()}
            </Text>
          </View>

          <View style={styles.titleSection}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.title}>Sign In to{'\n'}Your Account</Text>
            <Text style={styles.subtitle}>
              Enter your credentials for {roleName}
            </Text>
          </View>

          <View style={styles.formSection}>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL</Text>
              <View style={[
                styles.inputContainer,
                emailError && styles.inputError,
                email && !emailError && { borderColor: accentColor }
              ]}>
                <Icon name="email-outline" size={20} color={isDark ? '#94A3B8' : '#64748B'} />
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  placeholderTextColor={isDark ? '#475569' : '#94A3B8'}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <View style={[
                styles.inputContainer,
                passwordError && styles.inputError,
                password && !passwordError && { borderColor: accentColor }
              ]}>
                <Icon name="lock-outline" size={20} color={isDark ? '#94A3B8' : '#64748B'} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  placeholderTextColor={isDark ? '#475569' : '#94A3B8'}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color={isDark ? '#94A3B8' : '#64748B'} />
                </TouchableOpacity>
              </View>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            <TouchableOpacity style={[styles.loginBtn, { backgroundColor: accentColor }]} onPress={handleLogin}>
              <Text style={styles.loginBtnText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity style={styles.googleBtn} onPress={onGoogleButtonPress}>
              <Icon name="google" size={20} color={isDark ? '#F1F5F9' : '#0F172A'} />
              <Text style={styles.googleBtnText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register', { role })}>
              <Text style={styles.registerLinkText}>
                Don't have an account? <Text style={{ color: accentColor, fontWeight: '800' }}>Sign Up</Text>
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
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
    },
    flex1: { flex: 1 },
    scrollContent: { paddingBottom: 40 },

    bgDecor1: {
      position: 'absolute',
      top: -80,
      right: -60,
      width: 220,
      height: 220,
      borderRadius: 110,
    },
    bgDecor2: {
      position: 'absolute',
      bottom: 80,
      left: -50,
      width: 160,
      height: 160,
      borderRadius: 80,
    },

    header: { padding: 24, paddingTop: Platform.OS === 'android' ? 10 : 24 },

    backBtn: {
      backgroundColor: isDark ? '#1E293B' : '#E2E8F0',
      padding: 10,
      borderRadius: 10,
      alignSelf: 'flex-start',
    },

    roleBadge: {
      flexDirection: 'row',
      marginLeft: 24,
      gap: 10,
      alignItems: 'center',
    },

    roleBadgeIcon: {
      width: 30,
      height: 30,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },

    roleBadgeText: {
      fontWeight: '800',
      fontSize: 12,
    },

    titleSection: {
      padding: 24,
    },

    welcomeText: {
      color: isDark ? '#94A3B8' : '#64748B',
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 8,
    },

    title: {
      fontSize: 32,
      color: isDark ? '#F1F5F9' : '#0F172A',
      fontWeight: '800',
      lineHeight: 40,
    },

    subtitle: {
      color: isDark ? '#94A3B8' : '#64748B',
      marginTop: 8,
      fontSize: 14,
    },

    formSection: {
      paddingHorizontal: 24,
    },

    inputGroup: {
      marginBottom: 20,
    },

    inputLabel: {
      fontSize: 12,
      marginBottom: 8,
      color: isDark ? '#94A3B8' : '#64748B',
      fontWeight: '700',
      letterSpacing: 1,
    },

    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: Platform.OS === 'ios' ? 14 : 4,
      borderWidth: 1,
      borderColor: isDark ? '#334155' : '#E2E8F0',
    },

    input: {
      flex: 1,
      color: isDark ? '#F1F5F9' : '#0F172A',
      fontSize: 15,
      marginLeft: 10,
    },

    inputError: {
      borderColor: '#EF4444',
    },

    errorText: {
      color: '#EF4444',
      fontSize: 12,
      marginTop: 6,
      marginLeft: 4,
    },

    loginBtn: {
      padding: 18,
      borderRadius: 16,
      marginTop: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },

    loginBtnText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 16,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 24,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: isDark ? '#334155' : '#E2E8F0',
    },
    dividerText: {
      marginHorizontal: 16,
      color: isDark ? '#94A3B8' : '#64748B',
      fontSize: 12,
      fontWeight: '700',
    },
    googleBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: isDark ? '#334155' : '#E2E8F0',
      backgroundColor: isDark ? 'transparent' : '#FFFFFF',
    },
    googleBtnText: {
      marginLeft: 10,
      color: isDark ? '#F1F5F9' : '#0F172A',
      fontWeight: '600',
      fontSize: 15,
    },
    registerLink: {
      marginTop: 24,
      alignItems: 'center',
    },
    registerLinkText: {
      color: isDark ? '#94A3B8' : '#64748B',
      fontSize: 14,
    },
  });

export default LoginScreen;