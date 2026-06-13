import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { useSubscriber } from '../../hooks/useSubscriber';
import AccessGate from './AccessGate';

const ResultsOverlay = ({ isOpen, onClose, results, markets, activeMarket, setActiveMarket, language }) => {
  const { t } = useTranslation();
  const { isSubscribed } = useSubscriber();

  // Prevent background scrolling when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const publicMarkets = markets.filter(m => m.isActive);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-50 bg-bg-primary flex flex-col h-screen"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-bg-primary/80 backdrop-blur-md sticky top-0 z-30">
            <h2 className="text-2xl md:text-3xl font-bold font-heading">
              {t('results_section.title_prefix')}{' '}
              <span className="text-accent-gold">{t('results_section.title_highlight')}</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 bg-bg-secondary hover:bg-bg-hover rounded-full transition-colors border border-border"
            >
              <X className="w-6 h-6 text-text-primary" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-5xl mx-auto pb-24">
              
              {/* Tabs */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button
                  onClick={() => setActiveMarket('all')}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border ${
                    activeMarket === 'all'
                      ? 'bg-accent-gold text-bg-primary border-accent-gold'
                      : 'bg-bg-secondary text-text-secondary border-border hover:border-accent-gold/50'
                  }`}
                >
                  {t('results_section.all_markets')}
                </button>
                {publicMarkets.map((market) => (
                  <button
                    key={market.slug}
                    onClick={() => setActiveMarket(market.slug)}
                    className={`px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 border ${
                      activeMarket === market.slug
                        ? 'bg-accent-gold text-bg-primary border-accent-gold'
                        : 'bg-bg-secondary text-text-secondary border-border hover:border-accent-gold/50'
                    }`}
                  >
                    <span>{market.icon}</span>
                    <span>{language === 'ar' ? (market.nameAr || market.name) : market.name}</span>
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="relative pb-24">
                <div className="flex flex-col gap-16">
                  {(() => {
                    const renderedCounts = {};
                    let hasBlurredResults = false;
                    
                    const resultCards = results.map((result) => {
                      const marketData = markets.find(m => m.slug === result.market);
                      const freeCount = marketData && marketData.freeResultsCount !== undefined ? marketData.freeResultsCount : 1;
                      
                      renderedCounts[result.market] = (renderedCounts[result.market] || 0) + 1;
                      
                      const isBlurred = !isSubscribed && renderedCounts[result.market] > freeCount;
                      if (isBlurred) hasBlurredResults = true;

                      const date = result.createdAt ? new Date(result.createdAt.seconds * 1000).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
                      
                      return (
                        <div
                          key={result.id}
                          className={`bg-bg-secondary rounded-3xl overflow-hidden border border-border shadow-xl transition-all ${isBlurred ? 'filter blur-[12px] pointer-events-none opacity-60 select-none' : ''}`}
                        >
                          <div className="w-full bg-bg-primary border-b border-border">
                            <img 
                              src={result.imageUrl} 
                              alt={t('results_section.before_after_alt')} 
                              className="w-full h-auto object-contain max-h-[600px] cursor-pointer"
                              onClick={() => !isBlurred && window.open(result.imageUrl, '_blank')}
                            />
                          </div>
                          <div className="p-8 md:p-10">
                            <div className="flex items-center justify-between mb-4">
                              {marketData && (
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-primary border border-border text-sm font-medium text-text-secondary">
                                  <span>{marketData.icon}</span>
                                  <span>{language === 'ar' ? (marketData.nameAr || marketData.name) : marketData.name}</span>
                                </div>
                              )}
                              <span className="text-sm font-mono text-text-muted">{date}</span>
                            </div>
                            <p className="text-text-primary text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
                              {language === 'ar' ? (result.descriptionAr || result.description) : result.description}
                            </p>
                          </div>
                        </div>
                      );
                    });

                    return (
                      <>
                        {resultCards}
                        {!isSubscribed && hasBlurredResults && (
                          <AccessGate />
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultsOverlay;
