// components/ui/Input.jsx
import { useState, forwardRef } from 'react';

export const Input = forwardRef(({ 
  label, 
  error, 
  className = '', 
  icon,
  type = 'text',
  ...props 
}, ref) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full relative">
      {label && (
        <label className="block text-sm font-cyber font-bold text-neon-blue/80 mb-2 uppercase tracking-wider">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-blue/60 z-10">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          className={`cyber-input w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-4 rounded-lg 
                    font-mono text-neon-blue placeholder-neon-blue/50 
                    focus:outline-none focus:ring-2 focus:ring-neon-blue/50
                    transition-all duration-300 gpu-accelerated
                    ${focused ? 'animate-glow-pulse' : ''} ${className}`}
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        
        {/* Animated border */}
        <div className={`absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300 ${
          focused ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 rounded-lg border-2 border-neon-blue/30 animate-cyber-pulse"></div>
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-neon-red font-mono animate-slide-up">
          <span className="text-neon-red">⚠</span> {error}
        </p>
      )}
    </div>
  );
});

// Add display name for debugging
Input.displayName = 'Input';
