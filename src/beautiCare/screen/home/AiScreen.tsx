
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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';
import { ThemeColors } from '../../../theme/colors';

const { width } = Dimensions.get('window');

const BeautiCareChat = () => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => createDynamicStyles(colors, isDark), [colors, isDark]);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsAiTyping(true);

    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    setTimeout(() => {
      const responses: any = {
        'Skincare routine': 'A great basic skincare routine includes: Cleanser → Toner → Serum → Moisturizer → SPF (AM). Start simple and introduce actives one at a time to avoid irritation.',
        'Ingredient safety': 'Watch out for denatured alcohol, synthetic fragrances, parabens, and SLS in your products. Look for barrier-friendly ingredients like ceramides, niacinamide, and hyaluronic acid.',
        'Dry skin tips': 'For dry skin, focus on humectants (hyaluronic acid), emollients (shea butter), and occlusives (squalane) applied on damp skin. Avoid hot water and harsh cleansers.',
        'Anti-aging advice': 'The gold standard anti-aging ingredients are retinol, vitamin C (L-ascorbic acid), and SPF. Use SPF daily — it is the single most effective anti-aging step.',
      };

      const aiText = responses[text] || "I'm your BeautiCare AI! I can help with skincare routines, ingredient safety checks, product recommendations, and achieving your glow goals. What would you like to know?";

      setIsAiTyping(false);
      const aiMsg = { id: Date.now() + 1, text: aiText, sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }, 2000);
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
            <Icon name="robot-outline" size={24} color="#F43F5E" />
          </TouchableOpacity>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.headerTitle}>AI Assistant</Text>
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
               {messages.map((msg, idx) => {
                 const isLatestAiMessage = msg.sender === 'ai' && idx === messages.length - 1;
                 
                 return (
                   <View 
                     key={msg.id} 
                     style={[
                       styles.messageBubbleContainer, 
                       msg.sender === 'user' ? styles.userRow : styles.aiRow
                     ]}
                   >
                     {msg.sender === 'user' ? (
                       <LinearGradient
                          colors={['#F43F5E', '#BE123C']}
                          style={styles.userBubble}
                       >
                          <Text style={styles.userText}>{msg.text}</Text>
                       </LinearGradient>
                     ) : (
                       <View style={styles.aiBubbleWrapper}>
                          <View style={styles.aiAvatarSmall}>
                            <Icon name="face-woman-shimmer-outline" size={16} color="#F43F5E" />
                          </View>
                          <View style={styles.aiBubble}>
                            {isLatestAiMessage ? (
                              <TypingText 
                                text={msg.text} 
                                styles={styles} 
                                onFinished={() => scrollViewRef.current?.scrollToEnd({ animated: true })} 
                              />
                            ) : (
                              <Text style={styles.aiText}>{msg.text}</Text>
                            )}
                          </View>
                       </View>
                     )}
                   </View>
                 );
               })}
               {isAiTyping && (
                 <View style={styles.aiRow}>
                    <View style={styles.aiBubbleWrapper}>
                      <View style={styles.aiAvatarSmall}>
                        <Icon name="face-woman-shimmer-outline" size={16} color="#F43F5E" />
                      </View>
                      <View style={[styles.aiBubble, { width: 60, paddingVertical: 12 }]}>
                         <View style={styles.typingIndicator}>
                            <View style={[styles.dot, { backgroundColor: '#F43F5E' }]} />
                            <View style={[styles.dot, { backgroundColor: '#F43F5E', opacity: 0.6 }]} />
                            <View style={[styles.dot, { backgroundColor: '#F43F5E', opacity: 0.3 }]} />
                         </View>
                      </View>
                    </View>
                 </View>
               )}
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

const TypingText = ({ text, styles, onFinished }: any) => {
  const [displayedText, setDisplayedText] = useState('');
  
  React.useEffect(() => {
    let currentText = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        currentText += text[i];
        setDisplayedText(currentText);
        i++;
        if (i % 5 === 0) onFinished?.();
      } else {
        clearInterval(interval);
        onFinished?.();
      }
    }, 20);
    return () => clearInterval(interval);
  }, [text]);

  return <Text style={styles.aiText}>{displayedText}</Text>;
};

const createDynamicStyles = (colors: ThemeColors, isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  isDark: isDark as any,
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  headerSub: { fontSize: 12, color: colors.textSecondary },

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
    borderColor: colors.background,
  },

  welcomeTextContainer: { alignItems: 'center', marginBottom: 30 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', color: colors.text, textAlign: 'center' },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
    paddingHorizontal: 10
  },

  suggestionList: { gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.iconBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: colors.text },
  cardSub: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },

  inputSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  input: { flex: 1, fontSize: 15, color: colors.text, maxHeight: 100 },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.iconBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  chatHistory: { gap: 20, paddingBottom: 20 },
  messageBubbleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userRow: { justifyContent: 'flex-end' },
  aiRow: { justifyContent: 'flex-start' },
  userBubble: {
    maxWidth: '80%',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  aiBubbleWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    maxWidth: '85%',
  },
  aiBubble: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: isDark ? '#111' : '#FFFFFF',
    borderTopLeftRadius: 4,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: isDark ? '#222' : '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  aiAvatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: isDark ? '#4A1D1D' : '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  messageText: { fontSize: 15, lineHeight: 22 },
  userText: { color: '#FFF', fontWeight: '500' },
  aiText: { color: colors.text, lineHeight: 22 },
  typingIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  }
});

export default BeautiCareChat;