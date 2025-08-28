import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { X, MessageCircle, User } from 'lucide-react';

export const CreatePrivateChatModal = ({ isOpen, onClose, onCreateChat, loading }) => {
  const [targetUsername, setTargetUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (targetUsername.trim()) {
      onCreateChat({
        targetUsername: targetUsername.trim()
      });
      setTargetUsername('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="cyber-glass rounded-xl p-6 max-w-md w-full hologram">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MessageCircle className="text-neon-pink" size={24} />
            <h3 className="text-xl font-cyber font-bold text-neon-pink">INITIATE_PRIVATE_LINK</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Target Username"
            value={targetUsername}
            onChange={(e) => setTargetUsername(e.target.value)}
            placeholder="Enter username to chat with..."
            required
            minLength={3}
            icon={<User size={18} />}
          />
          
          <div className="flex space-x-3 pt-2">
            <Button 
              type="submit" 
              loading={loading}
              className="flex-1"
              disabled={!targetUsername.trim()}
            >
              ESTABLISH_LINK
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              ABORT
            </Button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-neon-pink/10 border border-neon-pink/30 rounded-lg">
          <p className="text-xs text-neon-pink/80 font-mono">
            <span className="text-neon-pink">●</span> ESTABLISHING SECURE P2P CONNECTION...
          </p>
        </div>
      </div>
    </div>
  );
};
