import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { auth } from '../config/firebase';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  // Normalized language code (since language detector might return 'en-US' etc.)
  const language = (i18n.language && i18n.language.startsWith('ar')) ? 'ar' : 'en';
  const isRtl = language === 'ar';

  useEffect(() => {
    // Update HTML layout direction and language code attributes
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Sync Firebase Auth language code so verification emails are sent in user's language
    if (auth) {
      auth.languageCode = language;
    }
  }, [language, isRtl]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ar' : 'en';
    changeLanguage(nextLang);
  };

  return {
    language,
    isRtl,
    changeLanguage,
    toggleLanguage,
    currentLanguageInfo: language === 'ar' 
      ? { name: 'العربية', flag: '🇪🇬', code: 'ar' }
      : { name: 'English', flag: '🇺🇸', code: 'en' },
    languages: [
      { name: 'English', flag: '🇺🇸', code: 'en' },
      { name: 'العربية', flag: '🇪🇬', code: 'ar' }
    ]
  };
};
