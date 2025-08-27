import { useState, useEffect } from 'react';

export const MessageBubble = ({ message, isOwn }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`message-bubble ${isOwn ? 'own' : 'other'} ${
        visible ? 'animate-slide-up' : 'opacity-0'
      } ${
        isOwn 
          ? 'bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border-neon-blue/30 text-neon-blue' 
          : 'bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 border-neon-purple/30 text-neon-purple'
      } max-w-sm lg:max-w-md`}>
        
        {!isOwn && (
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-neon-purple rounded-full mr-2 animate-pulse"></div>
            <p className="text-xs font-cyber font-bold uppercase tracking-wider text-neon-purple/80">
              {message.sender}
            </p>
          </div>
        )}
        
        <p className="font-mono text-sm leading-relaxed break-words">
          {message.content}
        </p>
        
        <div className="flex items-center justify-end mt-3 pt-2 border-t border-current/20">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-current/60 rounded-full animate-pulse"></div>
            <p className="text-xs font-mono text-current/60">
              {new Date(message.timestamp).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              })}
            </p>
          </div>
        </div>
        
        {/* Glitch effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
      </div>
    </div>
  );
};
