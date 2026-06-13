import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMarkets } from '../../hooks/useMarkets';
import { useResults } from '../../hooks/useResults';

const PublicResults = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';
  const navigate = useNavigate();
  const [activeMarket, setActiveMarket] = useState('all');
  const { markets, loading: marketsLoading } = useMarkets();
  const { results, loading: resultsLoading } = useResults(activeMarket);

  // Filter out inactive markets for the public view
  const publicMarkets = markets.filter(m => m.isActive);

  // Layer 1: Show only free results (isFree === true), up to the market's freeResultsCount
  const freeResults = results.filter(r => r.isFree === true);
  let previewLimit = 4; // Default for 'all'
  if (activeMarket !== 'all') {
    const activeMarketData = markets.find(m => m.slug === activeMarket);
    previewLimit = activeMarketData?.freeResultsCount ?? 1;
  }
  const previewResults = freeResults.slice(0, previewLimit);

  // Count of all results (to know whether to show "See All")
  const hasPremiumResults = results.some(r => !r.isFree);
  const hasMoreFree = freeResults.length > previewLimit;
  const showSeeAll = hasPremiumResults || hasMoreFree;

  const handleSeeAll = () => {
    const query = activeMarket !== 'all' ? `?market=${activeMarket}` : '';
    navigate(`/results${query}`);
  };

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

        {/* Results Feed (Free Preview) */}
        <div className="max-w-5xl mx-auto">
          {resultsLoading ? (
            <div className="flex flex-col gap-12">
              {[1, 2].map(i => (
                <div key={i} className="animate-pulse bg-bg-secondary rounded-2xl p-4 h-96 border border-border" />
              ))}
            </div>
          ) : previewResults.length === 0 ? (
            <div className="text-center py-24 bg-bg-secondary/30 rounded-3xl border border-border/50">
              <span className="text-5xl block mb-4">📉</span>
              <h3 className="text-xl font-bold text-text-primary mb-2">{t('results_section.no_results_title')}</h3>
              <p className="text-text-secondary">{t('results_section.no_results_desc')}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-16">
              <AnimatePresence mode="popLayout">
                {previewResults.map((result) => {
                  const marketData = markets.find(m => m.slug === result.market);
                  const date = result.createdAt
                    ? new Date(result.createdAt.seconds * 1000).toLocaleDateString(
                        language === 'ar' ? 'ar-EG' : 'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )
                    : '';

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
                      <div className="w-full bg-bg-primary border-b border-border">
                        <img
                          src={result.imageUrl}
                          alt={t('results_section.before_after_alt')}
                          className="w-full h-auto object-contain max-h-[600px] cursor-pointer"
                          onClick={() => window.open(result.imageUrl, '_blank')}
                          title={t('results_section.click_full_size')}
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
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* See All Results CTA */}
              {showSeeAll && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 mt-4"
                >
                  {/* Blurred teaser cards */}
                  <div className="w-full flex flex-col gap-4 pointer-events-none select-none overflow-hidden max-h-52 relative">
                    {results.filter(r => !r.isFree).slice(0, 2).map((result) => (
                      <div
                        key={result.id}
                        className="bg-bg-secondary rounded-3xl border border-border h-36 blur-md opacity-40"
                      />
                    ))}
                    {/* Gradient fade */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary" />
                  </div>

                  <div className="text-center">
                    <p className="text-text-secondary text-sm mb-4">
                      🔒 {t('results_section.more_premium_hint', 'More premium results available for subscribers')}
                    </p>
                    <button
                      onClick={handleSeeAll}
                      className="px-10 py-4 bg-gradient-to-r from-accent-gold to-yellow-500 hover:from-yellow-500 hover:to-accent-gold text-black font-bold rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(240,185,11,0.25)] hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(240,185,11,0.4)] text-base"
                    >
                      {t('results_section.see_all')} →
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PublicResults;
