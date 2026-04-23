import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Polyline } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');

const BeautiCareProfileScreen = () => {
  const navigation = useNavigation();
  const { isDark, toggleTheme } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);
  const [isNotifications, setIsNotifications] = React.useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'SelectRole' }],
              })
            );
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? '#000' : '#FFF9FA'} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Profile Header Card */}
        <View style={styles.profileHeaderCard}>
          <LinearGradient
            colors={['#FDA4AF', '#F43F5E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientTop}
          />
          <View style={styles.profileInfoContainer}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>P</Text>
              </View>
              <TouchableOpacity style={styles.cameraBtn}>
                <Icon name="camera-outline" size={16} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.nameSection}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>Priya Sharma</Text>
                <View style={styles.proBadge}><Text style={styles.proText}>GLOW</Text></View>
              </View>
              <Text style={styles.userEmail}>priya@example.com</Text>
              <View style={styles.memberRow}>
                <Icon name="calendar-month-outline" size={14} color="#94A3B8" />
                <Text style={styles.memberText}>Member since January 2024</Text>
              </View>
              <TouchableOpacity style={styles.editBtn}>
                <Icon name="pencil-outline" size={16} color="#64748B" />
                <Text style={styles.editBtnText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatBox icon="bottle-tonic-plus" color="#F43F5E" value="48"  label="PRODUCTS SCANNED" styles={styles} />
          <StatBox icon="shield-check-outline" color="#10B981" value="87%" label="AVG SAFETY SCORE" styles={styles} />
          <StatBox icon="alert-octagon" color="#F59E0B" value="5"    label="FLAGGED ITEMS" styles={styles} />
          <StatBox icon="medal-outline"   color="#A855F7" value="8"    label="ACHIEVEMENTS" styles={styles} />
        </View>

        {/* Skin Health Score Chart Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.row}>
              <Icon name="chart-line" size={20} color="#F43F5E" />
              <Text style={styles.cardTitle}>Skin Health Score</Text>
            </View>
            <View style={styles.lossBadge}><Text style={styles.lossText}>+12 pts</Text></View>
          </View>
          <View style={styles.chartContainer}>
            <View style={styles.mockChart}>
              <Svg width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="none">
                <Polyline points="0,30 300,30" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="5,5" />
                <Polyline points="0,60 300,60" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="5,5" />
                <Polyline points="0,90 300,90" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="5,5" />
                <Polyline
                  points="10,100 50,80 90,85 130,60 170,55 210,35 250,30 290,20"
                  fill="none"
                  stroke="#F43F5E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Circle cx="10"  cy="100" r="4" fill="#F43F5E" />
                <Circle cx="50"  cy="80"  r="4" fill="#F43F5E" />
                <Circle cx="90"  cy="85"  r="4" fill="#F43F5E" />
                <Circle cx="130" cy="60"  r="4" fill="#F43F5E" />
                <Circle cx="170" cy="55"  r="4" fill="#F43F5E" />
                <Circle cx="210" cy="35"  r="4" fill="#F43F5E" />
                <Circle cx="250" cy="30"  r="4" fill="#F43F5E" />
                <Circle cx="290" cy="20"  r="6" fill="#FFF" stroke="#F43F5E" strokeWidth="3" />
              </Svg>
            </View>
            <View style={styles.chartLabels}>
              {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map(w => (
                <Text key={w} style={styles.chartLabelText}>{w}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.row}>
              <Icon name="medal-outline" size={20} color="#F59E0B" />
              <Text style={styles.cardTitle}>Achievements</Text>
            </View>
            <Text style={styles.earnedText}>3/6 Earned</Text>
          </View>
          <View style={styles.achievementGrid}>
            <AchievementItem icon="shimmer"           label="Glow Seeker"    color="#F43F5E" active styles={styles} />
            <AchievementItem icon="shield-check"      label="Safety First"   color="#10B981" active styles={styles} />
            <AchievementItem icon="flask-outline"     label="Ingredient Pro"  color="#FBBF24" active styles={styles} />
            <AchievementItem icon="star-outline"      label="30-Day Routine"  color="#CBD5E1" styles={styles} />
            <AchievementItem icon="trophy-outline"    label="100 Scans"       color="#CBD5E1" styles={styles} />
            <AchievementItem icon="crown-outline"     label="Glow Expert"     color="#CBD5E1" styles={styles} />
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.row}>
              <Icon name="cog-outline" size={20} color={isDark ? '#94A3B8' : '#1E293B'} />
              <Text style={styles.cardTitle}>Settings</Text>
            </View>
          </View>

          <SettingItem
            icon="bell-outline"
            title="Notifications"
            sub="Routine reminders & safety alerts"
            type="switch"
            value={isNotifications}
            onValueChange={setIsNotifications}
            isDark={isDark}
            styles={styles}
          />
          <SettingItem
            icon="brightness-6"
            title="Dark Mode"
            sub="Toggle theme appearance"
            type="switch"
            value={isDark}
            onValueChange={toggleTheme}
            isDark={isDark}
            styles={styles}
          />
          <SettingItem 
            icon="face-woman-shimmer-outline" 
            title="Skin Profile" 
            sub="Update your skin type & concerns" 
            isDark={isDark} 
            styles={styles} 
            onPress={() => navigation.navigate('SkinProfile' as never)}
          />
          <SettingItem 
            icon="bottle-tonic-plus" 
            title="My Product Shelf" 
            sub="Manage your scanned products" 
            isDark={isDark} 
            styles={styles} 
            onPress={() => navigation.navigate('ProductShelf' as never)}
          />
          <SettingItem icon="shield-lock-outline"        title="Privacy & Data"      sub="Manage your data & privacy"            isDark={isDark} styles={styles} />
          <SettingItem icon="help-circle-outline"        title="Help & Support"      sub="FAQ, contact, and feedback"            isDark={isDark} styles={styles} />

          <TouchableOpacity style={styles.signOutBtn} onPress={handleLogout}>
            <Icon name="logout" size={20} color="#EF4444" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub-components ---

const StatBox = ({ icon, color, value, label, styles }: any) => (
  <View style={styles.statBox}>
    <Icon name={icon} size={20} color={color} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const AchievementItem = ({ icon, label, color, active, styles }: any) => (
  <View style={[styles.achItem, active ? styles.achActive : styles.achInactive]}>
    <Icon name={icon} size={24} color={color} />
    <Text style={styles.achLabel}>{label}</Text>
  </View>
);

const SettingItem = ({ icon, title, sub, type, value, onValueChange, isDark, styles, onPress }: any) => (
  <TouchableOpacity 
    style={styles.settingItem} 
    activeOpacity={type === 'switch' ? 1 : 0.7}
    onPress={onPress}
  >
    <View style={styles.settingLeft}>
      <View style={styles.settingIconBg}>
        <Icon name={icon} size={20} color={isDark ? "#94A3B8" : "#64748B"} />
      </View>
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSub}>{sub}</Text>
      </View>
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#2D3748', true: '#FDA4AF' }}
          thumbColor={Platform.OS === 'ios' ? undefined : (value ? '#F43F5E' : '#F4F4F4')}
        />
      ) : (
        <Icon name="chevron-right" size={20} color="#CBD5E1" />
      )}
    </View>
  </TouchableOpacity>
);

const createDynamicStyles = (isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#000' : '#FFF9FA' },
  scrollContent: { paddingHorizontal: 16, paddingTop: 10 },

  profileHeaderCard: {
    backgroundColor: isDark ? '#111' : '#FFF',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 1,
    borderWidth: isDark ? 1 : 0,
    borderColor: '#333'
  },
  gradientTop: { height: 100 },
  profileInfoContainer: { padding: 20, marginTop: -50 },
  avatarWrapper: { marginBottom: 15 },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: '#FDA4AF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: isDark ? '#111' : '#FFF',
  },
  avatarInitial: { fontSize: 36, fontWeight: 'bold', color: '#FFF' },
  cameraBtn: {
    position: 'absolute',
    bottom: -5,
    right: -10,
    backgroundColor: isDark ? '#222' : '#FFF',
    padding: 8,
    borderRadius: 12,
    elevation: 3,
  },
  nameSection: { marginTop: 5 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontSize: 22, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  proBadge: {
    backgroundColor: isDark ? '#4A1D1D' : '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 10
  },
  proText: { fontSize: 10, color: '#F43F5E', fontWeight: 'bold' },
  userEmail: { fontSize: 14, color: isDark ? '#94A3B8' : '#64748B', marginTop: 4 },
  memberRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  memberText: { fontSize: 12, color: '#94A3B8', marginLeft: 5 },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: isDark ? '#333' : '#E2E8F0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  editBtnText: { fontSize: 14, color: isDark ? '#CBD5E1' : '#64748B', marginLeft: 8, fontWeight: '600' },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 10 },
  statBox: {
    width: (width - 45) / 2,
    backgroundColor: isDark ? '#111' : '#FFF',
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 1,
    borderWidth: isDark ? 1 : 0,
    borderColor: '#333'
  },
  statValue: { fontSize: 20, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginTop: 10 },
  statLabel: { fontSize: 10, color: '#94A3B8', fontWeight: 'bold', letterSpacing: 0.5, marginTop: 4 },

  card: {
    backgroundColor: isDark ? '#111' : '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    elevation: 1,
    borderWidth: isDark ? 1 : 0,
    borderColor: '#333'
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginLeft: 10 },
  lossBadge: { backgroundColor: isDark ? '#4A1D1D' : '#FEE2E2', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  lossText: { fontSize: 12, color: '#F43F5E', fontWeight: 'bold' },

  chartContainer: { alignItems: 'center' },
  mockChart: { width: '100%', height: 120 },
  chartLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 },
  chartLabelText: { fontSize: 10, color: '#94A3B8' },

  achievementGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  earnedText: { fontSize: 12, color: '#94A3B8' },
  achItem: {
    width: (width - 85) / 3,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  achActive: { backgroundColor: isDark ? '#4A1D1D' : '#FFF0F5' },
  achInactive: { backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC' },
  achLabel: { fontSize: 10, color: isDark ? '#94A3B8' : '#64748B', fontWeight: 'bold', marginTop: 8, textAlign: 'center' },

  settingItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: isDark ? '#1A1A1A' : '#F8FAFC' },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  settingIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: isDark ? '#222' : '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTitle: { fontSize: 15, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  settingSub: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: isDark ? '#2D1616' : '#FEF2F2',
    padding: 15,
    borderRadius: 16,
    justifyContent: 'center',
  },
  signOutText: { color: '#EF4444', fontWeight: 'bold', marginLeft: 10, fontSize: 16 },
});

export default BeautiCareProfileScreen;