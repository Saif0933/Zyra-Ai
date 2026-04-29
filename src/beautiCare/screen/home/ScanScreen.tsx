
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';
// import { useSaveProductScan } from '../../../auth/hook/beauticare/useBeauticare';

const { width } = Dimensions.get('window');

const BeautiCareScanScreen = () => {
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // const saveScanMutation = useSaveProductScan();

  const handleCapture = async () => {
    const result = await launchCamera({ mediaType: 'photo', quality: 0.8 });
    if (result.assets && result.assets[0].uri) {
      processImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
    if (result.assets && result.assets[0].uri) {
      processImage(result.assets[0].uri);
    }
  };

  const processImage = async (uri: string) => {
    setImageUri(uri);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // 1. Run ML Kit Text Recognition
      const result = await TextRecognition.recognize(uri);
      const text = result.text.toLowerCase();

      // 2. Strict Skincare Validation Keywords
      const strictKeywords = [
        'serum', 'moisturizer', 'cleanser', 'toner', 'sunscreen', 'spf', 
        'hyaluronic', 'niacinamide', 'salicylic', 'glycolic', 'retinol', 
        'peptides', 'dermatologist', 'exfoliant', 'lotion', 'cream', 'skincare'
      ];
      
      if (!text || text.trim().length === 0) {
        Alert.alert('No Text Detected', 'We could not read any text on this image. Please ensure the product label is clearly visible and in focus.');
        setIsAnalyzing(false);
        setImageUri(null);
        return;
      }

      // Check for exact word matches to avoid accidental substring matches
      const isSkincare = strictKeywords.some(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(text);
      });
      
      if (!isSkincare) {
        Alert.alert('Invalid Product', 'This does not appear to be a skincare product based on its text label. Please scan a valid skincare product.');
        setIsAnalyzing(false);
        setImageUri(null);
        return;
      }

      // 3. Provide Product Information (Mocked for now since backend is pending)
      setTimeout(() => {
        const mockResult = {
          name: 'Glow Vit-C Serum',
          safetyScore: 92,
          harmLevel: 'Low',
          irritants: 0,
          keyIngredients: 'Ascorbic Acid, Niacinamide',
          benefit: 'Brightening & Anti-aging',
          ph: '3.5',
          rating: 'Safe',
          oilySkin: 'Good', // Added field
        };

        setIsAnalyzing(false);
        setAnalysisResult(mockResult);
      }, 1500);

    } catch (error) {
      console.log('Text Recognition Error:', error);
      Alert.alert('Scan Failed', 'Could not analyze the image text.');
      setIsAnalyzing(false);
      setImageUri(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#000' : '#FFF9FA'} />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerIconContainer}>
          <Icon name="barcode-scan" size={28} color="#F43F5E" />
        </View>
        <Text style={styles.headerTitle}>Product Scanner</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {!analysisResult && (
          <>
            <Text style={styles.description}>
              Upload or capture a photo of your beauty product — AI will analyze its ingredient safety instantly
            </Text>

            {/* Drop Zone / Upload Card */}
            <View style={styles.uploadCard}>
              <View style={styles.dashedFrame}>
                <View style={[styles.corner, { top: -2, left: -2, borderBottomWidth: 0, borderRightWidth: 0 }]} />
                <View style={[styles.corner, { top: -2, right: -2, borderBottomWidth: 0, borderLeftWidth: 0 }]} />
                <View style={[styles.corner, { bottom: -2, left: -2, borderTopWidth: 0, borderRightWidth: 0 }]} />
                <View style={[styles.corner, { bottom: -2, right: -2, borderTopWidth: 0, borderLeftWidth: 0 }]} />

                <View style={styles.uploadInner}>
                  {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.previewImage} />
                  ) : (
                    <View style={styles.imageIconWrapper}>
                      <Icon name="image-plus" size={40} color="#F43F5E" />
                      <View style={styles.plusBadge}>
                        <Icon name="plus" size={14} color="#FFF" />
                      </View>
                    </View>
                  )}

                  <Text style={styles.uploadTitle}>{imageUri ? 'Photo selected' : 'Drop your product photo here'}</Text>
                  <Text style={styles.uploadSub}>{imageUri ? 'Processing your image...' : 'or click to browse • PNG, JPG, WEBP supported'}</Text>

                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.whiteBtn} onPress={handleUpload}>
                      <Icon name="upload" size={18} color="#F43F5E" />
                      <Text style={styles.whiteBtnText}>Upload</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.greyBtn} onPress={handleCapture}>
                      <Icon name="camera-outline" size={18} color="#64748B" />
                      <Text style={styles.greyBtnText}>Camera</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Tips Section */}
            <View style={styles.tipsCard}>
              <View style={styles.tipsHeader}>
                <Icon name="information-outline" size={18} color="#F43F5E" />
                <Text style={styles.tipsTitle}>Tips for best results</Text>
              </View>
              <View style={styles.tipsList}>
                <Text style={styles.tipItem}>• Take a clear photo of the ingredient list on the back</Text>
                <Text style={styles.tipItem}>• Ensure the text is fully visible and in focus</Text>
                <Text style={styles.tipItem}>• Avoid glare or shadows on the label</Text>
                <Text style={styles.tipItem}>• Close-up shots of the label work best</Text>
              </View>
            </View>
          </>
        )}

        {isAnalyzing && (
          <View style={styles.analyzingContainer}>
            <ActivityIndicator size="large" color="#F43F5E" />
            <Text style={styles.analyzingText}>AI is analyzing your product...</Text>
          </View>
        )}

        {analysisResult && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Image source={{ uri: imageUri! }} style={styles.resultImage} />
              <View style={styles.resultMainInfo}>
                <Text style={styles.foodName}>{analysisResult.name}</Text>
                <View style={styles.scoreRow}>
                  <View style={[styles.scoreBadge, { backgroundColor: analysisResult.harmLevel === 'High' ? '#EF4444' : '#22C55E' }]}>
                    <Text style={styles.scoreText}>{analysisResult.safetyScore}%</Text>
                  </View>
                  <Text style={styles.scoreLabel}>Safety Score</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsGrid}>
              <ResultStat label="HARM LEVEL" value={analysisResult.harmLevel} unit="" icon="alert-circle" color="#EF4444" styles={styles} />
              <ResultStat label="IRRITANTS" value={analysisResult.irritants} unit="" icon="flask-outline" color="#F59E0B" styles={styles} />
              <ResultStat label="pH LEVEL" value={analysisResult.ph} unit="" icon="water-outline" color="#0EA5E9" styles={styles} />
              <ResultStat label="RATING" value={analysisResult.rating} unit="" icon="shield-check" color="#22C55E" styles={styles} />
              <ResultStat label="OILY SKIN" value={analysisResult.oilySkin} unit="" icon="face-woman" color="#A855F7" styles={styles} />
            </View>

            <View style={styles.detailSection}>
              <View style={styles.detailRow}>
                <Icon name="leaf" size={18} color="#10B981" />
                <Text style={styles.detailLabel}>Key Ingredients</Text>
                <Text style={styles.detailValue}>{analysisResult.keyIngredients}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="shimmer" size={18} color="#A855F7" />
                <Text style={styles.detailLabel}>Primary Benefit</Text>
                <Text style={styles.detailValue}>{analysisResult.benefit}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => { setAnalysisResult(null); setImageUri(null); }}
            >
              <Icon name="refresh" size={18} color="#64748B" />
              <Text style={styles.resetBtnText}>Scan another product</Text>
            </TouchableOpacity>
          </View>
        )}

        {!imageUri && !analysisResult && (
          <View style={styles.placeholderCard}>
            <View style={styles.placeholderIconBg}>
              <Icon name="barcode-scan" size={32} color="#CBD5E1" />
            </View>
            <Text style={styles.placeholderTitle}>Upload a product photo to see ingredient safety analysis</Text>
            <Text style={styles.placeholderSub}>
              Our AI will identify the ingredients and provide a comprehensive safety and harm report
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const ResultStat = ({ label, value, unit, icon, color, styles }: any) => (
  <View style={styles.statBox}>
    <View style={[styles.statIconBg, { backgroundColor: `${color}15` }]}>
      <Icon name={icon} size={20} color={color} />
    </View>
    <Text style={styles.statValue}>{value}<Text style={styles.statUnit}>{unit}</Text></Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const createDynamicStyles = (isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#000' : '#FFF9FA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 10
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: isDark ? '#4A1D1D' : '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  description: { fontSize: 15, color: isDark ? '#94A3B8' : '#64748B', lineHeight: 22, marginBottom: 25 },

  uploadCard: {
    backgroundColor: isDark ? '#111' : '#FFF',
    borderRadius: 24,
    padding: 10,
    borderWidth: 1,
    borderColor: isDark ? '#333' : '#F1C2CC',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  dashedFrame: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderColor: isDark ? '#4A1D1D' : '#FEE2E2',
    borderWidth: 2,
    borderRadius: 4,
  },
  uploadInner: { alignItems: 'center' },
  imageIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: isDark ? '#4A1D1D' : '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  plusBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F43F5E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: isDark ? '#111' : '#FFF',
  },
  uploadTitle: { fontSize: 18, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  uploadSub: { fontSize: 13, color: '#94A3B8', marginTop: 8 },
  buttonRow: { flexDirection: 'row', marginTop: 25, gap: 12 },
  whiteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#4A1D1D' : '#FFF0F5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: isDark ? '#F43F5E' : '#FEE2E2',
  },
  whiteBtnText: { color: isDark ? '#FFF' : '#F43F5E', fontWeight: 'bold', marginLeft: 8 },
  greyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#222' : '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  greyBtnText: { color: isDark ? '#94A3B8' : '#64748B', fontWeight: 'bold', marginLeft: 8 },

  tipsCard: {
    backgroundColor: isDark ? '#1A0A0D' : '#FFF5F7',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: isDark ? '#4A1D1D' : '#FEE2E2',
    marginBottom: 25,
  },
  tipsHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  tipsTitle: { fontSize: 15, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginLeft: 8 },
  tipsList: { gap: 6 },
  tipItem: { fontSize: 13, color: isDark ? '#94A3B8' : '#64748B', lineHeight: 20 },

  placeholderCard: {
    backgroundColor: isDark ? '#111' : '#FFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: isDark ? '#333' : '#E2E8F0',
  },
  placeholderIconBg: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDark ? '#FFF' : '#1E293B',
    textAlign: 'center',
    lineHeight: 22
  },
  placeholderSub: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 18
  },

  analyzingContainer: { padding: 40, alignItems: 'center' },
  analyzingText: { marginTop: 15, fontSize: 16, color: isDark ? '#94A3B8' : '#64748B', fontWeight: '600' },
  previewImage: { width: 120, height: 120, borderRadius: 20, marginBottom: 15 },

  resultCard: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 24, padding: 20, elevation: 1, borderWidth: 1, borderColor: isDark ? '#333' : '#E2E8F0', marginTop: 10 },
  resultHeader: { flexDirection: 'row', marginBottom: 25 },
  resultImage: { width: 80, height: 80, borderRadius: 16 },
  resultMainInfo: { marginLeft: 15, flex: 1, justifyContent: 'center' },
  foodName: { fontSize: 20, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  scoreRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  scoreBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  scoreText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  scoreLabel: { fontSize: 13, color: '#94A3B8', marginLeft: 8 },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  statBox: { width: (width - 85) / 2, backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC', padding: 15, borderRadius: 16, marginBottom: 12 },
  statIconBg: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  statValue: { fontSize: 18, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  statUnit: { fontSize: 12, color: '#94A3B8', marginLeft: 2 },
  statLabel: { fontSize: 11, color: '#94A3B8', fontWeight: 'bold', marginTop: 4 },

  detailSection: { borderTopWidth: 1, borderTopColor: isDark ? '#222' : '#F1F5F9', paddingTop: 20, marginBottom: 20 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  detailLabel: { fontSize: 14, color: isDark ? '#94A3B8' : '#64748B', marginLeft: 12, flex: 1 },
  detailValue: { fontSize: 14, fontWeight: '600', color: isDark ? '#FFF' : '#1E293B' },

  resetBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: isDark ? '#333' : '#E2E8F0' },
  resetBtnText: { color: isDark ? '#94A3B8' : '#64748B', fontWeight: 'bold', marginLeft: 8 },
});

export default BeautiCareScanScreen;