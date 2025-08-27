import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { User, Activity, Wifi, LogOut, Settings, Shield, Cpu, Network } from 'lucide-react';

export const UserMenuModal = ({ isOpen, onClose, user, onLogout, connected }) => {
  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="SYSTEM_CONTROL_PANEL" size="md">
      <div className="space-y-6">
        
        {/* User Profile Section */}
        <div className="cyber-glass p-6 rounded-xl border border-neon-blue/30 hologram">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-full flex items-center justify-center border-2 border-neon-blue/50">
              <User className="text-neon-blue w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-cyber text-neon-blue/60 uppercase tracking-wider">NEURAL_ID</div>
              <div className="text-xl font-cyber font-bold gradient-cyber">{user.username}</div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-neon-green">AUTHENTICATED</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <div className="text-neon-blue/60">SESSION_ID:</div>
              <div className="text-neon-blue font-bold">{Date.now().toString(36).toUpperCase()}</div>
            </div>
            <div className="space-y-1">
              <div className="text-neon-blue/60">ACCESS_LEVEL:</div>
              <div className="text-neon-green">AUTHORIZED</div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="cyber-glass p-6 rounded-xl border border-neon-purple/30">
          <h3 className="text-sm font-cyber font-bold text-neon-purple mb-4 uppercase tracking-wider flex items-center">
            <Activity className="mr-2 w-4 h-4" />
            SYSTEM_STATUS
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Network className="text-neon-blue w-5 h-5" />
                <span className="font-mono text-sm">CONNECTION</span>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${
                connected 
                  ? 'bg-neon-green/10 border-neon-green/30' 
                  : 'bg-neon-red/10 border-neon-red/30'
              }`}>
                <Wifi className={`w-3 h-3 ${connected ? 'text-neon-green' : 'text-neon-red'}`} />
                <span className={`text-xs font-cyber font-bold ${
                  connected ? 'text-neon-green' : 'text-neon-red'
                }`}>
                  {connected ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Shield className="text-neon-green w-5 h-5" />
                <span className="font-mono text-sm">ENCRYPTION</span>
              </div>
              <span className="text-neon-green font-cyber font-bold text-xs">QUANTUM_SECURED</span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Cpu className="text-neon-yellow w-5 h-5" />
                <span className="font-mono text-sm">SYSTEM_VERSION</span>
              </div>
              <span className="text-neon-yellow font-cyber font-bold text-xs">v2.077</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="cyber-glass p-6 rounded-xl border border-neon-pink/30">
          <h3 className="text-sm font-cyber font-bold text-neon-pink mb-4 uppercase tracking-wider flex items-center">
            <Settings className="mr-2 w-4 h-4" />
            QUICK_ACTIONS
          </h3>
          
          <div className="space-y-3">
            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={() => {/* Add settings functionality */}}
            >
              <Settings className="mr-3 w-4 h-4" />
              <span>PREFERENCES</span>
            </Button>
            
            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={() => {/* Add profile functionality */}}
            >
              <User className="mr-3 w-4 h-4" />
              <span>PROFILE_CONFIG</span>
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="cyber-glass p-6 rounded-xl border border-neon-red/30">
          <h3 className="text-sm font-cyber font-bold text-neon-red mb-4 uppercase tracking-wider">
            DANGER_ZONE
          </h3>
          
          <Button
            variant="danger"
            onClick={handleLogout}
            className="w-full justify-center group"
          >
            <LogOut className="mr-3 w-5 h-5 group-hover:animate-pulse" />
            <span>TERMINATE_SESSION</span>
          </Button>
          
          <div className="mt-3 text-xs font-mono text-neon-red/60 text-center">
            ⚠ This will disconnect you from the neural network
          </div>
        </div>

      </div>
    </Modal>
  );
};
