import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme/ThemeContext';

// Auth Screens
import LoginScreen from './src/selectRole/LoginScreen';
import SelectRoleScreen from './src/selectRole/SelectRoleScreen';

// Main App Navigators
import BeautiCareTabNavigator from './src/beautiCare/navigation/BeautiCareTabNavigator';
import BottomTabNavigator from './src/gymfitness/navigation/BottomTabNavigator';

const Stack = createNativeStackNavigator();

function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000000' : '#F8FAFC'}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          {/* Auth Flow */}
          <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />

          {/* Main App - HealthAi */}
          <Stack.Screen name="HealthAiMain" component={BottomTabNavigator} />

          {/* Main App - BeautiCare */}
          <Stack.Screen name="BeautiCareMain" component={BeautiCareTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
