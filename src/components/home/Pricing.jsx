import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { usePlans } from '../../hooks/usePlans';
import Card from '../common/Card';
import SectionHeader from '../common/SectionHeader';
import { Loader2 } from 'lucide-react';

const Pricing = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const { plans, loading } = usePlans();

  // Filter active plans
  const activePlans = plans.filter(p => p.isActive);

  if (loading) {
    return (
      <section id="pricing" className="py-24 relative overflow-hidden bg-bg-base flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-bg-base">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader 
          title={t('pricing.section_title')} 
          subtitle={t('pricing.subtitle')} 
        />

        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto mt-12">
          {activePlans.length === 0 ? (
            <div className="text-center py-16 px-6 bg-bg-secondary/50 rounded-3xl border border-border w-full max-w-2xl mx-auto">
              <span className="text-5xl block mb-4">🚀</span>
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                {t('pricing.no_plans_title', 'No Plans Available')}
              </h3>
              <p className="text-text-secondary">
                {t('pricing.no_plans_desc', 'Premium plans will be added soon. Please check back later!')}
              </p>
            </div>
          ) : (
            activePlans.map((plan, index) => {
              const isHighlighted = plan.isHighlighted;
              const name = currentLanguage === 'ar' && plan.nameAr ? plan.nameAr : plan.nameEn;
              const billingPeriod = currentLanguage === 'ar' && plan.billingPeriodAr ? plan.billingPeriodAr : plan.billingPeriodEn;
              const features = currentLanguage === 'ar' && plan.featuresAr ? plan.featuresAr : plan.featuresEn;
              const whatsappMsg = currentLanguage === 'ar' && plan.whatsappMessageAr ? plan.whatsappMessageAr : plan.whatsappMessageEn;
              
              const whatsappLink = `https://wa.me/${plan.whatsappNumber?.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(whatsappMsg || '')}`;

              return (
                <Card 
                  key={plan.id} 
                  delay={index * 0.1} 
                  className={`p-8 flex flex-col flex-1 min-w-[300px] max-w-[400px] relative ${isHighlighted ? 'border-accent-gold shadow-[0_0_30px_rgba(240,185,11,0.15)] md:scale-105 z-10' : 'border-border/50 mt-0 md:mt-4 mb-0 md:mb-4'}`}
                >
                  {isHighlighted && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-accent-gold to-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                      ⭐ {t('pricing.recommended')}
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-text-primary mb-2 text-center">{name}</h3>
                  
                  <div className="flex items-baseline justify-center gap-1 mb-8">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-xl text-text-secondary">{plan.currency}</span>
                    <span className="text-text-muted ml-1">{billingPeriod}</span>
                  </div>
                  
                  <div className="flex-grow">
                    <ul className="space-y-4 mb-8">
                      {features && features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-text-secondary">
                          <span className="text-accent-gold mt-0.5 font-bold">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`mt-auto block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      isHighlighted 
                        ? 'bg-accent-gold text-black hover:bg-yellow-500 hover:shadow-[0_0_20px_rgba(240,185,11,0.3)] hover:-translate-y-1' 
                        : 'bg-surface hover:bg-surface-hover text-white border border-border hover:border-accent-gold/50'
                    }`}
                  >
                    📱 {t('pricing.subscribe_whatsapp')}
                  </a>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
