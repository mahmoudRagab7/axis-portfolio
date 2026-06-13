import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../common/ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/#about' },
    { name: t('nav.services'), path: '/#services' },
    { name: t('nav.results'), path: '/#results' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg-primary/80 backdrop-blur-md border-b border-border shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-lg w-10 h-10 border border-accent-gold/30 group-hover:border-accent-gold transition-colors duration-300 flex items-center justify-center bg-bg-secondary">
               {/* Fallback text if image fails or before it loads */}
               <span className="absolute text-accent-gold font-bold font-space text-lg z-0">AX</span>
               <img 
                 src="/assets/axis-logo.jpeg" 
                 alt="AXIS Portfolio" 
                 className="w-full h-full object-cover relative z-10" 
                 onError={(e) => e.target.style.display = 'none'}
               />
            </div>
            <span className="text-xl font-bold font-space text-text-primary tracking-wider group-hover:text-accent-gold transition-colors duration-300">
              AXIS<span className="text-text-muted font-normal">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-sm font-medium text-text-secondary hover:text-accent-gold transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 rtl:right-0 w-0 h-0.5 bg-accent-gold transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}
            
            <div className="flex items-center gap-4 ps-4 border-s border-border/50">
              <LanguageSwitcher />
              <ThemeToggle />
              
              {/* CTA Button */}
              <a 
                href="#contact"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-accent-gold to-yellow-400 text-bg-primary font-semibold text-sm hover:shadow-[0_0_15px_rgba(240,185,11,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {t('nav.getSignals')}
              </a>
            </div>
          </nav>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`h-0.5 w-6 bg-text-primary rounded-full transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-text-primary rounded-full transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-text-primary rounded-full transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-bg-secondary border-b border-border shadow-xl shadow-black/50 overflow-hidden"
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-text-primary py-2 border-b border-border/50 hover:text-accent-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center px-6 py-3 rounded-lg bg-accent-gold text-bg-primary font-semibold text-lg"
              >
                {t('nav.getSignals')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
