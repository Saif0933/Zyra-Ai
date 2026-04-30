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
import Svg, { Circle, Defs, G, Path, Rect, Stop, LinearGradient as SvgGradient, Text as SvgText } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');

const NutritionDashboard = () => {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#000' : '#F4F9FF'} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.mainTitle}>Hi, John Doe 👋</Text>
          <Text style={styles.subTitle}>Track your daily nutrition goals and progress</Text>
        </View>
        <TouchableOpacity 
          style={styles.logMealBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Scan')}
        >
          <Icon name="plus" size={20} color="#FFF" />
          <Text style={styles.logMealText}>Log Meal</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Main Calorie Card */}
        <View style={styles.calorieCard}>
          <View style={styles.circularContainer}>
            <Svg width={180} height={180}>
              <Circle cx="90" cy="90" r="75" stroke={isDark ? '#27272A' : '#F1F5F9'} strokeWidth="12" fill="none" />
              <Circle
                cx="90" cy="90" r="75" stroke="#FBBF24" strokeWidth="12"
                fill="none" strokeDasharray="471" strokeDashoffset="120"
                strokeLinecap="round" transform="rotate(-90 90 90)"
              />
            </Svg>
            <View style={styles.calorieInner}>
              <Icon name="fire" size={24} color="#10B981" />
              <Text style={styles.calNumber}>1850</Text>
              <Text style={styles.calTotal}>/ 2200 kcal</Text>
            </View>
          </View>
          <Text style={styles.remText}>350 kcal remaining</Text>
          <Text style={styles.onTrackText}>You're on track for today! 👍</Text>
        </View>

        {/* Macros Section */}
        <MacroCard label="PROTEIN" value="125" target="160g" progress={0.78} color="#10B981" icon="leaf" percent="78%" styles={styles} isDark={isDark} />
        <MacroCard label="CARBS" value="180" target="250g" progress={0.72} color="#F97316" icon="corn" percent="72%" styles={styles} isDark={isDark} />
        <MacroCard label="FATS" value="55" target="70g" progress={0.79} color="#0EA5E9" icon="water" percent="79%" styles={styles} isDark={isDark} />

        {/* Micronutrients */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionHeader}>Micronutrients</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all {'>'}</Text></TouchableOpacity>
        </View>

        <View style={styles.microGrid}>
          <MicroGridItem label="Fiber" val="18g / 25g" color="#F97316" progress={0.72} styles={styles} />
          <MicroGridItem label="Vitamin C" val="75mg / 90mg" color="#FBBF24" progress={0.83} styles={styles} />
          <MicroGridItem label="Iron" val="14mg / 18mg" color="#EC4899" progress={0.78} styles={styles} />
          <MicroGridItem label="Calcium" val="800mg / 1000mg" color="#6366F1" progress={0.80} styles={styles} />
        </View>

        {/* PERFORMANCE ANALYTICS SECTION */}
        <View style={styles.weeklyCard}>
          <View style={styles.chartHeaderRow}>
            <View style={styles.rowAlign}>
              <Icon name="chart-line" size={22} color="#10B981" />
              <View style={{marginLeft: 10}}>
                <Text style={styles.sectionHeader}>Performance Analytics</Text>
                <Text style={styles.chartSubtitle}>WEEKLY CALORIE INTAKE VS GOAL</Text>
              </View>
            </View>
          </View>

          {/* Legend Row */}
          <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.dot, {backgroundColor: '#10B981'}]} />
                <Text style={styles.legendText}>Actual</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.dot, {backgroundColor: '#E2E8F0'}]} />
                <Text style={styles.legendText}>Target</Text>
              </View>
          </View>

          <View style={styles.chartWrapper}>
            <LineChartSVG 
               data={[2100, 1950, 2100, 1850, 1800, 2400, 1850]}
               labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
               height={220}
               width={width - 40}
               isDark={isDark}
               styles={styles}
            />
          </View>
        </View>

        {/* RECENT MEALS SECTION */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionHeader}>Recent Meals</Text>
          <TouchableOpacity><Text style={styles.seeAll}>View all {'>'}</Text></TouchableOpacity>
        </View>

        <View style={styles.recentMealsCard}>
          <MealItem name="Grilled Chicken Salad" time="12:30 PM" cal="420" icon="bowl-mix" styles={styles} />
          <MealItem name="Protein Smoothie" time="10:00 AM" cal="280" icon="cup-water" styles={styles} />
          <MealItem name="Oatmeal & Berries" time="8:00 AM" cal="350" icon="bowl-mix-outline" styles={styles} />
          <MealItem name="Greek Yogurt" time="7:00 AM" cal="150" icon="cup" isLast styles={styles} />
        </View>

        {/* BOTTOM STATS GRID */}
        <View style={styles.bottomStatsGrid}>
          <StatBox label="AVG DAILY PROTEIN" value="138g" sub="+12%" subColor="#10B981" icon="chart-line-variant" styles={styles} />
          <StatBox label="MEALS LOGGED" value="28" sub="This week" subColor="#64748B" icon="calendar-check" styles={styles} />
          <StatBox label="BEST STREAK" value="14 days" sub="Current" subColor="#10B981" icon="fire" styles={styles} />
          <StatBox label="CALORIE DEFICIT" value="-350" sub="Healthy" subColor="#F97316" icon="trending-down" styles={styles} />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub-components ---

const LineChartSVG = ({ data, labels, width, height, isDark, styles }: any) => {
  const [selectedIndex, setSelectedIndex] = React.useState(5);
  const max = 2500;
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
            <Stop offset="0" stopColor="#10B981" stopOpacity="0.2" />
            <Stop offset="1" stopColor="#10B981" stopOpacity="0" />
          </SvgGradient>
        </Defs>
        
        {/* Horizontal grid lines and Y-axis labels */}
        {[0, 1000, 2000, 2500].map((val: number) => {
          const y = paddingTop + chartHeight - ((val - min) / range * chartHeight);
          return (
            <G key={val}>
              <Path 
                d={`M ${paddingLeft} ${y} L ${width - paddingRight} ${y}`} 
                stroke={isDark ? "#222" : "#F1F5F9"} 
                strokeWidth="1" 
              />
              <SvgText
                x={paddingLeft - 10}
                y={y + 4}
                fill="#94A3B8"
                fontSize="10"
                fontWeight="bold"
                textAnchor="end"
              >
                {val >= 1000 ? `${val/1000}k` : val}
              </SvgText>
            </G>
          );
        })}

        <Path d={fillPath} fill="url(#grad)" />
        <Path d={pathData} stroke="#10B981" strokeWidth="3" fill="none" strokeLinecap="round" />
        
        {points.map((p: any, i: number) => (
          <G key={i}>
            <Circle 
              cx={p.x} 
              cy={p.y} 
              r={i === selectedIndex ? "7" : "5"} 
              fill={i === selectedIndex ? "#10B981" : "#FFF"} 
              stroke="#10B981" 
              strokeWidth="2" 
            />
            <Rect
              x={p.x - 20}
              y={0}
              width={40}
              height={height}
              fill="transparent"
              onPress={() => setSelectedIndex(i)}
            />
          </G>
        ))}
      </Svg>

      {/* Dynamic Tooltip Overlay */}
      {selectedPoint && (
        <View style={[
          styles.tooltipContainer, 
          { 
            left: selectedPoint.x - 45, 
            top: selectedPoint.y - 85,
            position: 'absolute',
            zIndex: 10
          }
        ]}>
           <Text style={styles.tooltipDay}>{labels[selectedIndex].toUpperCase()}</Text>
           <Text style={styles.tooltipCal}>{selectedPoint.val} <Text style={{fontSize: 10}}>KCAL</Text></Text>
           <View style={styles.tooltipGoalBox}>
              <Icon name={selectedPoint.val >= 2200 ? "check" : "trending-up"} size={12} color="#10B981" />
              <Text style={styles.tooltipGoalText}>Goal: 2200</Text>
           </View>
        </View>
      )}

      {/* X-axis Day Labels */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        marginTop: 5 
      }}>
        {labels.map((l: string, i: number) => (
          <TouchableOpacity key={i} onPress={() => setSelectedIndex(i)} style={{ width: chartWidth / 7, alignItems: 'center' }}>
            <Text style={{ 
              fontSize: 10, 
              color: i === selectedIndex ? '#10B981' : '#94A3B8', 
              fontWeight: 'bold' 
            }}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const MacroCard = ({ label, value, target, progress, color, icon, percent, styles }: any) => (
  <View style={styles.macroCard}>
    <View style={styles.macroHeader}>
      <View style={[styles.macroIconBg, { backgroundColor: `${color}20` }]}>
        <Icon name={icon} size={18} color={color} />
      </View>
      <View style={styles.percentBadge}><Text style={[styles.percentText, { color }]}>{percent}</Text></View>
    </View>
    <Text style={styles.macroLabel}>{label}</Text>
    <Text style={styles.macroValueText}>{value} <Text style={styles.targetText}>/ {target}</Text></Text>
    <View style={styles.barBg}><View style={[styles.barFill, { width: `${progress * 100}%`, backgroundColor: color }]} /></View>
  </View>
);

const MicroGridItem = ({ label, val, color, progress, styles }: any) => (
  <View style={styles.microBox}>
    <View style={styles.microHead}><Text style={styles.microLabel}>{label}</Text><Text style={styles.microPerc}>{Math.round(progress*100)}%</Text></View>
    <Text style={styles.microVal}>{val}</Text>
    <View style={styles.microBarBg}><View style={[styles.microBarFill, { width: `${progress * 100}%`, backgroundColor: color }]} /></View>
  </View>
);

const MealItem = ({ name, time, cal, icon, isLast, styles }: any) => (
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
      <Text style={styles.mealCal}>{cal}</Text>
      <Text style={styles.mealCalLabel}>kcal</Text>
    </View>
    <Icon name="chevron-right" size={18} color="#CBD5E1" style={{ marginLeft: 8 }} />
  </View>
);

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
  container: { flex: 1, backgroundColor: isDark ? '#000' : '#F4F9FF' },
  header: { padding: 20 },
  mainTitle: { fontSize: 28, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  subTitle: { fontSize: 14, color: isDark ? '#94A3B8' : '#64748B', marginTop: 5, marginBottom: 15 },
  logMealBtn: { backgroundColor: '#22C55E', flexDirection: 'row', alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, alignItems: 'center', elevation: 2 },
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
  tooltipDay: { fontSize: 10, fontWeight: 'bold', color: '#10B981' },
  tooltipCal: { fontSize: 16, fontWeight: '800', color: isDark ? '#FFF' : '#1E293B', marginVertical: 2 },
  tooltipGoalBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? '#111' : '#F0FDF4', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  tooltipGoalText: { fontSize: 9, color: '#10B981', fontWeight: 'bold', marginLeft: 4 },

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

export default NutritionDashboard;



// import { useNavigation } from '@react-navigation/native';
// import React, { useState } from 'react';
// import {
//   ColorValue,
//   Dimensions,
//   Image,
//   LayoutAnimation,
//   Linking,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   UIManager,
//   View,
// } from 'react-native';
// import Animated, {
//   Easing,
//   interpolateColor,
//   useAnimatedStyle,
//   useSharedValue,
//   withDelay,
//   withRepeat,
//   withSequence,
//   withTiming
// } from 'react-native-reanimated';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useTheme } from '../../../theme/ThemeContext';

// const { width } = Dimensions.get('window');

// const HEALTH_TIPS = [
//   "Consistency is better than perfection. Keep moving, stay hydrated, and your body will thank you.",
//   "Small steps lead to big results. Try to walk 10 minutes more today than yesterday.",
//   "Hydration is key. Drink a glass of water first thing in the morning to kickstart your metabolism.",
//   "Sleep is the foundation of health. Aim for 7-8 hours of quality rest tonight.",
//   "Eat the rainbow. Including various colorful vegetables in your meals ensures a range of nutrients.",
//   "Posture matters. Take a moment to sit up straight and relax your shoulders.",
//   "Mindful eating. Pay attention to your food and chew slowly to improve digestion and satisfaction.",
//   "Stay active throughout the day. A 5-minute stretch every hour can work wonders.",
//   "Focus on your breathing. Take 3 deep breaths right now to reduce stress.",
//   "Listen to your body. Rest when you're tired and push yourself when you're energized."
// ];

// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// // --- Interfaces for TypeScript ---
// interface StatBarProps {
//   label: string;
//   percent: string;
//   color: ColorValue;
//   isDark: boolean;
// }

// interface TrackerItemProps {
//   icon: string;
//   label: string;
//   sub: string;
//   isDark: boolean;
//   isRefresh?: boolean;
// }

// interface MacroCircleProps {
//   label: string;
//   value: string;
//   color: ColorValue;
// }

// const HomeScreen = () => {
//   const navigation = useNavigation<any>();
//   const { colors, isDark } = useTheme();
//   const [isExpanded, setIsExpanded] = useState(true);

//   const dailyTip = HEALTH_TIPS[new Date().getDate() % HEALTH_TIPS.length];

//   const AnimatedWord = ({ word, index }: { word: string, index: number }) => {
//     const wordProgress = useSharedValue(0);
//     const wordColorProgress = useSharedValue(0);
//     const wordPhysicsY = useSharedValue(0);

//     React.useEffect(() => {
//       // Staggered Reveal
//       wordProgress.value = withDelay(index * 250, withTiming(1, { 
//         duration: 1200, 
//         easing: Easing.out(Easing.quad) 
//       }));

//       // Staggered Color change
//       wordColorProgress.value = withDelay(1200 + index * 250, withTiming(1, { duration: 800 }));

//       // Staggered Floating Physics
//       wordPhysicsY.value = withDelay(index * 300, withRepeat(
//         withSequence(
//           withTiming(8, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
//           withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.sin) })
//         ),
//         -1,
//         true
//       ));
//     }, []);

//     const animatedStyle = useAnimatedStyle(() => ({
//       opacity: wordProgress.value,
//       transform: [
//         { translateY: wordPhysicsY.value + (1 - wordProgress.value) * 15 },
//         { scale: 0.9 + wordProgress.value * 0.1 }
//       ],
//       color: interpolateColor(
//         wordColorProgress.value,
//         [0, 1],
//         [isDark ? '#AAA' : '#666', '#5BA199']
//       ),
//     }));

//     return (
//       <Animated.Text style={[styles.greetingText, animatedStyle, { marginRight: 10 }]}>
//         {word}
//       </Animated.Text>
//     );
//   };

//   const Particle = ({ index }: { index: number }) => {
//     const y = useSharedValue(0);
//     const x = useSharedValue(Math.random() * 100 - 50);
//     const opacity = useSharedValue(0.4);
//     const size = Math.random() * 4 + 2;

//     React.useEffect(() => {
//       const duration = Math.random() * 3000 + 3000; // 3-6s
//       const delay = Math.random() * 5000;
      
//       y.value = withDelay(delay, withRepeat(
//         withTiming(-120, { duration, easing: Easing.linear }),
//         -1,
//         false
//       ));

//       opacity.value = withDelay(delay, withRepeat(
//         withTiming(0, { duration, easing: Easing.linear }),
//         -1,
//         false
//       ));
//     }, []);

//     const animatedStyle = useAnimatedStyle(() => ({
//       transform: [{ translateY: y.value }, { translateX: x.value }],
//       opacity: opacity.value,
//     }));

//     return (
//       <Animated.View 
//         style={[
//           styles.particle, 
//           animatedStyle, 
//           { width: size, height: size, borderRadius: size / 2, left: `${Math.random() * 100}%` }
//         ]} 
//       />
//     );
//   };

//   const toggleExpand = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F8FAFC' }]}>
//       <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />
      
//       <ScrollView 
//         showsVerticalScrollIndicator={false} 
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* Header with Profile & Greeting */}
//         <View style={styles.headerSection}>
//           <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//             {"Good Morning,".split(' ').map((word, i) => (
//               <AnimatedWord key={i} word={word} index={i} />
//             ))}
//           </View>
//           <View style={styles.headerTopRow}>
//             <View style={styles.headerNameRow}>
//               <Image 
//                 source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80' }} 
//                 style={styles.headerAvatar} 
//               />
//               <Text style={[styles.userName, { color: isDark ? '#FFF' : '#1C1C1E' }]}>Saif</Text>
//             </View>

//             <View style={styles.headerRightActions}>
//               <View style={[styles.statusBadge, { backgroundColor: isDark ? '#1E2E2A' : '#E8F6F3' }]}>
//                 <Icon name="crown" size={14} color="#5BA199" />
//                 <Text style={styles.statusText}>3 days left</Text>
//               </View>
//               <TouchableOpacity style={[styles.calendarIcon, { backgroundColor: isDark ? '#1E1E1E' : '#FFF' }]}>
//                 <Icon name="calendar-month-outline" size={20} color={isDark ? '#FFF' : '#666'} />
//               </TouchableOpacity>
//             </View>
//           </View>
          
//           <View style={[styles.tipContainer, { backgroundColor: isDark ? '#1A1A1A' : '#F0F9F8', overflow: 'hidden' }]}>
//             {/* Particle Background */}
//             {[...Array(12)].map((_, i) => <Particle key={i} index={i} />)}
            
//             <View style={styles.tipHeader}>
//               <View style={styles.tipIconCircle}>
//                 <Icon name="lightbulb-on" size={16} color="#FFF" />
//               </View>
//               <Text style={styles.tipTitle}>HEALTH TIP OF THE DAY</Text>
//             </View>
//             <View style={styles.tipContentRow}>
//               <Icon name="format-quote-open" size={20} color="#5BA199" style={styles.quoteIcon} />
//               <Text style={[styles.tipThought, { color: isDark ? '#CCC' : '#444' }]}>
//                 {dailyTip}
//               </Text>
//             </View>
//           </View>
//         </View>

//         <Text style={[styles.sectionTitle, { color: isDark ? '#FFF' : '#333' }]}>Your Trackers</Text>

//         {/* Food Tracker Card */}
//         <View style={[styles.mainCard, { backgroundColor: isDark ? '#1E1E1E' : '#FFF' }]}>
//           <View style={styles.cardHeader}>
//             <View style={[styles.circularIcon, { backgroundColor: isDark ? '#333' : '#FFF' }]}>
//                <Icon name="silverware-fork-knife" size={24} color="#D35400" />
//             </View>
//             <View style={{ flex: 1, marginLeft: 12 }}>
//               <Text style={[styles.trackerLabel, { color: isDark ? '#FFF' : '#333' }]}>Track Food</Text>
//               <Text style={styles.trackerValue}>1,716 of 2,300 Cal Eaten</Text>
//             </View>
//             <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
//               <Icon name="camera-outline" size={26} color="#666" style={{ marginRight: 15 }} />
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Icon name="plus-box" size={26} color="#D35400" />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity style={styles.fastingBanner}>
//             <Icon name="clock-outline" size={20} color="#5BA199" />
//             <Text style={styles.fastingText}>Want to start Intermittent Fasting?</Text>
//             <Icon name="chevron-right" size={20} color="#5BA199" />
//           </TouchableOpacity>

//           <View style={styles.premiumDivider}>
//             <View style={styles.dividerLine} />
//             <View style={styles.premiumLabelRow}>
//               <Icon name="crown" size={14} color="#5BA199" />
//               <Text style={styles.premiumText}>Premium</Text>
//             </View>
//             <View style={styles.dividerLine} />
//           </View>

//           <View style={styles.statsGrid}>
//             <StatBar label="Protein" percent="29%" color="#F1C40F" isDark={isDark} />
//             <StatBar label="Carb" percent="76%" color="#2ECC71" isDark={isDark} />
//             <StatBar label="Fat" percent="105%" color="#E74C3C" isDark={isDark} />
//             <StatBar label="Fibre" percent="88%" color="#27AE60" isDark={isDark} />
//           </View>

//           <TouchableOpacity style={styles.unlockCardBanner}>
//             <Icon name="gift-outline" size={20} color="#5BA199" />
//             <Text style={styles.unlockCardText}>Click to Unlock Your New Year ...</Text>
//             <Icon name="chevron-right-circle" size={20} color="#5BA199" />
//           </TouchableOpacity>
//         </View>

//         {isExpanded ? (
//           <>
//             {/* Vitals List */}
//             <View style={styles.vitalsList}>
//               <TrackerItem icon="scale-bathroom" label="Weight" sub="0 kg of 17 kg Gained" isDark={isDark} />
//               <TrackerItem icon="fire" label="Workout" sub="Goal: 461 cal" isDark={isDark} />
//               <TrackerItem icon="shoe-print" label="Steps" sub="Goal: 10,000 steps" isDark={isDark} isRefresh />
//               <TrackerItem icon="moon-waning-crescent" label="Sleep" sub="Set Up Sleep Goal" isDark={isDark} />
//               <TrackerItem icon="water-outline" label="Water" sub="Goal: 5 glasses" isDark={isDark} />
//             </View>

//             <TouchableOpacity style={styles.trackMoreRow}>
//               <View style={styles.plusIconBg}>
//                 <Icon name="plus" size={20} color="#5BA199" />
//               </View>
//               <Text style={styles.trackMoreText}>Track More</Text>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <View style={[styles.collapsedCard, { backgroundColor: isDark ? '#1E1E1E' : '#FFF' }]}>
//             {['scale-bathroom', 'fire', 'shoe-print', 'moon-waning-crescent', 'water-outline'].map((icon, idx) => (
//               <View key={idx} style={[styles.miniIconCircle, { backgroundColor: isDark ? '#333' : '#F8F9F9' }]}>
//                 <Icon name={icon} size={20} color={isDark ? '#FFF' : '#666'} />
//               </View>
//             ))}
//           </View>
//         )}

//         <TouchableOpacity 
//           style={styles.chevronDown} 
//           onPress={toggleExpand}
//           activeOpacity={0.7}
//         >
//           <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={30} color="#999" />
//         </TouchableOpacity>

//         <Text style={[styles.sectionTitle, { color: isDark ? '#FFF' : '#333' }]}>Today's Logs</Text>
        
//         {/* Today's Log Card */}
//         <View style={styles.logRow}>
//           <Text style={styles.logTime}>01:30{'\n'}PM</Text>
//           <View style={[styles.logCard, { backgroundColor: isDark ? '#1E1E1E' : '#FFF' }]}>
//             <View style={styles.logHeader}>
//               <View style={styles.logTypeBadge}>
//                 <Icon name="food-apple" size={16} color="#D35400" />
//               </View>
//               <Text style={styles.logTypeName}>Lunch <Text style={{fontWeight: 'normal', color: '#999'}}>Snapped</Text></Text>
//             </View>
            
//             <View style={styles.logCalRow}>
//               <Text style={[styles.logCalValue, { color: isDark ? '#FFF' : '#333' }]}>1715<Text style={styles.logCalSub}>/575 Cal Eaten</Text></Text>
//             </View>

//             <View style={styles.logImageRow}>
//               <Image source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80' }} style={styles.logImg} />
//               <Image source={{ uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80' }} style={styles.logImg} />
//             </View>
//             <Text style={[styles.logFoodDesc, { color: isDark ? '#CCC' : '#333' }]}>Idli Sambar with Chutneys • Indian{'\n'}Snack Combo</Text>

//             <View style={styles.premiumDivider}>
//               <View style={styles.dividerLine} />
//               <View style={styles.premiumLabelRow}>
//                 <Icon name="crown" size={14} color="#5BA199" />
//                 <Text style={styles.premiumText}>Premium</Text>
//               </View>
//               <View style={styles.dividerLine} />
//             </View>

//             <View style={styles.logMacrosRow}>
//               <MacroCircle label="Protein" value="33g" color="#F1C40F" />
//               <MacroCircle label="Fat" value="80g" color="#E74C3C" />
//               <MacroCircle label="Carbs" value="217g" color="#2ECC71" />
//               <MacroCircle label="Fiber" value="26g" color="#27AE60" />
//             </View>

//             <TouchableOpacity style={styles.insightBtn}>
//               <Icon name="chart-box-outline" size={18} color="#5BA199" />
//               <Text style={styles.insightBtnText}>View Insight</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={{ height: 100 }} />
//       </ScrollView>

//       {/* Floating Action Button */}
//       <TouchableOpacity style={styles.fab}>
//         <Icon name="auto-fix" size={28} color="#FFF" />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// // --- Helper Components ---
// const StatBar: React.FC<StatBarProps> = ({ label, percent, color, isDark }) => (
//   <View style={styles.statContainer}>
//     <Text style={styles.statLabel}>{label}: {percent}</Text>
//     <View style={[styles.barBg, { backgroundColor: isDark ? '#333' : '#EEE' } as any]}>
//       <View style={[styles.barFill, { width: percent, backgroundColor: color } as any]} />
//     </View>
//   </View>
// );

// const TrackerItem: React.FC<TrackerItemProps> = ({ icon, label, sub, isDark, isRefresh }) => (
//   <View style={[styles.trackerItem, { backgroundColor: isDark ? '#1E1E1E' : '#FFF' }]}>
//     <View style={[styles.iconCircle, { backgroundColor: isDark ? '#333' : '#F8F9F9' }]}>
//       <Icon name={icon} size={22} color={isDark ? '#FFF' : '#666'} />
//     </View>
//     <View style={{ flex: 1, marginLeft: 15 }}>
//       <Text style={[styles.itemLabel, { color: isDark ? '#FFF' : '#333' }]}>{label}</Text>
//       <Text style={styles.itemSub}>{sub}</Text>
//     </View>
//     <TouchableOpacity>
//       <Icon name={isRefresh ? "refresh" : "plus-circle-outline"} size={24} color={isRefresh ? "#666" : "#CCC"} />
//     </TouchableOpacity>
//   </View>
// );

// const MacroCircle: React.FC<MacroCircleProps> = ({ label, value, color }) => (
//   <View style={styles.macroCircleContainer}>
//     <View style={[styles.macroCircle, { borderColor: color as any }]}>
//       <Text style={[styles.macroCircleValue, { color: color as any }]}>{value.replace('g', '')}</Text>
//     </View>
//     <Text style={styles.macroCircleLabel}>{label}</Text>
//     <Text style={styles.macroCircleValueSmall}>{value}</Text>
//   </View>
// );


// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   headerSection: { paddingTop: 20, marginBottom: 10, paddingHorizontal: 0 },
//   greetingText: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
//   headerTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 },
//   headerRightActions: { flexDirection: 'row', alignItems: 'center' },
//   headerNameRow: { flexDirection: 'row', alignItems: 'center' },
//   headerAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 12, backgroundColor: '#EEE' },
//   userName: { fontSize: 26, fontWeight: 'bold' },
//   tipContainer: { 
//     marginTop: 18, 
//     padding: 16, 
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: '#D1E8E4',
//     elevation: 2,
//     shadowColor: '#5BA199',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 }
//   },
//   tipIconCircle: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#5BA199',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10
//   },
//   tipHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
//   tipTitle: { color: '#5BA199', fontWeight: 'bold', fontSize: 11, letterSpacing: 1.2 },
//   tipContentRow: { flexDirection: 'row' },
//   quoteIcon: { marginRight: 8, marginTop: -2, opacity: 0.6 },
//   tipThought: { flex: 1, fontSize: 14, fontStyle: 'italic', lineHeight: 22, fontWeight: '500' },
//   particle: {
//     position: 'absolute',
//     bottom: 0,
//     backgroundColor: '#5BA199',
//     opacity: 0.4,
//   },
  
//   scrollContent: { paddingHorizontal: 12, paddingBottom: 40, paddingTop: 10 },
//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#D1E8E4'
//   },
//   statusText: { color: '#5BA199', fontWeight: 'bold', fontSize: 11 },
//   calendarIcon: { marginLeft: 10, width: 30, height: 27, borderRadius: 9, justifyContent: 'center', alignItems: 'center', elevation: 2 },

//   sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 15 },
//   mainCard: {
//     borderRadius: 24,
//     padding: 18,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//   },
//   cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
//   circularIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     borderWidth: 2,
//     borderColor: '#FAD7A0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   trackerLabel: { fontWeight: 'bold', fontSize: 18 },
//   trackerValue: { color: '#999', fontSize: 13, marginTop: 2 },
//   fastingBanner: {
//     flexDirection: 'row',
//     backgroundColor: '#F2F8F7',
//     padding: 15,
//     borderRadius: 15,
//     marginTop: 5,
//     alignItems: 'center',
//   },
//   fastingText: { flex: 1, marginLeft: 12, color: '#5BA199', fontSize: 14, fontWeight: '500' },
//   premiumDivider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
//   dividerLine: { flex: 1, height: 1, backgroundColor: '#EEE' },
//   premiumLabelRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
//   premiumText: { color: '#5BA199', fontSize: 12, fontWeight: 'bold', marginLeft: 5 },
//   statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
//   statContainer: { width: '47%', marginBottom: 15 },
//   statLabel: { fontSize: 12, color: '#666', marginBottom: 6 },
//   barBg: { height: 6, borderRadius: 3, overflow: 'hidden' },
//   barFill: { height: 6, borderRadius: 3 },
//   unlockCardBanner: {
//     flexDirection: 'row',
//     backgroundColor: '#F2F8F7',
//     padding: 12,
//     borderRadius: 15,
//     marginTop: 10,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#D1E8E4',
//     borderStyle: 'dashed'
//   },
//   unlockCardText: { flex: 1, marginLeft: 10, color: '#5BA199', fontSize: 12, fontWeight: 'bold' },
//   vitalsList: { marginTop: 15 },
//   trackerItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderRadius: 20,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.02,
//   },
//   iconCircle: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
//   itemLabel: { fontWeight: 'bold', fontSize: 16 },
//   itemSub: { fontSize: 12, color: '#999', marginTop: 2 },
//   trackMoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
//   plusIconBg: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E8F6F3', justifyContent: 'center', alignItems: 'center' },
//   trackMoreText: { color: '#5BA199', fontWeight: 'bold', marginLeft: 10, fontSize: 15 },
//   chevronDown: { alignSelf: 'center', marginTop: 5 },
//   logRow: { flexDirection: 'row', marginTop: 10 },
//   logTime: { width: 60, fontSize: 13, color: '#999', fontWeight: 'bold', textAlign: 'center', paddingTop: 20 },
//   logCard: { flex: 1, borderRadius: 24, padding: 20, elevation: 3, shadowColor: '#000', shadowOpacity: 0.05 },
//   logHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
//   logTypeBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FDF2E9', justifyContent: 'center', alignItems: 'center' },
//   logTypeName: { marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: '#E67E22' },
//   logCalRow: { marginBottom: 15 },
//   logCalValue: { fontSize: 24, fontWeight: 'bold' },
//   logCalSub: { color: '#999', fontWeight: 'normal', fontSize: 16 },
//   logImageRow: { flexDirection: 'row', gap: 12, marginBottom: 15 },
//   logImg: { width: (width - 180) / 2, height: 120, borderRadius: 15 },
//   logFoodDesc: { fontSize: 14, lineHeight: 20 },
//   logMacrosRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
//   macroCircleContainer: { alignItems: 'center' },
//   macroCircle: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
//   macroCircleLabel: { fontSize: 10, color: '#999', fontWeight: 'bold' },
//   macroCircleValue: { fontSize: 14, fontWeight: 'bold' },
//   macroCircleValueSmall: { fontSize: 10, color: '#999', marginTop: 2 },
//   insightBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E8F6F3', paddingVertical: 12, borderRadius: 12 },
//   insightBtnText: { color: '#5BA199', fontWeight: 'bold', marginLeft: 8 },
//   fab: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#16A085',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 8,
//   },
//   collapsedCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//     borderRadius: 20,
//     marginTop: 15,
//     marginBottom: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     marginHorizontal: 2,
//   },
//   miniIconCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default HomeScreen;