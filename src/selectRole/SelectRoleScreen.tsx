import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import { ThemeColors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

interface SelectRoleScreenProps {
  navigation: any;
}

const roles = [
  {
    id: 'healthai',
    title: 'Health AI',
    subtitle: 'FITNESS & NUTRITION',
    description: 'Track your vitals, nutrition, and fitness progress with AI-powered insights.',
    icon: 'heart-pulse',
    color: '#6366F1',
  },
  {
    id: 'beauticare',
    title: 'BeautiCare',
    subtitle: 'SKIN & BEAUTY',
    description: 'Analyze your skin health, track beauty routines, and get personalized care tips.',
    icon: 'face-woman-shimmer',
    color: '#F43F5E',
  },
];

const SelectRoleScreen: React.FC<SelectRoleScreenProps> = ({ navigation }) => {
  const { colors, isDark } = useTheme();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const styles = useMemo(() => createDynamicStyles(colors, isDark), [colors, isDark]);

  const handleContinue = () => {
    if (selectedRole) {
      navigation.navigate('Login', { role: selectedRole });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} translucent backgroundColor="transparent" />

      <View style={styles.bgDecor1} />
      <View style={styles.bgDecor2} />

      <View style={styles.contentWrapper}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoDot} />
            <Text style={styles.logoText}>SYMBOSYS</Text>
          </View>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>v1.0</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.tagline}>SELECT YOUR EXPERIENCE</Text>
          <Text style={styles.heroTitle}>Choose Your{'\n'}Role</Text>
          <Text style={styles.heroSub}>
            Select the module that best fits your needs. You can switch roles later in settings.
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          {roles.map((role) => {
            const isSelected = selectedRole === role.id;

            return (
              <TouchableOpacity
                key={role.id}
                activeOpacity={0.9}
                style={[
                  styles.roleCard,
                  isSelected && { borderColor: role.color, backgroundColor: isDark ? '#1E293B' : '#F1F5F9' },
                ]}
                onPress={() => setSelectedRole(role.id)}
              >
                {/* Icon */}
                <View
                  style={[
                    styles.roleIconContainer,
                    { backgroundColor: isSelected ? role.color : isDark ? '#334155' : '#E2E8F0' },
                  ]}
                >
                  <Icon
                    name={role.icon}
                    size={26}
                    color={isSelected ? '#FFFFFF' : isDark ? '#94A3B8' : '#64748B'}
                  />
                </View>

                {/* Content */}
                <View style={styles.roleContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.roleTitle}>{role.title}</Text>
                    <Text
                      style={[
                        styles.roleSubtitle,
                        { color: isSelected ? role.color : '#94A3B8' },
                      ]}
                    >
                      {role.subtitle}
                    </Text>
                  </View>
                  <Text style={styles.roleDesc} numberOfLines={2}>
                    {role.description}
                  </Text>
                </View>

                {/* Radio */}
                <View
                  style={[
                    styles.radioOuter,
                    isSelected && { borderColor: role.color },
                  ]}
                >
                  {isSelected && (
                    <View
                      style={[
                        styles.radioInner,
                        { backgroundColor: role.color },
                      ]}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueBtn,
            !selectedRole && styles.continueBtnDisabled,
            selectedRole ? { backgroundColor: colors.primary } : null,
          ]}
          onPress={handleContinue}
          disabled={!selectedRole}
        >
          <Text
            style={[
              styles.continueBtnText,
              !selectedRole && styles.continueBtnTextDisabled,
            ]}
          >
            Continue
          </Text>
          <Icon
            name="arrow-right"
            size={20}
            color={selectedRole ? '#FFFFFF' : isDark ? '#475569' : '#94A3B8'}
          />
        </TouchableOpacity>

        <Text style={styles.footerLegal}>
          By continuing, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const createDynamicStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
    },
    contentWrapper: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    bgDecor1: {
      position: 'absolute',
      top: -50,
      right: -50,
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)',
    },
    bgDecor2: {
      position: 'absolute',
      top: height * 0.4,
      left: -80,
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: isDark ? 'rgba(244, 63, 94, 0.1)' : 'rgba(244, 63, 94, 0.05)',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      marginTop: 20,
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#6366F1',
      marginRight: 8,
    },
    logoText: {
      fontSize: 12,
      fontWeight: '900',
      color: isDark ? '#F1F5F9' : '#0F172A',
      letterSpacing: 2,
    },
    versionBadge: {
      backgroundColor: isDark ? '#1E293B' : '#E2E8F0',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    versionText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: isDark ? '#94A3B8' : '#64748B',
    },
    heroSection: {
      paddingHorizontal: 24,
      marginTop: 40,
      marginBottom: 30,
    },
    tagline: {
      fontSize: 11,
      fontWeight: '800',
      color: '#6366F1',
      marginBottom: 8,
    },
    heroTitle: {
      fontSize: 38,
      fontWeight: '800',
      color: isDark ? '#F1F5F9' : '#0F172A',
    },
    heroSub: {
      fontSize: 15,
      color: isDark ? '#94A3B8' : '#475569',
    },
    cardsContainer: {
      paddingHorizontal: 24,
    },
    roleCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
      borderRadius: 24,
      padding: 16,
      marginBottom: 16,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    roleIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    roleContent: {
      flex: 1,
      marginLeft: 16,
    },
    titleRow: {
      marginBottom: 4,
    },
    roleTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: isDark ? '#F1F5F9' : '#0F172A',
    },
    roleSubtitle: {
      fontSize: 10,
      fontWeight: '800',
    },
    roleDesc: {
      fontSize: 12,
      color: isDark ? '#94A3B8' : '#64748B',
    },
    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: isDark ? '#334155' : '#CBD5F5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    footer: {
      paddingHorizontal: 24,
      paddingBottom: 30,
    },
    continueBtn: {
      height: 60,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      backgroundColor: '#6366F1',
    },
    continueBtnDisabled: {
      backgroundColor: isDark ? '#1E293B' : '#E2E8F0',
    },
    continueBtnText: {
      color: '#FFFFFF',
      fontWeight: '700',
    },
    continueBtnTextDisabled: {
      color: isDark ? '#475569' : '#94A3B8',
    },
    footerLegal: {
      color: '#64748B',
      textAlign: 'center',
      marginTop: 20,
    },
    linkText: {
      color: '#6366F1',
    },
  });

export default SelectRoleScreen;