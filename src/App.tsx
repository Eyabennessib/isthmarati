/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UserProvider, useUser } from './contexts/UserContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Education from './pages/Education';
import Tools from './pages/Tools';
import Forum from './pages/Forum';
import Profile from './pages/Profile';
import AIAdvisor from './components/AI/AIAdvisor';
import Analysis from './pages/Analysis';
import { motion, AnimatePresence } from 'motion/react';
import './i18n/config';

function AppContent() {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = React.useState('home');
  const { user } = useUser();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Protect tabs - redirect guests to home if they try to access restricted sections
  const restrictedTabs = ['education', 'tools', 'forum', 'analysis', 'profile'];
  useEffect(() => {
    if (!user && restrictedTabs.includes(activeTab)) {
      setActiveTab('home');
    }
  }, [user, activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home setActiveTab={setActiveTab} />;
      case 'education': return user ? <Education /> : <Home setActiveTab={setActiveTab} />;
      case 'tools': return user ? <Tools /> : <Home setActiveTab={setActiveTab} />;
      case 'forum': return user ? <Forum /> : <Home setActiveTab={setActiveTab} />;
      case 'analysis': return user ? <Analysis /> : <Home setActiveTab={setActiveTab} />;
      case 'profile': return user ? <Profile /> : <Home setActiveTab={setActiveTab} />;
      default: return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] text-[#1a1a1a] font-sans selection:bg-orange-200 selection:text-orange-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 py-8 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <AIAdvisor />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
