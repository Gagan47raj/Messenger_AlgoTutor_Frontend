import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { X, Users } from 'lucide-react';

export const CreateRoomModal = ({ isOpen, onClose, onCreateRoom, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    roomId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.roomId.trim()) {
      onCreateRoom({
        name: formData.name.trim(),
        roomId: formData.roomId.trim()
      });
      setFormData({ name: '', roomId: '' });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass-effect rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Users className="text-primary-400" size={24} />
            <h3 className="text-xl font-semibold text-white">Create New Room</h3>
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
            label="Room Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter room name..."
            required
            minLength={3}
            maxLength={100}
          />
          
          <Input
            label="Room ID"
            value={formData.roomId}
            onChange={(e) => handleChange('roomId', e.target.value.replace(/\s+/g, '-').toLowerCase())}
            placeholder="Enter unique room ID..."
            required
            minLength={3}
            maxLength={100}
          />
          
          <div className="flex space-x-3 pt-2">
            <Button 
              type="submit" 
              loading={loading}
              className="flex-1"
              disabled={!formData.name.trim() || !formData.roomId.trim()}
            >
              Create Room
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-white/5 rounded-lg">
          <p className="text-xs text-white/60">
            💡 <strong>Pro tip:</strong> Use lowercase letters and hyphens for Room ID (e.g., "genz-chat-room")
          </p>
        </div>
      </div>
    </div>
  );
};