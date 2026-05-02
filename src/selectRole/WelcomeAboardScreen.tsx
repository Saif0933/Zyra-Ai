import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const WelcomeAboardScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { role } = route.params;

  // Dynamic Theme Color
  const themeColor = role === 'healthai' ? '#2ECC71' : '#F43F5E';
  const lightThemeColor = role === 'healthai' ? '#6EF096' : '#FECDD3';
  const ultraLightThemeColor = role === 'healthai' ? '#EBFBF2' : '#FFF1F2';
  const dashboardBtnColor = role === 'healthai' ? '#00D85E' : '#FDA4AF';

  const handleEnterDashboard = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: role === 'healthai' ? 'HealthAiMain' : 'BeautiCareMain' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Background soft gradient effect can be added here if using LinearGradient */}
      <View style={styles.contentWrapper}>
        
        {/* Top Header Section */}
        <View style={[styles.headerIconContainer, { backgroundColor: lightThemeColor, shadowColor: lightThemeColor }]}>
          <Icon name="account-plus" size={40} color="#0D1B2A" />
        </View>

        <Text style={styles.title}>Welcome Aboard!</Text>
        <Text style={[styles.subtitle, { color: themeColor }]}>Your journey with Zyra AI starts now.</Text>

        {/* Success Card */}
        <View style={styles.successCard}>
          <View style={[styles.checkIconContainer, { backgroundColor: ultraLightThemeColor }]}>
            <Icon name="check" size={50} color={themeColor} />
          </View>

          <Text style={styles.cardTitle}>Profile Optimized</Text>
          <Text style={styles.cardSubtitle}>
            Calibration complete. Your AI is ready.
          </Text>

          <TouchableOpacity 
            style={[styles.dashboardButton, { backgroundColor: dashboardBtnColor }]}
            onPress={handleEnterDashboard}
          >
            <Text style={styles.buttonText}>Enter Your Dashboard</Text>
            <Icon name="arrow-right" size={24} color="#0D1B2A" style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9FC', // Matching the soft blue tint in your image
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.1,
  },
  headerIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#6EF096',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    // Shadow for iOS
    shadowColor: '#6EF096',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    // Elevation for Android
    elevation: 8,
  },
  title: {
    fontSize: 32,
    color: '#0D1B2A',
    textAlign: 'center',
    letterSpacing: -0.5,
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#5C677D',
    marginTop: 10,
    fontFamily: 'serif',
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    width: width * 0.85,
    borderRadius: 35,
    padding: 30,
    marginTop: 50,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    // Elevation for Android
    elevation: 10,
  },
  checkIconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#EBFBF2', // Very soft green tint
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 22,
    color: '#0D1B2A',
    marginBottom: 15,
    fontFamily: 'serif',
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#5C677D',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 10,
    fontFamily: 'serif',
  },
  dashboardButton: {
    backgroundColor: '#00D85E', // Vibrant green from the image
    width: '100%',
    height: 65,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  buttonText: {
    fontSize: 15,
    color: '#0D1B2A',
    fontFamily: 'serif',
    marginRight: 15,
  },
  arrowIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default WelcomeAboardScreen;