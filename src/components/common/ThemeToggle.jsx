import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-bg-tertiary border border-border text-text-secondary hover:text-accent-gold transition-colors focus:outline-none overflow-hidden cursor-pointer ${className}`}
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: theme === 'dark' ? 0 : 30,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        🌙
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          y: theme === 'light' ? 0 : -30,
          opacity: theme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center text-lg"
      >
        ☀️
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
