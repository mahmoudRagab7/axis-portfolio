import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 md:mb-20 ${centered ? 'text-center flex flex-col items-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-4"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>
        <span className="text-xs md:text-sm font-medium text-accent-gold tracking-widest uppercase">{subtitle}</span>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold font-heading text-text-primary mb-6"
      >
        {title}
      </motion.h2>
      
      {centered && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "80px", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-accent-gold to-transparent rounded-full"
        />
      )}
    </div>
  );
};

export default SectionHeader;
