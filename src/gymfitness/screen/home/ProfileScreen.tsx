
// // import { CommonActions, useNavigation } from '@react-navigation/native';
// // import React from 'react';
// // import {
// //   Alert,
// //   Image,
// //   SafeAreaView,
// //   ScrollView,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/MaterialIcons';
// // import { useTheme } from '../../../theme/ThemeContext';

// // const ClinicalProfile = () => {
// //   const { colors, isDark } = useTheme();
// //   const navigation = useNavigation();

// //   const handleLogout = () => {
// //     Alert.alert(
// //       'Logout',
// //       'Are you sure you want to logout?',
// //       [
// //         { text: 'Cancel', style: 'cancel' },
// //         {
// //           text: 'Logout',
// //           style: 'destructive',
// //           onPress: () => {
// //             const parentNav = navigation.getParent() ?? navigation;
// //             parentNav.dispatch(
// //               CommonActions.reset({
// //                 index: 0,
// //                 routes: [{ name: 'SelectRole' }],
// //               }),
// //             );
// //           },
// //         },
// //       ],
// //     );
// //   };

// //   // Reusable Menu Item Component
// //   const MenuItem = ({ icon, title, color }: { icon: string, title: string, color: string }) => (
// //     <TouchableOpacity style={[styles.menuItem, { borderBottomColor: isDark ? '#1A1A1A' : '#F0F0F0' }]}>
// //       <View style={styles.menuLeft}>
// //         <View style={[styles.iconContainer, { backgroundColor: color }]}>
// //           <Icon name={icon} size={20} color="#FFF" />
// //         </View>
// //         <Text style={[styles.menuTitle, { color: isDark ? '#FFF' : '#000' }]}>{title}</Text>
// //       </View>
// //       <Icon name="chevron-right" size={20} color={isDark ? '#444' : '#999'} />
// //     </TouchableOpacity>
// //   );

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#FFF' }]}>
// //       <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? '#000' : '#FFF'} />

// //       {/* Header */}
// //       <View style={styles.header}>
// //         <TouchableOpacity style={[styles.backCircle, { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5' }]}>
// //           <Icon name="arrow-back" size={20} color={isDark ? '#FFF' : '#000'} />
// //         </TouchableOpacity>
// //         <TouchableOpacity style={[styles.helpBadge, { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5', borderColor: isDark ? '#333' : '#EAEAEA' }]}>
// //           <Text style={[styles.helpText, { color: isDark ? '#FFF' : '#000' }]}>Help</Text>
// //         </TouchableOpacity>
// //       </View>

// //       <ScrollView contentContainerStyle={styles.scrollContent}>
// //         {/* Profile Greeting */}
// //         <TouchableOpacity style={styles.profileGreeting}>
// //           <View style={styles.profileRow}>
// //             <Image
// //               source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100' }}
// //               style={[styles.avatar, { borderColor: isDark ? '#333' : '#EAEAEA' }]}
// //             />
// //             <Text style={[styles.greetingText, { color: isDark ? '#FFF' : '#000' }]}>Hi Saif</Text>
// //           </View>
// //           <Icon name="chevron-right" size={20} color={isDark ? '#444' : '#999'} />
// //         </TouchableOpacity>

// //         {/* Menu List */}
// //         <View style={styles.menuList}>
// //           <MenuItem icon="toll" title="My Rewards" color="#EAB308" />
// //           <MenuItem icon="people" title="Friends" color="#4F46E5" />
// //           <MenuItem icon="favorite" title="Refer & Save" color="#A855F7" />
// //           <MenuItem icon="track-changes" title="My goals" color="#10B981" />
// //           <MenuItem icon="stars" title="My step streak" color="#8B5CF6" />
// //           <MenuItem icon="add-circle" title="Fitness and health" color="#3B82F6" />
// //           <MenuItem icon="star" title="Rate us" color="#FACC15" />
// //           <MenuItem icon="emoji-events" title="Challenges" color="#D97706" />
// //           <MenuItem icon="info" title="About" color="#A78BFA" />
// //         </View>

// //         {/* Bottom Actions */}
// //         <View style={styles.bottomSection}>
// //           <TouchableOpacity style={styles.footerItem}>
// //             <Text style={styles.footerText}>Customer support</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity style={styles.footerItem} onPress={handleLogout}>
// //             <Text style={[styles.footerText, { color: '#EF4444' }]}>Logout</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //     paddingVertical: 15,
// //   },
// //   backCircle: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   helpBadge: {
// //     paddingHorizontal: 20,
// //     paddingVertical: 8,
// //     borderRadius: 20,
// //     borderWidth: 1,
// //   },
// //   helpText: {
// //     fontSize: 16,
// //     fontWeight: '500',
// //   },
// //   scrollContent: {
// //     paddingBottom: 40,
// //   },
// //   profileGreeting: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 20,
// //     paddingVertical: 30,
// //   },
// //   profileRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   avatar: {
// //     width: 60,
// //     height: 60,
// //     borderRadius: 30,
// //     marginRight: 15,
// //     borderWidth: 1,
// //   },
// //   greetingText: {
// //     fontSize: 22,
// //     fontWeight: '600',
// //   },
// //   menuList: {
// //     marginTop: 10,
// //   },
// //   menuItem: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingVertical: 18,
// //     paddingHorizontal: 20,
// //     borderBottomWidth: 0.5,
// //   },
// //   menuLeft: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   iconContainer: {
// //     width: 36,
// //     height: 36,
// //     borderRadius: 18,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginRight: 15,
// //   },
// //   menuTitle: {
// //     fontSize: 18,
// //     fontWeight: '500',
// //   },
// //   bottomSection: {
// //     marginTop: 30,
// //     paddingHorizontal: 20,
// //   },
// //   footerItem: {
// //     paddingVertical: 15,
// //   },
// //   footerText: {
// //     color: '#666',
// //     fontSize: 18,
// //     fontWeight: '500',
// //   },
// // });

// // export default ClinicalProfile;


// import { CommonActions, useNavigation } from '@react-navigation/native';
// import React from 'react';
// import {
//   Alert,
//   Dimensions,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Switch,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Svg, { Circle, Polyline } from 'react-native-svg';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useTheme } from '../../../theme/ThemeContext';
// // import { useUserStats } from '../../../auth/hook/gymGole/useGym';
// // import { useGetMe } from '../../../auth/hook/userAuth';

// const { width } = Dimensions.get('window');

// const ProfileScreen = () => {
//   const navigation = useNavigation();
//   const { isDark, toggleTheme } = useTheme();
//   const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);
//   const [isNotifications, setIsNotifications] = React.useState(true);

//   // User details from backend (REVERTED TO MOCK)
//   // const { data: meResponse } = useGetMe();
//   // const user = meResponse?.data;
//   const userName = 'Curator';
//   const userInitial = userName.charAt(0).toUpperCase();

//   // Stats from backend (REVERTED TO MOCK)
//   // const { data: statsResponse } = useUserStats();
//   const stats = { totalMeals: 48, totalScans: 87 };

//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Logout',
//           style: 'destructive',
//           onPress: () => {
//             // navigation.reset for a clean logout
//             navigation.dispatch(
//               CommonActions.reset({
//                 index: 0,
//                 routes: [{ name: 'SelectRole' }],
//               })
//             );
//           },
//         },
//       ],
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? '#000' : '#F4F9FF'} />

//       <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
//         {/* Profile Header Card */}
//         <View style={styles.profileHeaderCard}>
//           <LinearGradient
//             colors={['#86EFAC', '#4ADE80']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.gradientTop}
//           />
//           <View style={styles.profileInfoContainer}>
//             <View style={styles.avatarWrapper}>
//               <View style={styles.avatarPlaceholder}>
//                 <Text style={styles.avatarInitial}>{userInitial}</Text>
//               </View>
//               <TouchableOpacity style={styles.cameraBtn}>
//                 <Icon name="camera-outline" size={16} color="#64748B" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.nameSection}>
//               <View style={styles.nameRow}>
//                 <Text style={styles.userName}>{userName}</Text>
//                 <View style={styles.proBadge}><Text style={styles.proText}>PRO</Text></View>
//               </View>
//               <Text style={styles.userEmail}>curator@example.com</Text>
//               <View style={styles.memberRow}>
//                 <Icon name="calendar-month-outline" size={14} color="#94A3B8" />
//                 <Text style={styles.memberText}>Member since March 2024</Text>
//               </View>
//               <TouchableOpacity style={styles.editBtn}>
//                 <Icon name="pencil-outline" size={16} color="#64748B" />
//                 <Text style={styles.editBtnText}>Edit Profile</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         {/* Stats Grid */}
//         <View style={styles.statsGrid}>
//           <StatBox icon="fire" color="#22C55E" value={String(stats.totalMeals)} label="MEALS LOGGED" styles={styles} />
//           <StatBox icon="scan-helper" color="#F97316" value={String(stats.totalScans)} label="TOTAL SCANS" styles={styles} />
//           <StatBox icon="trending-up" color="#3B82F6" value="145g" label="AVG PROTEIN" styles={styles} />
//           <StatBox icon="medal-outline" color="#A855F7" value="12" label="ACHIEVEMENT" styles={styles} />
//         </View>

//         {/* Weight Progress Chart Card */}
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <View style={styles.row}>
//               <Icon name="weight" size={20} color="#22C55E" />
//               <Text style={styles.cardTitle}>Weight Progress</Text>
//             </View>
//             <View style={styles.lossBadge}><Text style={styles.lossText}>-4.5 kg</Text></View>
//           </View>
//           {/* Real SVG Chart Visualization */}
//           <View style={styles.chartContainer}>
//             <View style={styles.mockChart}>
//               <Svg width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="none">
//                 {/* Background grid lines */}
//                 <Polyline points="0,30 300,30" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="5,5" />
//                 <Polyline points="0,60 300,60" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="5,5" />
//                 <Polyline points="0,90 300,90" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="5,5" />

//                 {/* The main progress line */}
//                 <Polyline
//                   points="10,20 50,40 90,30 130,60 170,50 210,80 250,75 290,100"
//                   fill="none"
//                   stroke="#22C55E"
//                   strokeWidth="4"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
                
//                 {/* Data Points */}
//                 <Circle cx="10" cy="20" r="4" fill="#22C55E" />
//                 <Circle cx="50" cy="40" r="4" fill="#22C55E" />
//                 <Circle cx="90" cy="30" r="4" fill="#22C55E" />
//                 <Circle cx="130" cy="60" r="4" fill="#22C55E" />
//                 <Circle cx="170" cy="50" r="4" fill="#22C55E" />
//                 <Circle cx="210" cy="80" r="4" fill="#22C55E" />
//                 <Circle cx="250" cy="75" r="4" fill="#22C55E" />
//                 {/* Last point highlighted */}
//                 <Circle cx="290" cy="100" r="6" fill="#FFF" stroke="#22C55E" strokeWidth="3" />
//               </Svg>
//             </View>
//             <View style={styles.chartLabels}>
//               {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map(w => (
//                 <Text key={w} style={styles.chartLabelText}>{w}</Text>
//               ))}
//             </View>
//           </View>
//         </View>

//         {/* Achievements Section */}
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//              <View style={styles.row}>
//                 <Icon name="medal-outline" size={20} color="#F97316" />
//                 <Text style={styles.cardTitle}>Achievements</Text>
//              </View>
//              <Text style={styles.earnedText}>3/6 Earned</Text>
//           </View>
//           <View style={styles.achievementGrid}>
//              <AchievementItem icon="fire" label="7-Day Streak" color="#F97316" active styles={styles} />
//              <AchievementItem icon="silverware-variant" label="100 Meals" color="#94A3B8" active styles={styles} />
//              <AchievementItem icon="arm-flex" label="Protein King" color="#FBBF24" active styles={styles} />
//              <AchievementItem icon="star-outline" label="30-Day Streak" color="#CBD5E1" styles={styles} />
//              <AchievementItem icon="trophy-outline" label="500 Meals" color="#CBD5E1" styles={styles} />
//              <AchievementItem icon="crown-outline" label="1 Year" color="#CBD5E1" styles={styles} />
//           </View>
//         </View>

//         {/* Settings Section */}
//         <View style={styles.card}>
//            <View style={styles.cardHeader}>
//               <View style={styles.row}>
//                  <Icon name="cog-outline" size={20} color="#1E293B" />
//                  <Text style={styles.cardTitle}>Settings</Text>
//               </View>
//            </View>

//            <SettingItem 
//             icon="bell-outline" 
//             title="Notifications" 
//             sub="Meal reminders & daily reports" 
//             type="switch" 
//             value={isNotifications} 
//             onValueChange={setIsNotifications}
//             isDark={isDark}
//             styles={styles}
//            />
//            <SettingItem 
//             icon="brightness-6" 
//             title="Dark Mode" 
//             sub="Toggle theme appearance" 
//             type="switch" 
//             value={isDark} 
//             onValueChange={toggleTheme}
//             isDark={isDark}
//             styles={styles}
//            />
//            <SettingItem 
//             icon="history" 
//             title="Scan History" 
//             sub="Review your previous food scans" 
//             isDark={isDark} 
//             styles={styles} 
//             onPress={() => navigation.navigate('ScanHistory' as never)}
//            />
//            <SettingItem 
//             icon="heart-outline" 
//             title="Health Goals" 
//             sub="Update your fitness targets" 
//             isDark={isDark} 
//             styles={styles} 
//             onPress={() => navigation.navigate('HealthGoals' as never)}
//            />
//            <SettingItem 
//             icon="run-fast" 
//             title="Workout Integration" 
//             sub="Connect with fitness apps" 
//             isDark={isDark} 
//             styles={styles} 
//             onPress={() => navigation.navigate('WorkoutIntegration' as never)}
//            />
//            <SettingItem icon="shield-lock-outline" title="Privacy & Data" sub="Manage your data & privacy" isDark={isDark} styles={styles} />
//            <SettingItem icon="help-circle-outline" title="Help & Support" sub="FAQ, contact, and feedback" isDark={isDark} styles={styles} />
           
//            <TouchableOpacity style={styles.signOutBtn} onPress={handleLogout}>
//               <Icon name="logout" size={20} color="#EF4444" />
//               <Text style={styles.signOutText}>Sign Out</Text>
//            </TouchableOpacity>
//         </View>

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// // --- Sub-components ---

// const StatBox = ({ icon, color, value, label, styles }: any) => (
//   <View style={styles.statBox}>
//     <Icon name={icon} size={20} color={color} />
//     <Text style={styles.statValue}>{value}</Text>
//     <Text style={styles.statLabel}>{label}</Text>
//   </View>
// );

// const AchievementItem = ({ icon, label, color, active, styles }: any) => (
//   <View style={[styles.achItem, active ? styles.achActive : styles.achInactive]}>
//     <Icon name={icon} size={24} color={color} />
//     <Text style={styles.achLabel}>{label}</Text>
//   </View>
// );

// const SettingItem = ({ icon, title, sub, type, value, onValueChange, isDark, styles, onPress }: any) => (
//   <TouchableOpacity 
//     style={styles.settingItem} 
//     activeOpacity={type === 'switch' ? 1 : 0.7}
//     onPress={type !== 'switch' ? onPress : undefined}
//   >
//     <View style={styles.settingLeft}>
//       <View style={styles.settingIconBg}>
//         <Icon name={icon} size={20} color={isDark ? "#94A3B8" : "#64748B"} />
//       </View>
//       <View style={{ marginLeft: 12, flex: 1 }}>
//         <Text style={styles.settingTitle}>{title}</Text>
//         <Text style={styles.settingSub}>{sub}</Text>
//       </View>
//       {type === 'switch' ? (
//         <Switch 
//           value={value} 
//           onValueChange={onValueChange} 
//           trackColor={{ false: '#2D3748', true: '#4ADE80' }} 
//           thumbColor={Platform.OS === 'ios' ? undefined : (value ? '#FFF' : '#F4F4F4')}
//         />
//       ) : (
//         <Icon name="chevron-right" size={20} color="#CBD5E1" />
//       )}
//     </View>
//   </TouchableOpacity>
// );

// const createDynamicStyles = (isDark: boolean) => StyleSheet.create({
//   container: { flex: 1, backgroundColor: isDark ? '#000' : '#F4F9FF' },
//   scrollContent: { paddingHorizontal: 16, paddingTop: 10 },

//   // Header Card
//   profileHeaderCard: {
//     backgroundColor: isDark ? '#111' : '#FFF',
//     borderRadius: 24,
//     overflow: 'hidden',
//     marginBottom: 20,
//     elevation: 1,
//     borderWidth: isDark ? 1 : 0,
//     borderColor: '#333'
//   },
//   gradientTop: { height: 100 },
//   profileInfoContainer: { padding: 20, marginTop: -50 },
//   avatarWrapper: { marginBottom: 15 },
//   avatarPlaceholder: {
//     width: 90,
//     height: 90,
//     borderRadius: 24,
//     backgroundColor: '#86EFAC',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 4,
//     borderColor: isDark ? '#111' : '#FFF',
//   },
//   avatarInitial: { fontSize: 36, fontWeight: 'bold', color: '#1E293B' },
//   cameraBtn: {
//     position: 'absolute',
//     bottom: -5,
//     right: -10,
//     backgroundColor: isDark ? '#222' : '#FFF',
//     padding: 8,
//     borderRadius: 12,
//     elevation: 3,
//   },
//   nameSection: { marginTop: 5 },
//   nameRow: { flexDirection: 'row', alignItems: 'center' },
//   userName: { fontSize: 22, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
//   proBadge: { 
//     backgroundColor: isDark ? '#064E3B' : '#DCFCE7', 
//     paddingHorizontal: 8, 
//     paddingVertical: 2, 
//     borderRadius: 8, 
//     marginLeft: 10 
//   },
//   proText: { fontSize: 10, color: '#22C55E', fontWeight: 'bold' },
//   userEmail: { fontSize: 14, color: isDark ? '#94A3B8' : '#64748B', marginTop: 4 },
//   memberRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
//   memberText: { fontSize: 12, color: '#94A3B8', marginLeft: 5 },
//   editBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 15,
//     borderWidth: 1,
//     borderColor: isDark ? '#333' : '#E2E8F0',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     alignSelf: 'flex-start',
//   },
//   editBtnText: { fontSize: 14, color: isDark ? '#CBD5E1' : '#64748B', marginLeft: 8, fontWeight: '600' },

//   // Stats Grid
//   statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 10 },
//   statBox: {
//     width: (width - 45) / 2,
//     backgroundColor: isDark ? '#111' : '#FFF',
//     padding: 18,
//     borderRadius: 20,
//     marginBottom: 15,
//     elevation: 1,
//     borderWidth: isDark ? 1 : 0,
//     borderColor: '#333'
//   },
//   statValue: { fontSize: 20, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginTop: 10 },
//   statLabel: { fontSize: 10, color: '#94A3B8', fontWeight: 'bold', letterSpacing: 0.5, marginTop: 4 },

//   // General Card
//   card: { 
//     backgroundColor: isDark ? '#111' : '#FFF', 
//     borderRadius: 24, 
//     padding: 20, 
//     marginBottom: 20, 
//     elevation: 1,
//     borderWidth: isDark ? 1 : 0,
//     borderColor: '#333'
//   },
//   cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
//   row: { flexDirection: 'row', alignItems: 'center' },
//   cardTitle: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginLeft: 10 },
//   lossBadge: { backgroundColor: isDark ? '#064E3B' : '#DCFCE7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
//   lossText: { fontSize: 12, color: '#22C55E', fontWeight: 'bold' },

//   // Weight Chart
//   chartContainer: { alignItems: 'center' },
//   mockChart: { width: '100%', height: 120 },
//   chartLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 },
//   chartLabelText: { fontSize: 10, color: '#94A3B8' },

//   // Achievement Grid
//   achievementGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
//   earnedText: { fontSize: 12, color: '#94A3B8' },
//   achItem: {
//     width: (width - 85) / 3,
//     paddingVertical: 15,
//     borderRadius: 16,
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   achActive: { backgroundColor: isDark ? '#064E3B' : '#F0FDF4' },
//   achInactive: { backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC' },
//   achLabel: { fontSize: 10, color: isDark ? '#94A3B8' : '#64748B', fontWeight: 'bold', marginTop: 8, textAlign: 'center' },

//   // Settings
//   settingItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: isDark ? '#1A1A1A' : '#F8FAFC' },
//   settingLeft: { flexDirection: 'row', alignItems: 'center' },
//   settingIconBg: {
//     width: 36,
//     height: 36,
//     borderRadius: 10,
//     backgroundColor: isDark ? '#222' : '#F1F5F9',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   settingTitle: { fontSize: 15, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
//   settingSub: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
//   signOutBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//     backgroundColor: isDark ? '#2D1616' : '#FEF2F2',
//     padding: 15,
//     borderRadius: 16,
//     justifyContent: 'center',
//   },
//   signOutText: { color: '#EF4444', fontWeight: 'bold', marginLeft: 10, fontSize: 16 },
// });

// export default ProfileScreen;

import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
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
import Svg, { Circle, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isNotifications, setIsNotifications] = React.useState(true);
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'SelectRole' }] }));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section with Image Background */}
        <ImageBackground 
          source={require('../../../../assets/food_bg.jpg')} 
          style={styles.headerBg}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <SafeAreaView>
              <View style={styles.topNav}>
                <Icon name="menu" size={28} color="#FFF" />
                <Icon name="bell-badge-outline" size={26} color="#FFF" />
              </View>

              <View style={styles.profileRow}>
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>A</Text>
                  </View>
                  <TouchableOpacity style={styles.camBtn}>
                    <Icon name="camera" size={12} color="#FFF" />
                  </TouchableOpacity>
                </View>

                <View style={styles.userMeta}>
                  <View style={styles.nameRow}>
                    <Text style={styles.nameText}>Amit Kumar</Text>
                    <View style={styles.freeBadge}><Text style={styles.freeText}>FREE</Text></View>
                  </View>
                  <View style={styles.infoLine}>
                    <Icon name="email-outline" size={14} color="#CBD5E1" />
                    <Text style={styles.infoText}>amitkumaryadav6022@gmail.com</Text>
                  </View>
                  <View style={styles.infoLine}>
                    <Icon name="calendar-month" size={14} color="#94A3B8" />
                    <Text style={styles.infoText}>Member since March 2024</Text>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>

        <View style={styles.contentBody}>
          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard icon="silverware-fork-knife" val="342" label="MEALS LOGGED" color="#86EFAC" />
            <StatCard icon="fire" val="14" label="DAY STREAK" color="#FB923C" />
            <StatCard icon="bottle-tonic-plus-outline" val="145g" label="AVG PROTEIN" color="#4ADE80" />
            <StatCard icon="barcode-scan" val="12" label="ACHIEVEMENT" color="#60A5FA" />
          </View>

          {/* Weight Progress Chart */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.flexRow}>
                <Icon name="trending-down" size={20} color="#86EFAC" />
                <Text style={styles.cardTitle}>Weight Progress</Text>
              </View>
              <View style={styles.weightBadge}>
                <Icon name="arrow-down" size={14} color="#86EFAC" />
                <Text style={styles.weightBadgeText}>4.5 kg</Text>
              </View>
            </View>

            <View style={styles.chartWrapper}>
              <View style={styles.yAxis}>
                {['100', '95', '90', '85', '80'].map(v => <Text key={v} style={styles.axisLabel}>{v}</Text>)}
              </View>
              <View style={styles.chartArea}>
                <View style={styles.chartDropdown}>
                   <Text style={styles.dropdownLabel}>8 Weeks</Text>
                   <Icon name="chevron-down" size={16} color="#FFF" />
                </View>
                <Svg height="100" width={width - 100}>
                  <Defs>
                    <SvgGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor="#86EFAC" stopOpacity="0.3" />
                      <Stop offset="1" stopColor="#86EFAC" stopOpacity="0" />
                    </SvgGradient>
                  </Defs>
                  <Path
                    d="M0 20 L40 35 L80 45 L120 55 L160 70 L200 80 L240 90 L280 100"
                    fill="none" stroke="#86EFAC" strokeWidth="2"
                  />
                  {[0, 40, 80, 120, 160, 200, 240, 280].map((x, i) => (
                    <Circle key={i} cx={x} cy={20 + i * 11} r="4" fill="#86EFAC" stroke="#000" strokeWidth="1" />
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
              <AchItem icon="fire" title="7-Day Streak" active color="#FB923C" />
              <AchItem icon="target" title="100 Meals" active color="#86EFAC" />
              <AchItem icon="arm-flex" title="Protein King" active color="#FBBF24" />
              <AchItem icon="star" title="30-Day Streak" locked />
              <AchItem icon="trophy" title="500 Meals" locked />
              <AchItem icon="crown" title="1 Year" locked />
            </View>
          </View>

          {/* Settings */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.flexRow}>
                <Icon name="cog-outline" size={20} color="#86EFAC" />
                <Text style={styles.cardTitle}>Settings</Text>
              </View>
            </View>
            <SettingRow icon="bell-outline" label="Notifications" sub="Routine reminders & tips" type="switch" val={isNotifications} onVal={setIsNotifications} />
            <SettingRow icon="moon-waning-crescent" label="Dark Mode" sub="Toggle theme appearance" type="switch" val={isDarkMode} onVal={setIsDarkMode} />
            <SettingRow icon="target-variant" label="Health Goals" sub="Update your fitness targets" />
            <SettingRow icon="link-variant" label="Workout Integration" sub="Connect with fitness apps" />
            <SettingRow icon="shield-check-outline" label="Privacy & Data" sub="Manage your data & privacy" />
            <SettingRow icon="help-circle-outline" label="Help & Support" sub="FAQ, contact, and feedback" />
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
              <TouchableOpacity style={styles.bannerBtn}>
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

const StatCard = ({ icon, val, label, color }: any) => (
  <View style={styles.statBox}>
    <Icon name={icon} size={22} color={color} />
    <Text style={styles.statVal}>{val}</Text>
    <Text style={styles.statLabel}>{label}</Text>
    <View style={[styles.statLine, { backgroundColor: color }]} />
  </View>
);

const AchItem = ({ icon, title, active, locked, color }: any) => (
  <View style={styles.achBox}>
    <View style={[styles.achCircle, locked && styles.lockedCircle]}>
      <Icon name={icon} size={26} color={active ? color : '#475569'} />
      {active && <View style={styles.checkBadge}><Icon name="check" size={10} color="#000" /></View>}
      {locked && <Icon name="lock" size={12} color="#94A3B8" style={styles.lockIcon} />}
    </View>
    <Text style={[styles.achTitle, locked && { color: '#64748B' }]}>{title}</Text>
  </View>
);

const SettingRow = ({ icon, label, sub, type, val, onVal }: any) => (
  <TouchableOpacity style={styles.settingRow}>
    <View style={styles.flexRow}>
      <Icon name={icon} size={22} color="#94A3B8" />
      <View style={{ marginLeft: 16, flex: 1 }}>
        <Text style={styles.settingLabelText}>{label}</Text>
        <Text style={styles.settingSubText}>{sub}</Text>
      </View>
      {type === 'switch' ? (
        <Switch value={val} onValueChange={onVal} trackColor={{ false: '#333', true: '#22C55E' }} thumbColor="#FFF" />
      ) : (
        <Icon name="chevron-right" size={20} color="#475569" />
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090909' },
  scrollContent: { paddingBottom: 20 },
  headerBg: { height: 260, width: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 16 },
  topNav: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS === 'ios' ? 10 : 40 },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginTop: 25 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(21, 128, 61, 0.5)', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#86EFAC' },
  avatarText: { fontSize: 40, color: '#FFF', fontWeight: 'bold' },
  camBtn: { position: 'absolute', bottom: 5, right: 0, backgroundColor: '#000', padding: 4, borderRadius: 10, borderWidth: 1, borderColor: '#333' },
  userMeta: { marginLeft: 16, flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  nameText: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  freeBadge: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginLeft: 10 },
  freeText: { fontSize: 10, color: '#86EFAC', fontWeight: 'bold' },
  infoLine: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  infoText: { fontSize: 13, color: '#CBD5E1', marginLeft: 8 },
  contentBody: { paddingHorizontal: 16, marginTop: -20 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statBox: { width: (width - 60) / 4, backgroundColor: '#161616', padding: 12, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#262626' },
  statVal: { fontSize: 20, fontWeight: 'bold', color: '#FFF', marginTop: 8 },
  statLabel: { fontSize: 7, color: '#94A3B8', fontWeight: 'bold', textAlign: 'center', marginTop: 4 },
  statLine: { height: 2, width: '70%', borderRadius: 1, marginTop: 8 },
  card: { backgroundColor: '#161616', borderRadius: 20, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#262626' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFF', marginLeft: 10 },
  weightBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(34, 197, 94, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  weightBadgeText: { color: '#86EFAC', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
  chartWrapper: { flexDirection: 'row', height: 140 },
  yAxis: { justifyContent: 'space-between', paddingBottom: 25 },
  axisLabel: { color: '#475569', fontSize: 10, fontWeight: 'bold' },
  chartArea: { flex: 1, marginLeft: 10, justifyContent: 'flex-end' },
  xAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  chartDropdown: { position: 'absolute', top: -30, right: 0, backgroundColor: '#262626', padding: 6, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  dropdownLabel: { color: '#FFF', fontSize: 11, marginRight: 4 },
  achievementsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  earnedCount: { color: '#94A3B8', fontSize: 12 },
  achBox: { width: '31%', alignItems: 'center', marginBottom: 20 },
  achCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#4ADE80' },
  lockedCircle: { borderColor: '#334155' },
  checkBadge: { position: 'absolute', top: -2, right: -2, backgroundColor: '#86EFAC', borderRadius: 10, padding: 2 },
  lockIcon: { position: 'absolute', top: 5, right: 5 },
  achTitle: { color: '#FFF', fontSize: 10, marginTop: 8, textAlign: 'center', fontWeight: '600' },
  settingRow: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#262626' },
  settingLabelText: { fontSize: 15, color: '#FFF', fontWeight: '500' },
  settingSubText: { fontSize: 12, color: '#64748B', marginTop: 2 },
  bannerBg: { marginTop: 10, overflow: 'hidden' },
  bannerOverlay: { backgroundColor: 'rgba(6, 78, 59, 0.7)', padding: 20, borderRadius: 20 },
  bannerSub: { color: '#FFF', fontSize: 14 },
  bannerTitle: { color: '#86EFAC', fontSize: 22, fontWeight: 'bold', marginVertical: 4 },
  bannerDesc: { color: '#E2E8F0', fontSize: 12, lineHeight: 18, marginBottom: 15, maxWidth: '80%' },
  bannerBtn: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, alignSelf: 'flex-start' },
  bannerBtnText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
});

export default ProfileScreen;