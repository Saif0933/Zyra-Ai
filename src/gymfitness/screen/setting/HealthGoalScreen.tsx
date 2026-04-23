import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
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
    ActivityIndicator,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';
// import { useGetGoal, useSetGoal } from '../../../auth/hook/gymGole/useGym';

const { width } = Dimensions.get('window');

const HealthGoalScreen = () => {
  const navigation = useNavigation();
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createStyles(isDark), [isDark]);

  // Backend Hooks (REVERTED)
  // const { data: goalApiResponse, isLoading } = useGetGoal();
  // const setGoalMutation = useSetGoal();

  const isLoading = false;

  // Local State
  const [dailyCalories, setDailyCalories] = useState('2200');
  const [proteinTarget, setProteinTarget] = useState('150');
  const [carbsTarget, setCarbsTarget] = useState('250');
  const [fatsTarget, setFatsTarget] = useState('70');
  const [waterTarget, setWaterTarget] = useState('2500');

  const handleSave = () => {
    Alert.alert("Success", "Health goals updated successfully! (Mock)");
    navigation.goBack();
  };

  const goals = [
    { id: '1', title: 'Weight Gain', icon: 'trending-up', color: '#3B82F6', active: true },
    { id: '2', title: 'Weight Loss', icon: 'trending-down', color: '#10B981', active: false },
    { id: '3', title: 'Maintenance', icon: 'scale-balance', color: '#F59E0B', active: false },
    { id: '4', title: 'Build Muscle', icon: 'arm-flex', color: '#EF4444', active: false },
  ];

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? '#000' : '#F8FAFC'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={30} color={isDark ? '#FFF' : '#1E293B'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Goals</Text>
        <TouchableOpacity style={styles.doneBtn} onPress={handleSave} disabled={false}>
          <Text style={styles.doneText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Main Banner */}
        <LinearGradient
            colors={isDark ? ['#1e293b', '#0f172a'] : ['#22C55E', '#16A34A']}
            style={styles.banner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View>
                <Text style={styles.bannerSubtitle}>Your active goal</Text>
                <Text style={styles.bannerTitle}>Body Recomposition</Text>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: '100%' }]} />
                    </View>
                    <Text style={styles.progressText}>All targets synchronized</Text>
                </View>
            </View>
            <Icon name="bullseye-arrow" size={60} color="rgba(255,255,255,0.2)" style={styles.bannerIcon} />
        </LinearGradient>

        <Text style={styles.sectionTitle}>What's your primary focus?</Text>
        <View style={styles.goalGrid}>
          {goals.map((goal) => (
            <TouchableOpacity 
                key={goal.id} 
                style={[
                    styles.goalCard, 
                    goal.active && { borderColor: '#22C55E', borderWidth: 2, backgroundColor: isDark ? '#112211' : '#F0FDF4' }
                ]}
            >
              <View style={[styles.goalIconBg, { backgroundColor: goal.color + '20' }]}>
                <Icon name={goal.icon} size={24} color={goal.color} />
              </View>
              <Text style={[styles.goalLabel, { color: isDark ? '#FFF' : '#1E293B' }]}>{goal.title}</Text>
              {goal.active && (
                  <View style={styles.checkBadge}>
                      <Icon name="check" size={12} color="#FFF" />
                  </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Set your targets</Text>
        
        {/* Calorie Card */}
        <View style={styles.targetCard}>
            <View style={styles.targetHeader}>
                <Icon name="lightning-bolt" size={24} color="#F59E0B" />
                <Text style={styles.targetTitle}>Daily Calories</Text>
            </View>
            <View style={styles.inputWrapper}>
                <TextInput 
                    style={styles.input} 
                    value={dailyCalories} 
                    onChangeText={setDailyCalories}
                    keyboardType="numeric"
                    placeholderTextColor="#94A3B8"
                />
                <Text style={styles.unit}>kcal</Text>
            </View>
        </View>

        {/* Protein Card */}
        <View style={styles.targetCard}>
            <View style={styles.targetHeader}>
                <Icon name="food-apple" size={24} color="#EF4444" />
                <Text style={styles.targetTitle}>Protein Intake</Text>
            </View>
            <View style={styles.inputWrapper}>
                <TextInput 
                    style={styles.input} 
                    value={proteinTarget} 
                    onChangeText={setProteinTarget}
                    keyboardType="numeric"
                    placeholderTextColor="#94A3B8"
                />
                <Text style={styles.unit}>g/day</Text>
            </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* Carbs Card */}
            <View style={[styles.targetCard, { width: (width - 55) / 2 }]}>
                <View style={styles.targetHeader}>
                    <Icon name="corn" size={20} color="#F97316" />
                    <Text style={[styles.targetTitle, { fontSize: 13, marginLeft: 8 }]}>Carbs</Text>
                </View>
                <View style={[styles.inputWrapper, { borderBottomWidth: 1 }]}>
                    <TextInput 
                        style={[styles.input, { fontSize: 20 }]} 
                        value={carbsTarget} 
                        onChangeText={setCarbsTarget}
                        keyboardType="numeric"
                    />
                    <Text style={styles.unit}>g</Text>
                </View>
            </View>

            {/* Fats Card */}
            <View style={[styles.targetCard, { width: (width - 55) / 2 }]}>
                <View style={styles.targetHeader}>
                    <Icon name="water" size={20} color="#0EA5E9" />
                    <Text style={[styles.targetTitle, { fontSize: 13, marginLeft: 8 }]}>Fats</Text>
                </View>
                <View style={[styles.inputWrapper, { borderBottomWidth: 1 }]}>
                    <TextInput 
                        style={[styles.input, { fontSize: 20 }]} 
                        value={fatsTarget} 
                        onChangeText={setFatsTarget}
                        keyboardType="numeric"
                    />
                    <Text style={styles.unit}>g</Text>
                </View>
            </View>
        </View>

        {/* Water Card */}
        <View style={styles.targetCard}>
            <View style={styles.targetHeader}>
                <Icon name="cup-water" size={24} color="#3B82F6" />
                <Text style={styles.targetTitle}>Daily Water Goal</Text>
            </View>
            <View style={styles.inputWrapper}>
                <TextInput 
                    style={styles.input} 
                    value={waterTarget} 
                    onChangeText={setWaterTarget}
                    keyboardType="numeric"
                    placeholderTextColor="#94A3B8"
                />
                <Text style={styles.unit}>ml</Text>
            </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#000' : '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDark ? '#FFF' : '#1E293B',
  },
  doneBtn: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  doneText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  banner: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  bannerIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  progressContainer: {
    marginTop: 20,
  },
  progressBarBg: {
    height: 6,
    width: width * 0.5,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 3,
  },
  progressText: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDark ? '#FFF' : '#1E293B',
    marginBottom: 20,
  },
  goalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  goalCard: {
    width: (width - 60) / 2,
    backgroundColor: isDark ? '#111' : '#FFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: isDark ? '#222' : '#F1F5F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  goalIconBg: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  checkBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#22C55E',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetCard: {
    backgroundColor: isDark ? '#111' : '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: isDark ? '#222' : '#F1F5F9',
  },
  targetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  targetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDark ? '#FFF' : '#1E293B',
    marginLeft: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: '#22C55E',
    paddingBottom: 5,
  },
  input: {
    fontSize: 28,
    fontWeight: 'bold',
    color: isDark ? '#FFF' : '#1E293B',
    padding: 0,
    minWidth: 60,
  },
  unit: {
    fontSize: 16,
    color: '#94A3B8',
    marginLeft: 8,
    marginBottom: 6,
    fontWeight: '600',
  },
});

export default HealthGoalScreen;
