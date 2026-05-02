// import React, { useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     Alert,
//     Dimensions,
//     Image,
//     PermissionsAndroid,
//     Platform,
//     SafeAreaView,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useTheme } from '../../../theme/ThemeContext';
// import { ThemeColors } from '../../../theme/colors';

// const { width } = Dimensions.get('window');

// // Dynamic module loading to prevent bundle crashes
// let ImagePicker: any = null;
// try {
//   ImagePicker = require('react-native-image-picker');
// } catch (e) {
//   console.log("ImagePicker module not found");
// }

// interface MacroRowProps {
//   label: string;
//   value: string;
//   sub: string;
//   progress: number;
//   color: string;
//   themeColors?: any;
// }

// const MacroRow = ({ label, value, sub, progress, color }: MacroRowProps) => {
//   const { colors, isDark } = useTheme();
//   const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
//   return (
//     <View style={styles.macroRow}>
//       <View style={styles.macroHeader}>
//         <View style={styles.flexRow}>
//           <View style={[styles.macroBarIndicator, { backgroundColor: color }]} />
//           <Text style={styles.macroName}>{label}</Text>
//         </View>
//         <View style={styles.alignEnd}>
//           <Text style={styles.macroValue}>{value}</Text>
//           <Text style={styles.macroSub}>{sub}</Text>
//         </View>
//       </View>
//       <View style={styles.progressContainer}>
//         <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: color }]} />
//       </View>
//     </View>
//   );
// };

// const ClinicalCurator = () => {
//   const [isScanning, setIsScanning] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [hasPermission, setHasPermission] = useState(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);

//   const { colors, isDark } = useTheme();
//   const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

//   useEffect(() => {
//     checkCameraPermission();
//   }, []);

//   const checkCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       const status = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
//       setHasPermission(status);
//     } else {
//       setHasPermission(true);
//     }
//   };

//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: "Camera Permission",
//             message: "HealthAi needs camera access to analyze your food nutrition.",
//             buttonPositive: "OK",
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           setHasPermission(true);
//           handleLaunchCamera();
//         } else {
//           Alert.alert("Permission", "Camera access is needed to scan food.");
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     } else {
//       handleLaunchCamera();
//     }
//   };

//   const handleLaunchCamera = () => {
//     if (!ImagePicker) {
//       Alert.alert(
//         "Camera Module Missing",
//         "To open the real camera, please run: npm install react-native-image-picker and rebuild the app.",
//         [
//           { text: "Try Simulation", onPress: () => startSimulation() },
//           { text: "Cancel", style: "cancel" }
//         ]
//       );
//       return;
//     }

//     const options = {
//       mediaType: 'photo',
//       quality: 1,
//       saveToPhotos: false,
//     };

//     ImagePicker.launchCamera(options, (response: any) => {
//       if (response.didCancel) {
//         console.log('User cancelled');
//       } else if (response.errorCode) {
//         Alert.alert('Camera Error', response.errorMessage || 'Unable to open camera');
//       } else if (response.assets && response.assets.length > 0) {
//         setCapturedImage(response.assets[0].uri || null);
//         startSimulation();
//       }
//     });
//   };

//   const startSimulation = () => {
//     setIsScanning(true);
//     setShowResults(false);
    
//     setTimeout(() => {
//       setIsScanning(false);
//       setShowResults(true);
//       if (!capturedImage) {
//         setCapturedImage('https://images.unsplash.com/photo-1546069901-ba9599a7e63c');
//       }
//     }, 2800);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? '#000' : colors.background} />
      
//       <View style={styles.nav}>
//         <View style={styles.navLeft}>
//           <Icon name="menu" size={24} color={colors.primary} />
//           <Text style={styles.navTitle}>AI FOOD SCANNER</Text>
//         </View>
//         <View style={styles.profileCircle}>
//           <Image
//             source={{ uri: 'https://via.placeholder.com/32' }}
//             style={styles.profileImg}
//           />
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.scannerWrapper}>
//           <View style={styles.viewportFrame}>
//             <Image
//               source={{ uri: capturedImage || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd' }}
//               style={styles.foodImage}
//             />
            
//             <View style={styles.hudOverlay}>
//               <View style={styles.hudTop}>
//                 <View style={styles.liveBadge}>
//                   <View style={styles.pulseDot} />
//                   <Text style={styles.liveText}>
//                     {isScanning ? 'ANALYZING...' : 'SYSTEM READY'}
//                   </Text>
//                 </View>
//                 <Text style={styles.versionText}>OPTI-SCAN v3.0{"\n"}HEALTH-AI ENGINE</Text>
//               </View>

//               <View style={styles.bracketContainer}>
//                 {isScanning ? (
//                   <ActivityIndicator size="large" color={colors.primary} />
//                 ) : (
//                   <View style={styles.scannerBracket}>
//                     <View style={[styles.corner, styles.tl]} />
//                     <View style={[styles.corner, styles.tr]} />
//                     <View style={[styles.corner, styles.bl]} />
//                     <View style={[styles.corner, styles.br]} />
//                     <View style={styles.scannerLine} />
//                   </View>
//                 )}
//               </View>

//               <View style={styles.hudBottom}>
//                 <View style={styles.detectedCard}>
//                   <Text style={styles.detectedLabel}>TARGET STATUS</Text>
//                   <Text style={styles.detectedTitle}>
//                     {isScanning ? 'AI Processing...' : capturedImage ? 'Scan Complete' : 'Awaiting Subject'}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>

//           <TouchableOpacity 
//             activeOpacity={0.8} 
//             onPress={hasPermission ? handleLaunchCamera : requestCameraPermission} 
//             disabled={isScanning}
//             style={styles.scanBtnContainer}
//           >
//             <LinearGradient
//               colors={[colors.primary, colors.primaryDark || colors.primary]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               style={styles.scanBtn}
//             >
//               <Icon name="camera-enhance" size={24} color="white" style={{marginRight: 10}} />
//               <Text style={styles.scanBtnText}>
//                 {isScanning ? 'INITIALIZING AI...' : 'START AI SCAN'}
//               </Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>

//         {showResults && (
//           <View style={styles.profileSection}>
//             <View style={styles.labBadge}>
//               <Text style={styles.labBadgeText}>AI NUTRITIONAL REPORT</Text>
//             </View>
//             <Text style={styles.mainTitle}>Vitals: <Text style={styles.italicPrimary}>Optimal</Text></Text>
            
//             <View style={styles.metricsGrid}>
//               <View style={styles.metricCard}>
//                 <Icon name="local-fire-department" size={36} color={colors.primaryLight} />
//                 <View>
//                   <Text style={styles.metricLabel}>CALORIES</Text>
//                   <View style={styles.metricRow}>
//                     <Text style={styles.metricValue}>512</Text>
//                     <Text style={styles.metricUnit}>KCAL</Text>
//                   </View>
//                 </View>
//               </View>
//               <View style={[styles.metricCard, { backgroundColor: colors.primary }]}>
//                 <Icon name="verified" size={36} color="rgba(255, 255, 255, 0.6)" />
//                 <View>
//                   <Text style={[styles.metricLabel, { color: '#FFF' }]}>PROTEIN</Text>
//                   <View style={styles.metricRow}>
//                     <Text style={[styles.metricValue, { color: '#FFF' }]}>24</Text>
//                     <Text style={[styles.metricUnit, { color: '#FFF' }]}>GRAMS</Text>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.macroIntelligence}>
//               <Text style={styles.metricLabel}>MICRONUTRIENT BREAKDOWN</Text>
              
//               <MacroRow label="Iron (Fe)" value="3.1mg" sub="18% DAILY" progress={0.18} color={colors.danger} />
//               <MacroRow label="Vitamin B12" value="2.4mcg" sub="100% DAILY" progress={1.00} color={colors.warning} />
//               <MacroRow label="Calcium (Ca)" value="150mg" sub="15% DAILY" progress={0.15} color={colors.success} />
//             </View>

//             <TouchableOpacity style={styles.logBtn} onPress={() => Alert.alert("Success", "Scan logged to history.")}>
//               <Text style={styles.logBtnText}>SAVE TO HEALTH LOG</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const createStyles = (colors: ThemeColors, isDark: boolean) => StyleSheet.create({
//   container: { flex: 1, backgroundColor: isDark ? '#000' : colors.background },
//   flexRow: { flexDirection: 'row', alignItems: 'center' },
//   alignEnd: { alignItems: 'flex-end' },
//   nav: {
//     height: 60,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   navLeft: { flexDirection: 'row', alignItems: 'center' },
//   navTitle: { marginLeft: 16, fontSize: 12, fontWeight: '700', letterSpacing: 1.5, color: colors.primary },
//   profileCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.card, overflow: 'hidden' },
//   profileImg: { width: '100%', height: '100%' },
//   scrollContent: { paddingBottom: 50 },
//   scannerWrapper: { padding: 16 },
//   viewportFrame: {
//     aspectRatio: 4 / 3,
//     borderRadius: 20,
//     backgroundColor: colors.card,
//     overflow: 'hidden',
//     position: 'relative',
//     borderWidth: 1,
//     borderColor: colors.border,
//   },
//   foodImage: { width: '100%', height: '100%', opacity: 0.6 },
//   hudOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, padding: 16, justifyContent: 'space-between' },
//   hudTop: { flexDirection: 'row', justifyContent: 'space-between' },
//   liveBadge: {
//     backgroundColor: isDark ? 'rgba(99, 102, 241, 0.9)' : 'rgba(79, 70, 229, 0.9)',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 6,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFF', marginRight: 6 },
//   liveText: { color: 'white', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
//   versionText: { color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)', fontSize: 8, textAlign: 'right', letterSpacing: 1 },
//   bracketContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   scannerBracket: { width: 140, height: 140, position: 'relative' },
//   corner: { position: 'absolute', width: 20, height: 20, borderColor: colors.primary, borderWidth: 2.5 },
//   tl: { top: -2, left: -2, borderBottomWidth: 0, borderRightWidth: 0 },
//   tr: { top: -2, right: -2, borderBottomWidth: 0, borderLeftWidth: 0 },
//   bl: { bottom: -2, left: -2, borderTopWidth: 0, borderRightWidth: 0 },
//   br: { bottom: -2, right: -2, borderTopWidth: 0, borderLeftWidth: 0 },
//   scannerLine: { position: 'absolute', top: '50%', left: 0, right: 0, height: 1, backgroundColor: colors.primaryLight },
//   hudBottom: { alignItems: 'center' },
//   detectedCard: { backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.border, width: '100%', alignItems: 'center' },
//   detectedLabel: { fontSize: 9, fontWeight: '800', color: colors.primary, letterSpacing: 1, marginBottom: 4 },
//   detectedTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
//   scanBtnContainer: { marginTop: 20 },
//   scanBtn: { height: 60, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
//   scanBtnText: { color: 'white', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
//   profileSection: { padding: 16 },
//   labBadge: { backgroundColor: colors.primaryLight, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
//   labBadgeText: { fontSize: 9, fontWeight: '700', color: colors.primary },
//   mainTitle: { fontSize: 24, fontWeight: '700', color: colors.text, marginTop: 12 },
//   italicPrimary: { fontStyle: 'italic', color: colors.primary },
//   metricsGrid: { flexDirection: 'row', gap: 12, marginTop: 20 },
//   metricCard: { flex: 1, aspectRatio: 1.2, backgroundColor: colors.card, borderRadius: 20, padding: 18, justifyContent: 'space-between', borderWidth: 1, borderColor: colors.border },
//   metricLabel: { fontSize: 10, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1 },
//   metricRow: { flexDirection: 'row', alignItems: 'baseline' },
//   metricValue: { fontSize: 28, fontWeight: '700', color: colors.text },
//   metricUnit: { fontSize: 11, color: colors.textSecondary, marginLeft: 4 },
//   macroIntelligence: { marginTop: 20, padding: 20, backgroundColor: colors.card, borderRadius: 20, borderWidth: 1, borderColor: colors.border },
//   macroRow: { marginBottom: 15 },
//   macroHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
//   macroBarIndicator: { width: 6, height: 24, borderRadius: 3, marginRight: 10 },
//   macroName: { fontSize: 15, fontWeight: '600', color: colors.text },
//   macroValue: { fontSize: 16, fontWeight: '700', color: colors.text },
//   macroSub: { fontSize: 8, color: colors.textSecondary },
//   progressContainer: { height: 6, backgroundColor: colors.iconBg, borderRadius: 3, overflow: 'hidden' },
//   progressBar: { height: '100%' },
//   logBtn: { backgroundColor: isDark ? '#1A1D23' : '#F1F5F9', height: 60, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 20, borderWidth: 1, borderColor: colors.border },
//   logBtnText: { color: colors.text, fontWeight: '700', letterSpacing: 1 },
// });

// export default ClinicalCurator;


import ImageLabeling from '@react-native-ml-kit/image-labeling';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useAddMeal } from '../../../auth/hook/gymGole/useGym';
// import { useCreateScan } from '../../../auth/hook/scanFood/useScan';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');

const FoodScannerScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Auto-process image if passed from Home Screen
  useEffect(() => {
    if (route.params?.initialImageUri) {
      processImage(route.params.initialImageUri);
    }
  }, [route.params?.initialImageUri]);

  // const addMealMutation = useAddMeal();
  // const createScanMutation = useCreateScan();

  const handleCapture = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
    });
    
    if (result.assets && result.assets[0].uri) {
      processImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });
    
    if (result.assets && result.assets[0].uri) {
      processImage(result.assets[0].uri);
    }
  };

  const processImage = async (uri: string) => {
    setImageUri(uri);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // 1. Run ML Kit Image Labeling
      const labels = await ImageLabeling.label(uri);
      
      // 2. Food Validation Keywords
      const foodKeywords = [
        'food', 'vegetable', 'fruit', 'meat', 'dish', 'cuisine', 'meal', 
        'ingredient', 'salad', 'chicken', 'beef', 'pork', 'fish', 'bread', 
        'pasta', 'rice', 'egg', 'cheese', 'dessert', 'snack', 'drink', 
        'beverage', 'produce', 'plant', 'seafood', 'baked goods'
      ];
      
      const isFood = labels.some(label => foodKeywords.includes(label.text.toLowerCase()));
      
      if (!isFood || labels.length === 0) {
        Alert.alert('Invalid Image', 'This does not appear to be food. Please scan a valid food item or meal.');
        setIsAnalyzing(false);
        setImageUri(null);
        return;
      }

      // 3. Mock AI Analysis
      setTimeout(() => {
          setIsAnalyzing(false);
          setAnalysisResult({
              productName: 'Grilled Chicken Salad',
              safetyScore: 92,
              calories: 345,
              protein: 28,
              carbs: 12,
              fats: 8,
              scanType: 'MEAL',
              recommendation: 'Excellent'
          });
      }, 1500);

    } catch (error) {
      console.log('Image Labeling Error:', error);
      Alert.alert('Scan Failed', 'Could not analyze the image.');
      setIsAnalyzing(false);
      setImageUri(null);
    }
  };

  const handleLogMeal = () => {
    if (!analysisResult) return;
    Alert.alert("Success", "Meal logged to your health journal! (Mock)");
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#000' : '#F4F9FF'} />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerIconContainer}>
            <Icon name="scan-helper" size={28} color="#22C55E" />
        </View>
        <Text style={styles.headerTitle}>Food Scanner</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {!analysisResult && (
          <>
            <Text style={styles.description}>
              Upload or capture a photo of your food — AI will analyze its nutritional content instantly
            </Text>

            {/* Drop Zone / Upload Card */}
            <View style={styles.uploadCard}>
              <View style={styles.dashedFrame}>
                {/* Decorative Corners */}
                <View style={[styles.corner, { top: -2, left: -2, borderBottomWidth: 0, borderRightWidth: 0 }]} />
                <View style={[styles.corner, { top: -2, right: -2, borderBottomWidth: 0, borderLeftWidth: 0 }]} />
                <View style={[styles.corner, { bottom: -2, left: -2, borderTopWidth: 0, borderRightWidth: 0 }]} />
                <View style={[styles.corner, { bottom: -2, right: -2, borderTopWidth: 0, borderLeftWidth: 0 }]} />

                <View style={styles.uploadInner}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.previewImage} />
                    ) : (
                        <View style={styles.imageIconWrapper}>
                            <Icon name="image-plus" size={40} color="#22C55E" />
                            <View style={styles.plusBadge}>
                                <Icon name="plus" size={14} color="#FFF" />
                            </View>
                        </View>
                    )}
                    
                    <Text style={styles.uploadTitle}>{imageUri ? 'Photo selected' : 'Drop your food photo here'}</Text>
                    <Text style={styles.uploadSub}>{imageUri ? 'Processing your image...' : 'or click to browse • PNG, JPG, WEBP supported'}</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.whiteBtn} onPress={handleUpload}>
                            <Icon name="upload" size={18} color="#22C55E" />
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
                    <Icon name="information-outline" size={18} color="#0EA5E9" />
                    <Text style={styles.tipsTitle}>Tips for best results</Text>
                </View>
                <View style={styles.tipsList}>
                    <Text style={styles.tipItem}>• Use good lighting and take a clear photo</Text>
                    <Text style={styles.tipItem}>• Include all items on the plate in the frame</Text>
                    <Text style={styles.tipItem}>• Avoid blurry or dark images</Text>
                    <Text style={styles.tipItem}>• Close-up shots work best for multiple items</Text>
                </View>
            </View>
          </>
        )}

        {isAnalyzing && (
            <View style={styles.analyzingContainer}>
                <ActivityIndicator size="large" color="#22C55E" />
                <Text style={styles.analyzingText}>AI is analyzing your food...</Text>
            </View>
        )}

        {analysisResult && (
            <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                    <Image source={{ uri: imageUri! }} style={styles.resultImage} />
                    <View style={styles.resultMainInfo}>
                        <Text style={styles.foodName}>{analysisResult.productName}</Text>
                        <View style={styles.scoreRow}>
                            <View style={[styles.scoreBadge, { backgroundColor: (analysisResult.safetyScore || 0) > 70 ? '#22C55E' : '#F59E0B' }]}>
                                <Text style={styles.scoreText}>{analysisResult.safetyScore || '--'}</Text>
                            </View>
                            <Text style={styles.scoreLabel}>Health Score</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.statsGrid}>
                    <ResultStat label="CALORIES" value={analysisResult.calories || 0} unit="kcal" icon="fire" color="#EF4444" styles={styles} />
                    <ResultStat label="PROTEIN" value={analysisResult.protein || 0} unit="g" icon="food-steak" color="#3B82F6" styles={styles} />
                    <ResultStat label="CARBS" value={analysisResult.carbs || 0} unit="g" icon="corn" color="#F59E0B" styles={styles} />
                    <ResultStat label="FATS" value={analysisResult.fats || 0} unit="g" icon="water" color="#10B981" styles={styles} />
                </View>

                <View style={styles.detailSection}>
                    <View style={styles.detailRow}>
                        <Icon name="tag-outline" size={18} color="#6366F1" />
                        <Text style={styles.detailLabel}>Type</Text>
                        <Text style={styles.detailValue}>{analysisResult.scanType}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Icon name="recommend" size={18} color="#10B981" />
                        <Text style={styles.detailLabel}>Rating</Text>
                        <Text style={styles.detailValue}>{analysisResult.recommendation || 'Balanced'}</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={[styles.saveBtn, { backgroundColor: '#22C55E', marginBottom: 12 }]}
                    onPress={handleLogMeal}
                    disabled={false}
                >
                    <Icon name="check-bold" size={20} color="#FFF" />
                    <Text style={[styles.saveBtnText, { color: '#FFF' }]}>Log to Health Journal</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.resetBtn}
                    onPress={() => {
                        setAnalysisResult(null);
                        setImageUri(null);
                    }}
                >
                    <Icon name="refresh" size={18} color="#64748B" />
                    <Text style={styles.resetBtnText}>Scan another item</Text>
                </TouchableOpacity>
            </View>
        )}

        {!imageUri && !analysisResult && (
            /* Empty Result Placeholder */
            <View style={styles.placeholderCard}>
                <View style={styles.placeholderIconBg}>
                    <Icon name="scan-helper" size={32} color="#CBD5E1" />
                </View>
                <Text style={styles.placeholderTitle}>Upload a food image to see detailed nutrition analysis</Text>
                <Text style={styles.placeholderSub}>
                    Our AI will identify the food and provide comprehensive nutritional information
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
  container: { flex: 1, backgroundColor: isDark ? '#000' : '#F4F9FF' },
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
    backgroundColor: isDark ? '#064E3B' : '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerTitle: { fontSize: 28, color: isDark ? '#FFF' : '#1E293B', fontFamily: 'serif' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  description: { fontSize: 15, color: isDark ? '#94A3B8' : '#64748B', lineHeight: 22, marginBottom: 25, fontFamily: 'serif' },

  // Upload Card
  uploadCard: {
    backgroundColor: isDark ? '#111' : '#FFF',
    borderRadius: 24,
    padding: 10,
    borderWidth: 1,
    borderColor: isDark ? '#333' : '#E2E8F0',
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
    borderColor: isDark ? '#064E3B' : '#DCFCE7',
    borderWidth: 2,
    borderRadius: 4,
  },
  uploadInner: { alignItems: 'center' },
  imageIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: isDark ? '#064E3B' : '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  plusBadge: {
    position: 'absolute',
    bottom: 5,
    right: -5,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: isDark ? '#111' : '#FFF',
  },
  uploadTitle: { fontSize: 18, color: isDark ? '#FFF' : '#1E293B', fontFamily: 'serif' },
  uploadSub: { fontSize: 13, color: '#94A3B8', marginTop: 8, fontFamily: 'serif' },
  buttonRow: { flexDirection: 'row', marginTop: 25, gap: 12 },
  whiteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#064E3B' : '#F0FDF4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: isDark ? '#22C55E' : '#DCFCE7',
  },
  whiteBtnText: { color: isDark ? '#FFF' : '#22C55E', marginLeft: 8, fontFamily: 'serif' },
  greyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#222' : '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  greyBtnText: { color: isDark ? '#94A3B8' : '#64748B', marginLeft: 8, fontFamily: 'serif' },

  // Tips Card
  tipsCard: {
    backgroundColor: isDark ? '#0C1A27' : '#F0F9FF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: isDark ? '#1E3A4A' : '#E0F2FE',
    marginBottom: 25,
  },
  tipsHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  tipsTitle: { fontSize: 15, color: isDark ? '#FFF' : '#1E293B', marginLeft: 8, fontFamily: 'serif' },
  tipsList: { gap: 6 },
  tipItem: { fontSize: 13, color: isDark ? '#94A3B8' : '#64748B', lineHeight: 20, fontFamily: 'serif' },

  // Placeholder Card
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
    color: isDark ? '#FFF' : '#1E293B', 
    textAlign: 'center', 
    lineHeight: 22,
    fontFamily: 'serif'
  },
  placeholderSub: { 
    fontSize: 13, 
    color: '#94A3B8', 
    textAlign: 'center', 
    marginTop: 12, 
    lineHeight: 18,
    fontFamily: 'serif'
  },

  // Analyzing and Results
  analyzingContainer: { padding: 40, alignItems: 'center' },
  analyzingText: { marginTop: 15, fontSize: 16, color: isDark ? '#94A3B8' : '#64748B', fontFamily: 'serif' },
  previewImage: { width: 120, height: 120, borderRadius: 20, marginBottom: 15 },
  
  resultCard: { backgroundColor: isDark ? '#111' : '#FFF', borderRadius: 24, padding: 20, elevation: 1, borderWidth: 1, borderColor: isDark ? '#333' : '#E2E8F0', marginTop: 10 },
  resultHeader: { flexDirection: 'row', marginBottom: 25 },
  resultImage: { width: 80, height: 80, borderRadius: 16 },
  resultMainInfo: { marginLeft: 15, flex: 1, justifyContent: 'center' },
  foodName: { fontSize: 20, color: isDark ? '#FFF' : '#1E293B', fontFamily: 'serif' },
  scoreRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  scoreBadge: { backgroundColor: '#22C55E', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  scoreText: { color: '#FFF', fontSize: 12, fontFamily: 'serif' },
  scoreLabel: { fontSize: 13, color: '#94A3B8', marginLeft: 8, fontFamily: 'serif' },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  statBox: { width: (width - 85) / 2, backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC', padding: 15, borderRadius: 16, marginBottom: 12 },
  statIconBg: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  statValue: { fontSize: 18, color: isDark ? '#FFF' : '#1E293B', fontFamily: 'serif' },
  statUnit: { fontSize: 12, color: '#94A3B8', marginLeft: 2, fontFamily: 'serif' },
  statLabel: { fontSize: 11, color: '#94A3B8', marginTop: 4, fontFamily: 'serif' },

  detailSection: { borderTopWidth: 1, borderTopColor: isDark ? '#222' : '#F1F5F9', paddingTop: 20, marginBottom: 20 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  detailLabel: { fontSize: 14, color: isDark ? '#94A3B8' : '#64748B', marginLeft: 12, flex: 1, fontFamily: 'serif' },
  detailValue: { fontSize: 14, color: isDark ? '#FFF' : '#1E293B', fontFamily: 'serif' },
  
  saveBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 14, 
    borderRadius: 12,
  },
  saveBtnText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'serif'
  },
  resetBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: isDark ? '#333' : '#E2E8F0' },
  resetBtnText: { color: isDark ? '#94A3B8' : '#64748B', marginLeft: 8, fontFamily: 'serif' },
});

export default FoodScannerScreen;