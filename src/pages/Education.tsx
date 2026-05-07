import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Clock, 
  Award, 
  ChevronRight,
  Lock,
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

const MODULES = [
  {
    id: 'basics',
    title: 'Market Fundamentals',
    tag: 'MODULE 01',
    color: 'text-blue-600',
    description: 'The bedrock of capital preservation and wealth generation.',
    lessons: [
      { 
        id: 1, 
        title: 'The Philosophy of Wealth', 
        duration: '5m', 
        points: 20,
        content: `
Wealth is not merely the accumulation of currency; it is the strategic management of assets that produce value over time. In this lesson, we explore the mindset shift from a "consumer" to an "investor."

**Key Principles:**
1. **Assets vs. Liabilities:** An asset puts money in your pocket; a liability takes it out.
2. **Delayed Gratification:** The ability to sacrifice immediate consumption for future financial freedom.
3. **The Velocity of Money:** How quickly your capital can be redeployed into new opportunities.

*Authentic wealth is built through ownership, not just income.*
        `
      },
      { 
        id: 2, 
        title: 'Risk: The Price of Admission', 
        duration: '8m', 
        points: 30,
        content: `
Risk is often misunderstood as "chance." In professional finance, risk is the quantifiable uncertainty of returns. 

**Types of Risk:**
- **Market Risk:** The possibility of an entire market shifting.
- **Inflation Risk:** The silent thief that erodes purchasing power.
- **Liquidity Risk:** The danger of not being able to sell an asset quickly.

*Understand that avoiding all risk is the greatest risk of all, as it guarantees the erosion of your capital by inflation.*
        `
      },
      { 
        id: 3, 
        title: 'The Power of Compounded Time', 
        duration: '12m', 
        points: 50,
        content: `
Albert Einstein famously called compound interest the "eighth wonder of the world." It is the process where the value of an investment increases because the earnings on an investment earn interest as time passes.

**The Formula:**
A = P(1 + r/n)^(nt)

**Why Time Matters:**
Starting five years earlier can result in double the final portfolio size due to the exponential nature of compounding. 

*Consistency + Time = Prosperity.*
        `
      },
    ],
    quiz: {
      question: "Which of these is the most important factor in long-term wealth building?",
      options: ["Quick Stocks", "Consistency and Time", "Winning the lottery", "Waiting for a crash"],
      correct: 1
    }
  },
  {
    id: 'stock-market',
    title: 'Modern Equity Markets',
    tag: 'MODULE 02',
    color: 'text-brand-pink',
    description: 'Deciphering the machinery of global stock exchanges.',
    lessons: [
      { 
        id: 4, 
        title: 'Capital Structure & Ownership', 
        duration: '10m', 
        points: 40,
        content: `
When you buy a stock, you aren't just buying a ticker symbol; you are buying a piece of a living, breathing business.

**Equity Basics:**
- **Common Stock:** Provides voting rights and potential dividends.
- **Preferred Stock:** Higher claim on assets but usually no voting rights.
- **Market Cap:** The total value of a company (Price x Shares Outstanding).

*Investing in equities is a vote of confidence in human productivity.*
        `
      },
      { 
        id: 5, 
        title: 'Balance Sheet Intelligence', 
        duration: '15m', 
        points: 60,
        content: `
The Balance Sheet is a snapshot of a company's financial health at a single point in time. It follows the fundamental accounting equation:

**Assets = Liabilities + Shareholders' Equity**

**What to Look For:**
- **Current Ratio:** Can they pay their short-term debts?
- **Debt-to-Equity:** Are they over-leveraged?
- **Retained Earnings:** How much profit is reinvested into growth?

*Numbers tell the story that management might not.*
        `
      },
      { 
        id: 6, 
        title: 'Indexation & Systematic Funds', 
        duration: '12m', 
        points: 50,
        content: `
An ETF (Exchange Traded Fund) allows you to buy a "basket" of stocks in one transaction, providing instant diversification.

**Index Investing:**
Instead of trying to find the "needle" (one winning stock), indexation buys the whole "haystack."

**Benefits:**
1. **Low Fees:** Passive management costs less.
2. **Diversification:** Reduces individual company risk.
3. **Simplicity:** One trade covers hundreds of businesses.
        `
      },
    ],
    quiz: {
      question: "What does ETF stand for?",
      options: ["Electronic Trade Fund", "Every Tech Firm", "Exchange Traded Fund", "External Trade Finance"],
      correct: 2
    }
  },
  {
    id: 'retirement',
    title: 'Strategic Asset Selection',
    tag: 'MODULE 03',
    color: 'text-purple-600',
    description: 'Diversification strategies for generational prosperity.',
    lessons: [
      { 
        id: 7, 
        title: 'Generational Planning', 
        duration: '15m', 
        points: 70,
        content: `
Wealth is built over decades, not days. Generational planning involves structuring assets to survive beyond your own lifetime.

**Core Pillars:**
- **Diversification:** Spreading assets across stocks, bonds, and real estate.
- **Estate Planning:** Ensuring a smooth transition of assets.
- **Education:** Teaching the next generation the value of the capital they inherit.

*True wealth is measured by what remains after you are gone.*
        `
      },
      { 
        id: 8, 
        title: 'Fiscal Optimization', 
        duration: '20m', 
        points: 80,
        content: `
It's not about what you make, but what you keep. Taxes are the single largest "expense" for most long-term investors.

**Strategies:**
- **Tax-Advantaged Accounts:** Using IRA or 401(k) equivalents.
- **Harvesting Losses:** Offsetting gains with underperforming assets.
- **Long-term Capital Gains:** Holding assets for over a year to reduce tax rates.

*Efficiency in taxation is as important as selection in investment.*
        `
      },
    ],
    quiz: {
      question: "When should you start saving for retirement?",
      options: ["At age 50", "When you get a raise", "As early as possible", "Next year"],
      correct: 2
    }
  }
];

const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: "How would you define your current investment experience?",
    options: ["None - I'm just starting out", "Minimal - I've looked at markets", "Active - I manage a small portfolio", "Professional - I trade or advise regularly"],
    points: [0, 1, 2, 3]
  },
  {
    id: 2,
    question: "What is an 'Exchange Traded Fund' (ETF)?",
    options: ["A single company stock", "A basket of securities traded on an exchange", "A bank savings account", "A government loan"],
    correct: 1
  },
  {
    id: 3,
    question: "Diversification is primarily used to:",
    options: ["Guarantee 100% returns", "Spread risk across different assets", "Focus all capital on one winner", "Avoid paying taxes"],
    correct: 1
  },
  {
    id: 4,
    question: "Which document shows a company's assets, liabilities, and equity at a specific point in time?",
    options: ["Cash Flow Statement", "Income Statement", "Balance Sheet", "Annual Review"],
    correct: 2
  }
];

export default function Education() {
  const { t } = useTranslation();
  const { profile, user, updateProfile } = useUser();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Assessment state
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentResults, setAssessmentResults] = useState<number[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [detectedLevel, setDetectedLevel] = useState<string | null>(null);

  // Only show assessment if profile is loaded and level is missing
  const showAssessment = profile && !profile.investmentLevel && !detectedLevel;

  const handleAssessmentAnswer = (index: number) => {
    const newResults = [...assessmentResults, index];
    setAssessmentResults(newResults);

    if (assessmentStep < ASSESSMENT_QUESTIONS.length - 1) {
      setAssessmentStep(prev => prev + 1);
    } else {
      calculateLevel(newResults);
    }
  };

  const calculateLevel = async (results: number[]) => {
    setIsCalculating(true);
    let score = 0;
    // Q1 is experience based
    score += results[0]; 
    // Q2-4 are knowledge based
    if (results[1] === ASSESSMENT_QUESTIONS[1].correct) score += 2;
    if (results[2] === ASSESSMENT_QUESTIONS[2].correct) score += 2;
    if (results[3] === ASSESSMENT_QUESTIONS[3].correct) score += 2;

    let level = 'Beginner';
    if (score >= 3 && score < 5) level = 'Amateur';
    if (score >= 5 && score < 8) level = 'Advanced';
    if (score >= 8) level = 'Expert';

    setDetectedLevel(level);
    setIsCalculating(false);
  };

  const finalizeAssessment = async () => {
    if (user && detectedLevel) {
      await updateProfile({
        investmentLevel: detectedLevel,
        levelUpdated: new Date().toISOString()
      });
    }
  };

  const handleLessonAction = async (lesson: any) => {
    const isLocked = lesson.id > 1 && !profile?.completedLessons?.includes((lesson.id - 1).toString());
    if (isLocked) return;
    setActiveLesson(lesson.id);
  };

  const handleLessonComplete = async () => {
    if (!activeLesson || !selectedModule) return;
    
    const mod = MODULES.find(m => m.id === selectedModule);
    const lesson = mod?.lessons.find(l => l.id === activeLesson);
    
    if (!lesson) return;

    if (!profile?.completedLessons?.includes(lesson.id.toString())) {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, {
            points: increment(lesson.points),
            completedLessons: arrayUnion(lesson.id.toString())
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
        }
      }
    }
    setActiveLesson(null);
  };

  const handleQuizSubmit = async (optionIndex: number) => {
    const mod = MODULES.find(m => m.id === selectedModule);
    if (!mod) return;

    if (optionIndex === mod.quiz.correct) {
      setQuizScore(100);
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, {
            points: increment(100),
            level: increment(0.1) // Simple progress
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
        }
      }
    } else {
      setQuizScore(0);
    }
  };

  return (
    <div className="space-y-12 pb-20 relative">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 z-[100] bg-paper/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-8 p-12 border-4 border-ink bg-white shadow-editorial relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-brand-pink/20 rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 border-2 border-brand-pink/20 rounded-full" />
          
          <div className="space-y-4 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-pink">Future Insight</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold italic tracking-tighter">{t('common.coming_soon')}.</h2>
            <p className="text-ink/60 font-medium italic leading-relaxed">
              We are currently refining our institutional-grade curriculum. The Al-Murshid academy will return shortly with advanced strategies for modern capital management.
            </p>
          </div>
          
          <div className="pt-8 relative z-10">
            <button 
              onClick={() => window.location.hash = '#home'} 
              className="px-8 py-4 bg-ink text-paper text-[10px] font-black uppercase tracking-widest hover:bg-brand-pink transition-colors shadow-editorial"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>

      {/* Level Assessment Overlay */}
      <AnimatePresence>
        {(showAssessment || detectedLevel) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-paper flex items-center justify-center p-4 md:p-12 overflow-y-auto"
          >
            <div className="max-w-2xl w-full border-4 border-ink p-8 md:p-16 bg-white shadow-editorial space-y-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 font-serif italic text-9xl pointer-events-none">
                {detectedLevel ? '!' : '?'}
              </div>

              {!detectedLevel ? (
                <>
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-pink">Knowledge Audit</p>
                    <h2 className="text-4xl md:text-5xl font-serif italic font-bold tracking-tighter">Define your Path.</h2>
                    <p className="text-ink/60 font-medium italic leading-relaxed">
                      Before we begin, Al-Murshid needs to establish your baseline market intelligence. 
                      Question {assessmentStep + 1} of {ASSESSMENT_QUESTIONS.length}
                    </p>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-xl md:text-2xl font-bold leading-tight">
                      {ASSESSMENT_QUESTIONS[assessmentStep].question}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {ASSESSMENT_QUESTIONS[assessmentStep].options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAssessmentAnswer(i)}
                          className="group p-6 border-2 border-ink text-left transition-all hover:bg-ink hover:text-paper"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm md:text-base">{opt}</span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-ink/10">
                    <div className="w-full h-1 bg-ink/5">
                        <motion.div 
                          className="h-full bg-brand-pink" 
                          initial={{ width: 0 }}
                          animate={{ width: `${((assessmentStep + 1) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                        />
                    </div>
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12 text-center"
                >
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-pink">Analysis Complete</p>
                    <h2 className="text-5xl md:text-7xl font-serif italic font-bold tracking-tighter">Your Level: {detectedLevel}</h2>
                    <p className="text-ink/60 max-w-md mx-auto font-medium italic leading-relaxed">
                      Based on your responses, we've tuned the curriculum to challenge your current capabilities. Success is a matter of discipline.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={finalizeAssessment}
                      className="px-16 py-6 bg-ink text-paper text-sm font-black uppercase tracking-widest hover:bg-brand-pink transition-colors shadow-editorial group flex items-center gap-4"
                    >
                      BEGIN JOURNEY <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-12">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-pink">Learning Journey</p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold italic tracking-tighter leading-none">Market Mastery.</h1>
          <p className="text-ink/60 max-w-lg text-sm font-medium leading-relaxed italic">Systematic wealth education distilled into strategic modules for the modern financier.</p>
        </div>
        <div className="flex gap-4">
           {profile?.investmentLevel && (
             <div className="px-6 py-3 border-2 border-ink bg-ink text-paper text-[10px] font-black uppercase tracking-widest italic shadow-editorial">
               LEVEL: {profile.investmentLevel}
             </div>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Module List */}
        <div className="lg:col-span-4 space-y-6">
          {MODULES.map((mod) => {
            const isModuleLocked = mod.lessons[0].id > 1 && !profile?.completedLessons?.includes((mod.lessons[0].id - 1).toString());
            const isCompleted = mod.lessons.every(l => profile?.completedLessons?.includes(l.id.toString()));

            return (
              <button
                 key={mod.id}
                 onClick={() => {
                   if (isModuleLocked) return;
                   setSelectedModule(mod.id);
                   setQuizActive(false);
                   setQuizScore(null);
                 }}
                 className={`w-full p-8 border-2 border-ink text-left transition-all relative overflow-hidden group ${
                   isModuleLocked
                     ? 'opacity-60 grayscale cursor-not-allowed bg-ink/[0.02]'
                     : selectedModule === mod.id 
                       ? 'bg-white shadow-editorial translate-x-1 -translate-y-1' 
                       : 'bg-white hover:bg-brand-pink-light/30'
                 }`}
              >
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="space-y-1">
                    <span className={`text-[10px] font-black tracking-[0.3em] uppercase ${isModuleLocked ? 'text-ink/20' : mod.color}`}>
                      {mod.tag}
                    </span>
                    {isCompleted && (
                      <div className="flex items-center gap-1 text-[8px] font-black text-brand-pink uppercase">
                        <CheckCircle2 className="w-2 h-2" /> Complete
                      </div>
                    )}
                  </div>
                  {isModuleLocked && (
                     <Lock className="w-3 h-3 text-ink/20" />
                  )}
                </div>
                
                <h3 className={`text-2xl font-serif font-bold italic relative z-10 leading-tight mb-2 ${!isModuleLocked && 'group-hover:underline'}`}>
                  {mod.title}
                </h3>
  
                <p className="text-[10px] text-ink/40 font-medium italic mb-4 relative z-10 line-clamp-2">
                  {mod.description}
                </p>
                
                <p className="text-xs text-ink/40 font-bold uppercase tracking-wider relative z-10">
                  {mod.lessons.length} LESSONS • {(mod.lessons.length * 10)}m EST.
                </p>
  
                <div className={`mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors relative z-10 ${
                  isModuleLocked ? 'text-ink/10' : 'text-ink/20 group-hover:text-ink'
                }`}>
                  {isModuleLocked ? 'PATH LOCKED' : 'ENTER PATH'} <ChevronRight className="w-3 h-3" />
                </div>
  
                <div className="absolute bottom-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                   <span className="font-serif italic text-9xl">
                     {mod.title.charAt(0)}
                   </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content View */}
        <div className="lg:col-span-8 bg-white border-2 border-ink p-8 md:p-16 shadow-editorial min-h-[600px] flex flex-col relative overflow-hidden">
          {selectedModule ? (
            <AnimatePresence mode="wait">
              {activeLesson ? (
                 <motion.div
                   key="lesson-reader"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="flex-1 flex flex-col space-y-12"
                 >
                    <button 
                      onClick={() => setActiveLesson(null)}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-ink/40 hover:text-ink transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3" /> Back to path
                    </button>

                    <div className="space-y-6">
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink">LESSON {activeLesson}</p>
                          <h2 className="text-3xl md:text-5xl font-serif font-bold italic tracking-tighter">
                            {MODULES.find(m => m.id === selectedModule)?.lessons.find(l => l.id === activeLesson)?.title}.
                          </h2>
                       </div>
                       
                       <div className="prose prose-ink max-w-none prose-p:font-medium prose-p:italic prose-p:text-ink/70 prose-headings:font-serif prose-headings:italic prose-strong:text-brand-pink prose-strong:font-black">
                          <ReactMarkdown>
                            {MODULES.find(m => m.id === selectedModule)?.lessons.find(l => l.id === activeLesson)?.content || ''}
                          </ReactMarkdown>
                       </div>
                    </div>

                    <div className="pt-12 mt-auto border-t-2 border-ink/5 flex justify-between items-center">
                       <p className="text-[10px] font-black uppercase tracking-widest text-ink/20">Read thoroughly before completing.</p>
                       <button
                         onClick={handleLessonComplete}
                         className="px-12 py-5 bg-ink text-paper text-sm font-black uppercase tracking-widest hover:bg-brand-pink transition-colors shadow-editorial flex items-center gap-4"
                       >
                         Complete Lesson <CheckCircle2 className="w-5 h-5" />
                       </button>
                    </div>
                 </motion.div>
              ) : !quizActive ? (
                 <motion.div 
                   key="lessons"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="space-y-12"
                 >
                   <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b-2 border-ink/5 pb-8">
                     <div className="space-y-2">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-pink">
                          {MODULES.find(m => m.id === selectedModule)?.tag} Curriculum
                        </p>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold italic tracking-tighter">
                          {MODULES.find(m => m.id === selectedModule)?.title}.
                        </h2>
                     </div>
                     <div className="flex items-center gap-3 px-4 py-2 border border-ink/10 italic text-xs font-medium text-ink/60">
                       <Award className="w-4 h-4 text-brand-pink" />
                       {t('education.earn_msg')}
                     </div>
                   </div>

                   <div className="space-y-6">
                     {MODULES.find(m => m.id === selectedModule)?.lessons.map((lesson, idx) => {
                       const isCompleted = profile?.completedLessons?.includes(lesson.id.toString());
                       const isLocked = lesson.id > 1 && !profile?.completedLessons?.includes((lesson.id - 1).toString());
                       const isActive = activeLesson === lesson.id;

                       return (
                        <div 
                          key={lesson.id} 
                          onClick={() => handleLessonAction(lesson)}
                          className={`group flex items-center justify-between p-6 border-2 transition-all cursor-pointer ${
                            isLocked 
                              ? 'opacity-40 cursor-not-allowed border-ink/5 bg-ink/[0.02]' 
                              : isActive 
                                ? 'border-ink bg-ink text-paper shadow-editorial translate-x-1 -translate-y-1' 
                                : 'border-ink/5 hover:border-ink hover:bg-brand-pink-light/30'
                          }`}
                        >
                           <div className="flex items-center gap-8">
                              <div className="font-serif italic text-2xl opacity-20">0{idx + 1}</div>
                              <div>
                                 <p className={`font-bold text-lg leading-tight ${isActive ? 'text-paper' : 'text-ink'}`}>{lesson.title}</p>
                                 <div className={`flex items-center gap-4 text-[10px] font-black uppercase tracking-widest mt-2 ${isActive ? 'text-paper/60' : 'text-ink/40'}`}>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.duration}</span>
                                    {!isLocked && (
                                      <span className={isCompleted ? 'text-brand-pink' : isActive ? 'text-brand-pink' : 'text-ink/40'}>
                                        {isCompleted ? 'EARNED' : `+${lesson.points} EXPLORER POINTS`}
                                      </span>
                                    )}
                                 </div>
                              </div>
                           </div>
                           <motion.div
                             animate={isActive ? { rotate: 90 } : { rotate: 0 }}
                           >
                             {isLocked ? (
                               <Lock className="w-5 h-5 text-ink/20" />
                             ) : (
                               <ArrowRight className={`w-6 h-6 ${isActive ? 'text-brand-pink' : 'text-ink/10 group-hover:text-ink'}`} />
                             )}
                           </motion.div>
                        </div>
                       );
                     })}
                   </div>

                   <div className="pt-12 flex justify-center">
                      <button 
                        onClick={() => {
                          const currentModule = MODULES.find(m => m.id === selectedModule);
                          const allCompleted = currentModule?.lessons.every(l => profile?.completedLessons?.includes(l.id.toString()));
                          if (allCompleted) {
                            setQuizActive(true);
                          }
                        }}
                        disabled={!MODULES.find(m => m.id === selectedModule)?.lessons.every(l => profile?.completedLessons?.includes(l.id.toString()))}
                        className={`px-12 py-5 text-sm font-black uppercase tracking-widest transition-all shadow-editorial flex items-center gap-4 ${
                          MODULES.find(m => m.id === selectedModule)?.lessons.every(l => profile?.completedLessons?.includes(l.id.toString()))
                            ? 'bg-brand-pink text-paper hover:scale-105 active:scale-95'
                            : 'bg-ink/5 text-ink/20 cursor-not-allowed border-2 border-ink/5'
                        }`}
                      >
                        {MODULES.find(m => m.id === selectedModule)?.lessons.every(l => profile?.completedLessons?.includes(l.id.toString())) ? (
                          <> {t('education.quiz_btn')} <ArrowRight className="w-4 h-4" /> </>
                        ) : (
                          <> <Lock className="w-4 h-4" /> {t('education.quiz_btn')} (LOCKED) </>
                        )}
                      </button>
                   </div>
                 </motion.div>
              ) : (
                <motion.div 
                   key="quiz"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex-1 flex flex-col justify-center max-w-2xl mx-auto space-y-16"
                >
                   <div className="space-y-6 text-center">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-pink">Session Conclusion</p>
                     <h3 className="text-3xl md:text-5xl font-serif font-bold italic tracking-tighter leading-tight">
                       {MODULES.find(m => m.id === selectedModule)?.quiz.question}
                     </h3>
                   </div>

                   {quizScore === null ? (
                     <div className="grid grid-cols-1 gap-6">
                       {MODULES.find(m => m.id === selectedModule)?.quiz.options.map((opt, i) => (
                         <button
                           key={i}
                           onClick={() => handleQuizSubmit(i)}
                           className="p-8 border-2 border-ink text-center font-bold text-lg hover:bg-ink hover:text-paper transition-all italic font-serif"
                         >
                           {opt}
                         </button>
                       ))}
                     </div>
                   ) : (
                     <div className="space-y-12 text-center bg-brand-pink-light/50 p-12 border-2 border-brand-pink">
                       <div className="space-y-4">
                         <h4 className="text-4xl font-serif font-bold italic tracking-tighter">
                           {quizScore > 0 ? 'Exemplary.' : 'Room for Growth.'}
                         </h4>
                         <p className="text-ink/60 font-medium italic">
                           {quizScore > 0 ? t('education.success_msg') : t('education.fail_msg')}
                         </p>
                       </div>
                       <button 
                         onClick={() => { setQuizActive(false); setQuizScore(null); }}
                         className="px-12 py-4 bg-ink text-paper text-xs font-black uppercase tracking-widest shadow-editorial"
                       >
                         {t('education.back_lessons')}
                       </button>
                     </div>
                   )}
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
               <div className="w-32 h-32 border-2 border-ink/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-ink/20" />
               </div>
               <div className="space-y-4">
                  <h3 className="text-3xl font-serif font-bold italic tracking-tighter">Select your focus.</h3>
                  <p className="text-sm font-medium italic text-ink/40 max-w-xs mx-auto">Choose a curriculum module to begin expanding your financial vocabulary.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
