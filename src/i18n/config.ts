import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app": {
        "name": "Isthmarati",
        "description": "Your Journey to Financial Mastery"
      },
      "nav": {
        "home": "Home",
        "education": "Learn",
        "tools": "Tools",
        "market": "Market",
        "forum": "Community",
        "analysis": "Expert Analysis",
        "profile": "Profile",
        "enter": "Enter Platform",
        "points": "pts"
      },
      "home": {
        "hero_badge": "Empowering Your Future",
        "hero_title": "Your Journey to Financial Mastery.",
        "hero_subtitle": "Learn, invest, and grow with Isthmarati. The first multilingual platform dedicated to financial awareness in the region.",
        "start_btn": "Start Free Journey",
        "continue_btn": "Continue My Journey",
        "lvl": "Lvl",
        "elite_investor": "Elite Investor",
        "knowledge_level": "Knowledge Level",
        "total_rewards": "Total Rewards",
        "daily_goal": "Daily Goal",
        "features_title": "Everything you need to master your assets.",
        "features_subtitle": "From structured courses to real-time tools, we've got you covered on every step of your financial journey.",
        "expert_insight": "Expert Insight",
        "workshop": "Upcoming Workshop",
        "footer_rights": "© 2024 Isthmarati Platform — Financial Literacy for All",
        "footer_standards": "Authorized by Global Financial Standards"
      },
      "analysis": {
        "header_badge": "Verified Institutional Experts",
        "header_title": "Deep Market Analysis.",
        "header_subtitle": "Deep dives into global market trends from the world's leading financial strategists.",
        "featured": "Featured",
        "read_time": "read",
        "premium_title": "Unlock Isthmarati Pro.",
        "premium_subtitle": "Daily technical signals, deep correlation matrices, and exclusive webinars with our lead analysts.",
        "premium_btn": "Join the Inner Circle"
      },
      "education": {
        "title": "Financial Academy",
        "subtitle": "Level up your knowledge and earn rewards as you learn.",
        "earn_msg": "Earn up to 250 pts",
        "quiz_btn": "Take Module Quiz",
        "challenge": "Challenge Time",
        "excellent": "Excellent!",
        "keep_learning": "Keep Learning",
        "success_msg": "You earned 100 points for your progress.",
        "fail_msg": "Consistency is key. Review the lessons and try again!",
        "back_lessons": "Back to Lessons",
        "select_path": "Select a path to begin",
        "sync_msg": "Your learning progress is synced across all devices.",
        "lessons": "Lessons",
        "total": "total"
      },
      "forum": {
        "title": "Community Feed",
        "subtitle": "Share insights and connect with fellow investors.",
        "new_post": "New Discussion",
        "post_desc": "Contribute your ideas to the community.",
        "subject": "Subject...",
        "content_placeholder": "Share your thoughts...",
        "discard": "Discard",
        "publish": "Publish Post",
        "reply": "Reply",
        "share": "Share",
        "categories": {
          "general": "General",
          "stocks": "Stocks",
          "crypto": "Crypto",
          "strategy": "Strategy"
        }
      },
      "market": {
        "title": "Market Intelligence",
        "subtitle": "Real-time tracking of global markets and digital assets.",
        "live": "Live Feed",
        "open": "Markets Open",
        "search": "Search symbols...",
        "perf": "Performance (24h)",
        "view_reports": "View All Reports"
      },
      "tools": {
        "title": "Investment Tools",
        "subtitle": "Simulate your financial future with precision modeling.",
        "calc": "Compound Calculator",
        "initial": "Initial Investment",
        "monthly": "Monthly Contribution",
        "horizon": "Time Horizon (Years)",
        "years_abbr": "Yrs",
        "return": "Expected Return (%)",
        "pro_tip": "Pro Tip",
        "tip_desc": "Increasing your return rate by just 2% over 20 years can nearly double your final outcome.",
        "balance": "Estimated Balance",
        "total_invested": "Total Invested",
        "total_interest": "Total Interest",
        "cta": "Ready to put this plan into action?",
        "session": "Apply for Portfolio Session",
        "year_label": "Year",
        "examples_label": "examples"
      },
      "profile": {
        "sign_in_msg": "Sign in to sync progress",
        "sign_in_desc": "Join our community to access personalized tools and earn rewards.",
        "google_btn": "Sign with Google",
        "active_member": "Active Member",
        "elite_portfolio": "Elite Portfolio",
        "activity": "Recent Activity",
        "security": "Security & Access",
        "mfa": "Multi-Factor Auth",
        "mfa_desc": "Extra layer of protection",
        "sign_out": "Sign Out of Application",
        "risk_tolerance": "Risk Tolerance",
        "risk_conservative": "Conservative",
        "risk_moderate": "Moderate",
        "risk_aggressive": "Aggressive"
      },
      "common": {
        "loading": "Loading...",
        "error": "An error occurred",
        "save": "Save",
        "cancel": "Cancel",
        "coming_soon": "Coming Soon",
        "dir": "ltr"
      }
    }
  },
  fr: {
    translation: {
      "app": {
        "name": "Isthmarati",
        "description": "Votre voyage vers la maîtrise financière"
      },
      "nav": {
        "home": "Accueil",
        "education": "Apprendre",
        "tools": "Outils",
        "market": "Marché",
        "forum": "Communauté",
        "analysis": "Analyse d'expert",
        "profile": "Profil",
        "enter": "Entrer dans la Plateforme",
        "points": "pts"
      },
      "home": {
        "hero_badge": "Autonomiser Votre Avenir",
        "hero_title": "Votre voyage vers la maîtrise financière.",
        "hero_subtitle": "Apprenez, investissez et grandissez avec Isthmarati. La première plateforme multilingue dédiée à la sensibilisation financière dans la région.",
        "start_btn": "Commencer Gratuitement",
        "continue_btn": "Continuer Mon Voyage",
        "lvl": "Niv",
        "elite_investor": "Investisseur d'Élite",
        "knowledge_level": "Niveau de Connaissance",
        "total_rewards": "Récompenses Totales",
        "daily_goal": "Objectif Quotidien",
        "features_title": "Tout ce dont vous avez besoin pour maîtriser vos actifs.",
        "features_subtitle": "Des cours structurés aux outils en temps réel, nous vous accompagnons à chaque étape de votre parcours financier.",
        "expert_insight": "Aperçu d'Expert",
        "workshop": "Atelier à Venir",
        "footer_rights": "© 2024 Plateforme Isthmarati — Littératie Financière pour Tous",
        "footer_standards": "Autorisé par les Normes Financières Mondiales"
      },
      "analysis": {
        "header_badge": "Experts Institutionnels Vérifiés",
        "header_title": "Analyse Approfondie du Marché.",
        "header_subtitle": "Plongez dans les tendances du marché mondial avec les meilleurs stratèges financiers au monde.",
        "featured": "Vedette",
        "read_time": "lecture",
        "premium_title": "Débloquez Isthmarati Pro.",
        "premium_subtitle": "Signaux techniques quotidiens, matrices de corrélation approfondies et webinaires exclusifs avec nos analystes principaux.",
        "premium_btn": "Rejoindre le Cercle Restreint"
      },
      "education": {
        "title": "Académie Financière",
        "subtitle": "Améliorez vos connaissances et gagnez des récompenses en apprenant.",
        "earn_msg": "Gagnez jusqu'à 250 pts",
        "quiz_btn": "Passer le Quiz du Module",
        "challenge": "Temps du Défi",
        "excellent": "Excellent !",
        "keep_learning": "Continuez d'Apprendre",
        "success_msg": "Vous avez gagné 100 points pour vos progrès.",
        "fail_msg": "La régularité est la clé. Révisez les leçons et réessayez !",
        "back_lessons": "Retour aux Leçons",
        "select_path": "Sélectionnez un parcours pour commencer",
        "sync_msg": "Votre progression est synchronisée sur tous les appareils.",
        "lessons": "Leçons",
        "total": "total"
      },
      "forum": {
        "title": "Fil de la Communauté",
        "subtitle": "Partagez vos idées et connectez-vous avec d'autres investisseurs.",
        "new_post": "Nouvelle Discussion",
        "post_desc": "Contribuez avec vos idées à la communauté.",
        "subject": "Sujet...",
        "content_placeholder": "Partagez vos pensées...",
        "discard": "Abandonner",
        "publish": "Publier le Message",
        "reply": "Répondre",
        "share": "Partager",
        "categories": {
          "general": "Général",
          "stocks": "Actions",
          "crypto": "Crypto",
          "strategy": "Stratégie"
        }
      },
      "market": {
        "title": "Intelligence du Marché",
        "subtitle": "Suivi en temps réel des marchés mondiaux et des actifs numériques.",
        "live": "Direct",
        "open": "Marchés Ouverts",
        "search": "Rechercher des symboles...",
        "perf": "Performance (24h)",
        "view_reports": "Voir Tous les Rapports"
      },
      "tools": {
        "title": "Outils d'Investissement",
        "subtitle": "Simulez votre avenir financier avec une modélisation de précision.",
        "calc": "Calculateur d'Intérêts Composés",
        "initial": "Investissement Initial",
        "monthly": "Contribution Mensuelle",
        "horizon": "Horizon Temporel (Années)",
        "years_abbr": "Ans",
        "return": "Rendement Attendu (%)",
        "pro_tip": "Conseil de Pro",
        "tip_desc": "Augmenter votre taux de rendement de seulement 2% sur 20 ans peut presque doubler votre résultat final.",
        "balance": "Solde Estimé",
        "total_invested": "Total Investi",
        "total_interest": "Intérêt Total",
        "cta": "Prêt à mettre ce plan en action ?",
        "session": "Demander une Session de Portefeuille",
        "year_label": "Année",
        "examples_label": "exemples"
      },
      "profile": {
        "sign_in_msg": "Connectez-vous pour synchroniser votre progression",
        "sign_in_desc": "Rejoignez notre communauté pour accéder à des outils personnalisés et gagner des récompenses.",
        "google_btn": "Se connecter avec Google",
        "active_member": "Membre Actif",
        "elite_portfolio": "Portefeuille d'Élite",
        "activity": "Activité Récente",
        "security": "Sécurité et Accès",
        "mfa": "Authentification Multi-Facteurs",
        "mfa_desc": "Couche de protection supplémentaire",
        "sign_out": "Déconnexion de l'Application",
        "risk_tolerance": "Tolérance au risque",
        "risk_conservative": "Conservateur",
        "risk_moderate": "Modéré",
        "risk_aggressive": "Agressif"
      },
      "common": {
        "loading": "Chargement...",
        "error": "Une erreur est survenue",
        "save": "Enregistrer",
        "cancel": "Annuler",
        "coming_soon": "Bientôt disponible",
        "dir": "ltr"
      }
    }
  },
  ar: {
    translation: {
      "app": {
        "name": "إستثماراتي",
        "description": "رحلتك نحو الإتقان المالي"
      },
      "nav": {
        "home": "الرئيسية",
        "education": "تعلّم",
        "tools": "الأدوات",
        "market": "السوق",
        "forum": "المجتمع",
        "analysis": "تحليل الخبراء",
        "profile": "الملف الشخصي",
        "enter": "دخول المنصة",
        "points": "نقطة"
      },
      "home": {
        "hero_badge": "تمكين مستقبلك",
        "hero_title": "رحلتك نحو الإتقان المالي.",
        "hero_subtitle": "تعلم، استثمر، وانمو مع إستثماراتي. أول منصة متعددة اللغات مخصصة للوعي المالي في المنطقة.",
        "start_btn": "ابدأ رحلتك المجانية",
        "continue_btn": "أكمل رحلتك",
        "lvl": "مستوى",
        "elite_investor": "مستثمر نخبوي",
        "knowledge_level": "مستوى المعرفة",
        "total_rewards": "إجمالي المكافآت",
        "daily_goal": "الهدف اليومي",
        "features_title": "كل ما تحتاجه لإتقان أصولك الممالية.",
        "features_subtitle": "من الدورات التدريبية المنظمة إلى الأدوات في الوقت الفعلي، نحن ندعمك في كل خطوة من رحلتك المالية.",
        "expert_insight": "رؤية الخبراء",
        "workshop": "ورشة عمل قادمة",
        "footer_rights": "© ٢٠٢٤ منصة إستثماراتي — الثقافة المالية للجميع",
        "footer_standards": "مرخص من قبل المعايير المالية العالمية"
      },
      "analysis": {
        "header_badge": "خبراء مؤسسيون معتمدون",
        "header_title": "تحليل معمق للسوق.",
        "header_subtitle": "تحليل عميق لاتجاهات السوق العالمية من كبار الاستراتيجيين الماليين في العالم.",
        "featured": "مميز",
        "read_time": "قراءة",
        "premium_title": "افتح إستثماراتي برو.",
        "premium_subtitle": "إشارات فنية يومية، مصفوفات ارتباط عميقة، وندوات عبر الإنترنت حصرية مع كبار المحللين لدينا.",
        "premium_btn": "انضم إلى الدائرة الداخلية"
      },
      "education": {
        "title": "الأكاديمية المالية",
        "subtitle": "ارفع مستوى معرفتك واكسب مكافآت أثناء تعلمك.",
        "earn_msg": "اكسب حتى ٢٥٠ نقطة",
        "quiz_btn": "خض اختبار الوحدة",
        "challenge": "وقت التحدي",
        "excellent": "ممتاز!",
        "keep_learning": "استمر في التعلم",
        "success_msg": "لقد ربحت ١٠٠ نقطة لتقدمك.",
        "fail_msg": "الاستمرارية هي المفتاح. راجع الدروس وحاول مرة أخرى!",
        "back_lessons": "العودة إلى الدروس",
        "select_path": "اختر مساراً للبدء",
        "sync_msg": "يتم مزامنة تقدمك في التعلم عبر جميع الأجهزة.",
        "lessons": "دروس",
        "total": "إجمالي"
      },
      "forum": {
        "title": "مجتمع النقاش",
        "subtitle": "شارك مرئياتك وتواصل مع زملائك المستثمرين.",
        "new_post": "نقاش جديد",
        "post_desc": "ساهم بأفكارك في المجتمع.",
        "subject": "الموضوع...",
        "content_placeholder": "شارك أفكارك...",
        "discard": "إلغاء",
        "publish": "نشر الموضوع",
        "reply": "رد",
        "share": "مشاركة",
        "categories": {
          "general": "عام",
          "stocks": "أسهم",
          "crypto": "كريبتو",
          "strategy": "استراتيجية"
        }
      },
      "market": {
        "title": "استخبارات السوق",
        "subtitle": "تتبع فوري للأسواق العالمية والأصول الرقمية.",
        "live": "بث مباشر",
        "open": "الأسواق مفتوحة",
        "search": "بحث عن الرموز...",
        "perf": "الأداء (٢٤ ساعة)",
        "view_reports": "عرض جميع التقارير"
      },
      "tools": {
        "title": "أدوات الاستثمار",
        "subtitle": "حاكي مستقبلك المالي بنمذجة دقيقة.",
        "calc": "حاسبة الفائدة المركبة",
        "initial": "الاستثمار الأولي",
        "monthly": "المساهمة الشهرية",
        "horizon": "الأفق الزمني (بالسنوات)",
        "years_abbr": "سنة",
        "return": "العائد المتوقع (%)",
        "pro_tip": "نصيحة الخبير",
        "tip_desc": "زيادة معدل العائد بنسبة ٢٪ فقط على مدى ٢٠ عامًا يمكن أن تضاعف تقريبًا نتيجتك النهائية.",
        "balance": "الرصيد المقدر",
        "total_invested": "إجمالي المستثمر",
        "total_interest": "إجمالي الفائدة",
        "cta": "هل أنت مستعد لوضع هذه الخطة موضع التنفيذ؟",
        "session": "طلب جلسة تخطيط المحفظة",
        "year_label": "عام",
        "examples_label": "أمثلة"
      },
      "profile": {
        "sign_in_msg": "سجل الدخول لمزامنة تقدمك",
        "sign_in_desc": "انضم إلى مجتمعنا للوصول إلى أدوات مخصصة وكسب مكافآت.",
        "google_btn": "التسجيل بواسطة جوجل",
        "active_member": "عضو نشط",
        "elite_portfolio": "محفظة النخبة",
        "activity": "النشاط الأخير",
        "security": "الأمان والوصول",
        "mfa": "المصادقة الثنائية",
        "mfa_desc": "طبقة إضافية من الحماية",
        "sign_out": "تسجيل الخروج من التطبيق",
        "risk_tolerance": "تحمل المخاطر",
        "risk_conservative": "محافظ",
        "risk_moderate": "متوسط",
        "risk_aggressive": "مجازف"
      },
      "common": {
        "loading": "جاري التحميل...",
        "error": "حدث خطأ ما",
        "save": "حفظ",
        "cancel": "إلغاء",
        "coming_soon": "قريباً",
        "dir": "rtl"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
