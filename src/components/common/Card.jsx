import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`
        relative bg-bg-secondary rounded-2xl border border-border overflow-hidden
        ${hover ? 'transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(240,185,11,0.1)] hover:border-accent-gold/30 group' : ''}
        ${className}
      `}
    >
      {/* Top gradient highlight on hover */}
      {hover && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      )}
      
      {/* Background ambient glow on hover */}
      {hover && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-gold/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      )}

      {children}
    </motion.div>
  );
};

export default Card;
