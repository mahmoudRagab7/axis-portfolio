import Card from '../common/Card';
import SectionHeader from '../common/SectionHeader';

const Services = () => {
  const servicesList = [
    {
      id: "signals",
      title: "Premium Trading Signals",
      description: "Receive real-time, highly accurate entry, target, and stop-loss levels directly to your device. We do the heavy lifting analysis so you can execute with confidence.",
      icon: "📈",
      features: ["Exact entry & exit points", "Risk:Reward ratio breakdowns", "Real-time trade management updates"]
    },
    {
      id: "analysis",
      title: "In-Depth Market Analysis",
      description: "Understand the 'why' behind the market movements. We provide detailed chart breakdowns, macro-economic context, and technical pattern recognition.",
      icon: "🔬",
      features: ["Daily/Weekly market outlooks", "Multi-timeframe chart analysis", "Fundamental impact reports"]
    },
    {
      id: "advisory",
      title: "Private Wealth Advisory",
      description: "Tailored portfolio management and one-on-one consultation for high-net-worth individuals looking to optimize their exposure across global markets.",
      icon: "💼",
      features: ["Custom portfolio structuring", "Risk exposure management", "Direct access to senior analysts"]
    },
    {
      id: "education",
      title: "Trading Mastery Program",
      description: "Elevate your own trading skills with our comprehensive educational resources. Learn the exact strategies our analysts use to conquer the markets.",
      icon: "🎓",
      features: ["Technical analysis masterclasses", "Trading psychology workshops", "Live trading room access"]
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
          title="Our Premium Services" 
          subtitle="What We Offer" 
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
