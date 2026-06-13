import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.results'), href: '#results' },
  ];

  const markets = [
    { name: t('footer.markets.us', 'US Stock Market'), icon: '🇺🇸' },
    { name: t('footer.markets.eg', 'Egyptian Exchange'), icon: '🇪🇬' },
    { name: t('footer.markets.sa', 'Saudi Market (Tadawul)'), icon: '🇸🇦' },
    { name: t('footer.markets.crypto', 'Cryptocurrencies'), icon: '₿' },
    { name: t('footer.markets.forex', 'Forex Trading'), icon: '💱' },
  ];

  return (
    <footer className="bg-bg-secondary pt-16 pb-8 border-t border-border mt-auto relative overflow-hidden">
      {/* Decorative gradient blur in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-50"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent-gold/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group inline-flex">
              <div className="relative overflow-hidden rounded-lg w-8 h-8 border border-accent-gold/30 flex items-center justify-center bg-bg-primary">
                 <span className="absolute text-accent-gold font-bold font-space text-sm z-0">AX</span>
                 <img 
                   src="/assets/axis-logo.jpeg" 
                   alt="AXIS" 
                   className="w-full h-full object-cover relative z-10" 
                   onError={(e) => e.target.style.display = 'none'}
                 />
              </div>
              <span className="text-xl font-bold font-space text-text-primary tracking-wider">
                AXIS<span className="text-accent-gold">.</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-4">
              {/* Social Icons (Placeholders using simple CSS/HTML for now) */}
              {['twitter', 'telegram', 'linkedin'].map((social) => (
                <a key={social} href={`#${social}`} className="w-8 h-8 rounded-full bg-bg-primary border border-border flex items-center justify-center text-text-muted hover:text-accent-gold hover:border-accent-gold transition-all duration-300">
                  <span className="text-xs uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">{t('footer.quick_links')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-text-secondary hover:text-accent-gold text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent-gold/50 group-hover:bg-accent-gold transition-colors"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Markets */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">{t('footer.markets_covered')}</h4>
            <ul className="space-y-2">
              {markets.map((market) => (
                <li key={market.name}>
                  <a href="#results" className="text-text-secondary hover:text-accent-gold text-sm transition-colors flex items-center gap-2">
                    <span>{market.icon}</span> {market.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">{t('footer.contact_us')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="text-accent-gold mt-0.5">📧</span>
                <a href={`mailto:${t('footer.email_link', 'support@axisportfolio.com')}`} className="hover:text-accent-gold transition-colors">{t('footer.email_link', 'support@axisportfolio.com')}</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="text-accent-gold mt-0.5">💬</span>
                <a href="#telegram" className="hover:text-accent-gold transition-colors">{t('footer.telegram_link')}</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="text-accent-gold mt-0.5">📍</span>
                <span>{t('footer.location')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            &copy; {currentYear} AXIS Portfolio. {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6 text-xs text-text-muted">
            <a href="#privacy" className="hover:text-text-primary transition-colors">{t('footer.privacy')}</a>
            <a href="#terms" className="hover:text-text-primary transition-colors">{t('footer.terms')}</a>
            <a href="#disclaimer" className="hover:text-text-primary transition-colors">{t('footer.disclaimer')}</a>
          </div>
        </div>
        <div className='flex justify-center m-4 text-text-secondary text-sm hidden'>Made By Zikovic</div>
      </div>
      
    </footer>
  );
};

export default Footer;
