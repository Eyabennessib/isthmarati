import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../contexts/UserContext';
import type { RiskTolerance } from '../types';
import { 
  Settings, 
  Award, 
  History, 
  Shield, 
  CreditCard, 
  LogOut,
  ChevronRight,
  Star,
  Users,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
  const { t } = useTranslation();
  const { user, profile, logout, login, updateProfile, authError } = useUser();

  const handleRiskChange = (level: RiskTolerance) => {
    updateProfile({ riskTolerance: level });
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="w-24 h-24 bg-gray-100 rounded-[2rem] flex items-center justify-center text-gray-400">
           <Users className="w-12 h-12" />
        </div>
        <div className="text-center space-y-2">
           <h2 className="text-3xl font-serif font-bold">{t('profile.sign_in_msg')}</h2>
           <p className="text-gray-500">{t('profile.sign_in_desc')}</p>
        </div>
        <button
          onClick={login}
          className="px-10 py-5 bg-[#1a1a1a] text-white rounded-2xl font-bold shadow-xl hover:bg-orange-600 transition-colors"
        >
          {t('profile.google_btn')}
        </button>
        {authError && (
          <p role="alert" className="text-sm text-red-600 font-medium max-w-md text-center">
            {authError}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header Card */}
      <section className="bg-white rounded-[3.5rem] p-12 border border-[#1a1a1a]/5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
           <div className="relative">
              <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-orange-100 shadow-2xl">
                 <img src={user.photoURL || ''} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center shadow-xl">
                 <Star className="w-6 h-6 fill-current" />
              </div>
           </div>
           
           <div className="space-y-4 flex-1">
              <div className="space-y-1">
                 <p className="text-xs font-bold uppercase tracking-widest text-orange-600">{t('profile.active_member')}</p>
                 <h1 className="text-5xl font-serif font-bold">{user.displayName}</h1>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                 <span className="px-5 py-2 bg-[#1a1a1a] text-white rounded-xl text-xs font-bold">Level {profile?.level || 1}</span>
                 <span className="px-5 py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-bold uppercase tracking-widest">{profile?.points || 0} {t('nav.pts')}</span>
                 <span className="px-5 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold uppercase tracking-widest">{t('profile.lite_portfolio')}</span>
              </div>
           </div>

           <button className="p-4 hover:bg-gray-50 rounded-2xl transition-colors text-gray-400">
              <Settings className="w-6 h-6" />
           </button>
        </div>
        
        {/* Progress BG */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-50 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white p-8 rounded-[3rem] border border-[#1a1a1a]/5 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
               <History className="w-5 h-5 text-blue-600" />
               {t('profile.activity')}
            </h3>
            <div className="space-y-4">
               {[
                 { action: "Completed Quiz: Market Basics", date: "2 hours ago", icon: Award, color: "text-pink-500" },
                 { action: "Replied to: ROI on Real Estate", date: "Yesterday", icon: History, color: "text-blue-500" },
                 { action: "Calculated Asset Growth", date: "3 days ago", icon: CreditCard, color: "text-purple-500" },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 group">
                    <div className={`p-3 rounded-xl bg-gray-50 group-hover:bg-white group-hover:shadow-md transition-all ${item.color}`}>
                       <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-bold text-[#1a1a1a]">{item.action}</p>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.date}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-200" />
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-white p-8 rounded-[3rem] border border-[#1a1a1a]/5 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
               <Shield className="w-5 h-5 text-orange-600" />
               {t('profile.security')}
            </h3>
            <div className="space-y-4">
               <div className="p-6 bg-gray-50 rounded-3xl flex justify-between items-center group cursor-pointer hover:bg-white hover:shadow-md transition-all">
                  <div>
                     <p className="font-bold">{t('profile.mfa')}</p>
                     <p className="text-xs text-gray-400">{t('profile.mfa_desc')}</p>
                  </div>
                  <div className="w-12 h-6 bg-orange-600 rounded-full relative">
                     <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
               </div>
               
               <button 
                onClick={logout}
                className="w-full p-6 bg-red-50 text-red-600 rounded-3xl flex justify-between items-center font-bold hover:bg-red-600 hover:text-white transition-all group"
               >
                  {t('profile.sign_out')}
                  <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
         </div>

         {/* Risk Tolerance Card */}
         <div className="bg-white p-8 rounded-[3rem] border border-[#1a1a1a]/5 space-y-6 md:col-span-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-pink" />
                {t('profile.risk_tolerance')}
              </h3>
              <span className="px-4 py-1.5 bg-brand-pink-light text-brand-pink rounded-full text-[10px] font-black uppercase tracking-widest">
                {profile?.riskTolerance || 'moderate'}
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-2xl italic font-serif">
              Our AI Advisor, Al-Murshid, uses this profile to tailor institutional-grade investment strategies specifically for your preference.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {([
                 { id: 'conservative', label: t('profile.risk_conservative'), color: 'pink', desc: 'Preservation over growth' },
                 { id: 'moderate', label: t('profile.risk_moderate'), color: 'blue', desc: 'Balanced growth & safety' },
                 { id: 'aggressive', label: t('profile.risk_aggressive'), color: 'orange', desc: 'Maximum growth potential' }
               ] as const).map((risk) => (
                 <button
                   key={risk.id}
                   onClick={() => handleRiskChange(risk.id)}
                   className={`p-6 rounded-3xl border-2 transition-all text-left space-y-2 group ${
                     (profile?.riskTolerance || 'moderate') === risk.id
                       ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white shadow-xl scale-[1.02]'
                       : 'border-gray-50 bg-gray-50 hover:border-gray-200'
                   }`}
                 >
                    <p className={`text-[10px] font-black uppercase tracking-widest ${
                      (profile?.riskTolerance || 'moderate') === risk.id ? 'text-white/60' : 'text-gray-400'
                    }`}>
                      {risk.label}
                    </p>
                    <p className="font-bold text-sm leading-tight">{risk.desc}</p>
                 </button>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
