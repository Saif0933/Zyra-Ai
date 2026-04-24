import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState, useEffect, useRef } from 'react';
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
  View,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

interface LoginScreenProps {
  navigation: any;
  route: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {
  const { isDark } = useTheme();
  const role: string = route?.params?.role ?? 'healthai';
  const isHealthAi = role === 'healthai';

  // Theme Constants
  const accent = isHealthAi ? '#22C55E' : '#F43F5E';
  const themeGradients = isHealthAi ? ['#22C55E', '#10B981'] : ['#F43F5E', '#E11D48'];
  const roleName = isHealthAi ? 'Health AI' : 'BeautiCare';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);
  
  const styles = React.useMemo(() => createDynamicStyles(isDark, accent), [isDark, accent]);

  // Animation Values
  const anims = useRef([...Array(6)].map(() => new Animated.Value(0))).current;

  React.useEffect(() => {
    // 1. Start Animations
    const staggerAnims = anims.map((anim, i) => 
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: i * 150,
        easing: Easing.out(Easing.back(1)),
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, staggerAnims).start();

    // 2. Configure Google Sign-In (Ensuring correct Web Client ID and Scopes)
    GoogleSignin.configure({
      webClientId: '366048809349-79cao6kbjs96np7k7mkao9hbgi9uavkh.apps.googleusercontent.com',
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });
  }, []);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      return;
    }
    navigation.reset({ index: 0, routes: [{ name: isHealthAi ? 'HealthAiMain' : 'BeautiCareMain' }] });
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Attempting Sign-In
      const result = await GoogleSignin.signIn();
      const idToken = result.data?.idToken || (result as any).idToken || (result as any).user?.idToken;
      
      if (!idToken) {
        console.log('Google Sign-In Success but no token:', JSON.stringify(result, null, 2));
        throw new Error('DEVELOPER_ERROR: ID Token missing. Ensure Web Client ID is correctly set in Firebase.');
      }
      
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      
      navigation.reset({
        index: 0,
        routes: [{ name: isHealthAi ? 'HealthAiMain' : 'BeautiCareMain' }],
      });
    } catch (error: any) {
      console.log('Google Sign-In Error Details:', JSON.stringify(error, null, 2));
      
      if (error.code === '12501') {
        return; // User cancelled, just exit
      }

      let errorMessage = 'Google login failed.';
      if (error.code === '12500') {
        errorMessage = 'INTERNAL ERROR (12500): This is usually a SHA-1 or Client ID mismatch in Firebase Console.\n\nPROPER FIX:\n1. Check your SHA-1 in Firebase.\n2. Ensure Google Sign-In is ENABLED.\n3. Verify your google-services.json.';
      } else if (error.code === 'DEVELOPER_ERROR') {
        errorMessage = 'DEVELOPER ERROR: Check SHA-1 and Web Client ID configuration.';
      } else {
        errorMessage = error.message || 'An unknown error occurred.';
      }

      // Development Bypass Option
      Alert.alert(
        'Google Login Issue',
        errorMessage,
        [
          { text: 'Try Again', style: 'default' },
          { 
            text: 'Bypass (Dev Only)', 
            style: 'destructive',
            onPress: () => {
              // Only use this for testing if your Firebase is not yet configured
              navigation.reset({
                index: 0,
                routes: [{ name: isHealthAi ? 'HealthAiMain' : 'BeautiCareMain' }],
              });
            }
          }
        ]
      );
    }
  };

  const renderAnimatedView = (index: number, children: React.ReactNode, style?: any) => (
    <Animated.View style={[{
      opacity: anims[index],
      transform: [{ translateY: anims[index].interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }]
    }, style]}>
      {children}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Immersive Mesh Gradient Background */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient 
          colors={isDark ? ['#020617', '#0F172A', '#020617'] : ['#F8FAFC', '#F1F5F9', '#E2E8F0']} 
          style={StyleSheet.absoluteFill} 
        />
        {/* Abstract Mesh Blobs */}
        <View style={[styles.meshBlob, { top: -50, right: -50, backgroundColor: `${accent}15`, transform: [{scale: 1.5}] }]} />
        <View style={[styles.meshBlob, { bottom: 100, left: -100, backgroundColor: isHealthAi ? '#3B82F610' : '#F43F5E10', transform: [{scale: 2}] }]} />
      </View>

      <SafeAreaView style={styles.flex1}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex1}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            
            {/* Minimal Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backTouch}>
                <Icon name="close" size={24} color={isDark ? '#FFF' : '#000'} />
              </TouchableOpacity>
              <View style={styles.brandBox}>
                <View style={[styles.brandDot, { backgroundColor: accent }]} />
                <Text style={styles.brandName}>SYMBOSYS</Text>
              </View>
            </View>

            <View style={styles.mainContent}>
              
              {/* Luxury Welcome Section */}
              {renderAnimatedView(0, (
                <View style={styles.welcomeBox}>
                  <Text style={[styles.roleLabel, { color: accent }]}>{roleName.toUpperCase()}</Text>
                  <Text style={styles.welcomeTitle}>Ready for your{'\n'}<Text style={{color: accent}}>next level?</Text></Text>
                  <Text style={styles.welcomeSub}>Please sign in to your workspace to continue.</Text>
                </View>
              ))}

              {/* Integrated Form Section */}
              <View style={styles.formBox}>
                
                {/* Email Field */}
                {renderAnimatedView(1, (
                  <View style={styles.inputGroup}>
                    <Text style={[styles.inputTitle, (isEmailFocused || email) && { color: accent }]}>EMAIL ADDRESS</Text>
                    <View style={[styles.underlinedInput, isEmailFocused && { borderBottomColor: accent, borderBottomWidth: 2 }]}>
                      <Icon name="email-outline" size={22} color={isEmailFocused ? accent : '#94A3B8'} />
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#64748B"
                        value={email}
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                      />
                    </View>
                  </View>
                ))}

                {/* Password Field */}
                {renderAnimatedView(2, (
                  <View style={styles.inputGroup}>
                    <View style={styles.titleRow}>
                      <Text style={[styles.inputTitle, (isPassFocused || password) && { color: accent }]}>SECURITY CODE</Text>
                      <TouchableOpacity><Text style={[styles.forgotLink, { color: accent }]}>Forgot?</Text></TouchableOpacity>
                    </View>
                    <View style={[styles.underlinedInput, isPassFocused && { borderBottomColor: accent, borderBottomWidth: 2 }]}>
                      <Icon name="lock-outline" size={22} color={isPassFocused ? accent : '#94A3B8'} />
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="#64748B"
                        secureTextEntry={!showPassword}
                        value={password}
                        onFocus={() => setIsPassFocused(true)}
                        onBlur={() => setIsPassFocused(false)}
                        onChangeText={setPassword}
                      />
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#94A3B8" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {/* Main Action Button */}
                {renderAnimatedView(3, (
                  <TouchableOpacity 
                    activeOpacity={0.9} 
                    onPress={handleLogin} 
                    disabled={!email.trim() || !password.trim()}
                    style={[styles.loginBtnWrapper, (!email.trim() || !password.trim()) && { opacity: 0.5, elevation: 0, shadowOpacity: 0 }]}
                  >
                    <LinearGradient 
                      colors={(!email.trim() || !password.trim()) ? ['#94A3B8', '#64748B'] : themeGradients} 
                      style={styles.loginBtn} 
                      start={{x:0, y:0}} 
                      end={{x:1, y:0}}
                    >
                      <Text style={styles.loginBtnText}>Enter Workspace</Text>
                      <Icon name="arrow-right" size={20} color="#FFF" />
                    </LinearGradient>
                  </TouchableOpacity>
                ))}

                {/* Social Login Section */}
                {renderAnimatedView(4, (
                  <View style={styles.socialBox}>
                    <View style={styles.dividerRow}>
                      <View style={styles.line} />
                      <Text style={styles.orText}>ONE-CLICK SIGN IN</Text>
                      <View style={styles.line} />
                    </View>

                    <TouchableOpacity 
                      activeOpacity={0.8} 
                      onPress={onGoogleButtonPress}
                      onPressIn={() => Animated.spring(anims[4], { toValue: 0.96, useNativeDriver: true }).start()}
                      onPressOut={() => Animated.spring(anims[4], { toValue: 1, useNativeDriver: true }).start()}
                    >
                      <Animated.View style={[styles.googleButton, { transform: [{ scale: anims[4] }] }]}>
                         <Icon name="google" size={24} color={isDark ? '#FFF' : '#000'} />
                         <Text style={styles.googleLabel}>Continue with Google</Text>
                      </Animated.View>
                    </TouchableOpacity>
                  </View>
                ))}

              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const createDynamicStyles = (isDark: boolean, accent: string) => StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
  meshBlob: { position: 'absolute', width: 400, height: 400, borderRadius: 200 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    height: 80,
  },
  backTouch: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  brandBox: { flexDirection: 'row', alignItems: 'center' },
  brandDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  brandName: { fontSize: 13, fontWeight: '900', color: '#94A3B8', letterSpacing: 4 },
  
  mainContent: { flex: 1, paddingHorizontal: 30 },
  welcomeBox: { marginTop: 40, marginBottom: 50 },
  roleLabel: { fontSize: 11, fontWeight: '900', letterSpacing: 3, marginBottom: 12 },
  welcomeTitle: { fontSize: 44, fontWeight: '900', color: '#FFF', lineHeight: 52, letterSpacing: -1.5 },
  welcomeSub: { fontSize: 16, color: '#94A3B8', marginTop: 15, lineHeight: 24, maxWidth: '80%' },
  
  formBox: { flex: 1 },
  inputGroup: { marginBottom: 35 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  inputTitle: { fontSize: 11, fontWeight: '900', color: '#475569', letterSpacing: 2 },
  underlinedInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingBottom: 10,
    marginTop: 5,
  },
  input: { flex: 1, marginLeft: 15, fontSize: 18, fontWeight: '600', color: '#FFF' },
  forgotLink: { fontSize: 12, fontWeight: '800' },
  
  loginBtnWrapper: { marginTop: 10, elevation: 12, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 20 },
  loginBtn: { height: 72, borderRadius: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 },
  loginBtnText: { color: '#FFF', fontSize: 20, fontWeight: '900', letterSpacing: 0.5 },
  
  socialBox: { marginTop: 40 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.05)' },
  orText: { marginHorizontal: 15, fontSize: 10, fontWeight: '900', color: '#334155', letterSpacing: 2 },
  googleButton: {
    height: 64,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 2,
    borderColor: `${accent}40`, // Dynamic Theme Border
  },
  googleLabel: { marginLeft: 12, fontSize: 16, fontWeight: '700', color: '#94A3B8' },
  
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 50 },
  footerText: { color: '#64748B', fontSize: 14, fontWeight: '600' },
  signUpText: { fontSize: 14, fontWeight: '900' },
});

export default LoginScreen;