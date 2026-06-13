import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';

const About = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: "🎯",
      title: t('about.features.entries_title'),
      desc: t('about.features.entries_desc')
    },
    {
      icon: "🛡️",
      title: t('about.features.risk_title'),
      desc: t('about.features.risk_desc')
    },
    {
      icon: "📊",
      title: t('about.features.analysis_title'),
      desc: t('about.features.analysis_desc')
    },
    {
      icon: "🌍",
      title: t('about.features.global_title'),
      desc: t('about.features.global_desc')
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-bg-secondary/30">
      {/* Decorative background element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader 
          title={t('about.title')} 
          subtitle={t('about.section_title')} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left side: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 leading-tight">
              {t('about.headline')}
            </h3>
            
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>
                {t('about.p1')}
              </p>
              <p>
                {t('about.p2')}
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href="#contact" variant="primary">
                {t('about.cta')}
              </Button>
            </div>
          </motion.div>

          {/* Right side: Visual / Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-primary p-6 rounded-2xl border border-border hover:border-accent-gold/40 transition-colors"
              >
                <div className="text-3xl mb-4 bg-bg-secondary w-12 h-12 flex items-center justify-center rounded-xl border border-border shadow-inner">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2">{feature.title}</h4>
                <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
