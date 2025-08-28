// components/PrivateChatList.jsx
import { MessageCircle, User, Clock } from 'lucide-react';

export const PrivateChatList = ({ chats, onChatSelect, selectedChatId, currentUser }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.abs(now - date) / 36e5;

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getOtherParticipant = (chat) => {
    return chat.participant1Username === currentUser.username 
      ? chat.participant2Username 
      : chat.participant1Username;
  };

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-neon-blue/60">
        <MessageCircle size={48} className="mb-4 opacity-50" />
        <p className="text-sm font-mono">NO_PRIVATE_CHANNELS</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {chats.map(chat => (
        <div
          key={chat.id}
          onClick={() => onChatSelect(chat)}
          className={`cyber-glass p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedChatId === chat.chatId
              ? 'border-2 border-neon-pink shadow-lg shadow-neon-pink/20'
              : 'border border-neon-blue/30 hover:border-neon-pink/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <User className="text-neon-pink w-8 h-8" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
              </div>
              
              <div>
                <h4 className="font-cyber font-bold text-neon-pink text-sm">
                  {getOtherParticipant(chat)}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="text-xs font-mono text-neon-pink/60">
                    SECURE_CHANNEL
                  </div>
                  <div className="w-1 h-1 bg-neon-pink/60 rounded-full"></div>
                  <div className="text-xs font-mono text-neon-pink/60">
                    {chat.messageCount} MSG
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              {chat.lastMessage ? (
                <div>
                  <p className="text-xs font-mono text-neon-blue/80 truncate max-w-20">
                    {chat.lastMessage.content}
                  </p>
                  <div className="flex items-center justify-end space-x-1 mt-1">
                    <Clock className="w-3 h-3 text-neon-blue/60" />
                    <span className="text-xs font-mono text-neon-blue/60">
                      {formatTime(chat.lastMessage.timestamp)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-xs font-mono text-neon-blue/60">
                  NEW_CHANNEL
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
