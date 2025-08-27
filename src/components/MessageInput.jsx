import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Send, Wifi, WifiOff } from 'lucide-react';

export const MessageInput = ({ onSendMessage, disabled, connected }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 glass-effect rounded-xl">
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          {connected ? (
            <Wifi className="text-green-400" size={20} />
          ) : (
            <WifiOff className="text-red-400" size={20} />
          )}
        </div>
        
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={connected ? "Type your message..." : "Connecting..."}
          disabled={disabled || !connected}
          className="flex-1"
        />
        
        <Button
          type="submit"
          disabled={!message.trim() || disabled || !connected}
          className="px-4"
          title={!connected ? "Waiting for connection..." : "Send message"}
        >
          <Send size={20} />
        </Button>
      </div>
      
      {!connected && (
        <div className="mt-2 text-xs text-yellow-400 flex items-center">
          <div className="animate-pulse">🔄</div>
          <span className="ml-2">Connecting to server...</span>
        </div>
      )}
    </form>
  );
};