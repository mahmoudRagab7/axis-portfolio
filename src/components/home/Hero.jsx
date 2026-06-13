import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import { useStatistics } from '../../hooks/useStatistics';

const Hero = () => {
  const { t } = useTranslation();
  const { statistics, loading } = useStatistics();

  const statItems = [
    { label: t('hero.stats.success_rate'), value: loading ? '...' : `${statistics?.successRate || 0}%` },
    { label: t('hero.stats.active_markets'), value: loading ? '...' : `${statistics?.marketsCount || 0}+` },
    { label: t('hero.stats.total_trades'), value: loading ? '...' : `${statistics?.totalTrades || 0}+` },
    { label: t('hero.stats.happy_clients'), value: loading ? '...' : `${statistics?.happyClients || 0}+` }
  ];

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradients & Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-gold/5 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-secondary/80 border border-accent-gold/30 backdrop-blur-sm mb-8 shadow-[0_0_20px_rgba(240,185,11,0.1)]"
        >
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
          <span className="text-xs md:text-sm font-medium text-text-secondary tracking-wide uppercase">{t('hero.tagline')}</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-text-primary mb-6 tracking-tight max-w-5xl leading-tight"
        >
          {t('hero.title_main')} <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-yellow-400 to-accent-gold">{t('hero.title_highlight')}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12 leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Button href="#results" variant="primary" className="w-full sm:w-auto px-10 py-4">
            {t('hero.cta_results')}
          </Button>
          <Button href="#services" variant="secondary" className="w-full sm:w-auto px-10 py-4">
            {t('hero.cta_services')}
          </Button>
        </motion.div>

        {/* Quick Stats below Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-4xl pt-10 border-t border-border/50"
        >
          {statItems.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold font-space text-text-primary mb-2">{stat.value}</span>
              <span className="text-xs md:text-sm text-text-muted uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
