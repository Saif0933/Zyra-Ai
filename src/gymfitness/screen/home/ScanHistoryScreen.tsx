import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';
// import { useScanHistory, useDeleteScan } from '../../../auth/hook/scanFood/useScan';

const ScanHistoryScreen = () => {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createStyles(isDark), [isDark]);

  // const { data: historyResponse, isLoading, refetch } = useScanHistory();
  // const deleteMutation = useDeleteScan();

  const isLoading = false;
  const history = [
    { id: '1', productName: 'Avocado Toast', scanType: 'MEAL', safetyScore: 95, timestamp: new Date().toISOString() },
    { id: '2', productName: 'Protein Shake', scanType: 'PRODUCT', safetyScore: 88, timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', productName: 'Greek Yogurt', scanType: 'PRODUCT', safetyScore: 92, timestamp: new Date(Date.now() - 172800000).toISOString() },
  ];

  const handleDelete = (id: string) => {
    // deleteMutation.mutate(id, {
    //   onSuccess: () => refetch(),
    // });
    Alert.alert("Delete", "Delete function disabled in mock mode.");
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.historyCard}>
      <View style={styles.cardHeader}>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{item.scanType}</Text>
        </View>
        <Text style={styles.dateText}>{new Date(item.timestamp).toLocaleDateString()}</Text>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.mainInfo}>
          <Text style={styles.productName}>{item.productName}</Text>
          <View style={styles.scoreRow}>
            <Icon name="shield-check" size={16} color="#22C55E" />
            <Text style={styles.scoreText}>Safety Score: {item.safetyScore}%</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.deleteBtn}
          onPress={() => handleDelete(item.id)}
        >
          <Icon name="trash-can-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#000' : '#F4F9FF'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="chevron-left" size={30} color={isDark ? '#FFF' : '#1E293B'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan History</Text>
        <View style={{ width: 30 }} />
      </View>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#22C55E" />
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="scan-helper" size={60} color="#CBD5E1" />
              <Text style={styles.emptyText}>No scan history found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#000' : '#F4F9FF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { padding: 16 },
  historyCard: {
    backgroundColor: isDark ? '#111' : '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: isDark ? '#222' : '#E2E8F0',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  typeBadge: { backgroundColor: '#22C55E20', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  typeText: { color: '#22C55E', fontSize: 10, fontWeight: 'bold' },
  dateText: { color: '#94A3B8', fontSize: 12 },
  cardBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mainInfo: { flex: 1 },
  productName: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  scoreRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  scoreText: { color: '#64748B', fontSize: 13, marginLeft: 5 },
  deleteBtn: { padding: 8 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyText: { color: '#94A3B8', marginTop: 10, fontSize: 16 },
});

export default ScanHistoryScreen;
