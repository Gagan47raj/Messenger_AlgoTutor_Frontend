import { Button } from './ui/Button';
import { Users, MessageCircle, ArrowLeft } from 'lucide-react';

export const RoomList = ({ rooms, currentRoom, onSelectRoom, onCreateRoom, onBackToLobby }) => {
  return (
    <div className="w-80 glass-effect rounded-xl p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {onBackToLobby && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToLobby}
              className="mr-2"
            >
              <ArrowLeft size={16} />
            </Button>
          )}
          <h2 className="text-xl font-bold gradient-text">Rooms</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onCreateRoom}>
          <Users size={20} />
        </Button>
      </div>
      
      <div className="space-y-2">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => onSelectRoom(room)}
            className={`p-3 rounded-xl cursor-pointer smooth-transition ${
              currentRoom?.id === room.id
                ? 'bg-primary-500/20 border border-primary-500/50'
                : 'hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{room.name}</h3>
              <div className="flex items-center space-x-2 text-xs text-white/60">
                <MessageCircle size={14} />
                <span>{room.messageCount}</span>
              </div>
            </div>
            <p className="text-xs text-white/60 mt-1">ID: {room.roomId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};