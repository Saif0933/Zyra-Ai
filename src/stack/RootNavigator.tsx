import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Auth & Role Selection
import LoginScreen from '../selectRole/LoginScreen';
import SelectRoleScreen from '../selectRole/SelectRoleScreen';
import RegisterScreen from '../selectRole/RegisterScreen';

// Main Tab Navigators
import BeautiCareTabNavigator from '../beautiCare/navigation/BeautiCareTabNavigator';
import BottomTabNavigator from '../gymfitness/navigation/BottomTabNavigator';

// Setting Screens
import HealthGoalScreen from '../gymfitness/screen/setting/HealthGoalScreen';
import WorkoutIntegrationScreen from '../gymfitness/screen/setting/WorkoutIntegrationScreen';

// Other Screens
import OnboardingScreen from '../gymfitness/screen/home/Onboarding';
import ScanHistoryScreen from '../gymfitness/screen/home/ScanHistoryScreen';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Onboarding: undefined;
  SelectRole: undefined;
  Login: { role?: string } | undefined;
  Register: { role?: string } | undefined;
  HealthAiMain: undefined;
  BeautiCareMain: undefined;
  HealthGoals: undefined;
  WorkoutIntegration: undefined;
  ScanHistory: undefined;
};

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectRole"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Introduction */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      {/* Auth Flow */}
      <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Main Apps */}
      <Stack.Screen name="HealthAiMain" component={BottomTabNavigator} />
      <Stack.Screen name="BeautiCareMain" component={BeautiCareTabNavigator} />

      {/* Sub Screens / Settings */}
      <Stack.Screen name="HealthGoals" component={HealthGoalScreen} />
      <Stack.Screen name="WorkoutIntegration" component={WorkoutIntegrationScreen} />
      <Stack.Screen name="ScanHistory" component={ScanHistoryScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
