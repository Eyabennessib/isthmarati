import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../contexts/UserContext';
import { 
  Home, 
  BookOpen, 
  Calculator, 
  TrendingUp, 
  Users, 
  User as UserIcon,
  Globe,
  LogIn,
  LogOut,
  Shield,
  Lock
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const { user, login, logout, profile } = useUser();

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'education', label: t('nav.education'), icon: BookOpen },
    { id: 'tools', label: t('nav.tools'), icon: Calculator },
    { id: 'forum', label: t('nav.forum'), icon: Users },
    { id: 'analysis', label: t('nav.analysis'), icon: Shield },
  ];

  const restrictedTabs = ['education', 'tools', 'forum', 'analysis'];

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ];

  return (
    <nav className="bg-paper border-b-2 border-ink pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          {/* Brand & Language */}
          <div className="flex flex-col">
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={cn(
                    "cursor-pointer transition-opacity",
                    i18n.language === lang.code ? "text-brand-pink font-black" : "opacity-40 italic hover:opacity-100"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <div 
              className="flex items-baseline gap-2 cursor-pointer group"
              onClick={() => setActiveTab('home')}
            >
              <h1 className="font-serif text-7xl leading-none font-bold italic tracking-tighter text-ink group-hover:text-brand-pink transition-colors">
                Isthmarati.
              </h1>
            </div>
          </div>

          {/* Navigation & Market Pulse */}
          <div className="flex flex-col items-end gap-3 w-full md:w-auto">
            <div className="flex flex-wrap justify-end gap-6 text-[11px] font-bold uppercase tracking-tight text-ink/60 mb-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "transition-all relative py-1 flex items-center gap-1.5",
                    activeTab === item.id 
                      ? "text-ink border-b-2 border-ink" 
                      : "hover:text-ink"
                  )}
                >
                  {item.label}
                  {item.id === 'education' && (
                    <span className="text-[7px] font-black bg-brand-pink text-paper px-1 py-0.5 rounded-sm absolute -top-1 -right-4 translate-x-full">
                      {t('common.coming_soon')}
                    </span>
                  )}
                  {!user && restrictedTabs.includes(item.id) && (
                    <Lock className="w-2.5 h-2.5 opacity-40 shrink-0" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-[9px] font-medium tracking-[0.1em] opacity-50 uppercase flex items-center gap-4">
                <span>STK: APPLE +1.2%</span>
                <span className="w-1 h-1 bg-ink/20 rounded-full" />
                <span>MSFT -0.4%</span>
                <span className="w-1 h-1 bg-ink/20 rounded-full" />
                <span className="text-brand-pink">GOLD $2,042.10 (+0.8%)</span>
              </div>

              <div className="flex items-center gap-3 ps-6 border-s border-ink/10">
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase bg-brand-pink-light text-brand-pink px-2 py-1 border border-brand-pink/20">
                      {profile?.points || 0} {t('nav.points')}
                    </span>
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className="w-8 h-8 rounded-full overflow-hidden border border-ink hover:rotate-12 transition-transform shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                    >
                      <img src={user.photoURL || ''} alt="P" className="w-full h-full object-cover" />
                    </button>
                    <button onClick={logout} className="p-1 hover:text-red-600">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={login}
                    className="text-[10px] font-black uppercase tracking-widest border-2 border-ink px-4 py-1.5 hover:bg-ink hover:text-paper transition-all shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    {t('nav.enter')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
