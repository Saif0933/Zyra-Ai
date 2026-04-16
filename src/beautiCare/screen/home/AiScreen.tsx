
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');

const BeautiCareChat = () => {
  const { isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(isDark), [isDark]);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    setTimeout(() => {
      const responses: any = {
        'Skincare routine': 'A great basic skincare routine includes: Cleanser → Toner → Serum → Moisturizer → SPF (AM). Start simple and introduce actives one at a time to avoid irritation.',
        'Ingredient safety': 'Watch out for denatured alcohol, synthetic fragrances, parabens, and SLS in your products. Look for barrier-friendly ingredients like ceramides, niacinamide, and hyaluronic acid.',
        'Dry skin tips': 'For dry skin, focus on humectants (hyaluronic acid), emollients (shea butter), and occlusives (squalane) applied on damp skin. Avoid hot water and harsh cleansers.',
        'Anti-aging advice': 'The gold standard anti-aging ingredients are retinol, vitamin C (L-ascorbic acid), and SPF. Use SPF daily — it is the single most effective anti-aging step.',
      };

      const aiText = responses[text] || "I'm your BeautiCare AI! I can help with skincare routines, ingredient safety checks, product recommendations, and achieving your glow goals. What would you like to know?";

      const aiMsg = { id: Date.now() + 1, text: aiText, sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? '#000' : '#FFF9FA'} />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => setMessages([])}
            style={styles.logoContainer}
          >
            <Icon name="sparkles" size={24} color="#F43F5E" />
          </TouchableOpacity>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.headerTitle}>BeautiCare AI Assistant</Text>
          </View>
        </View>
        {messages.length > 0 && (
          <TouchableOpacity
            style={styles.endChatBtn}
            onPress={() => setMessages([])}
          >
            <Text style={styles.endChatText}>End Chat</Text>
          </TouchableOpacity>
        )}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.scrollContent,
            messages.length > 0 && { paddingTop: 20 }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <>
              {/* Welcome View */}
              <View style={styles.illustrationWrapper}>
                <View style={styles.iconBg}>
                  <Icon name="face-woman-shimmer-outline" size={45} color="#F43F5E" />
                  <View style={styles.sparkleBadge}>
                    <Icon name="sparkles" size={16} color="#FFF" />
                  </View>
                </View>
              </View>

              <View style={styles.welcomeTextContainer}>
                <Text style={styles.mainTitle}>Ask me anything about skincare</Text>
                <Text style={styles.description}>
                  I can help with skincare routines, ingredient safety, product recommendations, and achieving your glow goals
                </Text>
              </View>

              <View style={styles.suggestionList}>
                <SuggestionCard
                  icon="face-woman-outline"
                  title="Skincare routine"
                  sub="Build your perfect daily routine"
                  onPress={() => handleSend('Skincare routine')}
                  styles={styles}
                />
                <SuggestionCard
                  icon="flask-outline"
                  title="Ingredient safety"
                  sub="Check harmful vs. safe ingredients"
                  onPress={() => handleSend('Ingredient safety')}
                  styles={styles}
                />
                <SuggestionCard
                  icon="water-outline"
                  title="Dry skin tips"
                  sub="Hydration & barrier repair tips"
                  onPress={() => handleSend('Dry skin tips')}
                  styles={styles}
                />
                <SuggestionCard
                  icon="shimmer"
                  title="Anti-aging advice"
                  sub="Retinol, SPF & vitamin C guide"
                  onPress={() => handleSend('Anti-aging advice')}
                  styles={styles}
                />
              </View>
            </>
          ) : (
            /* Chat Interface */
            <View style={styles.chatHistory}>
              {messages.map((msg) => (
                <View
                  key={msg.id}
                  style={[
                    styles.messageBubble,
                    msg.sender === 'user' ? styles.userBubble : styles.aiBubble
                  ]}
                >
                  {msg.sender === 'ai' && (
                    <View style={styles.aiAvatarSmall}>
                      <Icon name="face-woman-shimmer-outline" size={12} color="#F43F5E" />
                    </View>
                  )}
                  <Text style={[
                    styles.messageText,
                    msg.sender === 'user' ? styles.userText : styles.aiText
                  ]}>
                    {msg.text}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type your message..."
              placeholderTextColor="#94A3B8"
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity
              style={[styles.sendBtn, inputText.trim() && { backgroundColor: '#F43F5E' }]}
              onPress={() => handleSend(inputText)}
            >
              <Icon name="arrow-up" size={20} color={inputText.trim() ? "#FFF" : "#94A3B8"} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const SuggestionCard = ({ icon, title, sub, onPress, styles }: any) => (
  <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={onPress}>
    <View style={styles.cardIconBg}>
      <Icon name={icon} size={22} color={styles.isDark ? "#FFF" : "#1E293B"} />
    </View>
    <View style={{ flex: 1, marginLeft: 16 }}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSub}>{sub}</Text>
    </View>
    <Icon name="chevron-right" size={20} color="#CBD5E1" />
  </TouchableOpacity>
);

const createDynamicStyles = (isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#000' : '#FFF9FA' },
  isDark: isDark as any,
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: isDark ? '#111' : '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#222' : '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  endChatBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: isDark ? '#4A1D1D' : '#FEE2E2',
  },
  endChatText: {
    color: '#F43F5E',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: isDark ? '#4A1D1D' : '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  headerSub: { fontSize: 12, color: '#64748B' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 150 },

  illustrationWrapper: { alignItems: 'center', marginBottom: 30 },
  iconBg: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: isDark ? '#111' : '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkleBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#F43F5E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: isDark ? '#000' : '#FFF9FA',
  },

  welcomeTextContainer: { alignItems: 'center', marginBottom: 30 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B', textAlign: 'center' },
  description: {
    fontSize: 14,
    color: isDark ? '#94A3B8' : '#64748B',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
    paddingHorizontal: 10
  },

  suggestionList: { gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#111' : '#FFF',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: isDark ? '#222' : '#E2E8F0',
  },
  cardIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: isDark ? '#FFF' : '#1E293B' },
  cardSub: { fontSize: 13, color: '#64748B', marginTop: 2 },

  inputSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: isDark ? '#000' : '#FFF9FA',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#111' : '#FFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: isDark ? '#222' : '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  input: { flex: 1, fontSize: 15, color: isDark ? '#FFF' : '#1E293B', maxHeight: 80 },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  chatHistory: { gap: 16, paddingBottom: 20 },
  messageBubble: {
    maxWidth: '85%',
    padding: 14,
    borderRadius: 20,
    marginBottom: 4,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#F43F5E',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: isDark ? '#111' : '#FFF',
    borderTopLeftRadius: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: isDark ? '#222' : '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  aiAvatarSmall: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: isDark ? '#4A1D1D' : '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  messageText: { fontSize: 15, lineHeight: 22 },
  userText: { color: '#FFF' },
  aiText: { color: isDark ? '#FFF' : '#1E293B' },
});

export default BeautiCareChat;