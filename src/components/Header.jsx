import { useState } from 'react';
import { Button } from './ui/Button';
import { UserMenuModal } from './UserMenuModal';
import { MessageCircle, User, Settings, Activity, Wifi, Menu } from 'lucide-react';

export const Header = ({ user, onLogout, connected = true }) => {
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <>
      <header className="cyber-glass mx-4 sm:mx-6 mt-4 sm:mt-6 mb-4 sm:mb-6 hologram relative">
        <div className="scan-line"></div>
        <div className="flex items-center justify-between p-4 sm:p-6 relative z-10">
          
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            <div className="relative">
              <MessageCircle className="text-neon-blue w-8 h-8 sm:w-10 sm:h-10 animate-glow-pulse" />
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-neon-green rounded-full animate-pulse"></div>
            </div>
            
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-cyber font-bold gradient-cyber tracking-wider truncate">
                GENZ_MESSENGER
              </h1>
              <div className="flex items-center space-x-2 mt-1">
                <Activity className="text-neon-green w-2 h-2 sm:w-3 sm:h-3" />
                <span className="text-xs font-mono text-neon-green hidden sm:inline">v2.077 ACTIVE</span>
                <span className="text-xs font-mono text-neon-green sm:hidden">ACTIVE</span>
              </div>
            </div>
          </div>
          
          {/* Right Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Connection Status */}
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${
              connected 
                ? 'bg-neon-green/10 border-neon-green/30' 
                : 'bg-neon-red/10 border-neon-red/30'
            }`}>
              <Wifi className={`w-4 h-4 ${connected ? 'text-neon-green' : 'text-neon-red'}`} />
              <span className={`text-xs font-cyber font-bold ${
                connected ? 'text-neon-green' : 'text-neon-red'
              }`}>
                {connected ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
            
            {/* User Info */}
            <div className="flex items-center space-x-3 cyber-glass px-4 py-2 rounded-lg">
              <User className="text-neon-blue w-5 h-5" />
              <div>
                <div className="text-xs font-cyber text-neon-blue/60 uppercase">USER_ID</div>
                <div className="font-cyber font-bold text-neon-blue">{user.username}</div>
              </div>
            </div>
            
            {/* Settings Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserModal(true)}
              className="p-3 group"
              title="Open System Control Panel"
            >
              <Settings className="w-5 h-5 group-hover:animate-spin transition-transform duration-300" />
            </Button>
          </div>

          {/* Right Section - Mobile/Tablet */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Connection Status - Compact */}
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border ${
              connected 
                ? 'bg-neon-green/10 border-neon-green/30' 
                : 'bg-neon-red/10 border-neon-red/30'
            }`}>
              <Wifi className={`w-3 h-3 ${connected ? 'text-neon-green' : 'text-neon-red'}`} />
              <span className={`text-xs font-cyber font-bold hidden sm:inline ${
                connected ? 'text-neon-green' : 'text-neon-red'
              }`}>
                {connected ? 'ON' : 'OFF'}
              </span>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserModal(true)}
              className="p-2 sm:p-3 group"
              title="Open System Control Panel"
            >
              <Menu className="w-5 h-5 group-hover:animate-pulse" />
            </Button>
          </div>
        </div>
      </header>

      {/* User Menu Modal */}
      <UserMenuModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        user={user}
        onLogout={onLogout}
        connected={connected}
      />
    </>
  );
};
