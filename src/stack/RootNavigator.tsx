import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Auth & Role Selection
import LoginScreen from '../selectRole/LoginScreen';
import SelectRoleScreen from '../selectRole/SelectRoleScreen';

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
