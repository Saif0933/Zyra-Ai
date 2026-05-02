
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, G, Path, Rect, Stop, LinearGradient as SvgGradient, Text as SvgText } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const NutritionDashboard = () => {
  const { isDark } = useTheme();
  const navigation = useNavigation<any>();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const handleLogMeal = () => {
    navigation.navigate('Scanner');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? '#000' : '#F4F9FF'} />
      
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Hi, John Doe 👋</Text>
        <Text style={styles.subTitle}>Track your daily nutrition goals and progress</Text>
        <TouchableOpacity 
          style={styles.logMealBtn} 
          activeOpacity={0.8}
          onPress={handleLogMeal}
        >
          <Icon name="plus" size={20} color="#FFF" />
          <Text style={styles.logMealText}>LOG NEW MEAL</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#22C55E']} tintColor="#22C55E" />
        }
      >
        {/* Main Calorie Ring Card */}
        <View style={styles.calorieCard}>
          <View style={styles.circularContainer}>
             <CalorieRing progress={0.65} isDark={isDark} />
             <View style={styles.calorieInner}>
                <Text style={styles.calNumber}>1,430</Text>
                <Text style={styles.calTotal}>of 2,200 kcal</Text>
             </View>
          </View>
          <Text style={styles.remText}>770 kcal remaining</Text>
          <Text style={styles.onTrackText}>You are on track for your daily goal!</Text>
        </View>

        {/* Macros Row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
           <View style={{ width: '48%' }}>
             <MacroCard label="PROTEIN" value="120g" target="180g" progress={0.66} color="#22C55E" icon="food-drumstick" percent="66%" styles={styles} />
             <MacroCard label="FATS" value="45g" target="70g" progress={0.64} color="#F59E0B" icon="oil" percent="64%" styles={styles} />
           </View>
           <View style={{ width: '48%' }}>
             <MacroCard label="CARBS" value="150g" target="250g" progress={0.6} color="#3B82F6" icon="bread-slice" percent="60%" styles={styles} />
             <MacroCard label="FIBER" value="18g" target="30g" progress={0.6} color="#8B5CF6" icon="leaf" percent="60%" styles={styles} />
           </View>
        </View>

        {/* Recent Meals Section */}
        <View style={styles.sectionRow}>
           <Text style={styles.sectionHeader}>Today's Meals</Text>
           <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>

        <View style={styles.recentMealsCard}>
           <MealItem name="Grilled Chicken Salad" time="12:30 PM" cal="450" icon="food-apple" styles={styles} />
           <MealItem name="Oatmeal with Berries" time="08:15 AM" cal="320" icon="coffee" styles={styles} />
           <MealItem name="Whey Protein Shake" time="10:45 AM" cal="180" icon="bottle-tonic-plus" isLast styles={styles} />
        </View>

        {/* Weekly Progress Analytics */}
        <View style={styles.sectionRow}>
           <Text style={styles.sectionHeader}>Weekly Analytics</Text>
           <TouchableOpacity><Text style={styles.seeAll}>Full Report</Text></TouchableOpacity>
        </View>

        <View style={styles.weeklyCard}>
           <View style={styles.chartHeaderRow}>
              <View>
                 <View style={styles.rowAlign}>
                    <Icon name="finance" size={14} color="#10B981" />
                    <Text style={[styles.sectionHeader, { fontSize: 14, marginLeft: 6 }]}>CALORIE TREND</Text>
                 </View>
                 <Text style={styles.chartSubtitle}>AVG: 2,140 KCAL / DAY</Text>
              </View>
              <View style={styles.legendRow}>
                 <View style={styles.legendItem}>
                    <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
                    <Text style={styles.legendText}>Intake</Text>
                 </View>
              </View>
           </View>

           <View style={styles.chartWrapper}>
              <CalorieChart isDark={isDark} styles={styles} />
           </View>
        </View>

        {/* Micros Grid */}
        <View style={styles.sectionRow}>
           <Text style={styles.sectionHeader}>Micronutrients</Text>
        </View>
        <View style={styles.microGrid}>
           <MicroGridItem label="Vitamin D" val="15mcg" color="#FACC15" progress={0.75} styles={styles} />
           <MicroGridItem label="Iron" val="12mg" color="#EF4444" progress={0.45} styles={styles} />
           <MicroGridItem label="Calcium" val="800mg" color="#3B82F6" progress={0.8} styles={styles} />
           <MicroGridItem label="Magnesium" val="300mg" color="#8B5CF6" progress={0.7} styles={styles} />
        </View>

        {/* Bottom Health Stats */}
        <View style={styles.bottomStatsGrid}>
           <StatBox label="WATER INTAKE" value="2.4L" sub="+20%" subColor="#10B981" icon="water" styles={styles} />
           <StatBox label="SLEEP" value="7h 20m" sub="On Track" subColor="#10B981" icon="bed" styles={styles} />
           <StatBox label="STEPS" value="8,432" sub="-12%" subColor="#EF4444" icon="walk" styles={styles} />
           <StatBox label="BODY WEIGHT" value="78.5kg" sub="Stable" subColor="#3B82F6" icon="scale-bathroom" styles={styles} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// Components
const CalorieRing = ({ progress, isDark }: { progress: number; isDark: boolean }) => {
  const size = 180;
  const strokeWidth = 15;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={isDark ? "#1F2937" : "#E2E8F0"}
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#22C55E"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        fill="transparent"
        transform={`rotate(-90 ${center} ${center})`}
      />
    </Svg>
  );
};

const CalorieChart = ({ isDark, styles }: { isDark: boolean; styles: any }) => {
  const chartHeight = 150;
  const chartWidth = width - 80;
  const labels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const data = [1900, 2400, 2100, 2800, 2200, 1800, 2300];
  const maxVal = 3000;
  const [selectedIndex, setSelectedIndex] = React.useState(3);

  const getPath = () => {
    const points = data.map((val, i) => {
      const x = (i * (chartWidth / 6));
      const y = chartHeight - (val / maxVal) * chartHeight;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  const selectedPoint = {
    x: (selectedIndex * (chartWidth / 6)),
    y: chartHeight - (data[selectedIndex] / maxVal) * chartHeight,
    val: data[selectedIndex]
  };

  const paddingLeft = 10;
  const paddingRight = 10;

  return (
    <View style={{ width: chartWidth, height: chartHeight + 40 }}>
      <Svg width={chartWidth} height={chartHeight}>
        <Defs>
          <SvgGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#10B981" stopOpacity="0.3" />
            <Stop offset="1" stopColor="#10B981" stopOpacity="0" />
          </SvgGradient>
        </Defs>
        <Path
          d={`${getPath()} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`}
          fill="url(#grad)"
        />
        <Path
          d={getPath()}
          fill="transparent"
          stroke="#10B981"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Visible highlighted dot */}
        {selectedIndex !== -1 && (
          <Circle
            cx={selectedPoint.x}
            cy={selectedPoint.y}
            r="6"
            fill="#10B981"
          />
        )}
        {/* Invisible large hit areas for touch */}
        {data.map((val, i) => (
          <Circle
            key={i}
            cx={(i * (chartWidth / 6))}
            cy={chartHeight - (val / maxVal) * chartHeight}
            r="25"
            fill="transparent"
            onPress={() => setSelectedIndex(i)}
          />
        ))}
      </Svg>

      {/* Interactive Tooltip Overlay */}
      {selectedIndex !== -1 && (
        <View style={[styles.tooltipContainer, { left: selectedPoint.x - 45, top: selectedPoint.y - 65 }]}>
           <Text style={styles.tooltipDay}>{labels[selectedIndex].toUpperCase()}</Text>
           <Text style={styles.tooltipCal}>{selectedPoint.val} <Text style={{fontSize: 10, fontFamily: 'serif'}}>KCAL</Text></Text>
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
              fontFamily: 'serif'
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
  mainTitle: { fontSize: 28, color: isDark ? '#FFF' : '#1E293B', fontFamily: 'serif' },
  subTitle: { fontSize: 14, color: isDark ? '#94A3B8' : '#64748B', marginTop: 5, marginBottom: 15, fontFamily: 'serif' },
  logMealBtn: { backgroundColor: '#22C55E', flexDirection: 'row', alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, alignItems: 'center', elevation: 2 },
  logMealText: { color: '#FFF', marginLeft: 8, fontSize: 16, fontFamily: 'serif' },
  
  scrollContent: { paddingHorizontal: 20, paddingBottom: 30 },

  calorieCard: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 24, padding: 25, alignItems: 'center', elevation: 2, marginBottom: 20, borderWidth: isDark ? 1 : 0, borderColor: '#333' },
  circularContainer: { justifyContent: 'center', alignItems: 'center' },
  calorieInner: { position: 'absolute', alignItems: 'center' },
  calNumber: { fontSize: 32, color: isDark ? '#FFF' : '#1E293B', fontFamily: 'serif' },
  calTotal: { fontSize: 14, color: isDark ? '#94A3B8' : '#64748B', fontFamily: 'serif' },
  remText: { fontSize: 16, color: isDark ? '#FFF' : '#1E293B', marginTop: 15, fontFamily: 'serif' },
  onTrackText: { fontSize: 13, color: isDark ? '#94A3B8' : '#64748B', marginTop: 5, fontFamily: 'serif' },

  macroCard: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 20, padding: 18, marginBottom: 15, elevation: 1, borderWidth: isDark ? 1 : 0, borderColor: '#333' },
  macroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  macroIconBg: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  percentBadge: { backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  percentText: { fontSize: 12, fontFamily: 'serif' },
  macroLabel: { fontSize: 12, color: isDark ? '#94A3B8' : '#64748B', marginTop: 12, fontFamily: 'serif' },
  macroValueText: { fontSize: 20, color: isDark ? '#FFF' : '#1E293B', marginTop: 4, fontFamily: 'serif' },
  targetText: { fontSize: 14, color: '#94A3B8', fontFamily: 'serif' },
  barBg: { height: 8, backgroundColor: isDark ? '#27272A' : '#F1F5F9', borderRadius: 4, marginTop: 12, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },

  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 15 },
  sectionHeader: { fontSize: 18, color: isDark ? '#FFF' : '#1E293B', fontFamily: 'serif' },
  seeAll: { color: isDark ? '#94A3B8' : '#64748B', fontSize: 13, fontFamily: 'serif' },
  
  microGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  microBox: { width: (width - 55) / 2, backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 16, padding: 15, marginBottom: 15, borderWidth: isDark ? 1 : 0, borderColor: '#333' },
  microHead: { flexDirection: 'row', justifyContent: 'space-between' },
  microLabel: { fontSize: 13, color: isDark ? '#FFF' : '#1E293B', fontFamily: 'serif' },
  microPerc: { fontSize: 11, color: '#94A3B8', fontFamily: 'serif' },
  microVal: { fontSize: 12, color: isDark ? '#94A3B8' : '#64748B', marginTop: 8, fontFamily: 'serif' },
  microBarBg: { height: 4, backgroundColor: isDark ? '#27272A' : '#F1F5F9', borderRadius: 2, marginTop: 10 },
  microBarFill: { height: '100%', borderRadius: 2 },

  weeklyCard: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 24, padding: 20, marginTop: 10, marginBottom: 20, elevation: 2, borderWidth: isDark ? 1 : 0, borderColor: '#333' },
  chartHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowAlign: { flexDirection: 'row', alignItems: 'center' },
  chartSubtitle: { fontSize: 10, color: '#94A3B8', letterSpacing: 1, marginTop: 2, fontFamily: 'serif' },
  legendRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginLeft: 15 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { fontSize: 12, color: '#94A3B8', fontFamily: 'serif' },
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
  tooltipDay: { fontSize: 10, color: '#10B981', fontFamily: 'serif' },
  tooltipCal: { fontSize: 16, color: isDark ? '#FFF' : '#1E293B', marginVertical: 2, fontFamily: 'serif' },
  tooltipGoalBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? '#111' : '#F0FDF4', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  tooltipGoalText: { fontSize: 9, color: '#10B981', marginLeft: 4, fontFamily: 'serif' },

  recentMealsCard: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 24, paddingHorizontal: 16, paddingVertical: 8, elevation: 1, borderWidth: isDark ? 1 : 0, borderColor: '#333' },
  mealItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: isDark ? '#1A1A1A' : '#F1F5F9' },
  mealIconCircle: { width: 44, height: 44, borderRadius: 12, backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC', justifyContent: 'center', alignItems: 'center' },
  mealName: { fontSize: 15, color: isDark ? '#FFF' : '#1E293B', fontFamily: 'serif' },
  mealTimeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  mealTimeText: { fontSize: 12, color: '#94A3B8', marginLeft: 4, fontFamily: 'serif' },
  mealCal: { fontSize: 16, color: isDark ? '#FFF' : '#1E293B', fontFamily: 'serif' },
  mealCalLabel: { fontSize: 10, color: '#94A3B8', textAlign: 'right', fontFamily: 'serif' },

  bottomStatsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
  statBox: { width: (width - 55) / 2, backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 20, padding: 16, marginBottom: 15, elevation: 1, borderWidth: isDark ? 1 : 0, borderColor: '#333' },
  statBoxHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  statBadgeText: { fontSize: 10, fontFamily: 'serif' },
  statBoxVal: { fontSize: 18, color: isDark ? '#FFF' : '#1E293B', fontFamily: 'serif' },
  statBoxLabel: { fontSize: 10, color: isDark ? '#94A3B8' : '#64748B', marginTop: 4, letterSpacing: 0.5, fontFamily: 'serif' },
});

export default NutritionDashboard;
