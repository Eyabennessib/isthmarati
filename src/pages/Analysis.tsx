import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  ArrowUpRight, 
  Calendar, 
  User as UserIcon,
  BookMarked,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

const ANALYSIS_REPORTS = [
  {
    category: 'Macro Economy',
    title: 'The Great Inflation Pivot: What it means for Emerging Markets',
    author: 'Dr. Ahmad Al-Zahrani',
    date: 'Oct 12, 2024',
    readTime: '12 min',
    image: 'https://picsum.photos/seed/macro/800/400'
  },
  {
    category: 'Crypto Assets',
    title: 'Bitcoin Halving 2024: A Statistical Model of Price Action',
    author: 'Elena Rossi',
    date: 'Oct 10, 2024',
    readTime: '8 min',
    image: 'https://picsum.photos/seed/crypto/800/400'
  },
  {
    category: 'Real Estate',
    title: 'Dubai Property Market: Sustainable Growth or Bubble Territory?',
    author: 'Marc Lefebvre',
    date: 'Oct 09, 2024',
    readTime: '15 min',
    image: 'https://picsum.photos/seed/realestate/800/400'
  }
];

export default function Analysis() {
  const { t } = useTranslation();

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-brand-pink text-brand-pink text-[10px] font-black uppercase tracking-[0.2em]">
           <ShieldCheck className="w-3.5 h-3.5" />
           {t('analysis.header_badge')}
        </div>
        <h1 className="text-6xl md:text-8xl font-serif font-bold italic tracking-tighter text-ink leading-[0.9]">{t('analysis.header_title')}</h1>
        <p className="text-xl text-ink/60 font-medium italic">{t('analysis.header_subtitle')}</p>
      </section>

      {/* Featured Report */}
      <section className="group relative bg-ink overflow-hidden cursor-pointer border-2 border-ink shadow-editorial">
         <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
            <img src={ANALYSIS_REPORTS[0].image} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
         </div>
         <div className="relative z-10 p-12 md:p-24 space-y-8 max-w-4xl">
            <div className="flex items-center gap-4">
               <span className="px-3 py-1 bg-brand-pink text-paper text-[10px] font-black tracking-[0.3em] uppercase">{t('analysis.featured')}</span>
               <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">{ANALYSIS_REPORTS[0].category}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[0.9] italic tracking-tighter">
               {ANALYSIS_REPORTS[0].title}
            </h2>
            <div className="flex items-center gap-8 pt-4 text-white/80">
               <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest">{ANALYSIS_REPORTS[0].author}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest">{ANALYSIS_REPORTS[0].date}</span>
               </div>
            </div>
         </div>
      </section>

      {/* Report Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t-2 border-ink pt-16">
         {ANALYSIS_REPORTS.slice(1).map((report, i) => (
           <motion.div 
             key={i}
             whileHover={{ y: -10 }}
             className="group space-y-8"
           >
              <div className="aspect-[16/9] border-2 border-ink overflow-hidden shadow-editorial bg-gray-100 grayscale group-hover:grayscale-0 transition-all duration-700">
                 <img src={report.image} alt="Report" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between border-b border-ink/10 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-pink italic">{report.category}</span>
                    <span className="text-[10px] font-black text-ink/40 uppercase tracking-widest">{report.readTime} {t('analysis.read_time')}</span>
                 </div>
                 <h3 className="text-3xl font-serif font-bold italic leading-tight group-hover:underline">
                    {report.title}
                 </h3>
                 <div className="flex items-center justify-between pt-4">
                    <p className="text-[11px] font-black uppercase tracking-widest text-ink/60">{report.author}</p>
                    <button className="p-4 bg-ink text-paper hover:bg-brand-pink transition-colors shadow-editorial active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                       <ArrowUpRight className="w-5 h-5" />
                    </button>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Premium CTA */}
      <section className="bg-white border-2 border-ink p-12 md:p-24 text-center space-y-12 shadow-editorial rotate-1 max-w-5xl mx-auto my-24">
         <div className="w-24 h-24 bg-paper border-2 border-ink text-ink flex items-center justify-center mx-auto -rotate-6 shadow-editorial">
            <Sparkles className="w-10 h-10" />
         </div>
         <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-serif font-bold italic tracking-tighter text-ink leading-none">{t('analysis.premium_title')}</h2>
            <p className="text-ink/60 max-w-xl mx-auto text-lg italic leading-relaxed">{t('analysis.premium_subtitle')}</p>
         </div>
         <button className="px-12 py-5 bg-ink text-paper font-black uppercase tracking-widest text-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all shadow-editorial">
            {t('analysis.premium_btn')}
         </button>
      </section>
    </div>
  );
}
