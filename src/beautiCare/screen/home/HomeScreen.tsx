
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');

const BeautyDashboard = () => {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#000' : '#FFF9FA'} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.mainTitle}>Hi, Priya ✨</Text>
          <Text style={styles.subTitle}>Track your daily skincare routine and progress</Text>
        </View>
        <TouchableOpacity
          style={styles.logMealBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Scan')}
        >
          <Icon name="plus" size={20} color="#FFF" />
          <Text style={styles.logMealText}>Scan Product</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Main Routine Compliance Ring Card */}
        <View style={styles.calorieCard}>
          <View style={styles.circularContainer}>
            <Svg width={180} height={180}>
              <Circle cx="90" cy="90" r="75" stroke={isDark ? '#27272A' : '#F1F5F9'} strokeWidth="12" fill="none" />
              <Circle
                cx="90" cy="90" r="75" stroke="#F43F5E" strokeWidth="12"
                fill="none" strokeDasharray="471" strokeDashoffset="71"
                strokeLinecap="round" transform="rotate(-90 90 90)"
              />
            </Svg>
            <View style={styles.calorieInner}>
              <Icon name="shimmer" size={24} color="#F43F5E" />
              <Text style={styles.calNumber}>85%</Text>
              <Text style={styles.calTotal}>Consistency</Text>
            </View>
          </View>
          <Text style={styles.remText}>6 of 7 steps completed</Text>
          <Text style={styles.onTrackText}>Your skin is loving your routine! 🌸</Text>
        </View>

        {/* Skin Metric Cards */}
        <MetricCard label="HYDRATION" value="68" target="80%" progress={0.85} color="#0EA5E9" icon="water-percent" percent="85%" styles={styles} isDark={isDark} />
        <MetricCard label="pH BALANCE" value="5.5" target="Ideal: 4.5–5.5" progress={0.9} color="#10B981" icon="flask-outline" percent="90%" styles={styles} isDark={isDark} />
        <MetricCard label="OILINESS" value="Normal" target="Controlled level" progress={0.7} color="#F59E0B" icon="face-woman-shimmer" percent="70%" styles={styles} isDark={isDark} />

        {/* Ingredients Tracker */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionHeader}>Ingredient Tracker</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all {'>'}</Text></TouchableOpacity>
        </View>

        <View style={styles.microGrid}>
          <MicroGridItem label="Niacinamide"     val="10% / 10%"  color="#F43F5E" progress={1.0}  styles={styles} />
          <MicroGridItem label="Hyaluronic Acid" val="2% / 2%"    color="#0EA5E9" progress={1.0}  styles={styles} />
          <MicroGridItem label="Vitamin C"       val="15% / 20%"  color="#F59E0B" progress={0.75} styles={styles} />
          <MicroGridItem label="Retinol"         val="0.025% / 0.05%" color="#A855F7" progress={0.5}  styles={styles} />
        </View>

        {/* Weekly Routine Overview */}
        <View style={styles.weeklyCard}>
          <Text style={styles.sectionHeader}>Weekly Routine Overview</Text>

          <View style={styles.chartContainer}>
            <View style={styles.yAxisLabels}>
              <Text style={styles.axisText}>Full</Text>
              <Text style={styles.axisText}>Half</Text>
              <Text style={styles.axisText}>0</Text>
            </View>

            <View style={styles.chartBars}>
              <WeeklyBar day="Mon" height={90}  color="#F43F5E" styles={styles} />
              <WeeklyBar day="Tue" height={100} color="#F43F5E" styles={styles} />
              <WeeklyBar day="Wed" height={60}  color="#F59E0B" styles={styles} />
              <WeeklyBar day="Thu" height={100} color="#F43F5E" styles={styles} />
              <WeeklyBar day="Fri" height={80}  color="#F43F5E" styles={styles} />
              <WeeklyBar day="Sat" height={50}  color="#F59E0B" styles={styles} />
              <WeeklyBar day="Sun" height={70}  color="#F43F5E" styles={styles} />
            </View>
          </View>
        </View>

        {/* Recent Products Section */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionHeader}>Recently Scanned</Text>
          <TouchableOpacity><Text style={styles.seeAll}>View all {'>'}</Text></TouchableOpacity>
        </View>

        <View style={styles.recentMealsCard}>
          <ProductItem name="Glow Vit-C Serum"    time="9:00 AM"  score="92%" icon="bottle-tonic-plus"   styles={styles} />
          <ProductItem name="Gentle Foam Cleanser" time="8:30 AM"  score="88%" icon="water-outline"        styles={styles} />
          <ProductItem name="SPF 50+ Sunscreen"    time="8:00 AM"  score="95%" icon="white-balance-sunny"  styles={styles} />
          <ProductItem name="Matte Foundation"     time="Yesterday" score="45%" icon="brush-outline"        isLast styles={styles} />
        </View>

        {/* Bottom Stats Grid */}
        <View style={styles.bottomStatsGrid}>
          <StatBox label="AVG SAFETY SCORE" value="87%"    sub="+5%"      subColor="#10B981" icon="shield-check-outline"    styles={styles} />
          <StatBox label="PRODUCTS SCANNED" value="48"     sub="This month" subColor="#64748B" icon="barcode-scan"           styles={styles} />
          <StatBox label="BEST STREAK"      value="14 days" sub="Current"   subColor="#F43F5E" icon="fire"                   styles={styles} />
          <StatBox label="FLAGGED ITEMS"    value="5"      sub="Review"    subColor="#F59E0B" icon="alert-octagon-outline"   styles={styles} />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub-components ---

const MetricCard = ({ label, value, target, progress, color, icon, percent, styles }: any) => (
  <View style={styles.macroCard}>
    <View style={styles.macroHeader}>
      <View style={[styles.macroIconBg, { backgroundColor: `${color}20` }]}>
        <Icon name={icon} size={18} color={color} />
      </View>
      <View style={styles.percentBadge}><Text style={[styles.percentText, { color }]}>{percent}</Text></View>
    </View>
    <Text style={styles.macroLabel}>{label}</Text>
    <Text style={styles.macroValueText}>{value} <Text style={styles.targetText}>— {target}</Text></Text>
    <View style={styles.barBg}><View style={[styles.barFill, { width: `${progress * 100}%`, backgroundColor: color }]} /></View>
  </View>
);

const MicroGridItem = ({ label, val, color, progress, styles }: any) => (
  <View style={styles.microBox}>
    <View style={styles.microHead}><Text style={styles.microLabel}>{label}</Text><Text style={styles.microPerc}>{Math.round(progress * 100)}%</Text></View>
    <Text style={styles.microVal}>{val}</Text>
    <View style={styles.microBarBg}><View style={[styles.microBarFill, { width: `${progress * 100}%`, backgroundColor: color }]} /></View>
  </View>
);

const ProductItem = ({ name, time, score, icon, isLast, styles }: any) => {
  const scoreNum = parseInt(score, 10);
  const scoreColor = scoreNum >= 80 ? '#10B981' : scoreNum >= 60 ? '#F59E0B' : '#EF4444';
  return (
    <View style={[styles.mealItem, isLast && { borderBottomWidth: 0 }]}>
      <View style={styles.mealIconCircle}>
        <Icon name={icon} size={22} color="#64748B" />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.mealName}>{name}</Text>
        <View style={styles.mealTimeRow}>
          <Icon name="clock-outline" size={12} color="#94A3B8" />
          <Text style={styles.mealTimeText}>{time}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={[styles.mealCal, { color: scoreColor }]}>{score}</Text>
        <Text style={styles.mealCalLabel}>safety</Text>
      </View>
      <Icon name="chevron-right" size={18} color="#CBD5E1" style={{ marginLeft: 8 }} />
    </View>
  );
};

const StatBox = ({ label, value, sub, subColor, icon, styles }: any) => (
  <View style={styles.statBox}>
    <View style={styles.statBoxHeader}>
      <Icon name={icon} size={18} color="#94A3B8" />
      <View style={[styles.statBadge, { backgroundColor: `${subColor}15` }]}>
        <Text style={[styles.statBadgeText, { color: subColor }]}>{sub}</Text>
      </View>
    </View>
    <Text style={styles.statBoxVal}>{value}</Text>
    <Text style={styles.statBoxLabel}>{label}</Text>
  </View>
);

const WeeklyBar = ({ day, height, color, styles }: any) => (
  <View style={styles.barContainer}>
    <View style={styles.barTrack}>
      <View style={[styles.barFillGraph, { height: `${height}%`, backgroundColor: color }]} />
    </View>
    <Text style={styles.barDayText}>{day}</Text>
  </View>
);

const createDynamicStyles = (isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#000' : '#FFF9FA' },
  header: { padding: 20 },
  mainTitle: { fontSize: 28, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  subTitle: { fontSize: 14, color: isDark ? '#94A3B8' : '#64748B', marginTop: 5, marginBottom: 15 },
  logMealBtn: { backgroundColor: '#F43F5E', flexDirection: 'row', alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, alignItems: 'center', elevation: 2 },
  logMealText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 30 },

  calorieCard: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 24, padding: 25, alignItems: 'center', elevation: 2, marginBottom: 20, borderWidth: isDark ? 1 : 0, borderColor: '#333' },
  circularContainer: { justifyContent: 'center', alignItems: 'center' },
  calorieInner: { position: 'absolute', alignItems: 'center' },
  calNumber: { fontSize: 32, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  calTotal: { fontSize: 14, color: isDark ? '#94A3B8' : '#64748B' },
  remText: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginTop: 15 },
  onTrackText: { fontSize: 13, color: isDark ? '#94A3B8' : '#64748B', marginTop: 5 },

  macroCard: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 20, padding: 18, marginBottom: 15, elevation: 1, borderWidth: isDark ? 1 : 0, borderColor: '#333' },
  macroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  macroIconBg: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  percentBadge: { backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  percentText: { fontSize: 12, fontWeight: 'bold' },
  macroLabel: { fontSize: 12, color: isDark ? '#94A3B8' : '#64748B', fontWeight: '600', marginTop: 12 },
  macroValueText: { fontSize: 20, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginTop: 4 },
  targetText: { fontSize: 14, color: '#94A3B8' },
  barBg: { height: 8, backgroundColor: isDark ? '#27272A' : '#F1F5F9', borderRadius: 4, marginTop: 12, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },

  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 15 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  seeAll: { color: isDark ? '#94A3B8' : '#64748B', fontSize: 13 },

  microGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  microBox: { width: (width - 55) / 2, backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 16, padding: 15, marginBottom: 15, borderWidth: isDark ? 1 : 0, borderColor: '#333' },
  microHead: { flexDirection: 'row', justifyContent: 'space-between' },
  microLabel: { fontSize: 13, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  microPerc: { fontSize: 11, color: '#94A3B8' },
  microVal: { fontSize: 12, color: isDark ? '#94A3B8' : '#64748B', marginTop: 8 },
  microBarBg: { height: 4, backgroundColor: isDark ? '#27272A' : '#F1F5F9', borderRadius: 2, marginTop: 10 },
  microBarFill: { height: '100%', borderRadius: 2 },

  weeklyCard: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 20, padding: 20, marginTop: 10, marginBottom: 10, borderWidth: isDark ? 1 : 0, borderColor: '#333' },
  chartContainer: { flexDirection: 'row', height: 170, marginTop: 20 },
  yAxisLabels: { justifyContent: 'space-between', paddingVertical: 20, paddingRight: 10, borderRightWidth: 1, borderRightColor: isDark ? '#27272A' : '#E2E8F0', height: 140 },
  axisText: { fontSize: 10, color: '#94A3B8', fontWeight: 'bold' },
  chartBars: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginLeft: 15, paddingBottom: 20, height: 160 },
  barContainer: { alignItems: 'center', height: '100%', justifyContent: 'flex-end' },
  barTrack: { width: 14, height: 120, backgroundColor: isDark ? '#27272A' : '#F1F5F9', borderRadius: 7, overflow: 'hidden', justifyContent: 'flex-end' },
  barFillGraph: { width: '100%', borderRadius: 7 },
  barDayText: { fontSize: 10, color: isDark ? '#94A3B8' : '#64748B', marginTop: 10, fontWeight: 'bold' },

  recentMealsCard: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 24, paddingHorizontal: 16, paddingVertical: 8, elevation: 1, borderWidth: isDark ? 1 : 0, borderColor: '#333' },
  mealItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: isDark ? '#1A1A1A' : '#F1F5F9' },
  mealIconCircle: { width: 44, height: 44, borderRadius: 12, backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC', justifyContent: 'center', alignItems: 'center' },
  mealName: { fontSize: 15, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  mealTimeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  mealTimeText: { fontSize: 12, color: '#94A3B8', marginLeft: 4 },
  mealCal: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  mealCalLabel: { fontSize: 10, color: '#94A3B8', textAlign: 'right' },

  bottomStatsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
  statBox: { width: (width - 55) / 2, backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 20, padding: 16, marginBottom: 15, elevation: 1, borderWidth: isDark ? 1 : 0, borderColor: '#333' },
  statBoxHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  statBadgeText: { fontSize: 10, fontWeight: 'bold' },
  statBoxVal: { fontSize: 18, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  statBoxLabel: { fontSize: 10, color: isDark ? '#94A3B8' : '#64748B', fontWeight: 'bold', marginTop: 4, letterSpacing: 0.5 },
});

export default BeautyDashboard;