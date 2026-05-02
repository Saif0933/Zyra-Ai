import React, { useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// --- Interfaces ---
interface ActivityCardProps {
  title: string;
  sub: string;
  selected: boolean;
  activeColor: string;
  onPress: () => void;
}

interface ChipProps {
  label: string;
  selected: boolean;
  activeColor: string;
  onPress: () => void;
}

const PersonalizedSpecsScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { role } = route.params;
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState<string | null>(null);
  const [diet, setDiet] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);

  // Dynamic Theme Color
  const themeColor = role === 'healthai' ? '#2ECC71' : '#F43F5E';
  const buttonBgColor = role === 'healthai' ? '#9EF0B1' : '#FECDD3';
  const textColor = role === 'healthai' ? '#4A9073' : '#991B1B';

  // Validation
  const isFormValid = 
    age.trim() !== '' && 
    height.trim() !== '' && 
    weight.trim() !== '' && 
    activity !== null && 
    diet.length > 0 && 
    goals.length > 0;

  const toggleSelection = (list: string[], item: string, setter: (val: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleFinalize = () => {
    if (isFormValid) {
      navigation.navigate('WelcomeAboard', { role });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Top Header Section */}
        <View style={styles.headerSection}>
          <View style={[styles.iconContainer, { backgroundColor: themeColor + '30', shadowColor: themeColor }]}>
            <Icon name="account-plus" size={40} color={themeColor} />
          </View>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>Help us tailor your experience.</Text>
        </View>

        {/* Progress Tabs */}
        <View style={styles.tabWrapper}>
          <View style={styles.tabItem}>
            <View style={[styles.progressBar, { backgroundColor: '#2ECC71' }]} />
            <Text style={[styles.tabLabel, { color: '#2ECC71' }]}>CORE SELECTION</Text>
          </View>
          <View style={styles.tabItem}>
            <View style={[styles.progressBar, { backgroundColor: isFormValid ? '#2ECC71' : '#E1E8ED' }]} />
            <Text style={[styles.tabLabel, { color: isFormValid ? '#2ECC71' : '#9BA3AF' }]}>PERSONALIZED SPECS</Text>
          </View>
        </View>

        {/* Main Content Card */}
        <View style={styles.mainCard}>
          
          {/* Age and Vitals */}
          <Text style={styles.sectionHeader}>CURRENT AGE</Text>
          <View style={[styles.inputContainer, age !== '' && { borderColor: themeColor }]}>
            <Icon name="chart-line" size={20} color={age !== '' ? themeColor : "#666"} style={styles.inputIcon} />
            <TextInput 
              placeholder="e.g. 25" 
              style={styles.textInput} 
              keyboardType="numeric" 
              value={age}
              onChangeText={setAge}
            />
          </View>

          <View style={styles.row}>
            <View style={{ width: '47%' }}>
              <Text style={styles.sectionHeader}>HEIGHT (CM)</Text>
              <TextInput 
                placeholder="175" 
                style={[styles.smallInput, height !== '' && { borderColor: themeColor }]} 
                keyboardType="numeric" 
                value={height}
                onChangeText={setHeight}
              />
            </View>
            <View style={{ width: '47%' }}>
              <Text style={styles.sectionHeader}>WEIGHT (KG)</Text>
              <TextInput 
                placeholder="70" 
                style={[styles.smallInput, weight !== '' && { borderColor: themeColor }]} 
                keyboardType="numeric" 
                value={weight}
                onChangeText={setWeight}
              />
            </View>
          </View>

          {/* Activity Level */}
          <Text style={styles.sectionHeader}>ACTIVITY LEVEL</Text>
          <ActivityCard 
            title="Sedentary" sub="Little to no exercise" 
            selected={activity === 'Sedentary'} 
            activeColor={themeColor}
            onPress={() => setActivity('Sedentary')} 
          />
          <ActivityCard 
            title="Lightly Active" sub="1-3 days/week" 
            selected={activity === 'Lightly Active'} 
            activeColor={themeColor}
            onPress={() => setActivity('Lightly Active')} 
          />
          <ActivityCard 
            title="Moderately Active" sub="3-5 days/week" 
            selected={activity === 'Moderately Active'} 
            activeColor={themeColor}
            onPress={() => setActivity('Moderately Active')} 
          />

          {/* Dietary Preferences Chips */}
          <Text style={styles.sectionHeader}>DIETARY PREFERENCES</Text>
          <View style={styles.chipRow}>
            {['Vegan', 'Vegetarian', 'Keto', 'Paleo', 'Gluten-Free', 'Low-Carb', 'Dairy-Free'].map(item => (
              <Chip 
                key={item} label={item} 
                selected={diet.includes(item)} 
                activeColor={themeColor}
                onPress={() => toggleSelection(diet, item, setDiet)} 
              />
            ))}
          </View>

          {/* Health Goals Chips */}
          <Text style={styles.sectionHeader}>HEALTH GOALS</Text>
          <View style={styles.chipRow}>
            {['Weight Loss', 'Muscle Gain', 'Maintenance', 'Improved Energy', 'Better Sleep'].map(item => (
              <Chip 
                key={item} label={item} 
                selected={goals.includes(item)} 
                activeColor={themeColor}
                onPress={() => toggleSelection(goals, item, setGoals)} 
              />
            ))}
          </View>

          {/* Footer Buttons */}
          <View style={styles.footerRow}>
            <TouchableOpacity 
              style={[styles.backButton, { borderColor: themeColor + '30' }]}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-left" size={24} color={themeColor} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.finalizeButton, 
                { backgroundColor: isFormValid ? buttonBgColor : '#F0F0F0' }
              ]}
              onPress={handleFinalize}
              disabled={!isFormValid}
            >
              <Text style={[styles.finalizeText, { color: isFormValid ? textColor : '#9BA3AF' }]}>
                Finalize Profile
              </Text>
              <Icon name="chevron-right" size={20} color={isFormValid ? textColor : '#9BA3AF'} />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub-components ---

const ActivityCard: React.FC<ActivityCardProps> = ({ title, sub, selected, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.activityCard, selected && styles.selectedActivity]}>
    <Text style={[styles.activityTitle, selected && styles.selectedText]}>{title}</Text>
    <Text style={styles.activitySub}>{sub}</Text>
  </TouchableOpacity>
);

const Chip: React.FC<ChipProps> = ({ label, selected, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.chip, selected && styles.selectedChip]}>
    <Text style={[styles.chipLabel, selected && styles.selectedChipLabel]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F9FC' },
  scrollContent: { paddingBottom: 40 },
  headerSection: { alignItems: 'center', marginTop: 40, marginBottom: 30 },
  iconContainer: {
    width: 80, height: 80, backgroundColor: '#6EF096', borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
    elevation: 8, shadowColor: '#6EF096', shadowOpacity: 0.3, shadowRadius: 10,
  },
  title: { fontSize: 28, color: '#0D1B2A', fontFamily: 'serif' },
  subtitle: { fontSize: 16, color: '#5C677D', marginTop: 8, fontFamily: 'serif' },
  tabWrapper: { flexDirection: 'row', paddingHorizontal: 25, justifyContent: 'space-between', marginBottom: 25 },
  tabItem: { width: '48%' },
  progressBar: { height: 5, borderRadius: 5, marginBottom: 10 },
  activeProgress: { backgroundColor: '#2ECC71' },
  inactiveProgress: { backgroundColor: '#E1E8ED' },
  tabLabel: { fontSize: 11, textAlign: 'center', fontFamily: 'serif' },
  activeLabel: { color: '#2ECC71' },
  inactiveLabel: { color: '#9BA3AF' },
  mainCard: {
    backgroundColor: '#FFF', marginHorizontal: 25, borderRadius: 30,
    padding: 25, elevation: 5, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 15,
  },
  sectionHeader: { fontSize: 12, color: '#5C677D', marginBottom: 12, letterSpacing: 0.5, marginTop: 10, fontFamily: 'serif' },
  inputContainer: {
    height: 60, borderWidth: 1.5, borderColor: '#F0F4F8', borderRadius: 20,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginBottom: 20
  },
  inputIcon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 16, color: '#333', fontFamily: 'serif' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  smallInput: {
    height: 60, borderWidth: 1.5, borderColor: '#F0F4F8', borderRadius: 20,
    textAlign: 'center', fontSize: 16, color: '#333', fontFamily: 'serif'
  },
  activityCard: {
    padding: 15, borderRadius: 20, borderWidth: 1.5, borderColor: '#F0F4F8', marginBottom: 12
  },
  selectedActivity: { borderColor: '#E1E8ED', backgroundColor: '#FAFCFE' },
  activityTitle: { fontSize: 16, color: '#0D1B2A', fontFamily: 'serif' },
  selectedText: { color: '#2ECC71' },
  activitySub: { fontSize: 12, color: '#9BA3AF', marginTop: 2, fontFamily: 'serif' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  chip: {
    backgroundColor: '#F4F9FC', paddingHorizontal: 15, paddingVertical: 10,
    borderRadius: 20, marginRight: 8, marginBottom: 8, borderWidth: 1, borderColor: 'transparent'
  },
  selectedChip: { backgroundColor: '#E1F8EB', borderColor: '#2ECC71' },
  chipLabel: { fontSize: 13, color: '#5C677D', fontFamily: 'serif' },
  selectedChipLabel: { color: '#2ECC71' },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, alignItems: 'center' },
  backButton: {
    width: 60, height: 65, borderRadius: 20, borderWidth: 1.5, borderColor: '#F0F4F8',
    justifyContent: 'center', alignItems: 'center'
  },
  finalizeButton: {
    backgroundColor: '#9EF0B1', height: 65, borderRadius: 20,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, marginLeft: 15
  },
  finalizeText: { fontSize: 16, color: '#4A9073', marginRight: 4, fontFamily: 'serif' }
});

export default PersonalizedSpecsScreen;