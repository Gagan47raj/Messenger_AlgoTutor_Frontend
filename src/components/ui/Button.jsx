export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'cyber-button rounded-lg font-cyber font-bold uppercase tracking-wider relative overflow-hidden transition-all duration-300 transform gpu-accelerated disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-lg hover:shadow-neon-blue/50 border-2 border-neon-blue/50 hover:border-neon-blue',
    secondary: 'cyber-glass text-neon-blue border-2 border-neon-blue/30 hover:border-neon-blue/70 hover:bg-neon-blue/10',
    accent: 'bg-gradient-to-r from-neon-pink to-neon-purple text-white hover:shadow-lg hover:shadow-neon-pink/50 border-2 border-neon-pink/50 hover:border-neon-pink',
    ghost: 'text-neon-blue hover:bg-neon-blue/10 border-2 border-transparent hover:border-neon-blue/30',
    danger: 'bg-gradient-to-r from-neon-red to-red-600 text-white hover:shadow-lg hover:shadow-neon-red/50 border-2 border-neon-red/50 hover:border-neon-red'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-12 py-6 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
        loading ? 'cursor-wait' : ''
      }`}
      disabled={loading || disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="cyber-loader w-4 h-4 mr-2" />
            <span className="animate-pulse">PROCESSING...</span>
          </div>
        ) : (
          children
        )}
      </span>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </button>
  );
};
