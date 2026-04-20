import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch,
    Image,
    SafeAreaView,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');

const WorkoutIntegrationScreen = () => {
  const navigation = useNavigation();
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createStyles(isDark), [isDark]);

  const [integrations, setIntegrations] = useState([
    { id: '1', name: 'Google Fit', icon: 'google-fit', color: '#4285F4', connected: true, description: 'Sync your heart rate and steps' },
    { id: '2', name: 'Apple Health', icon: 'heart-pulse', color: '#FF2D55', connected: false, description: 'Import activity and health data' },
    { id: '3', name: 'Strava', icon: 'run-fast', color: '#FC6100', connected: false, description: 'Sync your runs and cycling' },
    { id: '4', name: 'Fitbit', icon: 'watch-variant', color: '#00B0B9', connected: false, description: 'Track sleep and daily activity' },
  ]);

  const [syncSettings, setSyncSettings] = useState({
    steps: true,
    calories: true,
    heartrate: false,
    sleep: true
  });

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(item => 
      item.id === id ? { ...item, connected: !item.connected } : item
    ));
  };

  const toggleSetting = (key: keyof typeof syncSettings) => {
    setSyncSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? '#000' : '#F8FAFC'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={isDark ? '#FFF' : '#1E293B'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Workout Integration</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.infoBox}>
          <View style={styles.infoIconBg}>
            <Icon name="sync" size={28} color="#22C55E" />
          </View>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.infoTitle}>Automatic Sync</Text>
            <Text style={styles.infoSub}>Connect your favorite fitness apps to automatically sync your workouts and activity data.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available Apps</Text>
        
        {integrations.map((item) => (
          <View key={item.id} style={styles.appCard}>
            <View style={[styles.appIconBg, { backgroundColor: item.color + '15' }]}>
              <Icon name={item.icon} size={32} color={item.color} />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.appName}>{item.name}</Text>
              <Text style={styles.appDesc}>{item.description}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.connectBtn, item.connected && styles.connectedBtn]} 
              onPress={() => toggleIntegration(item.id)}
            >
              <Text style={[styles.connectBtnText, item.connected && styles.connectedBtnText]}>
                {item.connected ? 'Connected' : 'Connect'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Sync Settings</Text>
        
        <View style={styles.settingsCard}>
          <SyncSettingItem 
            icon="shoe-print" 
            title="Steps Data" 
            value={syncSettings.steps} 
            onToggle={() => toggleSetting('steps')}
            isDark={isDark}
            styles={styles}
          />
          <SyncSettingItem 
            icon="fire" 
            title="Calories Burned" 
            value={syncSettings.calories} 
            onToggle={() => toggleSetting('calories')}
            isDark={isDark}
            styles={styles}
          />
          <SyncSettingItem 
            icon="heart-pulse" 
            title="Heart Rate" 
            value={syncSettings.heartrate} 
            onToggle={() => toggleSetting('heartrate')}
            isDark={isDark}
            styles={styles}
          />
          <SyncSettingItem 
            icon="bed-outline" 
            title="Sleep Analysis" 
            value={syncSettings.sleep} 
            onToggle={() => toggleSetting('sleep')} 
            isDark={isDark}
            styles={styles}
          />
        </View>

        <TouchableOpacity style={styles.syncNowBtn}>
            <Icon name="refresh" size={20} color="#FFF" />
            <Text style={styles.syncNowText}>Sync Data Now</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const SyncSettingItem = ({ icon, title, value, onToggle, isDark, styles }: any) => (
  <View style={styles.settingItem}>
    <View style={styles.settingLeft}>
      <View style={styles.settingIconBg}>
        <Icon name={icon} size={20} color={isDark ? '#94A3B8' : '#64748B'} />
      </View>
      <Text style={styles.settingTitle}>{title}</Text>
    </View>
    <Switch 
      value={value} 
      onValueChange={onToggle}
      trackColor={{ false: '#CBD5E1', true: '#4ADE80' }}
      thumbColor={value ? '#FFF' : '#F4F4F4'}
    />
  </View>
);

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#000' : '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: isDark ? '#111' : '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDark ? '#FFF' : '#1E293B',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: isDark ? '#111' : '#FFF',
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: isDark ? '#222' : '#F1F5F9',
  },
  infoIconBg: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDark ? '#FFF' : '#1E293B',
  },
  infoSub: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDark ? '#FFF' : '#1E293B',
    marginBottom: 20,
  },
  appCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#111' : '#FFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: isDark ? '#222' : '#F1F5F9',
  },
  appIconBg: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDark ? '#FFF' : '#1E293B',
  },
  appDesc: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  connectBtn: {
    backgroundColor: isDark ? '#FFF' : '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  connectedBtn: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  connectBtnText: {
    color: isDark ? '#000' : '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  connectedBtnText: {
    color: '#64748B',
  },
  divider: {
    height: 1,
    backgroundColor: isDark ? '#222' : '#F1F5F9',
    marginVertical: 15,
  },
  settingsCard: {
    backgroundColor: isDark ? '#111' : '#FFF',
    borderRadius: 24,
    padding: 8,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: isDark ? '#222' : '#F1F5F9',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: isDark ? '#FFF' : '#1E293B',
  },
  syncNowBtn: {
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  syncNowText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default WorkoutIntegrationScreen;
