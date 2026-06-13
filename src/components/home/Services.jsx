import { useTranslation } from 'react-i18next';
import Card from '../common/Card';
import SectionHeader from '../common/SectionHeader';

const Services = () => {
  const { t } = useTranslation();

  const servicesList = [
    {
      id: "signals",
      title: t('services.signals.title'),
      description: t('services.signals.desc'),
      icon: "📈",
      features: [
        t('services.signals.f1'),
        t('services.signals.f2'),
        t('services.signals.f3')
      ]
    },
    {
      id: "analysis",
      title: t('services.analysis.title'),
      description: t('services.analysis.desc'),
      icon: "🔬",
      features: [
        t('services.analysis.f1'),
        t('services.analysis.f2'),
        t('services.analysis.f3')
      ]
    },
    {
      id: "advisory",
      title: t('services.advisory.title'),
      description: t('services.advisory.desc'),
      icon: "💼",
      features: [
        t('services.advisory.f1'),
        t('services.advisory.f2'),
        t('services.advisory.f3')
      ]
    },
    {
      id: "education",
      title: t('services.education.title'),
      description: t('services.education.desc'),
      icon: "🎓",
      features: [
        t('services.education.f1'),
        t('services.education.f2'),
        t('services.education.f3')
      ]
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-bg-primary">
      {/* Decorative subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader 
          title={t('services.title')} 
          subtitle={t('services.section_title')} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {servicesList.map((service, index) => (
            <Card key={service.id} delay={index * 0.1} className="p-8 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-gold/20 to-transparent flex items-center justify-center border border-accent-gold/30 shadow-[inset_0_0_15px_rgba(240,185,11,0.1)]">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary">{service.title}</h3>
              </div>
              
              <p className="text-text-secondary leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              
              <div className="mt-auto border-t border-border/50 pt-6">
                <ul className="space-y-3">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-text-muted">
                      <span className="text-accent-gold mt-0.5 font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
