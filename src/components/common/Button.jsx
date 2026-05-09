import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  href, 
  to, 
  onClick, 
  className = '',
  type = 'button'
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-to-r from-accent-gold to-yellow-500 text-bg-primary hover:shadow-[0_0_20px_rgba(240,185,11,0.4)]",
    secondary: "bg-bg-secondary border border-border text-text-primary hover:border-accent-gold hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]",
    outline: "bg-transparent border border-accent-gold/50 text-accent-gold hover:bg-accent-gold/10",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
