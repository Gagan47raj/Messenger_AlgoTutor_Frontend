export const MessageBubble = ({ message, isOwn }) => {
    return (
      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
        <div className={`message-bubble smooth-transition ${
          isOwn 
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-none' 
            : 'glass-effect text-white rounded-bl-none'
        }`}>
          {!isOwn && (
            <p className="text-xs font-semibold opacity-80 mb-1">{message.sender}</p>
          )}
          <p className="text-sm">{message.content}</p>
          <p className="text-xs opacity-60 mt-1 text-right">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    );
  };