import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMarkets } from '../../hooks/useMarkets';
import { useResults } from '../../hooks/useResults';

const PublicResults = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';
  const [activeMarket, setActiveMarket] = useState('all');
  const { markets, loading: marketsLoading } = useMarkets();
  const { results, loading: resultsLoading } = useResults(activeMarket);

  // Filter out inactive markets for the public view
  const publicMarkets = markets.filter(m => m.isActive);

  return (
    <section id="results" className="py-24 bg-bg-primary relative border-t border-border/30">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-text-primary mb-4">
            {t('results_section.title_prefix')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-500">
              {t('results_section.title_highlight')}
            </span>
          </h2>
          <p className="text-text-secondary text-lg">
            {t('results_section.subtitle')}
          </p>
        </div>

        {/* Market Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setActiveMarket('all')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border cursor-pointer ${
              activeMarket === 'all'
                ? 'bg-accent-gold text-bg-primary border-accent-gold shadow-[0_0_15px_rgba(240,185,11,0.3)]'
                : 'bg-bg-secondary text-text-secondary border-border hover:border-accent-gold/50 hover:text-text-primary'
            }`}
          >
            {t('results_section.all_markets')}
          </button>
          
          {!marketsLoading && publicMarkets.map((market) => (
            <button
              key={market.slug}
              onClick={() => setActiveMarket(market.slug)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 border cursor-pointer ${
                activeMarket === market.slug
                  ? 'bg-accent-gold text-bg-primary border-accent-gold shadow-[0_0_15px_rgba(240,185,11,0.3)]'
                  : 'bg-bg-secondary text-text-secondary border-border hover:border-accent-gold/50 hover:text-text-primary'
              }`}
            >
              <span>{market.icon}</span>
              <span>{language === 'ar' ? (market.nameAr || market.name) : market.name}</span>
            </button>
          ))}
        </div>

        {/* Results Feed */}
        <div className="max-w-5xl mx-auto">
          {resultsLoading ? (
            <div className="flex flex-col gap-12">
              {[1, 2].map(i => (
                <div key={i} className="animate-pulse bg-bg-secondary rounded-2xl p-4 h-96 border border-border"></div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-24 bg-bg-secondary/30 rounded-3xl border border-border/50">
              <span className="text-5xl block mb-4">📉</span>
              <h3 className="text-xl font-bold text-text-primary mb-2">{t('results_section.no_results_title')}</h3>
              <p className="text-text-secondary">{t('results_section.no_results_desc')}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-16">
              <AnimatePresence mode="popLayout">
                {results.map((result) => {
                  const marketData = markets.find(m => m.slug === result.market);
                  const date = result.createdAt ? new Date(result.createdAt.seconds * 1000).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

                  return (
                    <motion.div
                      key={result.id}
                      layout
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="bg-bg-secondary rounded-3xl overflow-hidden border border-border shadow-xl hover:shadow-[0_0_30px_rgba(240,185,11,0.05)] transition-shadow"
                    >
                      {/* Image Container */}
                      <div className="w-full bg-bg-primary border-b border-border">
                        <img 
                          src={result.imageUrl} 
                          alt={t('results_section.before_after_alt')} 
                          className="w-full h-auto object-contain max-h-[600px] cursor-pointer"
                          onClick={() => window.open(result.imageUrl, '_blank')}
                          title={t('results_section.click_full_size')}
                        />
                      </div>
                      
                      {/* Description Area */}
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
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default PublicResults;
