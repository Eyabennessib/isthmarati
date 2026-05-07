import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Calculator, 
  HelpCircle, 
  ArrowRight, 
  PieChart as PieIcon, 
  RefreshCcw,
  Info,
  Coins,
  Sprout,
  Cpu,
  Target,
  ArrowUpRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const STOCK_CATEGORIES = [
  {
    id: 'sharia',
    title: 'Sharia-Based Stocks',
    icon: Coins,
    desc: 'Ethical investments compliant with Islamic principles (no interest, gambling, or prohibited goods).',
    externalLink: 'https://www.justetf.com/en/how-to-stocks/islamic-stocks/',
    examples: [
      { name: 'Wahed FTSE USA Shariah ETF', ticker: 'HLAL' },
      { name: 'Apple Inc.', ticker: 'AAPL' },
      { name: 'Intel Corporation', ticker: 'INTC' }
    ],
    color: 'text-brand-pink',
    bg: 'bg-brand-pink-light'
  },
  {
    id: 'ecological',
    title: 'Ecological (ESG)',
    icon: Sprout,
    desc: 'Environmental, Social, and Governance focused companies leading the transition to a green economy.',
    examples: [
      { name: 'Tesla, Inc.', ticker: 'TSLA' },
      { name: 'NextEra Energy', ticker: 'NEE' },
      { name: 'iShares Global Clean Energy ETF', ticker: 'ICLN' }
    ],
    color: 'text-brand-pink',
    bg: 'bg-brand-pink-light'
  },
  {
    id: 'tech',
    title: 'Technology & AI',
    icon: Cpu,
    desc: 'High-growth companies driving the digital revolution through AI, SaaS, and infrastructure.',
    examples: [
      { name: 'NVIDIA Corporation', ticker: 'NVDA' },
      { name: 'Microsoft Corporation', ticker: 'MSFT' },
      { name: 'Alphabet Inc.', ticker: 'GOOGL' }
    ],
    color: 'text-brand-pink',
    bg: 'bg-brand-pink-light'
  }
];

export default function Tools() {
  const { t } = useTranslation();
  const [initialAmount, setInitialAmount] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(7);
  const [data, setData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(STOCK_CATEGORIES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const SECTOR_INTEL = {
    sharia: {
      outlook: 'Bullish',
      growth: '+12.4%',
      risk: 'Medium-Low',
      summary: 'The Sharia-compliant segment is witnessing record inflows as ethical investing goes mainstream. Strong balance sheets in tech and healthcare components provide a defensive cushion against rate volatility.',
      drivers: ['Sukuk market expansion', 'Increasing demand for interest-free retail finance', 'High cash reserves in screened tech entities']
    },
    ecological: {
      outlook: 'Moderate',
      growth: '+18.2%',
      risk: 'High',
      summary: 'Green energy is the decade-long trade. While high rates have pressured capital-intensive utility projects, the regulatory tailwinds from global carbon mandates remain an unstoppable force.',
      drivers: ['Grid modernization subsidies', 'EV infrastructure bill peaks', 'Carbon credit market maturation']
    },
    tech: {
      outlook: 'Aggressive',
      growth: '+24.1%',
      risk: 'High',
      summary: 'AI hardware and cloud infrastructure are in a secular bull market. Valuation multiples are high, but earnings growth in the compute-layer continues to surprise on the upside.',
      drivers: ['LLM training demand surge', 'Edge computing adoption', 'SaaS margin expansion through AI automation']
    }
  };

  const handleAnalyzeSector = () => {
    setIsAnalyzing(true);
    // Simulate high-fidelity AI synthesis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowReport(true);
    }, 2500);
  };

  useEffect(() => {
    let current = initialAmount;
    const results = [];
    const monthlyRate = returnRate / 100 / 12;

    for (let year = 0; year <= years; year++) {
      results.push({
        year: `${t('tools.year_label')} ${year}`,
        balance: Math.round(current)
      });
      
      // Calculate next year (monthly contributions)
      for (let month = 0; month < 12; month++) {
        current = (current + monthlyContribution) * (1 + monthlyRate);
      }
    }
    setData(results);
  }, [initialAmount, monthlyContribution, years, returnRate, t]);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">{t('tools.title')}</h1>
          <p className="text-gray-500 font-medium font-sans text-sm md:text-base">{t('tools.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Card */}
        <div className="lg:col-span-1 bg-white rounded-[2rem] md:rounded-[3rem] border border-[#1a1a1a]/5 p-6 md:p-10 space-y-6 md:space-y-8 shadow-sm">
           <div className="flex items-center gap-4 pb-4 md:pb-6 border-b border-gray-50">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                 <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">{t('tools.calc')}</h3>
           </div>

           <div className="space-y-6">
              <div className="space-y-3">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center justify-between">
                    {t('tools.initial')}
                    <span className="text-[#1a1a1a]">${initialAmount.toLocaleString()}</span>
                 </label>
                 <input 
                  type="range" 
                  min="0" 
                  max="100000" 
                  step="1000"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full accent-[#1a1a1a]"
                 />
              </div>

              <div className="space-y-3">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center justify-between">
                    {t('tools.monthly')}
                    <span className="text-[#1a1a1a]">${monthlyContribution.toLocaleString()}</span>
                 </label>
                 <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="50"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full accent-[#1a1a1a]"
                 />
              </div>

              <div className="space-y-3">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center justify-between">
                    {t('tools.horizon')}
                    <span className="text-[#1a1a1a]">{years} {t('tools.years_abbr')}</span>
                 </label>
                 <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-[#1a1a1a]"
                 />
              </div>

              <div className="space-y-3">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center justify-between">
                    {t('tools.return')}
                    <span className="text-[#1a1a1a] font-serif italic">{returnRate}%</span>
                 </label>
                 <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  step="0.5"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="w-full accent-[#1a1a1a]"
                 />
              </div>
           </div>

           <div className="p-6 bg-orange-50 rounded-3xl space-y-2">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                 <Info className="w-4 h-4" />
                 {t('tools.pro_tip')}
              </div>
              <p className="text-xs text-orange-800 leading-relaxed font-medium">{t('tools.tip_desc')}</p>
           </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-2 bg-[#1a1a1a] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 text-white flex flex-col gap-8 md:gap-12 shadow-2xl relative overflow-hidden">
           {/* Decor */}
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-600/20 rounded-full blur-[100px]" />
           
           <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
              <div>
                 <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 mb-2">{t('tools.balance')}</p>
                 <h2 className="text-4xl md:text-6xl font-serif font-bold text-orange-500">
                   ${data[data.length - 1]?.balance?.toLocaleString()}
                 </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 text-start md:text-end w-full xl:w-auto">
                 <div>
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{t('tools.total_invested')}</p>
                    <p className="font-bold text-base md:text-lg">${(initialAmount + (monthlyContribution * years * 12)).toLocaleString()}</p>
                 </div>
                 <div>
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{t('tools.total_interest')}</p>
                    <p className="font-bold text-base md:text-lg text-pink-400">${(data[data.length - 1]?.balance - (initialAmount + (monthlyContribution * years * 12))).toLocaleString()}</p>
                 </div>
              </div>
           </div>

           <div className="flex-1 min-h-[350px] relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data}>
                    <defs>
                       <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <XAxis 
                       dataKey="year" 
                       hide 
                    />
                    <Tooltip 
                       contentStyle={{ 
                          backgroundColor: '#262626', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: '#fff'
                       }}
                       itemStyle={{ color: '#f97316' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#f97316" 
                      strokeWidth={4} 
                      fill="url(#balanceGradient)" 
                    />
                 </AreaChart>
              </ResponsiveContainer>
           </div>

           <div className="relative z-10 p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between">
              <p className="text-sm font-medium text-white/60">{t('tools.cta')}</p>
              <button className="flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-white transition-colors">
                {t('tools.session')} <ArrowRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>

      {/* Thematic Stock Explorer */}
      <section className="pt-12 border-t-2 border-ink space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-pink">Discovery Desk</p>
            <h2 className="text-4xl md:text-6xl font-serif italic font-bold tracking-tighter">Thematic Explorer.</h2>
            <p className="text-ink/60 max-w-lg text-sm font-medium leading-relaxed italic">Browse curated investment universes aligned with your values and growth objectives.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* List of Categories */}
          <div className="md:col-span-4 space-y-4">
            {STOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "w-full p-6 border-2 border-ink text-left transition-all relative overflow-hidden group",
                  selectedCategory.id === cat.id 
                    ? "bg-ink text-paper shadow-editorial translate-x-1 -translate-y-1" 
                    : "bg-white hover:bg-brand-pink-light/30"
                )}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={cn(
                    "p-3 rounded-xl border-2 border-ink transition-colors",
                    selectedCategory.id === cat.id ? "bg-white text-ink" : "bg-brand-pink-light text-brand-pink"
                  )}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs">{cat.title}</h4>
                    <p className={cn(
                      "text-[10px] font-medium italic mt-1",
                      selectedCategory.id === cat.id ? "text-paper/60" : "text-ink/40"
                    )}>
                      {cat.examples.length} {t('tools.examples_label')}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Details & Examples */}
          <div className="md:col-span-8 bg-white border-2 border-ink p-8 md:p-12 shadow-editorial relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <selectedCategory.icon className="w-48 h-48 rotate-12" />
             </div>
             
             <div className="relative z-10 space-y-12">
                <div className="space-y-4 max-w-xl">
                  <h3 className="text-3xl font-serif font-bold italic">{selectedCategory.title}</h3>
                  <p className="text-ink/60 font-medium leading-relaxed italic">{selectedCategory.desc}</p>
                </div>

                <div className="space-y-6">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink border-b border-ink/10 pb-4">Curated Portfolio Examples</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedCategory.examples.map((stock, idx) => (
                      <div key={idx} className="p-6 border-2 border-ink group hover:bg-ink hover:text-paper transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-2 bg-brand-pink-light text-brand-pink rounded-lg font-black text-[9px] uppercase tracking-tighter">
                             {stock.ticker}
                           </div>
                           <ArrowUpRight className="w-4 h-4 text-brand-pink group-hover:text-paper" />
                        </div>
                        <h6 className="font-bold text-sm leading-tight group-hover:underline">{stock.name}</h6>
                        <div className="mt-4 h-1 w-full bg-gray-100 group-hover:bg-white/10">
                           <div className="h-full bg-brand-pink" style={{ width: `${40 + (idx * 15)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-ink/10">
                   <p className="text-xs font-bold italic text-ink/40">Note: Market examples provided for educational context only.</p>
                   <div className="flex gap-4">
                     {selectedCategory.externalLink && (
                       <a 
                         href={selectedCategory.externalLink}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="px-6 py-3 border-2 border-ink text-ink text-xs font-black uppercase tracking-widest hover:bg-ink hover:text-paper transition-all flex items-center gap-2"
                       >
                         Explore More Examples
                         <ArrowUpRight className="w-4 h-4" />
                       </a>
                     )}
                     <button 
                       onClick={handleAnalyzeSector}
                       className="px-6 py-3 bg-brand-pink text-paper text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-editorial"
                     >
                       {t('tools.analyze_sector_btn', 'Analyze Full Sector')}
                     </button>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* AI Analysis Loading Overlay */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-ink/95 flex flex-col items-center justify-center text-paper p-8 text-center"
            >
              <div className="w-24 h-24 border-4 border-paper/10 border-t-brand-pink rounded-full animate-spin mb-8" />
              <div className="space-y-4 max-w-md">
                <h3 className="text-2xl font-serif italic text-brand-pink">Synthesizing Market Intelligence...</h3>
                <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Al-Murshid is scanning global indices for {selectedCategory.title}</p>
                <div className="flex gap-2 justify-center pt-4">
                  {[1,2,3].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 bg-brand-pink rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Analysis Report Modal */}
          {showReport && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[100] bg-paper overflow-y-auto p-4 md:p-12"
            >
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex justify-between items-start border-b-4 border-ink pb-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-pink mb-2">Institutional Report #{Math.floor(Math.random() * 10000)}</p>
                    <h2 className="text-4xl md:text-6xl font-serif italic font-bold tracking-tighter">Sector Intelligence.</h2>
                  </div>
                  <button 
                    onClick={() => setShowReport(false)}
                    className="p-4 border-2 border-ink hover:bg-ink hover:text-paper transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-ink text-paper text-[10px] font-black uppercase italic tracking-widest">{selectedCategory.title}</span>
                        <span className="text-ink/20 font-serif italic">Last Updated: Today 18:37</span>
                      </div>
                      <p className="text-2xl md:text-3xl font-bold leading-tight">
                        {(SECTOR_INTEL as any)[selectedCategory.id]?.summary}
                      </p>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-sm font-black uppercase tracking-widest border-b border-ink/10 pb-2">Key Value Extraction Drivers</h4>
                       <div className="space-y-3">
                          {(SECTOR_INTEL as any)[selectedCategory.id]?.drivers.map((driver: string, idx: number) => (
                            <div key={idx} className="flex gap-4 items-start">
                              <span className="text-brand-pink font-black text-xs">0{idx+1}</span>
                              <p className="text-sm font-medium italic text-ink/80">{driver}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-8 border-2 border-ink bg-white shadow-editorial space-y-6">
                      <div>
                        <p className="text-[9px] font-black uppercase opacity-40 mb-1">Strategic Outlook</p>
                        <p className="text-xl font-bold text-brand-pink italic">{(SECTOR_INTEL as any)[selectedCategory.id]?.outlook}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase opacity-40 mb-1">Projected Annual CAGR</p>
                        <p className="text-xl font-bold">{(SECTOR_INTEL as any)[selectedCategory.id]?.growth}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase opacity-40 mb-1">Risk Volatility Profile</p>
                        <p className="text-xl font-bold">{(SECTOR_INTEL as any)[selectedCategory.id]?.risk}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-brand-pink-light border border-brand-pink/20 rounded-xl italic text-[11px] font-medium leading-relaxed">
                      "Professional markets are gravitating toward transparency and sector-specific resilience. This analysis suggests a strategic allocation weight increase of 5% in {selectedCategory.title} based on current sentiment indices."
                    </div>
                  </div>
                </div>

                <div className="pt-12 text-center">
                  <button 
                    onClick={() => setShowReport(false)}
                    className="px-12 py-4 bg-ink text-paper font-black uppercase tracking-widest text-xs hover:bg-brand-pink transition-colors shadow-editorial"
                  >
                    Return to Workbench
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

// Helper for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
