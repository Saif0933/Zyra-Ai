import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

// --- TypeScript Interfaces ---
interface PathCardProps {
  icon: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}

interface GenderButtonProps {
  icon: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}

const ProfileCompletionScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Validation: All fields must be selected
  const isFormValid = selectedPath !== null && gender !== null && birthDate !== null;

  // Dynamic Theme Color
  const themeColor = selectedPath === 'nutrition' ? '#2ECC71' : 
                     selectedPath === 'beauty' ? '#F43F5E' : '#9BA3AF';
  
  const buttonBgColor = selectedPath === 'nutrition' ? '#9EF0B1' : 
                        selectedPath === 'beauty' ? '#FECDD3' : '#E2E8F0';

  const handleContinue = () => {
    if (isFormValid) {
      navigation.navigate('Personalized', { 
        role: selectedPath === 'nutrition' ? 'healthai' : 'beauticare' 
      });
    }
  };

  const onDateSelect = (date: string) => {
    setBirthDate(date);
    setDatePickerVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
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
            <View style={[styles.progressBar, { backgroundColor: isFormValid ? '#2ECC71' : themeColor }]} />
            <Text style={[styles.tabLabel, { color: isFormValid ? '#2ECC71' : themeColor }]}>CORE SELECTION</Text>
          </View>
          <View style={styles.tabItem}>
            <View style={[styles.progressBar, styles.inactiveProgress]} />
            <Text style={[styles.tabLabel, styles.inactiveLabel]}>PERSONALIZED SPECS</Text>
          </View>
        </View>

        {/* Main Content Card */}
        <View style={styles.mainCard}>
          <Text style={styles.sectionHeader}>CHOOSE YOUR PATH</Text>
          <View style={styles.pathRow}>
            <PathCard 
              icon="lightning-bolt-outline" 
              label="Nutrition AI" 
              selected={selectedPath === 'nutrition'}
              activeColor="#2ECC71"
              onPress={() => setSelectedPath('nutrition')}
            />
            <PathCard 
              icon="sparkles" 
              label="Beauty AI" 
              selected={selectedPath === 'beauty'}
              activeColor="#F43F5E"
              onPress={() => setSelectedPath('beauty')}
            />
          </View>

          <Text style={styles.sectionHeader}>GENDER IDENTITY</Text>
          <View style={styles.genderRow}>
            <GenderButton 
              icon="gender-male" 
              label="Male" 
              selected={gender === 'male'}
              activeColor={themeColor}
              onPress={() => setGender('male')}
            />
            <GenderButton 
              icon="gender-female" 
              label="Female" 
              selected={gender === 'female'}
              activeColor={themeColor}
              onPress={() => setGender('female')}
            />
            <GenderButton 
              icon="account-outline" 
              label="Other" 
              selected={gender === 'other'}
              activeColor={themeColor}
              onPress={() => setGender('other')}
            />
          </View>

          <Text style={styles.sectionHeader}>BIRTHDAY</Text>
          <TouchableOpacity 
            style={[styles.datePicker, birthDate && { borderColor: themeColor }]}
            onPress={() => setDatePickerVisible(true)}
          >
            <Icon name="calendar-blank-outline" size={20} color={birthDate ? themeColor : "#666"} />
            <Text style={{ flex: 1, marginLeft: 15, color: birthDate ? '#0D1B2A' : '#999', fontFamily: 'serif' }}>
              {birthDate || 'Select Date'}
            </Text>
            <Icon name="chevron-down" size={20} color={birthDate ? themeColor : "#666"} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.continueButton, 
              { backgroundColor: isFormValid ? buttonBgColor : '#F0F0F0' }
            ]}
            onPress={handleContinue}
            disabled={!isFormValid}
          >
            <Text style={[styles.continueText, { color: isFormValid ? (selectedPath === 'nutrition' ? '#4A9073' : '#991B1B') : '#9BA3AF' }]}>
              Continue to Details
            </Text>
            <Icon name="chevron-right" size={20} color={isFormValid ? (selectedPath === 'nutrition' ? '#4A9073' : '#991B1B') : '#9BA3AF'} />
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Custom Date Picker Modal */}
      <DatePickerModal 
        visible={isDatePickerVisible} 
        onClose={() => setDatePickerVisible(false)} 
        onSelect={onDateSelect}
        themeColor={themeColor}
      />
    </SafeAreaView>
  );
};

// --- Sub-components ---

const DatePickerModal: React.FC<{ visible: boolean; onClose: () => void; onSelect: (date: string) => void; themeColor: string }> = ({ visible, onClose, onSelect, themeColor }) => {
  const years = Array.from({ length: 100 }, (_, i) => 2024 - i);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const [selYear, setSelYear] = useState(2000);
  const [selMonth, setSelMonth] = useState('Jan');
  const [selDay, setSelDay] = useState(1);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Select Birthday</Text>
          
          <View style={styles.pickerRow}>
            {/* Simple Picker Simulation */}
            <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
              {years.map(y => (
                <TouchableOpacity key={y} onPress={() => setSelYear(y)} style={[styles.pickerItem, selYear === y && { backgroundColor: themeColor + '20' }]}>
                  <Text style={[styles.pickerText, selYear === y && { color: themeColor }]}>{y}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
              {months.map(m => (
                <TouchableOpacity key={m} onPress={() => setSelMonth(m)} style={[styles.pickerItem, selMonth === m && { backgroundColor: themeColor + '20' }]}>
                  <Text style={[styles.pickerText, selMonth === m && { color: themeColor }]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                <TouchableOpacity key={d} onPress={() => setSelDay(d)} style={[styles.pickerItem, selDay === d && { backgroundColor: themeColor + '20' }]}>
                  <Text style={[styles.pickerText, selDay === d && { color: themeColor }]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => onSelect(`${selDay} ${selMonth} ${selYear}`)} 
              style={[styles.selectBtn, { backgroundColor: themeColor }]}
            >
              <Text style={styles.selectText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const PathCard: React.FC<PathCardProps & { activeColor: string }> = ({ icon, label, selected, onPress, activeColor }) => (
  <TouchableOpacity 
    onPress={onPress}
    style={[
      styles.pathCard, 
      selected && { borderColor: activeColor, backgroundColor: activeColor + '08' }
    ]}
  >
    <Icon name={icon} size={40} color={selected ? activeColor : "#0D1B2A"} />
    <Text style={[styles.pathLabel, selected && { color: activeColor }]}>{label}</Text>
  </TouchableOpacity>
);

const GenderButton: React.FC<GenderButtonProps & { activeColor: string }> = ({ icon, label, selected, onPress, activeColor }) => (
  <TouchableOpacity 
    onPress={onPress}
    style={[
      styles.genderBtn, 
      selected && { borderColor: activeColor, backgroundColor: activeColor + '08' }
    ]}
  >
    <Icon name={icon} size={18} color={selected ? activeColor : "#0D1B2A"} />
    <Text style={[styles.genderBtnLabel, selected && { color: activeColor }]}>{label}</Text>
  </TouchableOpacity>
);

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9FC',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#6EF096',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    color: '#0D1B2A',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#5C677D',
    marginTop: 8,
    fontFamily: 'serif',
  },
  tabWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  tabItem: {
    width: '48%',
  },
  progressBar: {
    height: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  inactiveProgress: {
    backgroundColor: '#E1E8ED',
  },
  tabLabel: {
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  inactiveLabel: {
    color: '#9BA3AF',
  },
  mainCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 25,
    borderRadius: 30,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  sectionHeader: {
    fontSize: 13,
    color: '#5C677D',
    marginBottom: 15,
    letterSpacing: 1,
    fontFamily: 'serif',
  },
  pathRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  pathCard: {
    width: '47%',
    height: 130,
    borderWidth: 1.5,
    borderColor: '#F0F4F8',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  pathLabel: {
    fontSize: 14,
    color: '#0D1B2A',
    marginTop: 12,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: 'serif',
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  genderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F0F4F8',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 15,
    width: '31%',
    justifyContent: 'center',
  },
  genderBtnLabel: {
    fontSize: 12,
    color: '#0D1B2A',
    marginLeft: 4,
    fontFamily: 'serif',
  },
  datePicker: {
    height: 60,
    borderWidth: 1.5,
    borderColor: '#F0F4F8',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  continueButton: {
    height: 65,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    fontSize: 18,
    marginRight: 10,
    fontFamily: 'serif',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: width * 0.85,
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 25,
    elevation: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: '#0D1B2A',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  pickerRow: {
    flexDirection: 'row',
    height: 200,
    marginBottom: 25,
  },
  pickerColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerItem: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  pickerText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'serif',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'serif',
  },
  selectBtn: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 15,
  },
  selectText: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'serif',
  },
});

export default ProfileCompletionScreen;