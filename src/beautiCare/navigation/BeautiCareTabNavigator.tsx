
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/ThemeContext';

// Screens
import AiScreen from '../screen/home/AiScreen';
import HomeScreen from '../screen/home/HomeScreen';
import ProfileScreen from '../screen/home/ProfileScreen';
import ProgressScreen from '../screen/home/ProgressScreen';
import ScanScreen from '../screen/home/ScanScreen';

const Tab = createBottomTabNavigator();

const BeautiCareTabNavigator = () => {
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);

  const ACTIVE_COLOR = '#F43F5E';
  const INACTIVE_COLOR = isDark ? '#94A3B8' : '#64748B';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: true,
        detachInactiveScreens: true,
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
            <Icon name="barcode-scan" color={color} size={24} />
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
              <View style={styles.notificationDot} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Routine"
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
    borderTopColor: isDark ? '#222222' : '#F1F5F9',
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    paddingTop: 10,
    elevation: 0,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: -2,
    marginBottom: 4,
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F43F5E',
    borderWidth: 1.5,
    borderColor: isDark ? '#111111' : '#FFFFFF',
  },
});

export default BeautiCareTabNavigator;
