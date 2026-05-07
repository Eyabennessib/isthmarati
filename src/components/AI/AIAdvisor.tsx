import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Send, X, Bot, Sparkles, User as UserIcon } from 'lucide-react';
import { ai, MODELS } from '../../lib/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../../contexts/UserContext';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function AIAdvisor() {
  const { t, i18n } = useTranslation();
  const { user, profile } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulated market trends for the AI context
  const marketTrends = [
    { name: 'S&P 500', trend: 'Bullish (+1.2%)', outlook: 'Positive on AI & Tech' },
    { name: 'Bitcoin', trend: 'Volatile (-2.4%)', outlook: 'Testing support levels' },
    { name: 'Interest Rates', trend: 'Stable', outlook: 'Focus and inflation data next week' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || !ai) return;

    if (!user) {
      setMessages(prev => [...prev, 
        { role: 'user', content: input.trim() },
        { role: 'model', content: "Salutations. I am Al-Murshid, your institutional AI advisor. To provide personalized financial counsel based on your unique risk profile and knowledge level, I require you to be a registered member of the platform. Please enter the platform to proceed with our intelligence discourse." }
      ]);
      setInput('');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const systemPrompt = `You are "Al-Murshid", an expert financial advisor on the Isthmarati platform. 
      The platform uses an editorial, institutional-grade brand voice.
      
      Always respond in the language the user is speaking (${i18n.language}).
      Be professional, intellectual, and clear. 
      Focus on providing high-level wealth management advice and financial literacy.

      USER CONTEXT:
      - Name: ${user?.displayName || 'Investor'}
      - Knowledge Level: ${profile?.level || 1}
      - Points (Engagement): ${profile?.points || 0}
      - Risk Tolerance: ${profile?.riskTolerance || 'Moderate'} (Crucial for your recommendations)

      CURRENT MARKET CONTEXT (USE FOR RECOMMENDATIONS):
      ${marketTrends.map(m => `- ${m.name}: ${m.trend}. Outlook: ${m.outlook}`).join('\n')}

      GUIDELINES:
      1. Tailored Recommendations: If the user asks for investment advice, provide a strategy that aligns with their Risk Tolerance (${profile?.riskTolerance}).
      2. Educational Tone: Since their level is ${profile?.level}, keep explanations appropriate (Level 1 = Basic, Level 5+ = Technical).
      3. Global Standards: Only mention legitimate asset classes (equities, index funds, bonds, established crypto, real estate).
      4. Disclaimer: Always include a brief institutional disclaimer at the end that this is educational advice.`;

      const response = await ai.models.generateContent({
        model: MODELS.flash,
        contents: [
            ...messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
            { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: systemPrompt,
        }
      });

      const reply = response.text || "I apologize, I'm having trouble processing that right now.";
      setMessages(prev => [...prev, { role: 'model', content: reply }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "I'm sorry, I'm offline at the moment. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const isRTL = t('common.dir') === 'rtl';

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className={`fixed inset-0 md:inset-auto md:bottom-28 ${isRTL ? 'md:left-8' : 'md:right-8'} z-[60] w-full md:w-[420px] h-[100dvh] md:h-[650px] bg-paper border-t-2 md:border-2 border-ink shadow-editorial overflow-hidden flex flex-col transition-all pb-[env(safe-area-inset-bottom)]`}
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b-2 border-ink bg-white flex justify-between items-center shrink-0 pt-[max(1rem,env(safe-area-inset-top))]">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">AI Advisor: Al-Murshid</h3>
                  <p className="text-[9px] font-bold text-ink/40 uppercase mt-0.5 tracking-widest">Institutional Intelligence</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-ink/5 rounded-full transition-colors md:hidden"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 thin-scrollbar bg-[#fafafa]"
            >
              {messages.length === 0 && (
                <div className="text-center py-10 md:py-20 space-y-4 md:space-y-6 opacity-40">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-pink-light border-2 border-brand-pink/20 rounded-full flex items-center justify-center mx-auto text-brand-pink">
                    <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-serif italic text-xl md:text-2xl font-bold">Good day, {user?.displayName || 'Investor'}.</p>
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">What financial complexity can I unravel for you today?</p>
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] md:max-w-[85%] p-4 md:p-5 text-sm leading-relaxed border-2 ${
                    m.role === 'user' 
                      ? 'bg-ink text-paper border-ink italic' 
                      : 'bg-white text-ink border-ink/5'
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white border-2 border-ink/5 p-3 md:p-4 flex gap-1.5 items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">Murshid is analyzing</span>
                    <div className="flex gap-1">
                      <span className="w-1 h-1 bg-ink/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1 h-1 bg-ink/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1 h-1 bg-ink/40 rounded-full animate-bounce" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 md:p-6 bg-white border-t-2 border-ink shrink-0">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about market dynamics..."
                  className="w-full pl-0 pr-12 py-3 bg-transparent text-sm font-serif italic border-b-2 border-ink/10 focus:border-ink focus:outline-none transition-all placeholder:text-ink/20"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-brand-pink disabled:opacity-20 transition-all font-black text-xl"
                >
                  &#8594;
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 ${isRTL ? 'left-8' : 'right-8'} z-[70] w-16 h-16 bg-ink text-paper border-2 border-ink shadow-editorial flex flex-col items-center justify-center hover:bg-brand-pink transition-colors group`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 group-hover:hidden">Murshid</span>
            <Bot className="w-6 h-6 hidden group-hover:block" />
          </>
        )}
        <div className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-4 h-4 bg-pink-500 border-2 border-paper`} />
      </motion.button>
    </>
  );
}
