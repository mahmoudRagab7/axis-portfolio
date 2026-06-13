import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';

const NotFound = () => {
  const { t } = useTranslation();
  const { isRtl } = useLanguage();

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6 text-center h-full my-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="relative mb-8 inline-block">
          <h1 className="text-9xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-br from-accent-gold to-yellow-600">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-gold/20 blur-[60px] -z-10 rounded-full"></div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 font-heading">
          {t('common.notFound.title', 'Market Not Found')}
        </h2>
        
        <p className="text-text-secondary mb-8 leading-relaxed">
          {t('common.notFound.desc', "The page you are looking for doesn't exist or has been moved. Let's get you back on track to profitable trades.")}
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-bg-secondary border border-border hover:border-accent-gold text-text-primary font-semibold transition-all duration-300 group shadow-lg shadow-black/20"
        >
          <span>{t('common.notFound.btn', 'Return Home')}</span>
          <span className={`transition-transform duration-300 ${isRtl ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}>→</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
