import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';
// import { useLogRoutine } from '../../../auth/hook/beauticare/useBeauticare';

const { width } = Dimensions.get('window');

const RoutinePlanner = () => {
  const { isDark, colors } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);
  
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [skinType, setSkinType] = useState('');
  const [concerns, setConcerns] = useState('');
  const [isWorking, setIsWorking] = useState(false);

  const progressAnim = React.useRef(new Animated.Value(0)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const isStep1Valid = goal !== '';
  const isStep2Valid = skinType !== '';

  const handleGenerateRoutine = () => {
    setStep(3);
    setIsWorking(true);
    
    progressAnim.setValue(0);
    pulseAnim.setValue(1);

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();

    setTimeout(() => {
      setIsWorking(false);
      
      // Log routine completion/generation to backend (REVERTED)
      /*
      logRoutineMutation.mutate({
        stepsCompleted: 4, // Morning routine steps
        totalSteps: 7,
      });
      */
    }, 2000);
  };

  const handleReset = () => {
    setStep(1);
    setGoal('');
    setSkinType('');
    setConcerns('');
  };

  // --- Step 1: Goal Selection ---
  const renderStep1 = () => (
    <View>
      <Text style={styles.sectionTitle}>What's your primary skin goal?</Text>
      <GoalCard 
        id="Clear Skin (Acne)" title="Clear Skin (Acne)" sub="Blemish control & acne care" 
        icon="water-outline" color="#F43F5E" selected={goal === 'Clear Skin (Acne)'} onSelect={setGoal} 
      />
      <GoalCard 
        id="Radiant Glow" title="Radiant Glow" sub="Brightening & evening tone" 
        icon="white-balance-sunny" color="#FBBF24" selected={goal === 'Radiant Glow'} onSelect={setGoal} 
      />
      <GoalCard 
        id="Anti-Aging" title="Anti-Aging" sub="Firming & reducing wrinkles" 
        icon="moon-waning-crescent" color="#6366F1" selected={goal === 'Anti-Aging'} onSelect={setGoal} 
      />
      <GoalCard 
        id="Barrier Repair" title="Barrier Repair" sub="Hydration & protecting skin" 
        icon="shield-home-outline" color="#0EA5E9" selected={goal === 'Barrier Repair'} onSelect={setGoal} 
      />
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.nextBtn, isStep1Valid && { backgroundColor: '#E11D48' }, !isStep1Valid && { backgroundColor: isDark ? '#1E293B' : '#E2E8F0' }]} 
          onPress={() => setStep(2)}
          disabled={!isStep1Valid}
        >
          <Text style={styles.nextBtnText}>Next Step</Text>
          <Icon name="chevron-right" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- Step 2: Skin Info ---
  const renderStep2 = () => (
    <View>
      <Text style={styles.sectionTitle}>Tell us about your skin</Text>
      
      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Icon name="face-man-profile" size={18} color={isDark ? '#F43F5E' : '#E11D48'} />
          <Text style={styles.inputLabel}>Skin Type</Text>
        </View>
        <View style={styles.skinTypeGrid}>
            <SkinOption title="Dry" sub="Flaky or tight" selected={skinType === 'Dry'} onSelect={setSkinType} />
            <SkinOption title="Oily" sub="Shiny or greasy" selected={skinType === 'Oily'} onSelect={setSkinType} />
            <SkinOption title="Combination" sub="Oily T-zone" selected={skinType === 'Combination'} onSelect={setSkinType} />
            <SkinOption title="Sensitive" sub="Easily irritated" selected={skinType === 'Sensitive'} onSelect={setSkinType} />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Icon name="target" size={18} color={isDark ? '#F43F5E' : '#E11D48'} />
          <Text style={styles.inputLabel}>Specific Concerns (Optional)</Text>
        </View>
        <TextInput 
            style={styles.input} 
            placeholder="e.g. Dark circles, redness, hyperpigmentation..." 
            placeholderTextColor={isDark ? '#475569' : '#94A3B8'}
            value={concerns}
            onChangeText={setConcerns}
            multiline
        />
      </View>

      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.generateBtn, isStep2Valid && { backgroundColor: '#E11D48' }, !isStep2Valid && { backgroundColor: isDark ? '#1E293B' : '#E2E8F0' }]} 
          onPress={handleGenerateRoutine}
          disabled={!isStep2Valid}
        >
          <Icon name="creation" size={20} color="#FFF" style={{marginRight: 8}} />
          <Text style={styles.generateBtnText}>Generate Routine</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- Step 3 (Working/Result) ---
  const renderStep3 = () => {
    const progressWidth = progressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    if (isWorking) {
      return (
        <View style={styles.workingContainer}>
          <Animated.View style={[styles.workingIconWrapper, { transform: [{ scale: pulseAnim }] }]}>
            <View style={styles.workingIconBg}>
               <Icon name="sparkles" size={45} color="#FFF" />
            </View>
            <View style={styles.workingBadgeTop}><Icon name="magnify-scan" size={18} color="#EC4899" /></View>
            <View style={styles.workingBadgeBottom}><Icon name="auto-fix" size={18} color="#6366F1" /></View>
          </Animated.View>
          <Text style={styles.workingTitle}>Analyzing Skin Data</Text>
          <Text style={styles.workingSub}>AI Engineer is crafting your routine...</Text>
          <Text style={styles.workingDesc}>Processing ingredient compatibility for your {skinType.toLowerCase()} skin...</Text>
          <View style={styles.progressBarBg}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
        </View>
      );
    }

    return (
        <View>
          <View style={styles.planSummaryCard}>
            <View style={styles.planHeader}><Icon name="sparkles" size={18} color="#FFF" /><Text style={styles.planTitle}>Your AI-Powered Routine</Text></View>
            <View style={styles.macroGrid}>
              <MacroBox label="HYDRATION" val="High" unit="" icon="water" color="#0EA5E9" />
              <MacroBox label="PROTECTION" val="Full" unit="" icon="shield-check" color="#22C55E" />
              <MacroBox label="SENSITIVITY" val="Low" unit="" icon="heart-outline" color="#F43F5E" />
              <MacroBox label="COMPATIBILITY" val="98%" unit="" icon="link-variant" color="#A855F7" />
            </View>
          </View>
    
          <View style={styles.mealPlanContainer}>
            <View style={styles.planHeader}><Icon name="weather-sunny" size={18} color="#E11D48" /><Text style={styles.planTitle}>Morning Routine (AM)</Text></View>
            <MealItem title="Cleanser" time="7:00 AM" cal="Step 1" desc={["Gentle hydrating cleanser", "Use lukewarm water only"]} />
            <MealItem title="Toner" time="7:10 AM" cal="Step 2" desc={["Alcohol-free soothing toner", "Pat gently into skin"]} />
            <MealItem title="Moisturizer" time="7:15 AM" cal="Step 3" desc={["Ceramide-rich barrier cream"]} />
            <MealItem title="Sunscreen" time="7:20 AM" cal="Step 4" desc={["SPF 50+ Broad Spectrum", "Re-apply every 2-3 hours"]} isLast />
          </View>
    
          <View style={styles.tipsSection}>
            <View style={styles.planHeader}><Icon name="star-outline" size={18} color="#FBBF24" /><Text style={styles.planTitle}>Skin Wisdom</Text></View>
            <TipItem text="Drink 3 liters of water for inner glow" />
            <TipItem text="Don't touch your face during the day" />
            <TipItem text="Change pillowcases every 2 days" />
            <TipItem text="Consistency is key for visible results" />
          </View>
    
          <TouchableOpacity style={styles.createNewBtn} onPress={handleReset}>
            <Text style={styles.createNewText}>Update Skin Profile</Text>
            <Icon name="refresh" size={16} color="#94A3B8" />
          </TouchableOpacity>
        </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#000' : '#FFF'} />
      
      {!isWorking && (
        <View style={styles.header}>
            <View style={styles.headerIconBox}><Icon name="face-woman-shimmer" size={28} color="#FFF" /></View>
            <View style={{marginLeft: 15, flex: 1}}>
              <Text style={styles.headerTitle}>Routine Planner</Text>
              <Text style={styles.headerSub}>AI-powered skincare protocol for your {skinType.toLowerCase()} skin</Text>
            </View>
        </View>
      )}

      <View style={[styles.stepperContainer, isWorking && {marginTop: 60}]}>
        <StepCircle num={1} active={step >= 1} completed={step > 1} />
        <View style={[styles.stepLine, step > 1 && {backgroundColor: '#E11D48'}]} />
        <StepCircle num={2} active={step >= 2} completed={step > 2} />
        <View style={[styles.stepLine, step > 2 && {backgroundColor: '#E11D48'}]} />
        <StepCircle num={3} active={step >= 3} completed={step > 3} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding} showsVerticalScrollIndicator={false}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub Components ---
const StepCircle = ({ num, active, completed }: any) => {
  const { isDark } = useTheme();
  const styles = createDynamicStyles(isDark);
  return (
    <View style={[styles.stepCircle, active && styles.stepActive, completed && styles.stepCompleted]}>
        {completed ? <Icon name="check" size={18} color="#FFF" /> : <Text style={[styles.stepNum, active && {color: '#FFF'}]}>{num}</Text>}
    </View>
  );
};

const GoalCard = ({ title, sub, icon, color, selected, onSelect, id }: any) => {
  const { isDark } = useTheme();
  const styles = createDynamicStyles(isDark);
  return (
    <TouchableOpacity style={[styles.goalCard, selected && styles.cardSelected]} onPress={() => onSelect(id)}>
      <View style={[styles.goalIconBox, {backgroundColor: color}]}><Icon name={icon} size={24} color="#FFF" /></View>
      <View style={{flex: 1, marginLeft: 15}}><Text style={styles.goalTitle}>{title}</Text><Text style={styles.goalSub}>{sub}</Text></View>
      {selected && <View style={styles.selectedTick}><Icon name="check" size={14} color="#FFF" /></View>}
    </TouchableOpacity>
  );
};

const SkinOption = ({ title, sub, selected, onSelect }: any) => {
    const { isDark } = useTheme();
    const styles = createDynamicStyles(isDark);
    return (
        <TouchableOpacity style={[styles.skinBox, selected && styles.cardSelected]} onPress={() => onSelect(title)}>
            <Text style={styles.goalTitle}>{title}</Text>
            <Text style={styles.goalSub}>{sub}</Text>
        </TouchableOpacity>
    );
};

const MacroBox = ({ label, val, unit, icon, color }: any) => {
    const { isDark } = useTheme();
    const styles = createDynamicStyles(isDark);
    return (
        <View style={styles.macroBox}>
            <Icon name={icon} size={18} color={color} />
            <View style={{marginTop: 8}}>
                <Text style={styles.macroVal}>{val} <Text style={styles.macroUnit}>{unit}</Text></Text>
                <Text style={styles.macroLabel}>{label}</Text>
            </View>
        </View>
    );
};

const MealItem = ({ title, time, cal, desc, isLast }: any) => {
    const { isDark } = useTheme();
    const styles = createDynamicStyles(isDark);
    return (
        <View style={styles.mealRow}>
            <View style={styles.mealLeft}>
                <View style={styles.mealTimeIcon}><Icon name="clock-outline" size={16} color={isDark ? "#94A3B8" : "#64748B"} /></View>
                {!isLast && <View style={styles.mealLine} />}
            </View>
            <View style={styles.mealRight}>
                <View style={styles.mealHeader}>
                    <View><Text style={styles.mealTitle}>{title}</Text><Text style={styles.mealTimeText}>{time}</Text></View>
                    <View style={styles.calBadge}><Text style={styles.calBadgeText}>{cal}</Text></View>
                </View>
                <View style={styles.mealDescList}>
                    {desc.map((item: string, i: number) => (
                        <Text key={i} style={styles.mealDescText}>• {item}</Text>
                    ))}
                </View>
            </View>
        </View>
    );
};

const TipItem = ({ text }: any) => {
    const { isDark } = useTheme();
    const styles = createDynamicStyles(isDark);
    return (
        <View style={styles.tipRow}>
            <View style={styles.tipCheck}><Icon name="check" size={14} color="#22C55E" /></View>
            <Text style={styles.tipText}>{text}</Text>
        </View>
    );
};

const createDynamicStyles = (isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#000' : '#FAFAFA' },
  header: { padding: 20, flexDirection: 'row', alignItems: 'center' },
  headerIconBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#E11D48', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  headerSub: { fontSize: 13, color: isDark ? '#94A3B8' : '#64748B', marginTop: 4 },
  
  stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
  stepCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: isDark ? '#1E293B' : '#E2E8F0', justifyContent: 'center', alignItems: 'center' },
  stepActive: { backgroundColor: '#E11D48' },
  stepCompleted: { backgroundColor: '#E11D48' },
  stepNum: { color: isDark ? '#64748B' : '#94A3B8', fontWeight: 'bold' },
  stepLine: { width: 40, height: 2, backgroundColor: isDark ? '#1E293B' : '#E2E8F0', marginHorizontal: 8 },

  scrollPadding: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginBottom: 20 },

  goalCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? '#0F172A' : '#FFF', padding: 15, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: isDark ? '#1E293B' : '#F1F5F9' },
  cardSelected: { borderColor: '#E11D48', backgroundColor: isDark ? '#450a0a' : '#FFF1F2' },
  goalIconBox: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  goalTitle: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  goalSub: { fontSize: 12, color: isDark ? '#94A3B8' : '#64748B' },
  selectedTick: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#E11D48', justifyContent: 'center', alignItems: 'center' },

  footer: { alignItems: 'flex-end', marginTop: 20 },
  nextBtn: { backgroundColor: '#E11D48', flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 20, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginRight: 8 },

  inputGroup: { marginBottom: 20 },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginLeft: 8 },
  input: { backgroundColor: isDark ? '#0F172A' : '#FFF', borderRadius: 15, padding: 15, borderWidth: 1, borderColor: isDark ? '#1E293B' : '#E2E8F0', color: isDark ? '#FFF' : '#1E293B' },
  
  skinTypeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  skinBox: { width: '48%', backgroundColor: isDark ? '#0F172A' : '#FFF', padding: 15, borderRadius: 15, marginBottom: 12, borderWidth: 1, borderColor: isDark ? '#1E293B' : '#F1F5F9' },

  footerRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  backBtn: { paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15, backgroundColor: isDark ? '#1E293B' : '#F1F5F9' },
  backBtnText: { color: isDark ? '#FFF' : '#475569', fontWeight: 'bold' },
  generateBtn: { backgroundColor: isDark ? '#E11D48' : '#1E293B', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 15, alignItems: 'center' },
  generateBtnText: { color: '#FFF', fontWeight: 'bold' },

  workingContainer: { alignItems: 'center', marginTop: 40 },
  workingIconWrapper: { width: 120, height: 120, justifyContent: 'center', alignItems: 'center' },
  workingIconBg: { width: 90, height: 90, borderRadius: 25, backgroundColor: '#E11D48', justifyContent: 'center', alignItems: 'center' },
  workingBadgeTop: { position: 'absolute', top: 5, right: 5, backgroundColor: isDark ? '#000' : '#FFF', padding: 6, borderRadius: 15, borderWidth: 1, borderColor: isDark ? '#333' : '#E2E8F0' },
  workingBadgeBottom: { position: 'absolute', bottom: 15, left: -5, backgroundColor: isDark ? '#000' : '#FFF', padding: 6, borderRadius: 15, borderWidth: 1, borderColor: isDark ? '#333' : '#E2E8F0' },
  workingTitle: { fontSize: 22, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginTop: 40 },
  workingSub: { color: '#E11D48', fontWeight: 'bold', fontSize: 16, marginTop: 10 },
  workingDesc: { color: isDark ? '#94A3B8' : '#64748B', textAlign: 'center', paddingHorizontal: 30, marginTop: 10, lineHeight: 20 },
  progressBarBg: { width: '90%', height: 8, backgroundColor: isDark ? '#1E293B' : '#E2E8F0', borderRadius: 4, marginTop: 30, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#E11D48', opacity: 0.8 },

  planSummaryCard: { backgroundColor: isDark ? '#4c0519' : '#FFF1F2', borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: isDark ? '#881337' : '#FFE4E6' },
  planHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  planTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFF', marginLeft: 10 },
  macroGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  macroBox: { width: '48%', backgroundColor: isDark ? '#0F172A' : '#FFF', padding: 15, borderRadius: 16, marginBottom: 12 },
  macroVal: { fontSize: 18, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  macroUnit: { fontSize: 11, color: isDark ? '#94A3B8' : '#64748B' },
  macroLabel: { fontSize: 10, color: isDark ? '#94A3B8' : '#64748B', fontWeight: 'bold', marginTop: 2 },

  mealPlanContainer: { backgroundColor: isDark ? '#0F172A' : '#FFF', borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: isDark ? '#1E293B' : '#E2E8F0' },
  mealRow: { flexDirection: 'row' },
  mealLeft: { alignItems: 'center', width: 25 },
  mealTimeIcon: { width: 24, height: 24, borderRadius: 12, backgroundColor: isDark ? '#1E293B' : '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  mealLine: { flex: 1, width: 2, backgroundColor: isDark ? '#1E293B' : '#F1F5F9', marginVertical: 5 },
  mealRight: { flex: 1, marginLeft: 15, paddingBottom: 25 },
  mealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  mealTitle: { fontSize: 15, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  mealTimeText: { fontSize: 12, color: isDark ? '#94A3B8' : '#64748B' },
  calBadge: { backgroundColor: isDark ? '#E11D48' : '#FFF1F2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  calBadgeText: { fontSize: 11, color: isDark ? '#FFF' : '#E11D48', fontWeight: 'bold' },
  mealDescList: { marginTop: 8 },
  mealDescText: { fontSize: 13, color: isDark ? '#94A3B8' : '#64748B', lineHeight: 20 },

  tipsSection: { backgroundColor: isDark ? '#0F172A' : '#FFF', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: isDark ? '#1E293B' : '#E2E8F0' },
  tipRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? '#1E293B' : '#F8FAFC', padding: 12, borderRadius: 12, marginBottom: 10 },
  tipCheck: { width: 20, height: 20, borderRadius: 10, backgroundColor: isDark ? 'rgba(34, 197, 94, 0.1)' : '#DCFCE7', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  tipText: { fontSize: 13, color: isDark ? '#94A3B8' : '#475569' },
  
  createNewBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  createNewText: { color: isDark ? '#94A3B8' : '#64748B', fontWeight: 'bold', marginRight: 5 }
});

export default RoutinePlanner;