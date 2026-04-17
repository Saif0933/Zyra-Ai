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
  Animated,
  Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');

const TransformationPlanner = () => {
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);
  
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [activity, setActivity] = useState('');
  const [isWorking, setIsWorking] = useState(false);
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  
  const progressAnim = React.useRef(new Animated.Value(0)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  const isStep1Valid = goal !== '';
  const isFormValid = weight.trim() !== '' && targetWeight.trim() !== '' && activity !== '';

  const handleGeneratePlan = () => {
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
    }, 2000);
  };

  const handleReset = () => {
    setStep(1);
    setGoal('');
    setActivity('');
    setWeight('');
    setTargetWeight('');
  };

  // --- Step 1: Goal Selection ---
  const renderStep1 = () => (
    <View>
      <Text style={styles.sectionTitle}>What's your transformation goal?</Text>
      <GoalCard 
        id="Lose Weight" title="Lose Weight" sub="Fat loss & lean physique" 
        icon="trending-down" color="#F97316" selected={goal === 'Lose Weight'} onSelect={setGoal} 
      />
      <GoalCard 
        id="Gain Weight" title="Gain Weight" sub="Muscle building & bulking" 
        icon="trending-up" color="#22C55E" selected={goal === 'Gain Weight'} onSelect={setGoal} 
      />
      <GoalCard 
        id="Maintain" title="Maintain" sub="Keep current physique" 
        icon="scale-balance" color="#0EA5E9" selected={goal === 'Maintain'} onSelect={setGoal} 
      />
      <GoalCard 
        id="Body Recomp" title="Body Recomp" sub="Burn fat & build muscle" 
        icon="dumbbell" color="#A855F7" selected={goal === 'Body Recomp'} onSelect={setGoal} 
      />
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.nextBtn, isStep1Valid && { backgroundColor: '#22C55E' }, !isStep1Valid && { backgroundColor: isDark ? '#27272A' : '#E2E8F0' }]} 
          onPress={() => setStep(2)}
          disabled={!isStep1Valid}
        >
          <Text style={styles.nextBtnText}>Next Step</Text>
          <Icon name="chevron-right" size={20} color={isStep1Valid ? "#FFF" : "#64748B"} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- Step 2: User Info ---
  const renderStep2 = () => (
    <View>
      <Text style={styles.sectionTitle}>Tell us about yourself</Text>
      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
            <Icon name="weight-kilogram" size={18} color={isDark ? '#22C55E' : '#1E293B'} />
            <Text style={styles.inputLabel}>Current Weight (kg)</Text>
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. 75" 
          placeholderTextColor={isDark ? '#475569' : '#CBD5E1'} 
          keyboardType="numeric" 
          value={weight}
          onChangeText={setWeight}
        />
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
            <Icon name="target" size={18} color={isDark ? '#22C55E' : '#1E293B'} />
            <Text style={styles.inputLabel}>Target Weight (kg)</Text>
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. 70" 
          placeholderTextColor={isDark ? '#475569' : '#CBD5E1'} 
          keyboardType="numeric" 
          value={targetWeight}
          onChangeText={setTargetWeight}
        />
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
            <Icon name="run-fast" size={18} color={isDark ? '#22C55E' : '#1E293B'} />
            <Text style={styles.inputLabel}>Activity Level</Text>
        </View>
        <ActivityOption title="Sedentary" sub="Little to no exercise" selected={activity === 'Sedentary'} onSelect={setActivity} />
        <ActivityOption title="Moderate" sub="3-5 days/week" selected={activity === 'Moderate'} onSelect={setActivity} />
        <ActivityOption title="Very Active" sub="6-7 days/week" selected={activity === 'Very Active'} onSelect={setActivity} />
      </View>

      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}><Text style={styles.backBtnText}>Back</Text></TouchableOpacity>
        <TouchableOpacity 
          style={[styles.generateBtn, isFormValid && { backgroundColor: '#22C55E' }, !isFormValid && { backgroundColor: isDark ? '#27272A' : '#E2E8F0' }]} 
          onPress={handleGeneratePlan}
          disabled={!isFormValid}
        >
          <Icon name="creation" size={20} color={isFormValid ? "#FFF" : "#64748B"} style={{marginRight: 8}} />
          <Text style={[styles.generateBtnText, isFormValid && { color: '#FFF' }]}>Generate Plan</Text>
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
              <Icon name="lightning-bolt" size={50} color="#F97316" />
            </View>
            <View style={styles.workingBadgeTop}><Icon name="magnify" size={20} color="#22C55E" /></View>
            <View style={styles.workingBadgeBottom}><Icon name="cpu-64-bit" size={20} color="#F97316" /></View>
          </Animated.View>
          <Text style={styles.workingTitle}>AI Engineer is Working</Text>
          <Text style={styles.workingSub}>Calculating optimal macro ratios...</Text>
          <Text style={styles.workingDesc}>Crafting your precision strategy using high-performance algorithms</Text>
          <View style={styles.progressBarBg}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
        </View>
      );
    }

    return (
      <View>
        {/* Macro Summary */}
        <View style={styles.planSummaryCard}>
          <View style={styles.planHeader}><Icon name="sparkles" size={18} color="#FFF" /><Text style={styles.planTitle}>Your AI-Powered Plan</Text></View>
          <View style={styles.macroGrid}>
            <MacroBox label="CALORIES" val="2400" unit="kcal/day" icon="fire" color="#10B981" />
            <MacroBox label="PROTEIN" val="180g" unit="/day" icon="lightning-bolt" color="#22C55E" />
            <MacroBox label="CARBS" val="260g" unit="/day" icon="silverware-fork-knife" color="#F97316" />
            <MacroBox label="FATS" val="70g" unit="/day" icon="at" color="#0EA5E9" />
          </View>
        </View>

        {/* Meal Plan */}
        <View style={styles.mealPlanContainer}>
          <View style={styles.planHeader}><Icon name="silverware-fork-knife" size={18} color="#22C55E" /><Text style={styles.planTitle}>Daily Meal Plan</Text></View>
          <MealItem title="Breakfast" time="7:00 AM" cal="520 kcal" desc={["Oatmeal with berries & whey protein", "2 boiled eggs", "Black coffee"]} />
          <MealItem title="Snack" time="10:00 AM" cal="280 kcal" desc={["Greek yogurt with almonds", "Banana"]} />
          <MealItem title="Lunch" time="1:00 PM" cal="620 kcal" desc={["Grilled chicken breast 200g", "Brown rice 1 cup", "Steamed broccoli"]} />
          <MealItem title="Pre-Workout" time="4:00 PM" cal="350 kcal" desc={["Protein shake with PB", "Apple"]} />
          <MealItem title="Dinner" time="7:00 PM" cal="580 kcal" desc={["Salmon fillet 180g", "Sweet potato", "Mixed salad with olive oil"]} />
          <MealItem title="Evening Snack" time="9:00 PM" cal="250 kcal" desc={["Casein protein shake", "Handful of walnuts"]} isLast />
        </View>

        {/* Pro Tips */}
        <View style={styles.tipsSection}>
          <View style={styles.planHeader}><Icon name="star-outline" size={18} color="#F97316" /><Text style={styles.planTitle}>Pro Tips</Text></View>
          <TipItem text="Drink 3-4 liters of water daily" />
          <TipItem text="Eat protein within 30 mins post-workout" />
          <TipItem text="Prioritize sleep for recovery (7-8 hrs)" />
          <TipItem text="Track your meals daily for consistency" />
        </View>

        <TouchableOpacity style={styles.createNewBtn} onPress={handleReset}>
          <Text style={styles.createNewText}>Create a new plan</Text>
          <Icon name="refresh" size={16} color="#475569" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#000' : '#F4F9FF'} />
      
      {!isWorking && (
        <View style={styles.header}>
            <View style={styles.headerIconBox}><Icon name="calendar-check" size={28} color="#FFF" /></View>
            <View style={{marginLeft: 15, flex: 1}}>
              <Text style={styles.headerTitle}>Transformation Planner</Text>
              <Text style={styles.headerSub}>Create an AI-powered nutrition plan for your {goal || 'fitness'}</Text>
            </View>
        </View>
      )}

      <View style={[styles.stepperContainer, isWorking && {marginTop: 60}]}>
        <StepCircle num={1} active={step >= 1} completed={step > 1} />
        <View style={[styles.stepLine, step > 1 && {backgroundColor: '#22C55E'}]} />
        <StepCircle num={2} active={step >= 2} completed={step > 2} />
        <View style={[styles.stepLine, step > 2 && {backgroundColor: '#22C55E'}]} />
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
      {selected && <Icon name="check-circle" size={20} color="#22C55E" />}
    </TouchableOpacity>
  );
};

const ActivityOption = ({ title, sub, selected, onSelect }: any) => {
    const { isDark } = useTheme();
    const styles = createDynamicStyles(isDark);
    return (
        <TouchableOpacity style={[styles.activityBox, selected && styles.activitySelected]} onPress={() => onSelect(title)}>
            <Text style={styles.activityTitle}>{title}</Text>
            <Text style={styles.activitySub}>{sub}</Text>
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
  container: { flex: 1, backgroundColor: isDark ? '#000' : '#F4F9FF' },
  header: { padding: 20, flexDirection: 'row', alignItems: 'center' },
  headerIconBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#22C55E', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  headerSub: { fontSize: 13, color: isDark ? '#94A3B8' : '#64748B', marginTop: 4 },
  
  stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
  stepCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: isDark ? '#1E293B' : '#E2E8F0', justifyContent: 'center', alignItems: 'center' },
  stepActive: { backgroundColor: '#22C55E' },
  stepCompleted: { backgroundColor: '#22C55E' },
  stepNum: { color: isDark ? '#64748B' : '#94A3B8', fontWeight: 'bold' },
  stepLine: { width: 50, height: 2, backgroundColor: isDark ? '#1E293B' : '#E2E8F0', marginHorizontal: 8 },

  scrollPadding: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginBottom: 20 },

  goalCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? '#111' : '#FFF', padding: 15, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: isDark ? '#27272A' : '#F1F5F9' },
  cardSelected: { borderColor: '#22C55E', backgroundColor: isDark ? '#064E3B' : '#F0FDF4' },
  goalIconBox: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  goalTitle: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  goalSub: { fontSize: 12, color: isDark ? '#94A3B8' : '#64748B' },

  footer: { alignItems: 'flex-end', marginTop: 20 },
  nextBtn: { backgroundColor: '#22C55E', flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginRight: 8 },

  inputGroup: { marginBottom: 20 },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginLeft: 8 },
  input: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 15, padding: 15, borderWidth: 1, borderColor: isDark ? '#27272A' : '#E2E8F0', color: isDark ? '#FFF' : '#1E293B' },
  
  activityBox: { backgroundColor: isDark ? '#111' : '#FFF', padding: 15, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: isDark ? '#27272A' : '#E2E8F0' },
  activitySelected: { borderColor: '#22C55E', backgroundColor: isDark ? '#064E3B' : '#F0FDF4' },
  activityTitle: { fontSize: 15, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  activitySub: { fontSize: 12, color: isDark ? '#94A3B8' : '#64748B' },

  footerRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  backBtn: { paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15, backgroundColor: isDark ? '#1E293B' : '#F1F5F9' },
  backBtnText: { color: isDark ? '#FFF' : '#475569', fontWeight: 'bold' },
  generateBtn: { backgroundColor: '#22C55E', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 15, alignItems: 'center' },
  generateBtnText: { color: '#FFF', fontWeight: 'bold' },

  workingContainer: { alignItems: 'center', marginTop: 40 },
  workingIconWrapper: { width: 120, height: 120, justifyContent: 'center', alignItems: 'center' },
  workingIconBg: { width: 90, height: 90, borderRadius: 25, backgroundColor: '#FFF', elevation: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, justifyContent: 'center', alignItems: 'center' },
  workingBadgeTop: { position: 'absolute', top: 5, right: 5, backgroundColor: isDark ? '#000' : '#FFF', padding: 6, borderRadius: 15, borderWidth: 1, borderColor: isDark ? '#1E293B' : '#E2E8F0' },
  workingBadgeBottom: { position: 'absolute', bottom: 15, left: -5, backgroundColor: isDark ? '#000' : '#FFF', padding: 6, borderRadius: 15, borderWidth: 1, borderColor: isDark ? '#1E293B' : '#E2E8F0' },
  workingTitle: { fontSize: 22, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginTop: 40 },
  workingSub: { color: '#22C55E', fontWeight: 'bold', fontSize: 16, marginTop: 10 },
  workingDesc: { color: isDark ? '#94A3B8' : '#64748B', textAlign: 'center', paddingHorizontal: 30, marginTop: 10, lineHeight: 20 },
  progressBarBg: { width: '90%', height: 8, backgroundColor: isDark ? '#1E293B' : '#E2E8F0', borderRadius: 4, marginTop: 30, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#22C55E' },

  planSummaryCard: { backgroundColor: isDark ? '#064E3B' : '#F0FDF4', borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: isDark ? '#065F46' : '#DCFCE7' },
  planHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  planTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFF', marginLeft: 10 },
  macroGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  macroBox: { width: '48%', backgroundColor: isDark ? '#111' : '#FFF', padding: 15, borderRadius: 16, marginBottom: 12 },
  macroVal: { fontSize: 18, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  macroUnit: { fontSize: 11, color: isDark ? '#94A3B8' : '#64748B' },
  macroLabel: { fontSize: 10, color: isDark ? '#94A3B8' : '#64748B', fontWeight: 'bold', marginTop: 2 },

  mealPlanContainer: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: isDark ? '#27272A' : '#E2E8F0' },
  mealRow: { flexDirection: 'row' },
  mealLeft: { alignItems: 'center', width: 25 },
  mealTimeIcon: { width: 24, height: 24, borderRadius: 12, backgroundColor: isDark ? '#1E293B' : '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  mealLine: { flex: 1, width: 2, backgroundColor: isDark ? '#1E293B' : '#F1F5F9', marginVertical: 5 },
  mealRight: { flex: 1, marginLeft: 15, paddingBottom: 25 },
  mealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  mealTitle: { fontSize: 15, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  mealTimeText: { fontSize: 12, color: isDark ? '#94A3B8' : '#64748B' },
  calBadge: { backgroundColor: isDark ? '#064E3B' : '#DCFCE7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  calBadgeText: { fontSize: 11, color: isDark ? '#4ADE80' : '#166534', fontWeight: 'bold' },
  mealDescList: { marginTop: 8 },
  mealDescText: { fontSize: 13, color: isDark ? '#94A3B8' : '#64748B', lineHeight: 20 },

  tipsSection: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: isDark ? '#27272A' : '#E2E8F0' },
  tipRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? '#1E293B' : '#F8FAFC', padding: 12, borderRadius: 12, marginBottom: 10 },
  tipCheck: { width: 20, height: 20, borderRadius: 10, backgroundColor: isDark ? 'rgba(34, 197, 94, 0.1)' : '#DCFCE7', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  tipText: { fontSize: 13, color: isDark ? '#94A3B8' : '#475569' },
  
  createNewBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  createNewText: { color: isDark ? '#94A3B8' : '#64748B', fontWeight: 'bold', marginRight: 5 }
});

export default TransformationPlanner;