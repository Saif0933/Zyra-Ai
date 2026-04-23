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
import Svg, { Circle, Path, G, Defs, LinearGradient as SvgGradient, Stop, Rect, Text as SvgText } from 'react-native-svg';
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