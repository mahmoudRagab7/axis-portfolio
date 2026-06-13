import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';

const LanguageSwitcher = () => {
  const { language, changeLanguage, currentLanguageInfo, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-secondary/60 hover:bg-bg-secondary border border-border hover:border-accent-gold/50 transition-all duration-300 focus:outline-none cursor-pointer"
        aria-label="Select Language"
      >
        <span className="text-lg leading-none" role="img" aria-hidden="true">
          {currentLanguageInfo.flag}
        </span>
        <span className="text-xs font-semibold text-text-primary tracking-wide uppercase font-space">
          {currentLanguageInfo.code}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-3.5 h-3.5 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-36 origin-top-right rounded-xl bg-bg-secondary border border-border/80 shadow-xl shadow-black/40 backdrop-blur-md overflow-hidden z-[100]"
          >
            <div className="py-1 flex flex-col">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 transition-colors hover:bg-bg-tertiary focus:outline-none cursor-pointer ${
                    language === lang.code ? 'text-accent-gold font-bold bg-accent-gold/5' : 'text-text-secondary hover:text-text-primary'
                  }`}
                  style={{ 
                    textAlign: language === 'ar' ? 'right' : 'left',
                    flexDirection: language === 'ar' ? 'row-reverse' : 'row'
                  }}
                >
                  <span className="text-lg leading-none" role="img" aria-label={lang.name}>
                    {lang.flag}
                  </span>
                  <span className="font-space text-sm">{lang.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
