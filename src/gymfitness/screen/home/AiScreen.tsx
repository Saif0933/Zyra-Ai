
// import React, { useRef, useState } from 'react';
// import {
//     Dimensions,
//     KeyboardAvoidingView,
//     Platform,
//     SafeAreaView,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useTheme } from '../../../theme/ThemeContext';

// const { width, height } = Dimensions.get('window');

// type ChatSession = {
//   id: string;
//   title: string;
//   messages: { id: string; text: string; isAi: boolean }[];
// };

// const initialHistory: ChatSession[] = [];

// const ClinicalCuratorChat = () => {
//   const { colors, isDark } = useTheme();
  
//   const [inputText, setInputText] = useState('');
//   const [messages, setMessages] = useState<{id: string, text: string, isAi: boolean}[]>([]);
//   const [chatHistory, setChatHistory] = useState<ChatSession[]>(initialHistory);
//   const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
//   const activeSessionRef = useRef<string | null>(null);
//   const [isDrawerOpen, setDrawerOpen] = useState(false);
//   const scrollViewRef = useRef<ScrollView>(null);

//   const handleSend = () => {
//     if (!inputText.trim()) return;
    
//     // Add user message
//     const text = inputText.trim();
//     const userMsg = { id: Date.now().toString(), text, isAi: false };
    
//     setMessages(prev => [...prev, userMsg]);
//     setInputText('');
    
//     // Update or create history session
//     let currentSessionId = activeSessionRef.current;
//     if (!currentSessionId) {
//       currentSessionId = Date.now().toString();
//       activeSessionRef.current = currentSessionId;
//       setActiveSessionId(currentSessionId);
//       const newSession: ChatSession = {
//         id: currentSessionId,
//         title: text,
//         messages: [userMsg]
//       };
//       setChatHistory(prev => [newSession, ...prev]);
//     } else {
//       setChatHistory(prev => prev.map(s => 
//         s.id === currentSessionId ? { ...s, messages: [...s.messages, userMsg] } : s
//       ));
//     }
    
//     // Simulate AI response
//     setTimeout(() => {
//       const aiMsg = { 
//         id: (Date.now() + 1).toString(), 
//         text: "I am analyzing your data. As your precise Clinical Curator, I am processing this within your current health context. Is there anything else you'd like to check?", 
//         isAi: true 
//       };
//       setMessages(prev => [...prev, aiMsg]);
      
//       setChatHistory(prev => prev.map(s => 
//         s.id === currentSessionId ? { ...s, messages: [...s.messages, aiMsg] } : s
//       ));
//     }, 1200);
//   };

//   const loadChat = (session: ChatSession) => {
//     setActiveSessionId(session.id);
//     activeSessionRef.current = session.id;
//     setMessages(session.messages || []);
//     setDrawerOpen(false);
//   };

//   const startNewChat = () => {
//     setActiveSessionId(null);
//     activeSessionRef.current = null;
//     setMessages([]);
//     setDrawerOpen(false);
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#FFF' }]}>
//       <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

//       {/* Header matching the image structure */}
//       <View style={styles.header}>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <TouchableOpacity onPress={() => setDrawerOpen(true)}>
//             <Icon name="menu" size={28} color={isDark ? '#FFF' : '#333'} />
//           </TouchableOpacity>
//           <Text style={[styles.headerTitle, { color: isDark ? '#FFF' : '#000', marginLeft: 16 }]}>HealthAi</Text>
//         </View>

//         <TouchableOpacity>
//           <Icon name="more-vert" size={24} color={isDark ? '#FFF' : '#333'} />
//         </TouchableOpacity>
//       </View>

//       {/* Dynamic Content */}
//       <View style={styles.content}>
//         {messages.length === 0 ? (
//           <View style={styles.centered}>
//             <Text style={[styles.readyText, { color: isDark ? '#FFF' : '#000' }]}>
//               Ask me when you are.
//             </Text>
//           </View>
//         ) : (
//           <ScrollView 
//             ref={scrollViewRef}
//             contentContainerStyle={styles.chatScroll}
//             onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
//             showsVerticalScrollIndicator={false}
//           >
//             {messages.map((msg) => (
//               <View key={msg.id} style={[styles.messageRow, msg.isAi ? styles.aiRow : styles.userRow]}>
//                 <View style={[styles.bubble, msg.isAi ? [styles.aiBubble, { backgroundColor: isDark ? '#1C1C1E' : '#F4F4F4' }] : styles.userBubble]}>
//                   <Text style={[styles.messageText, msg.isAi ? { color: isDark ? '#DFDFDF' : '#111' } : styles.userText]}>
//                     {msg.text}
//                   </Text>
//                 </View>
//               </View>
//             ))}
//           </ScrollView>
//         )}
//       </View>

//       {/* Floating Input Bar */}
//       <KeyboardAvoidingView 
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.inputWrapper}
//       >
//         <View style={[styles.inputContainer, { backgroundColor: isDark ? '#171717' : '#F4F4F4' }]}>
//           <TouchableOpacity style={styles.plusCircle}>
//             <Icon name="add" size={24} color={isDark ? '#FFF' : '#000'} />
//           </TouchableOpacity>
          
//           <TextInput
//             style={[styles.input, { color: isDark ? '#FFF' : '#000' }]}
//             placeholder="Ask anything"
//             placeholderTextColor={isDark ? '#8E8E93' : '#666'}
//             value={inputText}
//             onChangeText={setInputText}
//             multiline={true}
//           />

//           <TouchableOpacity 
//             style={[styles.sendBtn, { backgroundColor: isDark ? (inputText.trim() ? '#FFF' : '#333') : (inputText.trim() ? '#000' : '#E5E5E5') }]}
//             onPress={handleSend}
//             disabled={!inputText.trim()}
//           >
//             <Icon name="send" size={18} color={isDark ? (inputText.trim() ? '#000' : '#666') : (inputText.trim() ? '#FFF' : '#999')} style={{ marginLeft: 2 }} />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>

//       {/* Side Drawer Overlay */}
//       {isDrawerOpen && (
//         <View style={styles.drawerOverlayContainer}>
//           <TouchableOpacity 
//             style={styles.drawerBackdrop} 
//             activeOpacity={1} 
//             onPress={() => setDrawerOpen(false)} 
//           />
//           <View style={[styles.drawerPanel, { backgroundColor: isDark ? '#171717' : '#F9F9F9' }]}>
//             <SafeAreaView style={{flex: 1}}>
//               <View style={styles.drawerHeader}>
//                 <TouchableOpacity style={styles.newChatBtn} onPress={startNewChat}>
//                   <View style={[styles.newChatIconBg, { backgroundColor: isDark ? '#FFF' : '#000' }]}>
//                     <Icon name="add" size={18} color={isDark ? '#000' : '#FFF'} />
//                   </View>
//                   <Text style={[styles.newChatText, { color: isDark ? '#FFF' : '#000' }]}>New chat</Text>
//                 </TouchableOpacity>
//               </View>
//               <ScrollView style={styles.drawerScroll} showsVerticalScrollIndicator={false}>
//                 {chatHistory.map(item => (
//                   <TouchableOpacity 
//                     key={item.id} 
//                     style={[styles.historyItem, activeSessionId === item.id && { backgroundColor: isDark ? '#222' : '#EFEFEF' }]} 
//                     onPress={() => loadChat(item)}
//                   >
//                     <Text style={[styles.historyItemText, { color: isDark ? '#FFF' : '#000' }]} numberOfLines={1}>
//                       {item.title}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             </SafeAreaView>
//           </View>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     height: 60,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//   },
//   headerCenter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//   },
//   plusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(99, 102, 241, 0.1)',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 20,
//   },
//   plusText: {
//     color: '#6366F1',
//     fontSize: 13,
//     fontWeight: '600',
//     marginLeft: 4,
//   },
//   content: {
//     flex: 1,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   chatScroll: {
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },
//   messageRow: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     width: '100%',
//   },
//   userRow: {
//     justifyContent: 'flex-end',
//   },
//   aiRow: {
//     justifyContent: 'flex-start',
//   },
//   bubble: {
//     maxWidth: '85%',
//     padding: 14,
//     borderRadius: 20,
//   },
//   userBubble: {
//     backgroundColor: '#6366F1',
//     borderBottomRightRadius: 4,
//   },
//   aiBubble: {
//     borderBottomLeftRadius: 4,
//   },
//   messageText: {
//     fontSize: 15,
//     lineHeight: 22,
//   },
//   userText: {
//     color: '#FFF',
//   },
//   readyText: {
//     fontSize: 25,
//     fontWeight: '300',
//     fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', // Matching the stylistic font in image
//   },
//   inputWrapper: {
//     paddingHorizontal: 15,
//     paddingBottom: 20,
//   },
//   inputContainer: {
//     minHeight: 56,
//     borderRadius: 30,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   plusCircle: {
//     padding: 5,
//   },
//   input: {
//     flex: 1,
//     paddingHorizontal: 10,
//     fontSize: 17,
//     maxHeight: 120,
//   },
//   sendBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   drawerOverlayContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     zIndex: 999,
//     flexDirection: 'row',
//   },
//   drawerBackdrop: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   drawerPanel: {
//     width: width * 0.75,
//     height: '100%',
//     shadowColor: '#000',
//     shadowOffset: { width: 4, height: 0 },
//     shadowOpacity: 0.15,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   drawerHeader: {
//     padding: 20,
//     paddingTop: Platform.OS === 'android' ? 40 : 20,
//     paddingBottom: 16,
//   },
//   newChatBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   newChatIconBg: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   newChatText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   drawerScroll: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   historyItem: {
//     paddingVertical: 14,
//     borderRadius: 8,
//   },
//   historyItemText: {
//     fontSize: 15,
//     lineHeight: 20,
//   }
// });

// export default ClinicalCuratorChat;


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
import { ThemeColors } from '../../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const NutriScanChat = () => {
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

    // Auto scroll to bottom
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    // AI Mock Response
    setTimeout(() => {
      const responses: any = {
        'High protein meals': 'For muscle building, focus on lean meats like chicken breast, fish, eggs, and plant-based options like lentils or tofu. A good goal is 1.6g to 2.2g of protein per kg of body weight.',
        'Pre-workout food': 'Ideally, eat 30-60 minutes before training. Aim for fast-digesting carbs like a banana, rice cakes, or oatmeal to provide quick energy.',
        'Weight loss tips': 'To lose weight, focus on a sustainable calorie deficit. Prioritize high-fiber vegetables and lean protein to keep you full longer.',
        'Supplements guide': 'Common supplements include Whey Protein for recovery, Creatine for strength, and Omega-3s for overall health. Always consult a doctor first.'
      };

      const aiText = responses[text] || "I'm your NutriScan assistant! I can help you with meal plans, macros, and healthy eating tips. What else would you like to know?";
      
      setIsAiTyping(false);
      const aiMsg = { id: Date.now() + 1, text: aiText, sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? '#000' : '#F4F9FF'} />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            onPress={() => setMessages([])}
            style={styles.logoContainer}
          >
            <Icon name="robot-outline" size={24} color="#22C55E" />
          </TouchableOpacity>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            {/* <Text style={styles.headerSub}>Online • AI Powered</Text> */}
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
              {/* Reset view / Welcome View */}
              <View style={styles.illustrationWrapper}>
                  <View style={styles.iconBg}>
                      <Icon name="robot-outline" size={45} color="#22C55E" />
                      <View style={styles.sparkleBadge}>
                          <Icon name="sparkles" size={16} color="#FFF" />
                      </View>
                  </View>
              </View>

              <View style={styles.welcomeTextContainer}>
                <Text style={styles.mainTitle}>Ask me anything about nutrition</Text>
                <Text style={styles.description}>
                  I can help with meal planning, nutrition advice, supplement recommendations, and achieving your fitness goals
                </Text>
              </View>

              <View style={styles.suggestionList}>
                <SuggestionCard 
                  icon="silverware-fork-knife" 
                  title="High protein meals" 
                  sub="Best meals for muscle building" 
                  onPress={() => handleSend('High protein meals')}
                  styles={styles}
                />
                <SuggestionCard 
                  icon="dumbbell" 
                  title="Pre-workout food" 
                  sub="What to eat before training" 
                  onPress={() => handleSend('Pre-workout food')}
                  styles={styles}
                />
                <SuggestionCard 
                  icon="scale-balance" 
                  title="Weight loss tips" 
                  sub="Calorie deficit meal plans" 
                  onPress={() => handleSend('Weight loss tips')}
                  styles={styles}
                />
                <SuggestionCard 
                  icon="pill" 
                  title="Supplements guide" 
                  sub="Essential muscle building stack" 
                  onPress={() => handleSend('Supplements guide')}
                  styles={styles}
                />
              </View>
            </>
          ) : (
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
                          colors={['#22C55E', '#16A34A']}
                          style={styles.userBubble}
                       >
                          <Text style={styles.userText}>{msg.text}</Text>
                       </LinearGradient>
                     ) : (
                       <View style={styles.aiBubbleWrapper}>
                          <View style={styles.aiAvatarSmall}>
                            <Icon name="robot-outline" size={16} color="#22C55E" />
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
                        <Icon name="robot-outline" size={16} color="#22C55E" />
                      </View>
                      <View style={[styles.aiBubble, { width: 60, paddingVertical: 12 }]}>
                         <View style={styles.typingIndicator}>
                            <View style={styles.dot} />
                            <View style={[styles.dot, { opacity: 0.6 }]} />
                            <View style={[styles.dot, { opacity: 0.3 }]} />
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
              style={[styles.sendBtn, inputText.trim() && { backgroundColor: '#22C55E' }]}
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
    backgroundColor: isDark ? '#450a0a' : '#FEE2E2',
  },
  endChatText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: isDark ? '#064E3B' : '#DCFCE7',
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
    backgroundColor: isDark ? '#111' : '#F0FDF4',
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
    backgroundColor: '#22C55E',
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
  
  // Chat History Styles
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
    borderRadius: 22,
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
    backgroundColor: isDark ? '#064E3B' : '#DCFCE7',
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
    backgroundColor: '#22C55E',
  }
});

export default NutriScanChat;