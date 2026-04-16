
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');

const SkincareRoutinePlanner = () => {
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('Glow & Brightening');
  const [skinType, setSkinType] = useState('Combination');

  const renderStep1 = () => (
    <View>
      <Text style={styles.sectionTitle}>What's your skincare goal?</Text>
      <GoalCard
        id="Glow & Brightening" title="Glow & Brightening" sub="Vitamin C & radiance boosters"
        icon="shimmer" color="#F59E0B" selected={goal === 'Glow & Brightening'} onSelect={setGoal} styles={styles} isDark={isDark}
      />
      <GoalCard
        id="Anti-Aging" title="Anti-Aging" sub="Retinol & collagen support"
        icon="clock-outline" color="#A855F7" selected={goal === 'Anti-Aging'} onSelect={setGoal} styles={styles} isDark={isDark}
      />
      <GoalCard
        id="Acne Control" title="Acne Control" sub="Salicylic acid & niacinamide"
        icon="face-man-shimmer" color="#EF4444" selected={goal === 'Acne Control'} onSelect={setGoal} styles={styles} isDark={isDark}
      />
      <GoalCard
        id="Deep Hydration" title="Deep Hydration" sub="Hyaluronic acid & ceramides"
        icon="water-outline" color="#0EA5E9" selected={goal === 'Deep Hydration'} onSelect={setGoal} styles={styles} isDark={isDark}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(2)}>
          <Text style={styles.nextBtnText}>Next</Text>
          <Icon name="chevron-right" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text style={styles.sectionTitle}>Tell us about your skin</Text>

      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Icon name="water-percent" size={18} color={isDark ? '#94A3B8' : '#1E293B'} />
          <Text style={styles.inputLabel}>Current Skin Concern</Text>
        </View>
        <TextInput style={styles.input} placeholder="e.g. Dark spots, Dullness" placeholderTextColor="#CBD5E1" />
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Icon name="flask-outline" size={18} color={isDark ? '#94A3B8' : '#1E293B'} />
          <Text style={styles.inputLabel}>Known Allergies / Sensitivities</Text>
        </View>
        <TextInput style={styles.input} placeholder="e.g. Fragrance, Retinol" placeholderTextColor="#CBD5E1" />
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Icon name="face-woman-outline" size={18} color={isDark ? '#94A3B8' : '#1E293B'} />
          <Text style={styles.inputLabel}>Skin Type</Text>
        </View>
        <ActivityOption title="Oily" sub="Shine-prone, large pores" selected={skinType === 'Oily'} onSelect={setSkinType} styles={styles} />
        <ActivityOption title="Dry" sub="Flaky, tight feeling" selected={skinType === 'Dry'} onSelect={setSkinType} styles={styles} />
        <ActivityOption title="Combination" sub="Oily T-zone, dry cheeks" selected={skinType === 'Combination'} onSelect={setSkinType} styles={styles} />
        <ActivityOption title="Sensitive" sub="Easily irritated or reactive" selected={skinType === 'Sensitive'} onSelect={setSkinType} styles={styles} />
      </View>

      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.generateBtn} onPress={() => setStep(3)}>
          <Icon name="creation" size={20} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.generateBtnText}>Generate Routine</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.centerContent}>
      <Icon name="check-circle" size={80} color="#F43F5E" />
      <Text style={styles.mainTitle}>Routine Generated!</Text>
      <Text style={styles.description}>Your AI-powered skincare routine is ready for review.</Text>
      <TouchableOpacity style={[styles.nextBtn, { marginTop: 30 }]} onPress={() => setStep(1)}>
        <Text style={styles.nextBtnText}>Restart Planner</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#000' : '#FFF9FA'} />

      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="face-woman-shimmer-outline" size={28} color="#F43F5E" style={{ marginRight: 8 }} />
            <Text style={styles.headerTitle}>Routine Planner</Text>
          </View>
          <Text style={styles.headerSub}>Create an AI-powered skincare routine tailored to your skin type and goals.</Text>
        </View>
      </View>

      {/* Stepper */}
      <View style={styles.stepperContainer}>
        <StepCircle num={1} active={step >= 1} completed={step > 1} styles={styles} />
        <View style={[styles.stepLine, step > 1 && { backgroundColor: '#F43F5E' }]} />
        <StepCircle num={2} active={step >= 2} completed={step > 2} styles={styles} />
        <View style={[styles.stepLine, step > 2 && { backgroundColor: '#F43F5E' }]} />
        <StepCircle num={3} active={step >= 3} completed={step > 3} styles={styles} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding} showsVerticalScrollIndicator={false}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </ScrollView>
    </SafeAreaView>
  );
};

const StepCircle = ({ num, active, completed, styles }: any) => (
  <View style={[styles.stepCircle, active && styles.stepActive, completed && styles.stepCompleted]}>
    {completed ? <Icon name="check" size={18} color="#FFF" /> :
      <Text style={[styles.stepNum, active && { color: '#FFF' }]}>{num}</Text>}
  </View>
);

const GoalCard = ({ title, sub, icon, color, selected, onSelect, id, styles, isDark }: any) => (
  <TouchableOpacity
    style={[styles.goalCard, selected && { borderColor: '#F43F5E', backgroundColor: isDark ? '#4A1D1D' : '#FFF0F5' }]}
    onPress={() => onSelect(id)}
  >
    <View style={[styles.goalIconBox, { backgroundColor: color }]}>
      <Icon name={icon} size={24} color="#FFF" />
    </View>
    <View style={{ flex: 1, marginLeft: 15 }}>
      <Text style={styles.goalTitle}>{title}</Text>
      <Text style={styles.goalSub}>{sub}</Text>
    </View>
    {selected && <Icon name="check-circle" size={20} color="#F43F5E" />}
  </TouchableOpacity>
);

const ActivityOption = ({ title, sub, selected, onSelect, styles }: any) => (
  <TouchableOpacity
    style={[styles.activityBox, selected && styles.activitySelected]}
    onPress={() => onSelect(title)}
  >
    <Text style={styles.activityTitle}>{title}</Text>
    <Text style={styles.activitySub}>{sub}</Text>
  </TouchableOpacity>
);

const createDynamicStyles = (isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#000' : '#FFF9FA' },
  header: { padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 22, fontWeight: '800', color: isDark ? '#FFF' : '#1E293B', letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: isDark ? '#94A3B8' : '#64748B', marginTop: 6, lineHeight: 18 },

  stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
  stepCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: isDark ? '#27272A' : '#E2E8F0', justifyContent: 'center', alignItems: 'center' },
  stepActive: { backgroundColor: '#F43F5E' },
  stepCompleted: { backgroundColor: '#F43F5E' },
  stepNum: { color: isDark ? '#94A3B8' : '#64748B', fontWeight: 'bold' },
  stepLine: { width: 50, height: 2, backgroundColor: isDark ? '#27272A' : '#E2E8F0', marginHorizontal: 10 },

  scrollPadding: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginBottom: 20 },

  goalCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? '#111' : '#FFF', padding: 15, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: isDark ? '#333' : 'transparent' },
  goalIconBox: { width: 50, height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  goalTitle: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  goalSub: { fontSize: 12, color: isDark ? '#94A3B8' : '#64748B', marginTop: 2 },
  footer: { alignItems: 'flex-end', marginTop: 20 },
  nextBtn: { backgroundColor: '#F43F5E', flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginRight: 8 },

  inputGroup: { marginBottom: 20 },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginLeft: 8 },
  input: { backgroundColor: isDark ? '#111' : '#FFF', borderWidth: 1, borderColor: isDark ? '#333' : '#E2E8F0', borderRadius: 15, padding: 15, fontSize: 15, color: isDark ? '#FFF' : '#1E293B' },
  activityBox: { backgroundColor: isDark ? '#111' : '#FFF', padding: 15, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: isDark ? '#333' : '#E2E8F0' },
  activitySelected: { borderColor: '#F43F5E', backgroundColor: isDark ? '#4A1D1D' : '#FFF0F5' },
  activityTitle: { fontSize: 15, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  activitySub: { fontSize: 12, color: isDark ? '#94A3B8' : '#64748B', marginTop: 2 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  backBtn: { backgroundColor: isDark ? '#222' : '#F1F5F9', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15 },
  backBtnText: { color: isDark ? '#94A3B8' : '#475569', fontWeight: 'bold' },
  generateBtn: { backgroundColor: '#F43F5E', flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15, alignItems: 'center', elevation: 2, shadowColor: '#F43F5E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
  generateBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

  centerContent: { alignItems: 'center', justifyContent: 'center', marginTop: 50 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginTop: 20 },
  description: { fontSize: 15, color: isDark ? '#94A3B8' : '#64748B', textAlign: 'center', marginTop: 10 },
});

export default SkincareRoutinePlanner;