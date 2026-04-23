import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');

const SKIN_TYPES = [
  { id: 'oily', label: 'Oily', icon: 'water-percent', desc: 'Shiny, enlarged pores' },
  { id: 'dry', label: 'Dry', icon: 'texture-box', desc: 'Flaky, tight feeling' },
  { id: 'combination', label: 'Combination', icon: 'adjust', desc: 'Oily T-zone, dry cheeks' },
  { id: 'sensitive', label: 'Sensitive', icon: 'alert-decagram-outline', desc: 'Prone to redness' },
  { id: 'normal', label: 'Normal', icon: 'check-circle-outline', desc: 'Balanced, clear skin' },
];

const CONCERNS = [
  'Acne', 'Fine Lines', 'Dark Spots', 'Redness', 'Large Pores', 
  'Dullness', 'Uneven Tone', 'Blackheads', 'Sun Damage', 'Elasticity'
];

const GOALS = [
  { id: 'radiant', label: 'Glow & Radiance', icon: 'shimmer' },
  { id: 'clear', label: 'Clear Blemishes', icon: 'shield-check-outline' },
  { id: 'firm', label: 'Firmness & Lift', icon: 'trending-up' },
  { id: 'hydrated', label: 'Deep Hydration', icon: 'water-outline' },
];

const SkinProfileScreen = () => {
  const navigation = useNavigation();
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);

  const [selectedType, setSelectedType] = React.useState('combination');
  const [selectedConcerns, setSelectedConcerns] = React.useState<string[]>(['Acne', 'Dullness']);
  const [selectedGoals, setSelectedGoals] = React.useState<string[]>(['radiant']);

  const toggleConcern = (concern: string) => {
    setSelectedConcerns(prev => 
      prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
    );
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#000' : '#FFF9FA'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="chevron-left" size={28} color={isDark ? '#FFF' : '#1E293B'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Skin Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Intro Card */}
        <LinearGradient
          colors={['#FDA4AF', '#F43F5E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.introCard}
        >
          <View style={styles.introContent}>
            <Icon name="face-woman-shimmer" size={40} color="#FFF" />
            <View style={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.introTitle}>Personalize Your Glow</Text>
              <Text style={styles.introSub}>Update your skin details for better AI recommendations</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Skin Type Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's your skin type?</Text>
          <View style={styles.typeGrid}>
            {SKIN_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  selectedType === type.id && styles.typeCardActive
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Icon 
                  name={type.icon} 
                  size={24} 
                  color={selectedType === type.id ? '#F43F5E' : '#94A3B8'} 
                />
                <Text style={[
                  styles.typeLabel,
                  selectedType === type.id && styles.typeLabelActive
                ]}>{type.label}</Text>
                <Text style={styles.typeDesc} numberOfLines={1}>{type.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Concerns Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skin Concerns</Text>
          <Text style={styles.sectionSubTitle}>Select all that apply to you</Text>
          <View style={styles.chipContainer}>
            {CONCERNS.map((concern) => (
              <TouchableOpacity
                key={concern}
                style={[
                  styles.chip,
                  selectedConcerns.includes(concern) && styles.chipActive
                ]}
                onPress={() => toggleConcern(concern)}
              >
                <Text style={[
                  styles.chipText,
                  selectedConcerns.includes(concern) && styles.chipTextActive
                ]}>{concern}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Goals Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Skin Goals</Text>
          <View style={styles.goalGrid}>
            {GOALS.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  selectedGoals.includes(goal.id) && styles.goalCardActive
                ]}
                onPress={() => toggleGoal(goal.id)}
              >
                <View style={[
                  styles.goalIconBg,
                  selectedGoals.includes(goal.id) ? { backgroundColor: '#F43F5E' } : { backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC' }
                ]}>
                  <Icon 
                    name={goal.icon} 
                    size={20} 
                    color={selectedGoals.includes(goal.id) ? '#FFF' : '#64748B'} 
                  />
                </View>
                <Text style={[
                  styles.goalLabel,
                  selectedGoals.includes(goal.id) && styles.goalLabelActive
                ]}>{goal.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8}>
          <LinearGradient
            colors={['#FDA4AF', '#F43F5E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.saveGradient}
          >
            <Text style={styles.saveText}>Update Profile</Text>
            <Icon name="check-circle" size={20} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const createDynamicStyles = (isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#000' : '#FFF9FA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backBtn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: isDark ? '#111' : '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },

  introCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#F43F5E',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  introContent: { flexDirection: 'row', alignItems: 'center' },
  introTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  introSub: { fontSize: 13, color: '#FFD1D1', marginTop: 4, lineHeight: 18 },

  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginBottom: 15 },
  sectionSubTitle: { fontSize: 13, color: '#94A3B8', marginTop: -10, marginBottom: 15 },

  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  typeCard: {
    width: (width - 55) / 2,
    backgroundColor: isDark ? '#111' : '#FFF',
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: isDark ? '#222' : '#F1F5F9',
    alignItems: 'center',
  },
  typeCardActive: {
    borderColor: '#F43F5E',
    backgroundColor: isDark ? '#2D1616' : '#FFF1F2',
  },
  typeLabel: { fontSize: 14, fontWeight: 'bold', color: isDark ? '#FFF' : '#475569', marginTop: 8 },
  typeLabelActive: { color: '#F43F5E' },
  typeDesc: { fontSize: 10, color: '#94A3B8', marginTop: 4 },

  chipContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: isDark ? '#111' : '#FFF',
    borderWidth: 1,
    borderColor: isDark ? '#333' : '#E2E8F0',
    marginRight: 10,
    marginBottom: 12,
  },
  chipActive: {
    backgroundColor: '#F43F5E',
    borderColor: '#F43F5E',
  },
  chipText: { fontSize: 13, color: isDark ? '#94A3B8' : '#64748B', fontWeight: '600' },
  chipTextActive: { color: '#FFF' },

  goalGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  goalCard: {
    width: (width - 55) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#111' : '#FFF',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: isDark ? '#222' : '#F1F5F9',
  },
  goalCardActive: {
    borderColor: '#F43F5E',
    backgroundColor: isDark ? '#2D1616' : '#FFF1F2',
  },
  goalIconBg: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalLabel: { fontSize: 13, fontWeight: 'bold', color: isDark ? '#CBD5E1' : '#475569', marginLeft: 10, flex: 1 },
  goalLabelActive: { color: '#F43F5E' },

  saveBtn: { marginTop: 10, borderRadius: 16, overflow: 'hidden', elevation: 4, shadowColor: '#F43F5E', shadowOpacity: 0.3, shadowRadius: 10 },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  saveText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginRight: 8 },
});

export default SkinProfileScreen;
