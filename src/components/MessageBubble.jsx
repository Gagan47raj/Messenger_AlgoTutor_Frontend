// components/MessageBubble.jsx - Updated version
import { useState, useEffect } from 'react';
import { Image, Video, FileText, Music, Download, Eye } from 'lucide-react';

const MediaPreview = ({ message }) => {
  const [imageError, setImageError] = useState(false);

  const getMediaIcon = () => {
    switch (message.messageType) {
      case 'IMAGE': return <Image size={16} />;
      case 'VIDEO': return <Video size={16} />;
      case 'AUDIO': return <Music size={16} />;
      case 'DOCUMENT': return <FileText size={16} />;
      default: return null;
    }
  };

  if (message.messageType === 'IMAGE' && !imageError) {
    return (
      <div className="mt-2">
        <img
          src={message.mediaUrl}
          alt={message.mediaFileName || 'Image'}
          className="max-w-full h-auto rounded-lg border border-current/20 cursor-pointer hover:opacity-80 transition-opacity"
          onError={() => setImageError(true)}
          onClick={() => window.open(message.mediaUrl, '_blank')}
        />
        {message.content && (
          <p className="text-xs mt-2 opacity-80">{message.content}</p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="cyber-glass p-3 rounded-lg border border-current/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getMediaIcon()}
            <div>
              <p className="text-sm font-mono">
                {message.mediaFileName || `${message.messageType} file`}
              </p>
              {message.mediaFileSize && (
                <p className="text-xs opacity-60">
                  {(message.mediaFileSize / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => window.open(message.mediaUrl, '_blank')}
              className="p-1 hover:bg-current/10 rounded transition-colors"
              title="View"
            >
              <Eye size={14} />
            </button>
            <a
              href={message.mediaUrl}
              download={message.mediaFileName}
              className="p-1 hover:bg-current/10 rounded transition-colors"
              title="Download"
            >
              <Download size={14} />
            </a>
          </div>
        </div>
      </div>
      {message.content && (
        <p className="text-xs mt-2 opacity-80">{message.content}</p>
      )}
    </div>
  );
};

export const MessageBubble = ({ message, isOwn }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const isMediaMessage = message.messageType && message.messageType !== 'TEXT';

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
        
        {isMediaMessage ? (
          <MediaPreview message={message} />
        ) : (
          <p className="font-mono text-sm leading-relaxed break-words">
            {message.content}
          </p>
        )}
        
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
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
      </div>
    </div>
  );
};
