import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';

export const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto space-y-3 p-4">
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id || index}
          message={message}
          isOwn={message.sender === currentUser}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};