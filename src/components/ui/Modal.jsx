import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Matrix rain effect */}
      <div className="matrix-rain">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="matrix-char"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          >
            {String.fromCharCode(0x30A0 + Math.random() * 96)}
          </div>
        ))}
      </div>
      
      {/* Modal */}
      <div className={`cyber-glass rounded-xl p-8 ${sizes[size]} w-full relative z-10 animate-zoom-in hologram`}>
        <div className="scan-line"></div>
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-cyber font-bold gradient-cyber uppercase tracking-wider">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-neon-blue/60 hover:text-neon-red transition-colors duration-300 text-2xl font-bold hover:rotate-90 transform transition-transform duration-300"
          >
            ✕
          </button>
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
