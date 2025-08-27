export const Input = ({ 
    label, 
    error, 
    className = '', 
    ...props 
  }) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-2">
            {label}
          </label>
        )}
        <input
          className={`w-full px-4 py-3 rounded-xl glass-effect text-white placeholder-white/60 
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    transition-all duration-200 ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-accent-400">{error}</p>
        )}
      </div>
    );
  };