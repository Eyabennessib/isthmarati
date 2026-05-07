import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { TrendingUp, BookOpen, Calculator, Users, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export default function Home({ setActiveTab }: HomeProps) {
  const { t } = useTranslation();
  const { profile, login, user } = useUser();

  const handleStartJourney = async () => {
    if (!user) {
      await login();
      return;
    }

    // Personalized Journey Redirection
    if (!profile?.riskTolerance || profile.riskTolerance === 'moderate') {
      // If user hasn't explicitly configured profile, guide them there
      setActiveTab('profile');
    } else if ((profile?.level || 1) < 2) {
      // Beginners should start with Education
      setActiveTab('education');
    } else {
      // Advanced users might prefer expert analysis
      setActiveTab('analysis');
    }
  };

  const features = [
    { id: 'education', icon: BookOpen, title: "Structured Learning", desc: "Gamified paths from beginner to expert.", color: "text-blue-600", bg: "bg-blue-50" },
    { id: 'analysis', icon: Shield, title: "Expert Analysis", desc: "Verified insights from financial professionals.", color: "text-brand-pink", bg: "bg-brand-pink-light" },
    { id: 'forum', icon: Users, title: "Community Forum", desc: "Engage with a global network of smart investors.", color: "text-purple-600", bg: "bg-purple-50" },
    { id: 'ai', icon: Zap, title: "AI Advisor", desc: "Your personal 24/7 financial companion.", color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="grid grid-cols-12 gap-8 items-center border-b-2 border-ink pb-16">
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: t('common.dir') === 'rtl' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 border-2 border-brand-pink text-brand-pink text-[10px] font-bold uppercase tracking-widest"
          >
            <Star className="w-3 h-3 fill-current" />
            {t('home.hero_badge')}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold leading-[0.9] italic tracking-tighter text-ink"
          >
            {t('home.hero_title')}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-ink/60 font-medium leading-relaxed max-w-xl"
          >
            {t('home.hero_subtitle')}
          </motion.p>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartJourney}
            className="px-10 py-5 bg-ink text-paper text-lg font-bold uppercase tracking-widest border-2 border-ink shadow-editorial hover:bg-brand-pink transition-all"
          >
            {user ? t('home.continue_btn') : t('home.start_btn')}
          </motion.button>
        </div>

        <div className="col-span-12 lg:col-span-5 relative aspect-square">
           <div className="absolute inset-4 border-2 border-ink rotate-3 bg-white" />
           <div className="absolute inset-4 overflow-hidden border-2 border-ink shadow-editorial">
              <img 
                src="https://images.unsplash.com/photo-1611974717482-480597aa237e?q=80&w=1000&auto=format&fit=crop" 
                alt="Finance" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                referrerPolicy="no-referrer"
              />
           </div>
        </div>
      </section>

      {/* Guest Component Previews / Snapshots */}
      {!user && (
        <section className="space-y-16">
          <div className="space-y-4">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-pink"
            >
              {t('home.features_subtitle')}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-serif italic font-bold tracking-tighter text-ink leading-none"
            >
              Everything you need <br />
              <span className="text-brand-pink/40">to master your assets.</span>
            </motion.h2>
            <p className="text-ink/60 max-w-lg text-sm font-medium leading-relaxed italic">Get a glimpse of the professional-grade tools and community insights available to our registered members.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Snapshot: Education */}
            <div className="group relative border-2 border-ink p-8 bg-white shadow-editorial overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
               <div className="relative z-20 space-y-6">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="p-3 bg-blue-100 text-blue-600 rounded-xl border border-blue-200">
                       <BookOpen className="w-5 h-5" />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-ink/40">The Academy</span>
                   </div>
                   <span className="text-[10px] font-black uppercase bg-ink text-paper px-2 py-0.5">Preview Only</span>
                 </div>
                 
                 <div className="space-y-4">
                    <h3 className="text-2xl font-serif italic font-bold">Investment Fundamentals</h3>
                    <div className="space-y-3 opacity-30">
                       {[1,2,3].map(i => (
                         <div key={i} className="flex items-center gap-4 border border-ink/10 p-3 rounded-lg">
                           <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold">{i}</div>
                           <div className="h-3 w-40 bg-gray-200 rounded" />
                         </div>
                       ))}
                    </div>
                 </div>
                 
                 <button onClick={login} className="w-full py-4 border-2 border-ink bg-ink text-paper font-bold uppercase tracking-widest text-xs hover:bg-brand-pink transition-colors">Join to Unlock Curriculum</button>
               </div>
            </div>

            {/* Snapshot: Tools */}
            <div className="group relative border-2 border-ink p-8 bg-white shadow-editorial overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
               <div className="relative z-20 space-y-6">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="p-3 bg-orange-100 text-orange-600 rounded-xl border border-orange-200">
                       <Calculator className="w-5 h-5" />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-ink/40">Financial Analytics</span>
                   </div>
                   <span className="text-[10px] font-black uppercase bg-ink text-paper px-2 py-0.5">Preview Only</span>
                 </div>
                 
                 <div className="space-y-4">
                    <h3 className="text-2xl font-serif italic font-bold">Compound Interest Matrix</h3>
                    <div className="p-4 border border-dashed border-ink/20 rounded-xl space-y-4 opacity-40">
                       <div className="flex justify-between items-center bg-gray-50 p-2">
                         <div className="h-2 w-20 bg-gray-300" />
                         <div className="h-4 w-12 bg-gray-300" />
                       </div>
                       <div className="h-24 w-full bg-gray-100 flex items-end gap-1 p-2">
                          {[1,2,3,4,5,6].map(i => (
                            <div key={i} className="flex-1 bg-brand-pink/20" style={{ height: `${i*15}%` }} />
                          ))}
                       </div>
                    </div>
                 </div>
                 
                 <button onClick={login} className="w-full py-4 border-2 border-ink bg-ink text-paper font-bold uppercase tracking-widest text-xs hover:bg-brand-pink transition-colors">Access Wealth Tools</button>
               </div>
            </div>

            {/* Snapshot: Forum */}
            <div className="group relative border-2 border-ink p-8 bg-white shadow-editorial overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
               <div className="relative z-20 space-y-6">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="p-3 bg-purple-100 text-purple-600 rounded-xl border border-purple-200">
                       <Users className="w-5 h-5" />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-ink/40">The Majlis</span>
                   </div>
                   <span className="text-[10px] font-black uppercase bg-ink text-paper px-2 py-0.5">Preview Only</span>
                 </div>
                 
                 <div className="space-y-4">
                    <h3 className="text-2xl font-serif italic font-bold">Active Discussions</h3>
                    <div className="space-y-4 opacity-30">
                       <div className="border-b border-ink/10 pb-2">
                         <p className="text-[10px] font-black text-brand-pink italic">@Investor_X</p>
                         <p className="text-sm font-bold">Why the silver market is heating up in EMEA...</p>
                       </div>
                       <div className="border-b border-ink/10 pb-2">
                         <p className="text-[10px] font-black text-brand-pink italic">@AssetManager_Y</p>
                         <p className="text-sm font-bold">Portfolio optimization for the 2026 outlook...</p>
                       </div>
                    </div>
                 </div>
                 
                 <button onClick={login} className="w-full py-4 border-2 border-ink bg-ink text-paper font-bold uppercase tracking-widest text-xs hover:bg-brand-pink transition-colors">Enter Community Forum</button>
               </div>
            </div>

            {/* Snapshot: Analysis */}
            <div className="group relative border-2 border-ink p-8 bg-white shadow-editorial overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
               <div className="relative z-20 space-y-6">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="p-3 bg-pink-100 text-brand-pink rounded-xl border border-pink-200">
                       <Shield className="w-5 h-5" />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-ink/40">Intelligence Desk</span>
                   </div>
                   <span className="text-[10px] font-black uppercase bg-ink text-paper px-2 py-0.5">Premium Only</span>
                 </div>
                 
                 <div className="space-y-4">
                    <h3 className="text-2xl font-serif italic font-bold">Expert Reports</h3>
                    <div className="space-y-2 opacity-30">
                       <div className="h-4 w-full bg-gray-200" />
                       <div className="h-4 w-3/4 bg-gray-200" />
                       <div className="h-4 w-1/2 bg-gray-200" />
                    </div>
                 </div>
                 
                 <button onClick={login} className="w-full py-4 border-2 border-ink bg-ink text-paper font-bold uppercase tracking-widest text-xs hover:bg-brand-pink transition-colors">Read Verified Analysis</button>
               </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats / Progress */}
      {user && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border-2 border-ink bg-white shadow-editorial space-y-4">
            <p className="text-[10px] font-black text-ink/40 uppercase tracking-[0.3em]">{t('home.knowledge_level')}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-serif italic font-bold">{t('home.lvl')} {profile?.level || 1}</span>
              <span className="text-xs font-bold text-brand-pink uppercase">{t('home.elite_investor')}</span>
            </div>
            <div className="w-full h-1 bg-gray-100 mt-4">
              <div className="h-full bg-brand-pink" style={{ width: '45%' }} />
            </div>
          </div>
          <div className="p-8 border-2 border-ink bg-white shadow-editorial space-y-4">
            <p className="text-[10px] font-black text-ink/40 uppercase tracking-[0.3em]">{t('home.total_rewards')}</p>
            <p className="text-5xl font-serif italic font-bold">{profile?.points || 0} <span className="text-xl opacity-40">{t('nav.points')}</span></p>
            <div className="flex gap-2 mt-4">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 bg-yellow-400 border-2 border-ink flex items-center justify-center font-bold rotate-3">
                  ★
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 border-2 border-ink bg-brand-pink text-paper shadow-editorial space-y-4 flex flex-col justify-center -rotate-1">
            <p className="text-[10px] font-black text-paper/60 uppercase tracking-[0.3em]">{t('home.daily_goal')}</p>
            <p className="text-2xl font-serif italic font-bold leading-tight">Complete Quiz: Compound Interest Mastery</p>
            <p className="text-3xl font-black text-pink-300">/ +150</p>
          </div>
        </section>
      )}

      {/* Magazine Layout Section */}
      <section className="grid grid-cols-12 gap-12 pt-24 border-t-2 border-ink">
        <div className="col-span-12 md:col-span-8 space-y-8">
          <div className="aspect-video border-2 border-ink overflow-hidden shadow-editorial bg-pink-900 flex items-center justify-center p-12 text-center text-paper relative">
             <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop')] bg-cover" />
             <div className="relative z-10 space-y-6">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-paper text-ink px-4 py-1">New Curriculum</span>
               <h3 className="text-5xl font-serif italic font-bold leading-tight underline decoration-white/20 underline-offset-8">The Psychology of the Bull Market.</h3>
               <button 
                 onClick={() => setActiveTab('analysis')}
                 className="px-8 py-3 border-2 border-paper text-[11px] font-black uppercase tracking-widest hover:bg-paper hover:text-ink transition-all"
               >
                 Start Reading Now
               </button>
             </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col justify-between py-6 md:border-s-2 border-ink md:ps-12 h-full">
           <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-ink pb-2 mb-8">{t('home.expert_insight')}</h4>
              {[
                { author: "Nadim Al-Fayez", title: "Why retail investors often buy high and sell low." },
                { author: "Elena Moretti", title: "ESG Investing: More than just a trend?" }
              ].map((article, idx) => (
                <div key={idx} className="space-y-2 group cursor-pointer">
                   <p className="text-[10px] font-black text-brand-pink uppercase italic">{article.author}</p>
                   <h5 className="font-serif text-xl font-bold italic leading-tight group-hover:underline">{article.title}</h5>
                </div>
              ))}
           </div>
           
           <div className="bg-ink text-paper p-6 rotate-1 shadow-editorial">
              <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">{t('home.workshop')}</p>
              <p className="font-serif italic text-2xl font-bold leading-tight">Retirement Planning 101</p>
              <p className="text-[10px] font-bold mt-4 opacity-40">Thursday, 7:00 PM GMT</p>
           </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="mt-24 pt-12 border-t-2 border-ink flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-ink/40 gap-6">
         <p>{t('home.footer_rights')}</p>
         <div className="flex gap-12">
            <span>Terms of Access</span>
            <span>Data Transparency</span>
         </div>
         <p>{t('home.footer_standards')}</p>
      </footer>
    </div>
  );
}
