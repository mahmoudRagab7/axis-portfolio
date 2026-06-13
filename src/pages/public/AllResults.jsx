import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { useMarkets } from '../../hooks/useMarkets';
import { useResults } from '../../hooks/useResults';
import { useSubscriber } from '../../hooks/useSubscriber';
import AccessGate from '../../components/public/AccessGate';

const AllResults = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMarket = searchParams.get('market') || 'all';
  const [activeMarket, setActiveMarket] = useState(initialMarket);
  const [showGate, setShowGate] = useState(false);

  const { markets, loading: marketsLoading } = useMarkets();
  const { results, loading: resultsLoading } = useResults(activeMarket);
  const { isSubscribed } = useSubscriber();

  const publicMarkets = markets.filter(m => m.isActive);

  // Sync URL param when market changes
  const handleMarketChange = (slug) => {
    setActiveMarket(slug);
    if (slug === 'all') {
      searchParams.delete('market');
    } else {
      searchParams.set('market', slug);
    }
    setSearchParams(searchParams, { replace: true });
  };

  // Determine if there are premium (non-free) results that need gating
  const premiumResults = results.filter(r => !r.isFree);
  const hasGatedContent = !isSubscribed && premiumResults.length > 0;

  // Show gate when user tries to interact with blurred content
  const triggerGate = () => setShowGate(true);

  const formatDate = (createdAt) => {
    if (!createdAt) return '';
    return new Date(createdAt.seconds * 1000).toLocaleDateString(
      language === 'ar' ? 'ar-EG' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Page Header */}
      <div className="bg-bg-secondary border-b border-border sticky top-0 z-40 backdrop-blur-md bg-bg-secondary/80">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Back link */}
            <Link
              to="/#results"
              className="flex items-center gap-2 text-text-secondary hover:text-accent-gold transition-colors font-medium text-sm group"
            >
              <span className="text-lg group-hover:-translate-x-1 transition-transform inline-block rtl:rotate-180">←</span>
              <span>{t('results_section.back_home', 'Back to Home')}</span>
            </Link>

            <h1 className="text-lg md:text-xl font-bold font-heading text-text-primary">
              {t('results_section.title_prefix')}{' '}
              <span className="text-accent-gold">{t('results_section.title_highlight')}</span>
            </h1>

            {/* Subscription status badge */}
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${
              isSubscribed
                ? 'bg-green-500/10 text-green-400 border-green-500/30'
                : 'bg-accent-gold/10 text-accent-gold border-accent-gold/30'
            }`}>
              {isSubscribed ? '🔓 ' + t('access_gate.subscribed', 'Full Access') : '🔒 ' + t('access_gate.locked_title', 'Premium Locked')}
            </div>
          </div>

          {/* Market Filter Tabs (below header) */}
          <div className="flex flex-wrap gap-2 mt-4 pb-1">
            <button
              onClick={() => handleMarketChange('all')}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 border cursor-pointer ${
                activeMarket === 'all'
                  ? 'bg-accent-gold text-bg-primary border-accent-gold shadow-[0_0_12px_rgba(240,185,11,0.3)]'
                  : 'bg-bg-primary text-text-secondary border-border hover:border-accent-gold/50 hover:text-text-primary'
              }`}
            >
              {t('results_section.all_markets')}
            </button>

            {!marketsLoading && publicMarkets.map((market) => (
              <button
                key={market.slug}
                onClick={() => handleMarketChange(market.slug)}
                className={`px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 border cursor-pointer ${
                  activeMarket === market.slug
                    ? 'bg-accent-gold text-bg-primary border-accent-gold shadow-[0_0_12px_rgba(240,185,11,0.3)]'
                    : 'bg-bg-primary text-text-secondary border-border hover:border-accent-gold/50 hover:text-text-primary'
                }`}
              >
                <span>{market.icon}</span>
                <span>{language === 'ar' ? (market.nameAr || market.name) : market.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
        {resultsLoading ? (
          <div className="flex flex-col gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-bg-secondary rounded-3xl h-96 border border-border" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-32 bg-bg-secondary/30 rounded-3xl border border-border/50">
            <span className="text-6xl block mb-4">📉</span>
            <h3 className="text-2xl font-bold text-text-primary mb-2">{t('results_section.no_results_title')}</h3>
            <p className="text-text-secondary">{t('results_section.no_results_desc')}</p>
          </div>
        ) : (
          <div className="relative">
            <div className="flex flex-col gap-16 pb-12">
              <AnimatePresence mode="popLayout">
                {results.map((result, idx) => {
                  const marketData = markets.find(m => m.slug === result.market);
                  const date = formatDate(result.createdAt);
                  const isPremium = !result.isFree;
                  const isBlurred = isPremium && !isSubscribed;

                  return (
                    <motion.div
                      key={result.id}
                      layout
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="relative"
                    >
                      {/* Premium badge */}
                      {isPremium && (
                        <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} z-10`}>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            isSubscribed
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-accent-gold/20 text-accent-gold border border-accent-gold/30'
                          }`}>
                            {isSubscribed ? '🔓' : '🔒'} {t('results_section.premium_badge', 'Premium')}
                          </span>
                        </div>
                      )}

                      <div
                        className={`bg-bg-secondary rounded-3xl overflow-hidden border shadow-xl transition-all duration-300 ${
                          isBlurred
                            ? 'border-accent-gold/20 cursor-pointer hover:border-accent-gold/40'
                            : 'border-border hover:shadow-[0_0_30px_rgba(240,185,11,0.06)]'
                        }`}
                        onClick={isBlurred ? triggerGate : undefined}
                      >
                        {/* Image */}
                        <div className={`w-full bg-bg-primary border-b border-border relative overflow-hidden ${isBlurred ? 'select-none' : ''}`}>
                          <img
                            src={result.imageUrl}
                            alt={t('results_section.before_after_alt')}
                            className={`w-full h-auto object-contain max-h-[600px] transition-all duration-300 ${
                              isBlurred ? 'blur-xl scale-105 pointer-events-none' : 'cursor-pointer'
                            }`}
                            onClick={!isBlurred ? () => window.open(result.imageUrl, '_blank') : undefined}
                            draggable={false}
                          />
                          {/* Blur overlay CTA */}
                          {isBlurred && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-primary/40 backdrop-blur-sm">
                              <div className="text-center px-6">
                                <div className="w-14 h-14 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-accent-gold/30">
                                  <span className="text-2xl">🔒</span>
                                </div>
                                <p className="text-white font-bold text-lg mb-1">{t('access_gate.locked_title')}</p>
                                <p className="text-white/70 text-sm">{t('results_section.click_to_unlock', 'Click to unlock with your access token')}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Card body */}
                        <div className={`p-8 md:p-10 ${isBlurred ? 'select-none' : ''}`}>
                          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                            {marketData && (
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-primary border border-border text-sm font-medium text-text-secondary">
                                <span>{marketData.icon}</span>
                                <span>{language === 'ar' ? (marketData.nameAr || marketData.name) : marketData.name}</span>
                              </div>
                            )}
                            <span className="text-sm font-mono text-text-muted">{date}</span>
                          </div>
                          <p className={`text-lg md:text-xl leading-relaxed whitespace-pre-wrap ${
                            isBlurred ? 'text-transparent bg-text-secondary/20 rounded-lg select-none blur-sm' : 'text-text-primary'
                          }`}>
                            {language === 'ar' ? (result.descriptionAr || result.description) : result.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Access Gate — floats at bottom when there are premium results */}
            {hasGatedContent && (
              <AnimatePresence>
                {showGate && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/70 backdrop-blur-md"
                    onClick={(e) => e.target === e.currentTarget && setShowGate(false)}
                  >
                    <div className="w-full max-w-md">
                      <AccessGate onClose={() => setShowGate(false)} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Sticky bottom CTA bar — shown for non-subscribers when there's locked content */}
            {hasGatedContent && !showGate && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-bg-secondary/90 backdrop-blur-md border-t border-border shadow-2xl"
              >
                <div className="container mx-auto flex items-center justify-between gap-4 max-w-5xl">
                  <div>
                    <p className="font-bold text-text-primary text-sm md:text-base">
                      🔒 {premiumResults.length} {t('results_section.premium_locked_count', 'premium results locked')}
                    </p>
                    <p className="text-text-secondary text-xs md:text-sm">
                      {t('results_section.unlock_subtitle', 'Enter your access token to unlock all premium content')}
                    </p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <Link
                      to="/#pricing"
                      className="hidden md:block px-4 py-2 rounded-lg border border-border text-text-secondary hover:text-accent-gold hover:border-accent-gold/50 text-sm font-medium transition-all"
                    >
                      {t('access_gate.view_plans')}
                    </Link>
                    <button
                      onClick={() => setShowGate(true)}
                      className="px-5 py-2 bg-accent-gold hover:bg-yellow-500 text-black font-bold rounded-lg text-sm transition-all hover:-translate-y-0.5 shadow-[0_0_15px_rgba(240,185,11,0.3)]"
                    >
                      🔑 {t('access_gate.token_submit')}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllResults;
