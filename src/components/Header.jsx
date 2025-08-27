import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { MessageCircle, User, Settings, LogOut } from 'lucide-react';

export const Header = ({ currentUser, onUserChange }) => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [username, setUsername] = useState(currentUser);

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onUserChange(username.trim());
      setShowUserModal(false);
    }
  };

  return (
    <>
      <header className="glass-effect rounded-xl mx-4 mt-4 mb-6">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <MessageCircle className="text-primary-400" size={32} />
            <h1 className="text-2xl font-bold gradient-text">GenZ Messenger</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-white/80">
              <User size={16} />
              <span>Welcome,</span>
              <span className="font-semibold text-white">{currentUser}</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserModal(true)}
              className="flex items-center space-x-2"
            >
              <Settings size={18} />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </div>
      </header>

      {/* User Settings Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">User Settings</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserModal(false)}
              >
                ✕
              </Button>
            </div>
            
            <form onSubmit={handleUserSubmit} className="space-y-4">
              <Input
                label="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username..."
                maxLength={50}
              />
              
              <div className="flex space-x-3">
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowUserModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
            
            <div className="mt-6 pt-4 border-t border-white/20">
              <Button
                variant="accent"
                className="w-full flex items-center justify-center space-x-2"
                onClick={() => {
                  onUserChange('You');
                  setShowUserModal(false);
                }}
              >
                <LogOut size={16} />
                <span>Reset User</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};