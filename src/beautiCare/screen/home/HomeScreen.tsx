import { launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, G, Path, Rect, Stop, LinearGradient as SvgGradient, Text as SvgText } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');

interface BeautyScan {
  id: string;
  productName: string;
  result: string;
  safetyScore: number;
  scanType: string;
  createdAt: string;
}

const BeautyDashboard = () => {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);

  const handleScanProduct = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: false,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert('Camera Error', result.errorMessage || 'Could not open camera');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        if (uri) {
          // Navigate to Scanner screen with the captured image URI
          navigation.navigate('Scanner', { initialImageUri: uri });
        }
      }
    } catch (error) {
      console.error('Camera Launch Error:', error);
      Alert.alert('Error', 'An unexpected error occurred while opening the camera.');
    }
  };

  const latestMetrics = { hydration: 68, phLevel: 5.5, oiliness: 50 };
  const recentScans: BeautyScan[] = [
    { id: '1', productName: 'Glow Serum', result: 'Safe', safetyScore: 92, scanType: 'PRODUCT', createdAt: new Date().toISOString() },
    { id: '2', productName: 'Face Wash', result: 'Mild Irritant', safetyScore: 65, scanType: 'PRODUCT', createdAt: new Date().toISOString() },
  ];
  
  const completedSteps = 4;
  const totalSteps = 7;
  const consistency = Math.round((completedSteps / totalSteps) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#000' : '#FFF9FA'} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.mainTitle}>Hi there! ✨</Text>
          <Text style={styles.subTitle}>Track your daily skincare routine and progress</Text>
        </View>
        <TouchableOpacity
          style={styles.logMealBtn}
          activeOpacity={0.8}
          onPress={handleScanProduct}
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
                fill="none" strokeDasharray="471" strokeDashoffset={471 - (471 * (consistency / 100))}
                strokeLinecap="round" transform="rotate(-90 90 90)"
              />
            </Svg>
            <View style={styles.calorieInner}>
              <Icon name="shimmer" size={24} color="#F43F5E" />
              <Text style={styles.calNumber}>{consistency}%</Text>
              <Text style={styles.calTotal}>Consistency</Text>
            </View>
          </View>
          <Text style={styles.remText}>{completedSteps} of {totalSteps} steps completed</Text>
          <Text style={styles.onTrackText}>
            {consistency > 80 ? 'Your skin is loving your routine! 🌸' : 'Keep going, your skin will thank you! ✨'}
          </Text>
        </View>

        {/* Skin Metric Cards */}
        <MetricCard label="HYDRATION" value={latestMetrics.hydration} target="80%" progress={latestMetrics.hydration / 100} color="#0EA5E9" icon="water-percent" percent={`${latestMetrics.hydration}%`} styles={styles} isDark={isDark} />
        <MetricCard label="pH BALANCE" value={latestMetrics.phLevel} target="Ideal: 4.5–5.5" progress={latestMetrics.phLevel / 7} color="#10B981" icon="flask-outline" percent={`${Math.round((latestMetrics.phLevel / 5.5) * 100)}%`} styles={styles} isDark={isDark} />
        <MetricCard label="OILINESS" value={latestMetrics.oiliness > 70 ? 'Oily' : latestMetrics.oiliness > 30 ? 'Normal' : 'Dry'} target="Controlled level" progress={latestMetrics.oiliness / 100} color="#F59E0B" icon="face-woman-shimmer" percent={`${latestMetrics.oiliness}%`} styles={styles} isDark={isDark} />

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

        {/* PERFORMANCE ANALYTICS SECTION WITH GOAL TRACKING - WEEKLY */}
        <View style={styles.weeklyCard}>
          <View style={styles.chartHeaderRow}>
            <View style={styles.rowAlign}>
              <Icon name="chart-line" size={22} color="#F43F5E" />
              <View style={{marginLeft: 10}}>
                <Text style={styles.sectionHeader}>Skin Health Analytics</Text>
                <Text style={styles.chartSubtitle}>WEEKLY SKIN SCORE VS TARGET</Text>
              </View>
            </View>
          </View>

          {/* Legend Row WITH CURRENT WEEK ONLY */}
          <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.dot, {backgroundColor: '#F43F5E'}]} />
                <Text style={styles.legendText}>Skin Score</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.dot, {backgroundColor: '#E2E8F0'}]} />
                <Text style={styles.legendText}>Target (90)</Text>
              </View>
          </View>

          <View style={styles.chartWrapper}>
            <LineChartSVG 
               data={[82, 85, 78, 92, 88, 95, 90]}
               labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
               height={220}
               width={width - 40}
               isDark={isDark}
               styles={styles}
               color="#F43F5E"
            />
          </View>
        </View>

        {/* Recent Products Section */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionHeader}>Recently Scanned</Text>
          <TouchableOpacity><Text style={styles.seeAll}>View all {'>'}</Text></TouchableOpacity>
        </View>

        <View style={styles.recentMealsCard}>
          {recentScans.length > 0 ? (
            recentScans.map((scan: BeautyScan, idx: number) => (
              <ProductItem key={scan.id} name={scan.productName} time={new Date(scan.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} score={`${scan.safetyScore}%`} icon={scan.scanType === 'PRODUCT' ? "bottle-tonic-plus" : "face-man-shimmer"} isLast={idx === recentScans.length - 1} styles={styles} />
            ))
          ) : (
            <Text style={{ padding: 20, textAlign: 'center', color: '#94A3B8' }}>No recent scans</Text>
          )}
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

const LineChartSVG = ({ data, labels, width, height, isDark, styles, color }: any) => {
  const [selectedIndex, setSelectedIndex] = React.useState(5);
  const max = 100;
  const min = 0;
  const range = max - min;
  const paddingLeft = 40; 
  const paddingBottom = 30;
  const paddingTop = 20;
  const paddingRight = 20;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = data.map((val: number, i: number) => ({
    x: paddingLeft + (i * chartWidth / (data.length - 1)),
    y: paddingTop + chartHeight - ((val - min) / range * chartHeight),
    val
  }));

  let pathData = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    pathData += ` L ${points[i].x} ${points[i].y}`;
  }

  const fillPath = `${pathData} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;

  const selectedPoint = points[selectedIndex];

  return (
    <View style={{ width, height, position: 'relative' }}>
      <Svg width={width} height={height}>
        <Defs>
          <SvgGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.2" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </SvgGradient>
        </Defs>
        
        {[0, 50, 80, 100].map((val: number) => {
          const y = paddingTop + chartHeight - ((val - min) / range * chartHeight);
          return (
            <G key={val}>
              <Path d={`M ${paddingLeft} ${y} L ${width - paddingRight} ${y}`} stroke={isDark ? "#222" : "#F1F5F9"} strokeWidth="1" />
              <SvgText x={paddingLeft - 10} y={y + 4} fill="#94A3B8" fontSize="10" fontWeight="bold" textAnchor="end">{val}</SvgText>
            </G>
          );
        })}

        <Path d={fillPath} fill="url(#grad)" />
        <Path d={pathData} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
        
        {points.map((p: any, i: number) => (
          <G key={i}>
            <Circle cx={p.x} cy={p.y} r={i === selectedIndex ? "7" : "5"} fill={i === selectedIndex ? color : "#FFF"} stroke={color} strokeWidth="2" />
            <Rect x={p.x - 20} y={0} width={40} height={height} fill="transparent" onPress={() => setSelectedIndex(i)} />
          </G>
        ))}
      </Svg>

      {selectedPoint && (
        <View style={[styles.tooltipContainer, { left: selectedPoint.x - 45, top: selectedPoint.y - 85, position: 'absolute', zIndex: 10 }]}>
           <Text style={styles.tooltipDay}>{labels[selectedIndex].toUpperCase()}</Text>
           <Text style={styles.tooltipCal}>{selectedPoint.val} <Text style={{fontSize: 10}}>SCORE</Text></Text>
           <View style={[styles.tooltipGoalBox, { backgroundColor: isDark ? '#111' : '#FFF1F2' }]}>
              <Icon name={selectedPoint.val >= 90 ? "star" : "shimmer"} size={12} color="#F43F5E" />
              <Text style={[styles.tooltipGoalText, { color: '#F43F5E' }]}>Target: 90</Text>
           </View>
        </View>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: paddingLeft, paddingRight: paddingRight, marginTop: 5 }}>
        {labels.map((l: string, i: number) => (
          <TouchableOpacity key={i} onPress={() => setSelectedIndex(i)} style={{ width: chartWidth / 7, alignItems: 'center' }}>
            <Text style={{ fontSize: 10, color: i === selectedIndex ? color : '#94A3B8', fontWeight: 'bold' }}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

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

  weeklyCard: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 24, padding: 20, marginTop: 10, marginBottom: 20, elevation: 2, borderWidth: isDark ? 1 : 0, borderColor: '#333' },
  chartHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowAlign: { flexDirection: 'row', alignItems: 'center' },
  chartSubtitle: { fontSize: 10, color: '#94A3B8', fontWeight: 'bold', letterSpacing: 1, marginTop: 2 },
  legendRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginLeft: 15 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { fontSize: 12, color: '#94A3B8', fontWeight: '500' },
  chartWrapper: { position: 'relative', marginTop: 20, alignItems: 'center' },
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: isDark ? '#1F2937' : '#FFF',
    padding: 10,
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: isDark ? '#374151' : '#F1F5F9',
    width: 90,
  },
  tooltipDay: { fontSize: 10, fontWeight: 'bold', color: '#F43F5E' },
  tooltipCal: { fontSize: 16, fontWeight: '800', color: isDark ? '#FFF' : '#1E293B', marginVertical: 2 },
  tooltipGoalBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? '#111' : '#FFF1F2', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  tooltipGoalText: { fontSize: 9, color: '#F43F5E', fontWeight: 'bold', marginLeft: 4 },

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