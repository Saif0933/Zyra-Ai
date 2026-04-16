import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ClinicalCuratorOnboarding = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>CLINICAL CURATOR</Text>
        <TouchableOpacity>
          <Text style={styles.skipBtn}>SKIP</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Visual Section */}
        <View style={styles.visualSection}>
          <View style={styles.circleContainer}>
            {/* Abstract Geometry (Simplified for Native) */}
            <View style={[styles.orbit, { width: width * 0.8, height: width * 0.8 }]} />
            <View style={[styles.orbit, { width: width * 0.6, height: width * 0.6 }]} />
            
            {/* Hero Image */}
            <View style={styles.imageFrame}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800' }}
                style={styles.heroImage}
              />
              <View style={styles.glassOverlay} />
            </View>

            {/* Vitality Badge */}
            <View style={styles.badge}>
              <View style={styles.badgeIconContainer}>
                <Text style={styles.iconPlaceholder}>📈</Text>
              </View>
              <View>
                <Text style={styles.badgeLabel}>CALIBRATION</Text>
                <Text style={styles.badgeValue}>Optimal Precision</Text>
              </View>
              <View style={styles.pulseDot} />
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.activeDot]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>

          <Text style={styles.headline}>
            Redefining <Text style={styles.italic}>Precision</Text> Nutrition.
          </Text>

          <Text style={styles.description}>
            Harness the power of laboratory-grade AI to curate your wellness. 
            From molecular food analysis to clinical progress tracking, your data is now your edge.
          </Text>

          {/* Bento Grid */}
          <View style={styles.grid}>
            <FeatureCard 
              title="FOOD SCANNING" 
              desc="Molecular breakdown of every meal via advanced visual recognition." 
              icon="🔍"
            />
            <FeatureCard 
              title="CLINICAL AI" 
              desc="Predictive insights tailored to your unique metabolic profile." 
              icon="✨"
            />
            <FeatureCard 
              title="LABEL ANALYSIS" 
              desc="Instant decoding of synthetic additives and hidden health impacts." 
              icon="📋"
            />
            <FeatureCard 
              title="BIO-PROGRESS" 
              desc="Long-form data visualization of your health evolution." 
              icon="📊"
            />
          </View>

          {/* Action Area */}
          <View style={styles.footerActions}>
            <TouchableOpacity style={styles.gradientButton}>
              <Text style={styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>

            <View style={styles.userJoinContainer}>
              <View style={styles.avatarStack}>
                <View style={[styles.avatar, { backgroundColor: '#adefe1', zIndex: 2 }]} />
                <View style={[styles.avatar, { backgroundColor: '#92d3c5', marginLeft: -10, zIndex: 1 }]} />
              </View>
              <Text style={styles.joinText}>Join 12k+ curators</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Links */}
      <View style={styles.bottomLinks}>
        <Text style={styles.linkText}>PRIVACY PROTOCOL</Text>
        <Text style={styles.linkText}>LABORATORY TERMS</Text>
      </View>
    </SafeAreaView>
  );
};

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: string;
}

const FeatureCard = ({ title, desc, icon }: FeatureCardProps) => (
  <View style={styles.card}>
    <View style={styles.cardIconBox}>
      <Text style={{ fontSize: 18 }}>{icon}</Text>
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDesc}>{desc}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    width: '100%',
    zIndex: 10,
  },
  logo: {
    fontFamily: 'System', // Use Manrope if linked
    fontWeight: '800',
    fontSize: 16,
    color: '#005147',
    letterSpacing: -0.5,
  },
  skipBtn: {
    fontSize: 12,
    color: '#4e625f',
    fontWeight: '600',
    letterSpacing: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  visualSection: {
    height: height * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f4f3',
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbit: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(110, 121, 118, 0.1)',
    borderRadius: 999,
  },
  imageFrame: {
    width: width * 0.65,
    height: width * 0.65,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#191c1c',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 81, 71, 0.05)',
  },
  iconPlaceholder: {
    fontSize: 18,
    color: '#005147',
  },
  badge: {
    position: 'absolute',
    top: 20,
    right: -20,
    backgroundColor: 'rgba(248, 250, 249, 0.9)',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  badgeIconContainer: {
    backgroundColor: 'rgba(0, 81, 71, 0.1)',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  badgeLabel: {
    fontSize: 8,
    color: '#4e625f',
    fontWeight: '700',
    letterSpacing: 1,
  },
  badgeValue: {
    fontSize: 12,
    color: '#005147',
    fontWeight: 'bold',
  },
  pulseDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#005147',
  },
  contentSection: {
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  progressDot: {
    height: 4,
    width: 32,
    backgroundColor: '#e1e3e2',
    borderRadius: 2,
    marginRight: 8,
  },
  activeDot: {
    backgroundColor: '#005147',
  },
  headline: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#191c1c',
    lineHeight: 40,
    marginBottom: 20,
  },
  italic: {
    color: '#005147',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#4e625f',
    lineHeight: 24,
    marginBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  card: {
    width: '48%',
    backgroundColor: '#f2f4f3',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardIconBox: {
    width: 36,
    height: 36,
    backgroundColor: '#f8faf9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#191c1c',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 10,
    color: '#3e4946',
    lineHeight: 14,
  },
  footerActions: {
    alignItems: 'center',
    marginBottom: 60,
  },
  gradientButton: {
    backgroundColor: '#005147', // Linear gradient would need a library, using primary
    width: '100%',
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#005147',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  userJoinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  avatarStack: {
    flexDirection: 'row',
    marginRight: 10,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#f8faf9',
  },
  joinText: {
    fontSize: 11,
    color: '#4e625f',
  },
  bottomLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 20,
  },
  linkText: {
    fontSize: 9,
    color: '#6e7976',
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default ClinicalCuratorOnboarding;