// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import React from 'react';
// import { Platform, StyleSheet, View } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useTheme } from '../../theme/ThemeContext';
// import { ThemeColors } from '../../theme/colors';

// // Screens
// import AiScreen from '../screen/home/AiScreen';
// import HomeScreen from '../screen/home/HomeScreen';
// import ProfileScreen from '../screen/home/ProfileScreen';
// import ProgressScreen from '../screen/home/ProgressScreen';
// import ScanScreen from '../screen/home/ScanScreen';

// const Tab = createBottomTabNavigator();

// const BottomTabNavigator = () => {
//   const { colors, isDark } = useTheme();
//   const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: styles.tabBar,
//         tabBarActiveTintColor: colors.primary,
//         tabBarInactiveTintColor: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
//         tabBarShowLabel: true,
//         tabBarLabelStyle: styles.tabBarLabel,
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="home-variant" color={color} size={size + 2} />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Scan"
//         component={ScanScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="qrcode-scan" color={color} size={size + 2} />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Ai"
//         component={AiScreen}
//         options={{
//           tabBarIcon: () => (
//             <View style={styles.aiIconContainer}>
//               <Icon name="robot" color={colors.white} size={32} />
//             </View>
//           ),
//           tabBarLabel: 'AI',
//         }}
//       />

//       <Tab.Screen
//         name="Progress"
//         component={ProgressScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="chart-timeline-variant" color={color} size={size + 2} />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="account-circle" color={color} size={size + 2} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// const createStyles = (colors: ThemeColors, isDark: boolean) => StyleSheet.create({
//   tabBar: {
//     backgroundColor: isDark ? '#111' : colors.card,
//     height: Platform.OS === 'ios' ? 88 : 70,
//     borderTopWidth: 1,
//     borderTopColor: isDark ? '#222' : colors.border,
//     paddingBottom: Platform.OS === 'ios' ? 30 : 12,
//     paddingTop: 10,
//     elevation: 10,
//     shadowColor: colors.black,
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: isDark ? 0.2 : 0.05,
//     shadowRadius: 10,
//   },
//   tabBarLabel: {
//     fontSize: 9,
//     fontWeight: '800',
//     marginBottom: 6,
//     textTransform: 'uppercase',
//     letterSpacing: 1,
//   },
//   aiIconContainer: {
//     width: 60,
//     height: 60,
//     backgroundColor: colors.primary,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     top: -15,
//     borderWidth: 5,
//     borderColor: isDark ? '#000' : colors.background,
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.5,
//     shadowRadius: 12,
//     elevation: 10,
//   },
// });

// export default BottomTabNavigator;


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/ThemeContext';

// Screens (Components wahi rahenge jo aapne diye the)
import AiScreen from '../screen/home/AiScreen';
import HomeScreen from '../screen/home/HomeScreen';
import ProfileScreen from '../screen/home/ProfileScreen';
import ProgressScreen from '../screen/home/ProgressScreen';
import ScanScreen from '../screen/home/ScanScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);
  // Image ke mutabiq colors: Active = #22C55E (Green), Inactive = #64748B (Greyish)
  const ACTIVE_COLOR = '#22C55E';
  const INACTIVE_COLOR = isDark ? '#94A3B8' : '#64748B';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="view-dashboard-outline" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Scanner"
        component={ScanScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="google-lens" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={AiScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="chat-processing-outline" color={color} size={24} />
              {/* Image mein Chat icon ke upar ek chota green dot hai notification ke liye */}
              <View style={styles.notificationDot} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Planner"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="calendar-month-outline" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle-outline" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const createDynamicStyles = (isDark: boolean) => StyleSheet.create({
  tabBar: {
    backgroundColor: isDark ? '#111111' : '#FFFFFF',
    height: Platform.OS === 'ios' ? 88 : 70,
    borderTopWidth: 1,
    borderTopColor: isDark ? '#222222' : '#F1F5F9', // Light border as seen in image
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    paddingTop: 10,
    elevation: 0, // Material elevation hata di kyunki image flat hai
  },
  tabBarLabel: {
    fontSize: 10,
    marginTop: -2,
    marginBottom: 4,
    fontFamily: 'serif',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E', // Match active green
    borderWidth: 1.5,
    borderColor: isDark ? '#111111' : '#FFFFFF',
  },
});

export default BottomTabNavigator;