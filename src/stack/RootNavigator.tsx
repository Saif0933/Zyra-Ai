import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Auth & Role Selection
import LoginScreen from '../selectRole/LoginScreen';
import PersonalizedScreen from '../selectRole/PersonalizedScreen';
import SelectRoleScreen from '../selectRole/SelectRoleScreen';
import WelcomeAboardScreen from '../selectRole/WelcomeAboardScreen';

// Main Tab Navigators
import BeautiCareTabNavigator from '../beautiCare/navigation/BeautiCareTabNavigator';
import BottomTabNavigator from '../gymfitness/navigation/BottomTabNavigator';

// Setting Screens
import ProductShelfScreen from '../beautiCare/screen/setting/ProductShelfScreen';
import SkinProfileScreen from '../beautiCare/screen/setting/SkinProfileScreen';
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
  Personalized: { role: string };
  WelcomeAboard: { role: string };
  HealthAiMain: undefined;
  BeautiCareMain: undefined;
  HealthGoals: undefined;
  WorkoutIntegration: undefined;
  ScanHistory: undefined;
  SkinProfile: undefined;
  ProductShelf: undefined;
};

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Introduction */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      {/* Auth Flow */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
      <Stack.Screen name="Personalized" component={PersonalizedScreen} />
      <Stack.Screen name="WelcomeAboard" component={WelcomeAboardScreen} />

      {/* Main Apps */}
      <Stack.Screen name="HealthAiMain" component={BottomTabNavigator} />
      <Stack.Screen name="BeautiCareMain" component={BeautiCareTabNavigator} />

      {/* Sub Screens / Settings */}
      <Stack.Screen name="HealthGoals" component={HealthGoalScreen} />
      <Stack.Screen name="WorkoutIntegration" component={WorkoutIntegrationScreen} />
      <Stack.Screen name="ScanHistory" component={ScanHistoryScreen} />
      <Stack.Screen name="SkinProfile" component={SkinProfileScreen} />
      <Stack.Screen name="ProductShelf" component={ProductShelfScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
