import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');

const CATEGORIES = ['All', 'Cleansers', 'Serums', 'Moisturizers', 'SPF', 'Treatments'];

const MOCK_PRODUCTS = [
  { id: '1', name: 'Glow Vit-C Serum', brand: 'SKINLY', type: 'Serums', score: 92, time: 'AM', color: '#FBBF24', icon: 'shimmer', ingredients: 'Vitamin C, Ferulic Acid' },
  { id: '2', name: 'Hydra-Bounce Cleanser', brand: 'PURECARE', type: 'Cleansers', score: 85, time: 'AM/PM', color: '#0EA5E9', icon: 'water-outline', ingredients: 'Hyaluronic Acid, Panthenol' },
  { id: '3', name: 'Midnight Repair Cream', brand: 'LUNASKIN', type: 'Moisturizers', score: 78, time: 'PM', color: '#A855F7', icon: 'moon-waning-crescent', ingredients: 'Retinol, Peptides' },
  { id: '4', name: 'Ultra-Light SPF 50', brand: 'SUNSHIELD', type: 'SPF', score: 95, time: 'AM', color: '#F59E0B', icon: 'sun-wireless', ingredients: 'Zinc Oxide, Niacinamide' },
  { id: '5', name: 'BHA Exfoliant', brand: 'SMOOTHSKIN', type: 'Treatments', score: 65, time: 'PM', color: '#EC4899', icon: 'flask-round-bottom-outline', ingredients: 'Salicylic Acid, Green Tea' },
];

const ProductShelfScreen = () => {
  const navigation = useNavigation();
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);

  const [activeCat, setActiveCat] = React.useState('All');
  const [search, setSearch] = React.useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    (activeCat === 'All' || p.type === activeCat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
  );

  const renderProduct = ({ item }: { item: typeof MOCK_PRODUCTS[0] }) => (
    <TouchableOpacity style={styles.productCard} activeOpacity={0.9}>
      <LinearGradient
        colors={[isDark ? '#1F2937' : '#FFFFFF', isDark ? '#111827' : '#F9FAFB']}
        style={styles.cardGradient}
      >
        <View style={[styles.productIconBg, { backgroundColor: `${item.color}15` }]}>
          <Icon name={item.icon} size={32} color={item.color} />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.brandText}>{item.brand}</Text>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.ingredientsText} numberOfLines={1}>{item.ingredients}</Text>
          
          <View style={styles.tagRow}>
            <View style={styles.timeTag}>
              <Icon name={item.time === 'AM' ? 'weather-sunny' : item.time === 'PM' ? 'weather-night' : 'calendar-clock'} size={12} color="#64748B" />
              <Text style={styles.tagText}>{item.time}</Text>
            </View>
            <View style={[styles.scoreTag, { backgroundColor: item.score >= 80 ? '#ECFDF5' : '#FFFBEB' }]}>
              <Text style={[styles.scoreText, { color: item.score >= 80 ? '#059669' : '#D97706' }]}>{item.score} Safety</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionColumn}>
          <TouchableOpacity style={styles.moreBtn}>
            <Icon name="dots-vertical" size={20} color="#94A3B8" />
          </TouchableOpacity>
          <View style={styles.scoreCircle}>
             <Svg width={30} height={30}>
                <Circle cx="15" cy="15" r="13" stroke={isDark ? '#374151' : '#E2E8F0'} strokeWidth="2" fill="none" />
                <Circle 
                  cx="15" cy="15" r="13" stroke={item.color} strokeWidth="2" 
                  fill="none" strokeDasharray="81.6" strokeDashoffset={81.6 - (81.6 * (item.score/100))}
                  strokeLinecap="round" transform="rotate(-90 15 15)"
                />
             </Svg>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#000' : '#FFF9FA'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color={isDark ? '#FFF' : '#1E293B'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Shelf</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('Scan' as never)}>
          <LinearGradient
            colors={['#FDA4AF', '#F43F5E']}
            style={styles.addGradient}
          >
            <Icon name="plus" size={24} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Search & Stats Summary */}
      <View style={styles.topSection}>
        <View style={styles.searchBar}>
          <Icon name="magnify" size={22} color="#94A3B8" />
          <TextInput
            placeholder="Search your collection..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Horizontal Categories */}
      <View style={{ marginBottom: 10 }}>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.catBtn, activeCat === item && styles.catBtnActive]}
              onPress={() => setActiveCat(item)}
            >
              <Text style={[styles.catText, activeCat === item && styles.catTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
        />
      </View>

      {/* Main List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIconBg}>
                <Icon name="bottle-tonic-plus-outline" size={60} color="#F43F5E" />
            </View>
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySub}>Try adjusting your filters or scan a new product</Text>
            <TouchableOpacity 
                style={styles.scanNowBtn}
                onPress={() => navigation.navigate('Scan' as never)}
            >
              <Text style={styles.scanNowText}>Scan Now</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const createDynamicStyles = (isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#000' : '#FFF9FA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: isDark ? '#111' : '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: isDark ? '#FFF' : '#1E293B', letterSpacing: -0.5 },
  addBtn: { width: 44, height: 44, borderRadius: 14, overflow: 'hidden', elevation: 4 },
  addGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  topSection: { paddingHorizontal: 20, marginBottom: 20 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#111' : '#FFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1.5,
    borderColor: isDark ? '#222' : '#F1F5F9',
  },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 15, fontWeight: '500', color: isDark ? '#FFF' : '#1E293B' },

  catBtn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: isDark ? '#111' : '#FFF',
    marginRight: 10,
    borderWidth: 1,
    borderColor: isDark ? '#222' : '#F1F5F9',
  },
  catBtnActive: { backgroundColor: '#F43F5E', borderColor: '#F43F5E' },
  catText: { fontSize: 13, fontWeight: 'bold', color: isDark ? '#94A3B8' : '#64748B' },
  catTextActive: { color: '#FFF' },

  listContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
  productCard: {
    marginBottom: 16,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: isDark ? '#222' : '#F1F5F9',
  },
  cardGradient: { flexDirection: 'row', padding: 16, alignItems: 'center' },
  productIconBg: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: { flex: 1, marginLeft: 16 },
  brandText: { fontSize: 10, color: '#F43F5E', fontWeight: '900', letterSpacing: 1.5 },
  nameText: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', marginTop: 4 },
  ingredientsText: { fontSize: 12, color: '#94A3B8', marginTop: 4, fontStyle: 'italic' },
  tagRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  tagText: { fontSize: 11, color: '#64748B', fontWeight: 'bold', marginLeft: 5 },
  scoreTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  scoreText: { fontSize: 11, fontWeight: 'bold' },
  actionColumn: { alignItems: 'center', justifyContent: 'space-between', height: 72 },
  moreBtn: { padding: 4 },
  scoreCircle: { marginTop: 10 },

  emptyState: { alignItems: 'center', marginTop: 60, paddingHorizontal: 40 },
  emptyIconBg: { width: 100, height: 100, borderRadius: 50, backgroundColor: isDark ? '#111' : '#FFF1F2', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  emptySub: { fontSize: 14, color: '#94A3B8', marginTop: 10, textAlign: 'center', lineHeight: 20 },
  scanNowBtn: { backgroundColor: '#F43F5E', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 16, marginTop: 30, elevation: 4 },
  scanNowText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default ProductShelfScreen;
