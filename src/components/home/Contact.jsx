import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 bg-bg-secondary relative border-t border-border/30 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-bg-primary rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Info */}
          <div className="w-full md:w-5/12 bg-bg-tertiary p-10 md:p-12 border-b md:border-b-0 md:border-r border-border relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-gold to-yellow-500"></div>
            
            <div>
              <h2 className="text-3xl font-bold font-heading text-text-primary mb-4">
                {t('contact.section_title_prefix')}{' '}
                <span className="text-accent-gold">{t('contact.section_title_highlight')}</span>
                {' '}{t('contact.section_title_suffix')}
              </h2>
              <p className="text-text-secondary mb-8">
                {t('contact.subtitle')}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-bg-primary border border-border flex items-center justify-center shrink-0 text-accent-gold">
                    ✉️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider">{t('contact.email_us')}</h4>
                    <a href="mailto:support@axisportfolio.com" className="text-text-secondary hover:text-accent-gold transition-colors">support@axisportfolio.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-bg-primary border border-border flex items-center justify-center shrink-0 text-accent-gold">
                    ✈️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider">{t('contact.telegram')}</h4>
                    <a href="#" className="text-text-secondary hover:text-accent-gold transition-colors">@AxisSignalsVIP</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-7/12 p-10 md:p-12">
            <h3 className="text-2xl font-bold text-text-primary mb-6">{t('contact.request_access')}</h3>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert(t('contact.success_alert')); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{t('contact.first_name')}</label>
                  <input type="text" required className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent-gold transition-colors" placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{t('contact.last_name')}</label>
                  <input type="text" required className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent-gold transition-colors" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{t('contact.email_address')}</label>
                <input type="email" required className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent-gold transition-colors" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{t('contact.which_markets')}</label>
                <select className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent-gold transition-colors">
                  <option value="crypto">Cryptocurrency</option>
                  <option value="forex">Forex</option>
                  <option value="stocks">US Stocks</option>
                  <option value="other">Multiple / Other</option>
                </select>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full">
                  {t('contact.submit')}
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
