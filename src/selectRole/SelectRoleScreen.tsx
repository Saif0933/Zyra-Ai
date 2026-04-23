import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

interface SelectRoleScreenProps {
  navigation: any;
}

const roles = [
  {
    id: 'healthai',
    title: 'FITNESS & GYM',
    subtitle: 'Health AI',
    description: 'Track your body, calories, and workouts with professional precision.',
    icon: 'arm-flex',
    colors: ['#22C55E', '#16A34A'], // Matched Gym Home Color
    lightColors: ['#F0FDF4', '#DCFCE7'],
  },
  {
    id: 'beauticare',
    title: 'SKIN & BEAUTY',
    subtitle: 'BeautiCare',
    description: 'AI Skin analysis and beauty routines for your best glow.',
    icon: 'face-woman-shimmer',
    colors: ['#F43F5E', '#BE123C'], // Matched Beauty Home Color
    lightColors: ['#FFF1F2', '#FFE4E6'],
  },
];

const SelectRoleScreen: React.FC<SelectRoleScreenProps> = ({ navigation }) => {
  const { isDark } = useTheme();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  // Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideIn = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideIn, { toValue: 0, duration: 600, easing: Easing.out(Easing.back(1)), useNativeDriver: true }),
    ]).start();
  }, []);

  const styles = useMemo(() => createDynamicStyles(isDark), [isDark]);

  const handleContinue = () => {
    if (selectedRole) {
      navigation.navigate('Login', { role: selectedRole });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      
      <View style={styles.topHeader}>
        <View style={styles.logoBox}>
          <Text style={styles.logo}>SYMBOSYS</Text>
        </View>
        <Text style={styles.welcomeText}>Choose your focus</Text>
      </View>

      <Animated.View style={[styles.tileContainer, { opacity: fadeAnim, transform: [{ translateY: slideIn }] }]}>
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <TouchableOpacity
              key={role.id}
              activeOpacity={0.9}
              onPress={() => setSelectedRole(role.id)}
              style={styles.roleWrapper}
            >
              <LinearGradient
                colors={isSelected ? role.colors : (isDark ? ['#1E293B', '#1E293B'] : role.lightColors)}
                style={[styles.tile, isSelected && styles.activeTile]}
              >
                {/* Floating Icon Background */}
                <View style={styles.iconGhost}>
                  <Icon name={role.icon} size={150} color={isSelected ? 'rgba(255,255,255,0.1)' : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)')} />
                </View>

                <View style={styles.tileContent}>
                  <View style={[styles.iconCircle, { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : (isDark ? '#334155' : '#FFF') }]}>
                    <Icon name={role.icon} size={32} color={isSelected ? '#FFF' : role.colors[0]} />
                  </View>
                  <Text style={[styles.tileSubtitle, { color: isSelected ? 'rgba(255,255,255,0.8)' : '#94A3B8' }]}>
                    {role.subtitle.toUpperCase()}
                  </Text>
                  <Text style={[styles.tileTitle, { color: isSelected ? '#FFF' : (isDark ? '#FFF' : '#1E293B') }]}>
                    {role.title}
                  </Text>
                  <Text style={[styles.tileDesc, { color: isSelected ? 'rgba(255,255,255,0.7)' : '#64748B' }]} numberOfLines={2}>
                    {role.description}
                  </Text>
                </View>

                {isSelected && (
                  <View style={styles.selectedBadge}>
                    <Icon name="check-circle" size={24} color="#FFF" />
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          onPress={handleContinue}
          disabled={!selectedRole}
          activeOpacity={0.8}
          style={[styles.continueBtn, !selectedRole && styles.disabledBtn]}
        >
          <LinearGradient
            colors={selectedRole ? (selectedRole === 'healthai' ? ['#22C55E', '#16A34A'] : ['#F43F5E', '#BE123C']) : ['#E2E8F0', '#E2E8F0']}
            style={styles.btnGradient}
          >
            <Text style={[styles.btnText, !selectedRole && { color: '#94A3B8' }]}>Get Started</Text>
            <Icon name="arrow-right" size={20} color={selectedRole ? '#FFF' : '#94A3B8'} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createDynamicStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#000' : '#FFF',
  },
  topHeader: {
    marginTop: height * 0.08,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoBox: {
    backgroundColor: isDark ? '#111' : '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 15,
  },
  logo: {
    fontSize: 12,
    fontWeight: '900',
    color: isDark ? '#FFF' : '#000',
    letterSpacing: 4,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '800',
    color: isDark ? '#FFF' : '#1E293B',
    textAlign: 'center',
  },
  tileContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 15,
  },
  roleWrapper: {
    height: (height * 0.5) / 2,
    borderRadius: 32,
    overflow: 'hidden',
  },
  tile: {
    flex: 1,
    padding: 25,
    borderRadius: 32,
    justifyContent: 'center',
  },
  activeTile: {
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  iconGhost: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    transform: [{ rotate: '-15deg' }],
  },
  tileContent: {
    zIndex: 1,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  tileSubtitle: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 5,
  },
  tileTitle: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  tileDesc: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
    width: '80%',
  },
  selectedBadge: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  bottomSection: {
    padding: 30,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
  },
  continueBtn: {
    height: 64,
    borderRadius: 22,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  disabledBtn: {
    elevation: 0,
    shadowOpacity: 0,
  },
  btnGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
  signIn: {
    color: '#22C55E', // Matched Gym Green for link
    fontWeight: 'bold',
  },
});

export default SelectRoleScreen;