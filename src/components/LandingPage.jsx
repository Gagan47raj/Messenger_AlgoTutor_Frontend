import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { RoomList } from './RoomList';
import { Zap, Users, MessageCircle, Sparkles } from 'lucide-react';

export const LandingPage = ({ 
  rooms, 
  currentUser, 
  onUserChange, 
  onJoinRoom, 
  onCreateRoom,
  onEnterChat 
}) => {
  const [roomIdInput, setRoomIdInput] = useState('');
  const [showRoomInput, setShowRoomInput] = useState(false);

  const handleJoinRoom = () => {
    if (roomIdInput.trim()) {
      onJoinRoom(roomIdInput.trim());
      setRoomIdInput('');
    }
  };

  const popularRooms = rooms.slice(0, 3); // Show top 3 rooms

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
              <Zap className="text-yellow-400 mr-2" size={24} />
              <span className="text-white font-bold text-lg">Lightning Fast</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            GenZ <span className="gradient-text">Messenger</span>
          </h1>
          
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Connect instantly with your squad. No delays, no drama. 
            Just pure messaging vibes for the digital generation. ⚡
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side - User Setup */}
          <div className="glass-effect rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Sparkles className="mr-2 text-yellow-400" />
              Let's Get Started
            </h2>
            
            <div className="space-y-6">
              <Input
                label="Your Username"
                value={currentUser}
                onChange={(e) => onUserChange(e.target.value)}
                placeholder="Enter your cool username..."
                className="text-lg"
              />
              
              <div className="space-y-4">
                <Button
                  onClick={() => setShowRoomInput(true)}
                  className="w-full"
                  disabled={!currentUser}
                >
                  <MessageCircle className="mr-2" size={20} />
                  Join Existing Room
                </Button>
                
                {showRoomInput && (
                  <div className="space-y-3 animate-fadeIn">
                    <Input
                      value={roomIdInput}
                      onChange={(e) => setRoomIdInput(e.target.value)}
                      placeholder="Enter room ID..."
                    />
                    <Button
                      onClick={handleJoinRoom}
                      className="w-full"
                      disabled={!roomIdInput}
                    >
                      Join Room
                    </Button>
                  </div>
                )}
                
                <Button
                  onClick={onCreateRoom}
                  variant="secondary"
                  className="w-full"
                  disabled={!currentUser}
                >
                  <Users className="mr-2" size={20} />
                  Create New Room
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Popular Rooms */}
          <div className="glass-effect rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Users className="mr-2 text-primary-400" />
              Popular Rooms
            </h2>
            
            {popularRooms.length > 0 ? (
              <div className="space-y-4">
                {popularRooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => onJoinRoom(room.roomId)}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors group"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-primary-300 transition-colors">
                          {room.name}
                        </h3>
                        <p className="text-white/60 text-sm">ID: {room.roomId}</p>
                      </div>
                      <div className="text-white/60 text-sm">
                        {room.messageCount} messages
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="mx-auto text-white/40 mb-4" size={48} />
                <p className="text-white/60">No rooms yet. Be the first to create one!</p>
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 glass-effect rounded-xl">
            <Zap className="mx-auto text-yellow-400 mb-4" size={32} />
            <h3 className="font-bold text-white mb-2">Lightning Fast</h3>
            <p className="text-white/60">Real-time messaging with zero delays</p>
          </div>
          
          <div className="text-center p-6 glass-effect rounded-xl">
            <Sparkles className="mx-auto text-purple-400 mb-4" size={32} />
            <h3 className="font-bold text-white mb-2">GenZ Vibes</h3>
            <p className="text-white/60">Designed for the digital generation</p>
          </div>
          
          <div className="text-center p-6 glass-effect rounded-xl">
            <Users className="mx-auto text-green-400 mb-4" size={32} />
            <h3 className="font-bold text-white mb-2">Always Connected</h3>
            <p className="text-white/60">Stay in touch with your squad 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};