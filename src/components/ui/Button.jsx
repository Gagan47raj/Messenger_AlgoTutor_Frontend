export const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    className = '', 
    ...props 
  }) => {
    const baseClasses = 'rounded-full font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg',
      secondary: 'glass-effect text-white border-white/30 hover:border-white/50',
      accent: 'bg-accent-500 text-white hover:bg-accent-600',
      ghost: 'text-white hover:bg-white/10'
    };
  
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg'
    };
  
    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Loading...
          </div>
        ) : (
          children
        )}
      </button>
    );
  };