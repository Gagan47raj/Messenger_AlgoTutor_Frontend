// components/MessageInput.jsx
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { MediaUpload } from './MediaUpload';
import { Send, Wifi, WifiOff, Zap, Upload, Image } from 'lucide-react';

export const MessageInput = ({ 
  onSendMessage, 
  onMediaUpload, 
  disabled, 
  connected, 
  isPrivateChat = false 
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && !disabled && connected) {
      setIsSending(true);
      try {
        await onSendMessage(message.trim());
        setMessage('');
        setTimeout(() => inputRef.current?.focus(), 100);
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleMediaUploadComplete = async (file, caption, messageType) => {
    setIsSending(true);
    try {
      await onMediaUpload(file, caption, messageType);
      setShowMediaUpload(false);
    } catch (error) {
      console.error('Failed to upload media:', error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (connected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [connected]);

  return (
    <div className="p-6 cyber-glass border-t border-neon-blue/20">
      {/* Connection Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
            connected 
              ? 'bg-neon-green/20 border border-neon-green/30' 
              : 'bg-neon-red/20 border border-neon-red/30'
          }`}>
            {connected ? (
              <Wifi className="text-neon-green w-4 h-4" />
            ) : (
              <WifiOff className="text-neon-red w-4 h-4" />
            )}
            <span className={`text-xs font-cyber font-bold uppercase tracking-wider ${
              connected ? 'text-neon-green' : 'text-neon-red'
            }`}>
              {connected 
                ? (isPrivateChat ? 'P2P_LINK_ACTIVE' : 'NEURAL_LINK_ACTIVE') 
                : 'CONNECTION_LOST'
              }
            </span>
          </div>
          
          {connected && (
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-neon-green rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-neon-green rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-neon-green rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          )}
        </div>
        
        <div className="text-xs font-mono text-neon-blue/60">
          {message.length}/500
        </div>
      </div>

      {/* Media Upload Section */}
      {showMediaUpload && (
        <div className="mb-4">
          <MediaUpload
            onUpload={handleMediaUploadComplete}
            loading={isSending}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 500))}
              placeholder={connected ? "TRANSMIT_MESSAGE..." : "AWAITING_CONNECTION..."}
              disabled={disabled || !connected}
              className="cyber-input text-lg py-4"
              icon={<Zap size={20} />}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          
          {/* Media Upload Button */}
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowMediaUpload(!showMediaUpload)}
            className="px-4 py-4 h-14"
            disabled={!connected}
            title="Upload media"
          >
            {showMediaUpload ? <Image size={20} /> : <Upload size={20} />}
          </Button>
          
          {/* Send Button */}
          <Button
            type="submit"
            disabled={!message.trim() || disabled || !connected || isSending}
            loading={isSending}
            className="px-6 py-4 h-14"
            title={!connected ? "Waiting for connection..." : "Send message (Enter)"}
          >
            <Send size={20} />
          </Button>
        </div>
        
        {/* Quick actions */}
        <div className="flex items-center justify-between text-xs font-mono text-neon-blue/60">
          <div className="flex items-center space-x-4">
            <span>ENTER → SEND</span>
            <span>SHIFT+ENTER → NEW_LINE</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>ENCRYPTION:</span>
            <span className={isPrivateChat ? "text-neon-pink" : "text-neon-green"}>
              {isPrivateChat ? "P2P_SECURED" : "QUANTUM_SECURED"}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
