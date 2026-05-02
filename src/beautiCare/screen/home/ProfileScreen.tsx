import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Circle, Defs, Path, Stop, LinearGradient as SvgGradient } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');

const BeautiCareProfileScreen = () => {
  const navigation = useNavigation();
  const { isDark, toggleTheme } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);
  const [isNotifications, setIsNotifications] = React.useState(true);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          // Tab screen's getParent() gives RootNavigator directly
          const rootNav = navigation.getParent();
          if (rootNav) {
            rootNav.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            );
          } else {
            // Fallback
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            );
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section with Image Background */}
        <ImageBackground 
          source={require('../../../../assets/product.webp')} 
          style={styles.headerBg}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <SafeAreaView>
              {/* Top Icons Removed as requested */}

              <View style={styles.profileRow}>
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>P</Text>
                  </View>
                  <TouchableOpacity style={styles.camBtn}>
                    <Icon name="camera" size={12} color="#FFF" />
                  </TouchableOpacity>
                </View>

                <View style={styles.userMeta}>
                  <View style={styles.nameRow}>
                    <Text style={styles.nameText}>Priya Sharma</Text>
                    <View style={styles.freeBadge}><Text style={styles.freeText}>GLOW</Text></View>
                  </View>
                  <View style={styles.infoLine}>
                    <Icon name="email-outline" size={14} color="#CBD5E1" />
                    <Text style={styles.infoText}>priya@example.com</Text>
                  </View>
                  <View style={styles.infoLine}>
                    <Icon name="calendar-month" size={14} color="#94A3B8" />
                    <Text style={styles.infoText}>Member since January 2024</Text>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>

        <View style={styles.contentBody}>
          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard icon="bottle-tonic-plus" val="48" label="PRODUCTS SCANNED" color="#F43F5E" styles={styles} isDark={isDark} />
            <StatCard icon="shield-check-outline" val="87%" label="AVG SAFETY SCORE" color="#10B981" styles={styles} isDark={isDark} />
            <StatCard icon="alert-octagon" val="5" label="FLAGGED ITEMS" color="#F59E0B" styles={styles} isDark={isDark} />
            <StatCard icon="barcode-scan" val="8" label="ACHIEVEMENTS" color="#60A5FA" styles={styles} isDark={isDark} />
          </View>

          {/* Skin Health Progress Chart */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.flexRow}>
                <Icon name="chart-line" size={20} color="#F43F5E" />
                <Text style={styles.cardTitle}>Skin Health Score</Text>
              </View>
              <View style={styles.weightBadge}>
                <Icon name="trending-up" size={14} color="#F43F5E" />
                <Text style={styles.weightBadgeText}>+12 pts</Text>
              </View>
            </View>

            <View style={styles.chartWrapper}>
              <View style={styles.yAxis}>
                {['100', '80', '60', '40', '20'].map(v => <Text key={v} style={styles.axisLabel}>{v}</Text>)}
              </View>
              <View style={styles.chartArea}>
                <View style={styles.chartDropdown}>
                  <Text style={styles.dropdownLabel}>8 Weeks</Text>
                  <Icon name="chevron-down" size={16} color={isDark ? "#FFF" : "#64748B"} />
                </View>
                <Svg height="100" width={width - 100}>
                  <Defs>
                    <SvgGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor="#F43F5E" stopOpacity="0.3" />
                      <Stop offset="1" stopColor="#F43F5E" stopOpacity="0" />
                    </SvgGradient>
                  </Defs>
                  <Path
                    d="M0 20 L40 35 L80 45 L120 55 L160 70 L200 80 L240 90 L280 100"
                    fill="none" stroke="#F43F5E" strokeWidth="2"
                  />
                  {[0, 40, 80, 120, 160, 200, 240, 280].map((x, i) => (
                    <Circle key={i} cx={x} cy={20 + i * 11} r="4" fill="#F43F5E" stroke={isDark ? "#000" : "#FFF"} strokeWidth="1" />
                  ))}
                </Svg>
                <View style={styles.xAxis}>
                  {['W1','W2','W3','W4','W5','W6','W7','W8'].map(w => <Text key={w} style={styles.axisLabel}>{w}</Text>)}
                </View>
              </View>
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.flexRow}>
                <Icon name="trophy-outline" size={20} color="#FACC15" />
                <Text style={styles.cardTitle}>Achievements</Text>
              </View>
              <Text style={styles.earnedCount}>3/6 Earned</Text>
            </View>
            <View style={styles.achievementsGrid}>
              <AchItem icon="shimmer" title="Glow Seeker" active color="#F43F5E" styles={styles} isDark={isDark} />
              <AchItem icon="shield-check" title="Safety First" active color="#10B981" styles={styles} isDark={isDark} />
              <AchItem icon="flask-outline" title="Ingredient Pro" active color="#FBBF24" styles={styles} isDark={isDark} />
              <AchItem icon="star-outline" title="30-Day Routine" locked styles={styles} isDark={isDark} />
              <AchItem icon="trophy-outline" title="100 Scans" locked styles={styles} isDark={isDark} />
              <AchItem icon="crown-outline" title="Glow Expert" locked styles={styles} isDark={isDark} />
            </View>
          </View>

          {/* Settings */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.flexRow}>
                <Icon name="cog-outline" size={20} color="#F43F5E" />
                <Text style={styles.cardTitle}>Settings</Text>
              </View>
            </View>
            <SettingRow icon="bell-outline" label="Notifications" sub="Routine reminders & safety alerts" type="switch" val={isNotifications} onVal={setIsNotifications} styles={styles} isDark={isDark} />
            {/* <SettingRow icon="moon-waning-crescent" label="Dark Mode" sub="Toggle theme appearance" type="switch" val={isDark} onVal={toggleTheme} styles={styles} isDark={isDark} /> */}
            <SettingRow icon="face-woman-shimmer-outline" label="Skin Profile" sub="Update your skin type & concerns" styles={styles} isDark={isDark} onPress={() => navigation.navigate('SkinProfile' as never)} />
            <SettingRow icon="bottle-tonic-plus" label="My Product Shelf" sub="Manage your scanned products" styles={styles} isDark={isDark} onPress={() => navigation.navigate('ProductShelf' as never)} />
            <SettingRow icon="shield-lock-outline" label="Privacy & Data" sub="Manage your data & privacy" styles={styles} isDark={isDark} />
            <SettingRow icon="help-circle-outline" label="Help & Support" sub="FAQ, contact, and feedback" styles={styles} isDark={isDark} />
            
            <TouchableOpacity style={styles.signOutRow} onPress={handleLogout}>
              <View style={styles.signOutIcon}><Icon name="logout" size={18} color="#EF4444" /></View>
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>

          {/* Nutrition Mode Banner */}
          <ImageBackground 
            source={require('../../../../assets/food_bg.jpg')} 
            style={styles.bannerBg} 
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerSub}>Switch to</Text>
              <Text style={styles.bannerTitle}>Nutrition Mode</Text>
              <Text style={styles.bannerDesc}>Get personalized meal tracking, macro insights, and nutrition plans tailored to your goals.</Text>
              <TouchableOpacity style={styles.bannerBtn} onPress={() => navigation.navigate('HealthAiMain' as never)}>
                <Text style={styles.bannerBtnText}>Switch Now  {'>'}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>

        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

// --- Reusable Components ---

const StatCard = ({ icon, val, label, color, styles, isDark }: any) => (
  <View style={styles.statBox}>
    <Icon name={icon} size={22} color={color} />
    <Text style={styles.statVal}>{val}</Text>
    <Text style={styles.statLabel}>{label}</Text>
    <View style={[styles.statLine, { backgroundColor: color }]} />
  </View>
);

const AchItem = ({ icon, title, active, locked, color, styles, isDark }: any) => (
  <View style={styles.achBox}>
    <View style={[styles.achCircle, locked && styles.lockedCircle]}>
      <Icon name={icon} size={26} color={active ? color : (isDark ? '#475569' : '#94A3B8')} />
      {active && <View style={styles.checkBadge}><Icon name="check" size={10} color="#000" /></View>}
      {locked && <Icon name="lock" size={12} color={isDark ? '#94A3B8' : '#CBD5E1'} style={styles.lockIcon} />}
    </View>
    <Text style={[styles.achTitle, locked && { color: isDark ? '#64748B' : '#94A3B8' }]}>{title}</Text>
  </View>
);

const SettingRow = ({ icon, label, sub, type, val, onVal, styles, isDark, onPress }: any) => (
  <TouchableOpacity style={styles.settingRow} onPress={onPress}>
    <View style={styles.flexRow}>
      <Icon name={icon} size={22} color={isDark ? '#94A3B8' : '#64748B'} />
      <View style={{ marginLeft: 16, flex: 1 }}>
        <Text style={styles.settingLabelText}>{label}</Text>
        <Text style={styles.settingSubText}>{sub}</Text>
      </View>
      {type === 'switch' ? (
        <Switch value={val} onValueChange={onVal} trackColor={{ false: isDark ? '#333' : '#E2E8F0', true: '#FDA4AF' }} thumbColor="#FFF" />
      ) : (
        <Icon name="chevron-right" size={20} color={isDark ? '#475569' : '#CBD5E1'} />
      )}
    </View>
  </TouchableOpacity>
);

const createDynamicStyles = (isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#090909' : '#F8FAFC' },
  scrollContent: { paddingBottom: 20 },
  headerBg: { height: 260, width: '100%' },
  overlay: { flex: 1, backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)', paddingHorizontal: 16, justifyContent: 'flex-end', paddingBottom: 35 },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: isDark ? 'rgba(244, 63, 94, 0.5)' : 'rgba(253, 164, 175, 0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FDA4AF' },
  avatarText: { fontSize: 30, color: '#FFF', fontFamily: 'serif' },
  camBtn: { position: 'absolute', bottom: 5, right: 0, backgroundColor: '#000', padding: 4, borderRadius: 10, borderWidth: 1, borderColor: '#333' },
  userMeta: { marginLeft: 16, flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  nameText: { fontSize: 18, color: '#FFF', fontFamily: 'serif' },
  freeBadge: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginLeft: 10 },
  freeText: { fontSize: 10, color: '#FDA4AF', fontFamily: 'serif' },
  infoLine: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  infoText: { fontSize: 13, color: '#CBD5E1', marginLeft: 8, fontFamily: 'serif' },
  contentBody: { paddingHorizontal: 16, marginTop: -20 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  statBox: { 
    width: (width - 45) / 2, 
    backgroundColor: isDark ? '#161616' : '#FFF', 
    padding: 16, 
    borderRadius: 20, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: isDark ? '#262626' : '#F1F5F9', 
    elevation: isDark ? 0 : 2,
    marginBottom: 12
  },
  statVal: { fontSize: 20, color: isDark ? '#FFF' : '#1E293B', marginTop: 8, fontFamily: 'serif' },
  statLabel: { fontSize: 7, color: isDark ? '#94A3B8' : '#64748B', textAlign: 'center', marginTop: 4, fontFamily: 'serif' },
  statLine: { height: 2, width: '70%', borderRadius: 1, marginTop: 8 },
  card: { backgroundColor: isDark ? '#161616' : '#FFF', borderRadius: 20, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: isDark ? '#262626' : '#F1F5F9', elevation: isDark ? 0 : 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontSize: 16, color: isDark ? '#FFF' : '#1E293B', marginLeft: 10, fontFamily: 'serif' },
  weightBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? 'rgba(244, 63, 94, 0.1)' : '#FFF1F2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  weightBadgeText: { color: '#F43F5E', fontSize: 12, marginLeft: 4, fontFamily: 'serif' },
  chartWrapper: { flexDirection: 'row', height: 140 },
  yAxis: { justifyContent: 'space-between', paddingBottom: 25 },
  axisLabel: { color: isDark ? '#475569' : '#94A3B8', fontSize: 10, fontFamily: 'serif' },
  chartArea: { flex: 1, marginLeft: 10, justifyContent: 'flex-end' },
  xAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  chartDropdown: { position: 'absolute', top: -30, right: 0, backgroundColor: isDark ? '#262626' : '#F8FAFC', padding: 6, borderRadius: 8, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: isDark ? '#333' : '#E2E8F0' },
  dropdownLabel: { color: isDark ? '#FFF' : '#64748B', fontSize: 11, marginRight: 4, fontFamily: 'serif' },
  achievementsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  earnedCount: { color: '#94A3B8', fontSize: 12, fontFamily: 'serif' },
  achBox: { width: '31%', alignItems: 'center', marginBottom: 20 },
  achCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FDA4AF' },
  lockedCircle: { borderColor: isDark ? '#334155' : '#E2E8F0' },
  checkBadge: { position: 'absolute', top: -2, right: -2, backgroundColor: '#FDA4AF', borderRadius: 10, padding: 2 },
  lockIcon: { position: 'absolute', top: 5, right: 5 },
  achTitle: { color: isDark ? '#FFF' : '#1E293B', fontSize: 10, marginTop: 8, textAlign: 'center', fontFamily: 'serif' },
  settingRow: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: isDark ? '#262626' : '#F1F5F9' },
  settingLabelText: { fontSize: 15, color: isDark ? '#FFF' : '#1E293B', fontFamily: 'serif' },
  settingSubText: { fontSize: 12, color: isDark ? '#64748B' : '#94A3B8', marginTop: 2, fontFamily: 'serif' },
  signOutRow: { flexDirection: 'row', alignItems: 'center', marginTop: 15, paddingVertical: 10, borderTopWidth: 1, borderTopColor: isDark ? '#262626' : '#F1F5F9' },
  signOutIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: isDark ? '#2D1616' : '#FEF2F2', justifyContent: 'center', alignItems: 'center' },
  signOutText: { color: '#EF4444', marginLeft: 15, fontSize: 14, fontFamily: 'serif' },
  bannerBg: { marginTop: 10, overflow: 'hidden' },
  bannerOverlay: { backgroundColor: isDark ? 'rgba(21, 128, 61, 0.7)' : 'rgba(34, 197, 94, 0.8)', padding: 20, borderRadius: 20 },
  bannerSub: { color: '#FFF', fontSize: 14, fontFamily: 'serif' },
  bannerTitle: { color: '#FFF', fontSize: 22, marginVertical: 4, fontFamily: 'serif' },
  bannerDesc: { color: '#E2E8F0', fontSize: 12, lineHeight: 18, marginBottom: 15, maxWidth: '80%', fontFamily: 'serif' },
  bannerBtn: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, alignSelf: 'flex-start' },
  bannerBtnText: { color: '#000', fontSize: 12, fontFamily: 'serif' },
});

export default BeautiCareProfileScreen;