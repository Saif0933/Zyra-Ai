// import React, { useState } from 'react';
// import {
//   Dimensions,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useTheme } from '../../../theme/ThemeContext';

// const { width } = Dimensions.get('window');

// const TransformationPlanner = () => {
//   const { isDark } = useTheme();
//   const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);
//   const [step, setStep] = useState(1);
//   const [goal, setGoal] = useState('Gain Weight');
//   const [activity, setActivity] = useState('Moderate');

//   // --- Step 1: Goal Selection ---
//   const renderStep1 = () => (
//     <View>
//       <Text style={styles.sectionTitle}>What's your transformation goal?</Text>
//       <GoalCard 
//         id="Lose Weight" title="Lose Weight" sub="Fat loss & lean physique" 
//         icon="trending-down" color="#F97316" selected={goal === 'Lose Weight'} onSelect={setGoal} styles={styles} isDark={isDark}
//       />
//       <GoalCard 
//         id="Gain Weight" title="Gain Weight" sub="Muscle building & bulking" 
//         icon="trending-up" color="#22C55E" selected={goal === 'Gain Weight'} onSelect={setGoal} styles={styles} isDark={isDark}
//       />
//       <GoalCard 
//         id="Maintain" title="Maintain" sub="Keep current physique" 
//         icon="scale-balance" color="#0EA5E9" selected={goal === 'Maintain'} onSelect={setGoal} styles={styles} isDark={isDark}
//       />
//       <GoalCard 
//         id="Body Recomp" title="Body Recomp" sub="Burn fat & build muscle" 
//         icon="dumbbell" color="#A855F7" selected={goal === 'Body Recomp'} onSelect={setGoal} styles={styles} isDark={isDark}
//       />
      
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(2)}>
//           <Text style={styles.nextBtnText}>Next</Text>
//           <Icon name="chevron-right" size={20} color="#FFF" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   // --- Step 2: User Info ---
//   const renderStep2 = () => (
//     <View>
//       <Text style={styles.sectionTitle}>Tell us about yourself</Text>
      
//       <View style={styles.inputGroup}>
//         <View style={styles.labelRow}>
//           <Icon name="weight-kilogram" size={18} color={isDark ? '#94A3B8' : '#1E293B'} />
//           <Text style={styles.inputLabel}>Current Weight (kg)</Text>
//         </View>
//         <TextInput style={styles.input} placeholder="e.g. 75" placeholderTextColor="#CBD5E1" keyboardType="numeric" />
//       </View>

//       <View style={styles.inputGroup}>
//         <View style={styles.labelRow}>
//           <Icon name="target" size={18} color={isDark ? '#94A3B8' : '#1E293B'} />
//           <Text style={styles.inputLabel}>Target Weight (kg)</Text>
//         </View>
//         <TextInput style={styles.input} placeholder="e.g. 70" placeholderTextColor="#CBD5E1" keyboardType="numeric" />
//       </View>

//       <View style={styles.inputGroup}>
//         <View style={styles.labelRow}>
//           <Icon name="run-fast" size={18} color={isDark ? '#94A3B8' : '#1E293B'} />
//           <Text style={styles.inputLabel}>Activity Level</Text>
//         </View>
//         <ActivityOption title="Sedentary" sub="Little to no exercise" selected={activity === 'Sedentary'} onSelect={setActivity} styles={styles} />
//         <ActivityOption title="Moderate" sub="3-5 days/week" selected={activity === 'Moderate'} onSelect={setActivity} styles={styles} />
//         <ActivityOption title="Very Active" sub="6-7 days/week" selected={activity === 'Very Active'} onSelect={setActivity} styles={styles} />
//       </View>

//       <View style={styles.footerRow}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
//           <Text style={styles.backBtnText}>Back</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.generateBtn} onPress={() => setStep(3)}>
//           <Icon name="creation" size={20} color="#FFF" style={{marginRight: 8}} />
//           <Text style={styles.generateBtnText}>Generate Plan</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   // --- Step 3: Result Placeholder ---
//   const renderStep3 = () => (
//     <View style={styles.centerContent}>
//        <Icon name="check-circle" size={80} color="#22C55E" />
//        <Text style={styles.mainTitle}>Plan Generated!</Text>
//        <Text style={styles.description}>Your AI-powered nutrition plan is ready for review.</Text>
//        <TouchableOpacity style={[styles.nextBtn, {marginTop: 30}]} onPress={() => setStep(1)}>
//           <Text style={styles.nextBtnText}>Restart Planner</Text>
//        </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#000' : '#F4F9FF'} />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={{ flex: 1 }}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Icon name="medal-outline" size={28} color="#22C55E" style={{ marginRight: 8 }} />
//             <Text style={styles.headerTitle}>Transformation Planner</Text>
//           </View>
//           <Text style={styles.headerSub}>Create an AI-powered nutrition plan tailored to your body transformation goals.</Text>
//         </View>
//       </View>

//       {/* Stepper Component */}
//       <View style={styles.stepperContainer}>
//         <StepCircle num={1} active={step >= 1} completed={step > 1} styles={styles} />
//         <View style={[styles.stepLine, step > 1 && {backgroundColor: '#22C55E'}]} />
//         <StepCircle num={2} active={step >= 2} completed={step > 2} styles={styles} />
//         <View style={[styles.stepLine, step > 2 && {backgroundColor: '#22C55E'}]} />
//         <StepCircle num={3} active={step >= 3} completed={step > 3} styles={styles} />
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollPadding} showsVerticalScrollIndicator={false}>
//         {step === 1 && renderStep1()}
//         {step === 2 && renderStep2()}
//         {step === 3 && renderStep3()}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// // --- Reusable UI Components ---

// const StepCircle = ({ num, active, completed, styles }: any) => (
//   <View style={[styles.stepCircle, active && styles.stepActive, completed && styles.stepCompleted]}>
//     {completed ? <Icon name="check" size={18} color="#FFF" /> : 
//     <Text style={[styles.stepNum, active && {color: '#FFF'}]}>{num}</Text>}
//   </View>
// );

// const GoalCard = ({ title, sub, icon, color, selected, onSelect, id, styles, isDark }: any) => (
//   <TouchableOpacity 
//     style={[styles.goalCard, selected && {borderColor: '#22C55E', backgroundColor: isDark ? '#064E3B' : '#F0FDF4'}]} 
//     onPress={() => onSelect(id)}
//   >
//     <View style={[styles.goalIconBox, {backgroundColor: color}]}>
//       <Icon name={icon} size={24} color="#FFF" />
//     </View>
//     <View style={{flex: 1, marginLeft: 15}}>
//       <Text style={styles.goalTitle}>{title}</Text>
//       <Text style={styles.goalSub}>{sub}</Text>
//     </View>
//     {selected && <Icon name="check-circle" size={20} color="#22C55E" />}
//   </TouchableOpacity>
// );

// const ActivityOption = ({ title, sub, selected, onSelect, styles }: any) => (
//   <TouchableOpacity 
//     style={[styles.activityBox, selected && styles.activitySelected]} 
//     onPress={() => onSelect(title)}
//   >
//     <Text style={styles.activityTitle}>{title}</Text>
//     <Text style={styles.activitySub}>{sub}</Text>
//   </TouchableOpacity>
// );

// const createDynamicStyles = (isDark: boolean) => StyleSheet.create({
//   container: { flex: 1, backgroundColor: isDark ? '#000' : '#F4F9FF' },
//   header: { padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
//   headerTitle: { fontSize: 22, fontWeight: '800', color: isDark ? '#FFF' : '#1E293B', letterSpacing: -0.5 },
//   headerSub: { fontSize: 13, color: isDark ? '#94A3B8' : '#64748B', marginTop: 6, lineHeight: 18 },
  
//   // Stepper
//   stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
//   stepCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: isDark ? '#27272A' : '#E2E8F0', justifyContent: 'center', alignItems: 'center' },
//   stepActive: { backgroundColor: '#22C55E' },
//   stepCompleted: { backgroundColor: '#22C55E' },
//   stepNum: { color: isDark ? '#94A3B8' : '#64748B', fontWeight: 'bold' },
//   stepLine: { width: 50, height: 2, backgroundColor: isDark ? '#27272A' : '#E2E8F0', marginHorizontal: 10 },

//   scrollPadding: { paddingHorizontal: 20, paddingBottom: 40 },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginBottom: 20 },

//   // Goal Screen
//   goalCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? '#111' : '#FFF', padding: 15, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: isDark ? '#333' : 'transparent' },
//   goalIconBox: { width: 50, height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
//   goalTitle: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
//   goalSub: { fontSize: 12, color: isDark ? '#94A3B8' : '#64748B', marginTop: 2 },
//   footer: { alignItems: 'flex-end', marginTop: 20 },
//   nextBtn: { backgroundColor: '#22C55E', flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15, alignItems: 'center' },
//   nextBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginRight: 8 },

//   // Info Screen (Step 2)
//   inputGroup: { marginBottom: 20 },
//   labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
//   inputLabel: { fontSize: 14, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginLeft: 8 },
//   input: { backgroundColor: isDark ? '#111' : '#FFF', borderWidth: 1, borderColor: isDark ? '#333' : '#E2E8F0', borderRadius: 15, padding: 15, fontSize: 15, color: isDark ? '#FFF' : '#1E293B' },
//   activityBox: { backgroundColor: isDark ? '#111' : '#FFF', padding: 15, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: isDark ? '#333' : '#E2E8F0' },
//   activitySelected: { borderColor: '#22C55E', backgroundColor: isDark ? '#064E3B' : '#F0FDF4' },
//   activityTitle: { fontSize: 15, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
//   activitySub: { fontSize: 12, color: isDark ? '#94A3B8' : '#64748B', marginTop: 2 },
//   footerRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
//   backBtn: { backgroundColor: isDark ? '#222' : '#F1F5F9', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15 },
//   backBtnText: { color: isDark ? '#94A3B8' : '#475569', fontWeight: 'bold' },
//   generateBtn: { backgroundColor: '#22C55E', flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15, alignItems: 'center', elevation: 2, shadowColor: '#22C55E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
//   generateBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

//   centerContent: { alignItems: 'center', justifyContent: 'center', marginTop: 50 },
//   mainTitle: { fontSize: 24, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginTop: 20 },
//   description: { fontSize: 15, color: isDark ? '#94A3B8' : '#64748B', textAlign: 'center', marginTop: 10 },
// });

// export default TransformationPlanner;


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

const { width } = Dimensions.get('window');

const TransformationPlanner = () => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('Gain Weight');
  const [activity, setActivity] = useState('Moderate');
  const [isWorking, setIsWorking] = useState(false);
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  
  const progressAnim = React.useRef(new Animated.Value(0)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  const isFormValid = weight.trim() !== '' && targetWeight.trim() !== '';

  // Logic for Transition from Step 2 to Step 3
  const handleGeneratePlan = () => {
    setStep(3);
    setIsWorking(true);
    
    // Reset animations
    progressAnim.setValue(0);
    pulseAnim.setValue(1);

    // Start progress animation (2 seconds)
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // Start pulse animation for waiting effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    setTimeout(() => {
      setIsWorking(false);
      // Clear fields after generation is complete
      setWeight('');
      setTargetWeight('');
    }, 2000);
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
        <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(2)}>
          <Text style={styles.nextBtnText}>Next</Text>
          <Icon name="chevron-right" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- Step 2: User Info ---
  const renderStep2 = () => (
    <View>
      <Text style={styles.sectionTitle}>Tell us about yourself</Text>
      <View style={styles.inputGroup}>
        <View style={styles.labelRow}><Icon name="weight-kilogram" size={18} color="#1E293B" /><Text style={styles.inputLabel}>Current Weight (kg)</Text></View>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. 75" 
          placeholderTextColor="#CBD5E1" 
          keyboardType="numeric" 
          value={weight}
          onChangeText={setWeight}
        />
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.labelRow}><Icon name="target" size={18} color="#1E293B" /><Text style={styles.inputLabel}>Target Weight (kg)</Text></View>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. 70" 
          placeholderTextColor="#CBD5E1" 
          keyboardType="numeric" 
          value={targetWeight}
          onChangeText={setTargetWeight}
        />
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.labelRow}><Icon name="run-fast" size={18} color="#1E293B" /><Text style={styles.inputLabel}>Activity Level</Text></View>
        <ActivityOption title="Sedentary" sub="Little to no exercise" selected={activity === 'Sedentary'} onSelect={setActivity} />
        <ActivityOption title="Moderate" sub="3-5 days/week" selected={activity === 'Moderate'} onSelect={setActivity} />
        <ActivityOption title="Very Active" sub="6-7 days/week" selected={activity === 'Very Active'} onSelect={setActivity} />
      </View>

      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}><Text style={styles.backBtnText}>Back</Text></TouchableOpacity>
        <TouchableOpacity 
          style={[styles.generateBtn, isFormValid && { backgroundColor: '#22C55E' }]} 
          onPress={handleGeneratePlan}
          disabled={!isFormValid}
        >
          <Icon name="creation" size={20} color={isFormValid ? "#FFF" : "#1E293B"} style={{marginRight: 8}} />
          <Text style={[styles.generateBtnText, isFormValid && { color: '#FFF' }]}>Generate Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- Step 3 (Working State) ---
  const renderWorkingUI = () => {
    const progressWidth = progressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

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
  };

  // --- Step 3 (Final Result Plan) ---
  const renderResultPlan = () => (
    <View>
      {/* Macro Summary */}
      <View style={styles.planSummaryCard}>
        <View style={styles.planHeader}><Icon name="sparkles" size={18} color="#22C55E" /><Text style={styles.planTitle}>Your AI-Powered Plan</Text></View>
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

      <TouchableOpacity style={styles.createNewBtn} onPress={() => setStep(1)}>
        <Text style={styles.createNewText}>Create a new plan</Text>
        <Icon name="arrow-right" size={16} color="#475569" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F9FF" />
      
      {/* Main Header */}
      {!isWorking && (
        <View style={styles.header}>
            <View style={styles.headerIconBox}><Icon name="calendar-check" size={28} color="#22C55E" /></View>
            <View style={{marginLeft: 15, flex: 1}}>
              <Text style={styles.headerTitle}>Transformation Planner</Text>
              <Text style={styles.headerSub}>Create an AI-powered nutrition plan tailored to your body transformation goals</Text>
            </View>
        </View>
      )}

      {/* Stepper */}
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
        {step === 3 && (isWorking ? renderWorkingUI() : renderResultPlan())}
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub Components ---
const StepCircle = ({ num, active, completed }: any) => (
  <View style={[styles.stepCircle, active && styles.stepActive, completed && styles.stepCompleted]}>
    {completed ? <Icon name="check" size={18} color="#FFF" /> : <Text style={[styles.stepNum, active && {color: '#FFF'}]}>{num}</Text>}
  </View>
);

const GoalCard = ({ title, sub, icon, color, selected, onSelect, id }: any) => (
  <TouchableOpacity style={[styles.goalCard, selected && styles.cardSelected]} onPress={() => onSelect(id)}>
    <View style={[styles.goalIconBox, {backgroundColor: color}]}><Icon name={icon} size={24} color="#FFF" /></View>
    <View style={{flex: 1, marginLeft: 15}}><Text style={styles.goalTitle}>{title}</Text><Text style={styles.goalSub}>{sub}</Text></View>
    {selected && <Icon name="check-circle" size={20} color="#22C55E" />}
  </TouchableOpacity>
);

const MacroBox = ({ label, val, unit, icon, color }: any) => (
  <View style={styles.macroBox}>
    <Icon name={icon} size={18} color={color} />
    <View style={{marginTop: 8}}>
      <Text style={styles.macroVal}>{val} <Text style={styles.macroUnit}>{unit}</Text></Text>
      <Text style={styles.macroLabel}>{label}</Text>
    </View>
  </View>
);

const MealItem = ({ title, time, cal, desc, isLast }: any) => (
  <View style={styles.mealRow}>
    <View style={styles.mealLeft}>
      <View style={styles.mealTimeIcon}><Icon name="clock-outline" size={16} color="#64748B" /></View>
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

const TipItem = ({ text }: any) => (
  <View style={styles.tipRow}>
    <View style={styles.tipCheck}><Icon name="check" size={14} color="#22C55E" /></View>
    <Text style={styles.tipText}>{text}</Text>
  </View>
);

const ActivityOption = ({ title, sub, selected, onSelect }: any) => (
  <TouchableOpacity style={[styles.activityBox, selected && styles.cardSelected]} onPress={() => onSelect(title)}>
    <Text style={styles.activityTitle}>{title}</Text>
    <Text style={styles.activitySub}>{sub}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F9FF' },
  header: { padding: 20, flexDirection: 'row', alignItems: 'center' },
  headerIconBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#DCFCE7', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  headerSub: { fontSize: 13, color: '#64748B', marginTop: 4 },
  
  stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
  stepCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' },
  stepActive: { backgroundColor: '#22C55E' },
  stepCompleted: { backgroundColor: '#22C55E' },
  stepNum: { color: '#64748B', fontWeight: 'bold' },
  stepLine: { width: 50, height: 2, backgroundColor: '#E2E8F0', marginHorizontal: 8 },

  scrollPadding: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 20 },

  // Goal & Step 1/2
  goalCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  cardSelected: { borderColor: '#22C55E', backgroundColor: '#F0FDF4' },
  goalIconBox: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  goalTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  goalSub: { fontSize: 12, color: '#64748B' },
  footer: { alignItems: 'flex-end', marginTop: 20 },
  nextBtn: { backgroundColor: '#22C55E', flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginRight: 8 },

  inputGroup: { marginBottom: 20 },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginLeft: 8 },
  input: { backgroundColor: '#FFF', borderRadius: 15, padding: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  activityBox: { backgroundColor: '#FFF', padding: 15, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  activityTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B' },
  activitySub: { fontSize: 12, color: '#64748B' },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  backBtn: { paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15, backgroundColor: '#F1F5F9' },
  backBtnText: { color: '#475569', fontWeight: 'bold' },
  generateBtn: { backgroundColor: '#F1F5F9', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 15, alignItems: 'center' },
  generateBtnText: { color: '#1E293B', fontWeight: 'bold' },

  // AI Working UI
  workingContainer: { alignItems: 'center', marginTop: 40 },
  workingIconWrapper: { width: 120, height: 120, justifyContent: 'center', alignItems: 'center' },
  workingIconBg: { width: 90, height: 90, borderRadius: 25, backgroundColor: '#FFF', elevation: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, justifyContent: 'center', alignItems: 'center' },
  workingBadgeTop: { position: 'absolute', top: 5, right: 5, backgroundColor: '#FFF', padding: 8, borderRadius: 15, elevation: 5 },
  workingBadgeBottom: { position: 'absolute', bottom: 15, left: -5, backgroundColor: '#FFF', padding: 8, borderRadius: 15, elevation: 5 },
  workingTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E293B', marginTop: 40 },
  workingSub: { color: '#22C55E', fontWeight: 'bold', fontSize: 16, marginTop: 10 },
  workingDesc: { color: '#64748B', textAlign: 'center', paddingHorizontal: 30, marginTop: 10, lineHeight: 20 },
  progressBarBg: { width: '80%', height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, marginTop: 30, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#22C55E' },

  // Result Plan UI
  planSummaryCard: { backgroundColor: '#F0FDF4', borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#DCFCE7' },
  planHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  planTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginLeft: 10 },
  macroGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  macroBox: { width: '48%', backgroundColor: '#FFF', padding: 15, borderRadius: 16, marginBottom: 12 },
  macroVal: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  macroUnit: { fontSize: 11, color: '#94A3B8' },
  macroLabel: { fontSize: 10, color: '#64748B', fontWeight: 'bold', marginTop: 2 },

  mealPlanContainer: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 20 },
  mealRow: { flexDirection: 'row' },
  mealLeft: { alignItems: 'center', width: 25 },
  mealTimeIcon: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  mealLine: { flex: 1, width: 2, backgroundColor: '#F1F5F9', marginVertical: 5 },
  mealRight: { flex: 1, marginLeft: 15, paddingBottom: 25 },
  mealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  mealTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B' },
  mealTimeText: { fontSize: 12, color: '#94A3B8' },
  calBadge: { backgroundColor: '#F0FDF4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  calBadgeText: { fontSize: 11, color: '#22C55E', fontWeight: 'bold' },
  mealDescList: { marginTop: 8 },
  mealDescText: { fontSize: 13, color: '#64748B', lineHeight: 20 },

  tipsSection: { backgroundColor: '#FFF', borderRadius: 24, padding: 20 },
  tipRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12, marginBottom: 10 },
  tipCheck: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#DCFCE7', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  tipText: { fontSize: 13, color: '#475569' },
  
  createNewBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  createNewText: { color: '#475569', fontWeight: 'bold', marginRight: 5 }
});

export default TransformationPlanner;