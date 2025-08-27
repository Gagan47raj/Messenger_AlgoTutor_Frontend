import { useEffect, useRef, useCallback } from 'react';
import { MessageBubble } from './MessageBubble';

export const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end"
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto cyber-scroll p-6 space-y-2 relative"
      style={{ 
        scrollBehavior: 'smooth',
        overscrollBehavior: 'contain'
      }}
    >
      {/* Background matrix effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-neon-blue font-mono text-xs animate-matrix"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          >
            {Math.random().toString(36).charAt(0)}
          </div>
        ))}
      </div>

      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-center">
          <div className="space-y-4">
            <div className="text-6xl animate-float">🌐</div>
            <div className="space-y-2">
              <h3 className="text-xl font-cyber font-bold gradient-cyber">
                NEURAL LINK ESTABLISHED
              </h3>
              <p className="text-neon-blue/60 font-mono">
                Ready to transmit data streams...
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <div
              key={message.id || index}
              style={{ 
                animationDelay: `${index * 50}ms` 
              }}
            >
              <MessageBubble
                message={message}
                isOwn={message.sender === currentUser}
              />
            </div>
          ))}
        </>
      )}
      
      <div ref={messagesEndRef} className="h-4" />
    </div>
  );
};
