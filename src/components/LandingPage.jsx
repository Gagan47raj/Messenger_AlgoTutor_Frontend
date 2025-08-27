import { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { Zap, Users, MessageCircle, Cpu, Network, Scan, Satellite, Eye, Brain, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LandingPage = ({ onAuth, onEnterChat, onViewMates }) => {
  const { isAuthenticated, user } = useAuth();
  const [matrixChars, setMatrixChars] = useState([]);

  useEffect(() => {
    // Generate matrix characters
    const chars = [];
    for (let i = 0; i < 100; i++) {
      chars.push({
        id: i,
        char: String.fromCharCode(0x30A0 + Math.random() * 96),
        x: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 10 + Math.random() * 20
      });
    }
    setMatrixChars(chars);
  }, []);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen cyber-bg relative overflow-hidden">
        {/* Matrix Rain Background */}
        <div className="matrix-rain">
          {matrixChars.map(char => (
            <div
              key={char.id}
              className="matrix-char"
              style={{
                left: `${char.x}%`,
                animationDelay: `${char.delay}s`,
                animationDuration: `${char.duration}s`
              }}
            >
              {char.char}
            </div>
          ))}
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="max-w-6xl w-full text-center">
            {/* Welcome Back Section */}
            <div className="mb-16">
              <div className="flex justify-center mb-8">
                <div className="cyber-glass rounded-full px-8 py-4 border-2 border-neon-blue/50 animate-glow-pulse">
                  <div className="flex items-center space-x-3">
                    <Satellite className="text-neon-blue w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="text-neon-blue font-cyber font-bold text-xl tracking-widest">
                      NEURAL_LINK_ACTIVE
                    </span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-cyber font-bold mb-8 tracking-tighter">
                <span className="text-neon-blue animate-glow-pulse">USER_</span>
                <span className="gradient-cyber">{user?.username}</span>
                <span className="text-neon-pink animate-cyber-blink">_ONLINE</span>
              </h1>
              
              <div className="cyber-glass p-6 rounded-xl mb-12 max-w-2xl mx-auto hologram">
                <div className="space-y-2 font-mono text-neon-blue">
                  <div className="flex justify-between">
                    <span>SYSTEM_STATUS:</span>
                    <span className="text-neon-green">OPERATIONAL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ENCRYPTION:</span>
                    <span className="text-neon-green">QUANTUM_LEVEL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CONNECTION:</span>
                    <span className="text-neon-green">SECURED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>READY_FOR:</span>
                    <span className="text-neon-yellow animate-pulse">DATA_TRANSMISSION</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  onClick={onEnterChat}
                  size="xl"
                  className="group relative overflow-hidden"
                >
                  <Network className="mr-3 w-6 h-6 group-hover:animate-spin" />
                  <span>ENTER_MATRIX.NET</span>
                </Button>
                
                <Button
                  onClick={onViewMates}
                  size="xl"
                  variant="accent"
                  className="group relative overflow-hidden"
                >
                  <Scan className="mr-3 w-6 h-6 group-hover:animate-pulse" />
                  <span>SCAN_NETWORK.EXE</span>
                </Button>
              </div>
            </div>

            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <div className="cyber-glass p-8 rounded-xl border-2 border-neon-blue/30 hover:border-neon-blue hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 hologram group">
                <Cpu className="mx-auto text-neon-blue mb-6 w-12 h-12 group-hover:animate-spin" />
                <h3 className="font-cyber font-bold text-neon-blue mb-4 text-xl">ACTIVE_NODES</h3>
                <p className="text-4xl text-neon-blue font-cyber font-bold">12+</p>
                <div className="mt-2 text-xs font-mono text-neon-blue/60">PROCESSING_UNITS</div>
              </div>
              
              <div className="cyber-glass p-8 rounded-xl border-2 border-neon-pink/30 hover:border-neon-pink hover:shadow-lg hover:shadow-neon-pink/20 transition-all duration-300 hologram group">
                <MessageCircle className="mx-auto text-neon-pink mb-6 w-12 h-12 group-hover:animate-pulse" />
                <h3 className="font-cyber font-bold text-neon-pink mb-4 text-xl">DATA_STREAMS</h3>
                <p className="text-4xl text-neon-pink font-cyber font-bold">∞</p>
                <div className="mt-2 text-xs font-mono text-neon-pink/60">REAL_TIME_FLOW</div>
              </div>
              
              <div className="cyber-glass p-8 rounded-xl border-2 border-neon-purple/30 hover:border-neon-purple hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300 hologram group">
                <Users className="mx-auto text-neon-purple mb-6 w-12 h-12 group-hover:animate-bounce" />
                <h3 className="font-cyber font-bold text-neon-purple mb-4 text-xl">NEURAL_LINKS</h3>
                <p className="text-4xl text-neon-purple font-cyber font-bold">24/7</p>
                <div className="mt-2 text-xs font-mono text-neon-purple/60">ALWAYS_CONNECTED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cyber-bg relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="matrix-rain">
        {matrixChars.map(char => (
          <div
            key={char.id}
            className="matrix-char"
            style={{
              left: `${char.x}%`,
              animationDelay: `${char.delay}s`,
              animationDuration: `${char.duration}s`
            }}
          >
            {char.char}
          </div>
        ))}
      </div>

      {/* Scanning Lines */}
      <div className="scan-line"></div>
      <div className="scan-line" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-7xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="flex justify-center mb-12">
              <div className="cyber-glass rounded-full px-12 py-6 border-2 border-neon-blue/50 animate-glow-pulse">
                <div className="flex items-center space-x-4">
                  <Brain className="text-neon-blue w-10 h-10 animate-pulse" />
                  <span className="text-neon-blue font-cyber font-bold text-2xl tracking-widest">
                    NEURAL_INTERFACE_READY
                  </span>
                </div>
              </div>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-cyber font-bold mb-12 tracking-tighter leading-none">
              <span className="text-neon-blue animate-glow-pulse">GENZ_</span>
              <span className="gradient-cyber">MESSENGER</span>
              <span className="text-neon-pink animate-cyber-blink">.2077</span>
            </h1>
            
            <div className="cyber-glass p-8 rounded-xl mb-16 max-w-4xl mx-auto hologram">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-sm">
                <div className="space-y-1">
                  <div className="text-neon-blue/60">INITIALIZING:</div>
                  <div className="text-neon-green">QUANTUM_ENCRYPTION</div>
                </div>
                <div className="space-y-1">
                  <div className="text-neon-blue/60">PROTOCOL:</div>
                  <div className="text-neon-green">NEURAL_MESH_V3</div>
                </div>
                <div className="space-y-1">
                  <div className="text-neon-blue/60">STATUS:</div>
                  <div className="text-neon-yellow animate-pulse">AWAITING_USER_INPUT</div>
                </div>
              </div>
            </div>
            
            <Button
              onClick={onAuth}
              size="xl"
              className="px-16 py-8 text-2xl group relative overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <Shield className="mr-4 w-8 h-8 group-hover:animate-spin" />
              <span>INITIATE_CONNECTION</span>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            <div className="cyber-glass p-10 rounded-xl border-2 border-neon-blue/30 hover:border-neon-blue hover:shadow-2xl hover:shadow-neon-blue/20 transition-all duration-500 hologram group transform hover:-translate-y-2">
              <Zap className="mx-auto text-neon-blue mb-8 w-16 h-16 group-hover:animate-bounce" />
              <h3 className="font-cyber font-bold text-neon-blue mb-6 text-2xl">QUANTUM_SPEED</h3>
              <p className="text-neon-blue/70 font-mono leading-relaxed">
                INSTANTANEOUS_DATA_TRANSMISSION<br/>
                ZERO_LATENCY_PROCESSING<br/>
                NEURAL_NETWORK_OPTIMIZED
              </p>
            </div>
            
            <div className="cyber-glass p-10 rounded-xl border-2 border-neon-pink/30 hover:border-neon-pink hover:shadow-2xl hover:shadow-neon-pink/20 transition-all duration-500 hologram group transform hover:-translate-y-2">
              <Shield className="mx-auto text-neon-pink mb-8 w-16 h-16 group-hover:animate-pulse" />
              <h3 className="font-cyber font-bold text-neon-pink mb-6 text-2xl">QUANTUM_ENCRYPTION</h3>
              <p className="text-neon-pink/70 font-mono leading-relaxed">
                MILITARY_GRADE_SECURITY<br/>
                END_TO_END_ENCRYPTION<br/>
                UNHACKABLE_PROTOCOL
              </p>
            </div>
            
            <div className="cyber-glass p-10 rounded-xl border-2 border-neon-purple/30 hover:border-neon-purple hover:shadow-2xl hover:shadow-neon-purple/20 transition-all duration-500 hologram group transform hover:-translate-y-2">
              <Network className="mx-auto text-neon-purple mb-8 w-16 h-16 group-hover:animate-spin" />
              <h3 className="font-cyber font-bold text-neon-purple mb-6 text-2xl">NEURAL_NETWORK</h3>
              <p className="text-neon-purple/70 font-mono leading-relaxed">
                GLOBAL_MESH_TOPOLOGY<br/>
                SELF_HEALING_ARCHITECTURE<br/>
                INFINITE_SCALABILITY
              </p>
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="mt-24 cyber-glass p-8 rounded-xl border-2 border-neon-green/30 hologram">
            <div className="flex items-center mb-6">
              <div className="w-4 h-4 bg-neon-green rounded-full mr-4 animate-pulse"></div>
              <span className="text-neon-green font-cyber font-bold text-xl">SYSTEM_TERMINAL</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-neon-green/80 font-mono text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>CORE_SYSTEMS:</span>
                  <span className="text-neon-green">ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span>SECURITY_PROTOCOL:</span>
                  <span className="text-neon-green">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>NEURAL_INTERFACE:</span>
                  <span className="text-neon-green">READY</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>DATA_INTEGRITY:</span>
                  <span className="text-neon-green">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>UPTIME:</span>
                  <span className="text-neon-green">99.99%</span>
                </div>
                <div className="flex justify-between">
                  <span>READY_STATE:</span>
                  <span className="text-neon-yellow animate-pulse">TRUE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
