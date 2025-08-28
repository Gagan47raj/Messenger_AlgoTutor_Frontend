// hooks/usePrivateChat.js - FIXED VERSION
import { useEffect, useRef, useState, useCallback } from 'react';
import { 
  subscribeToPrivateChat, 
  sendPrivateMessage as sendWsPrivateMessage, 
  isConnected
} from '../services/websocket';

export const usePrivateChat = (chatId, onMessage) => {
  const [connected, setConnected] = useState(false);
  const subscriptionRef = useRef(null);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  // Check connection status periodically
  useEffect(() => {
    const checkConnection = () => {
      const isConnectedNow = isConnected();
      setConnected(isConnectedNow);
    };

    // Initial check
    checkConnection();

    // Check every 1 second
    const interval = setInterval(checkConnection, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatId && connected) {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }

      console.log('Subscribing to private chat:', chatId);
      subscriptionRef.current = subscribeToPrivateChat(chatId, (message) => {
        console.log('Received private message:', message);
        onMessageRef.current?.(message);
      });
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [chatId, connected]);

  const sendMessage = useCallback((chatId, message) => {
    if (connected) {
      console.log('Sending private message:', chatId, message);
      sendWsPrivateMessage(chatId, message);
    } else {
      console.error('Cannot send private message: WebSocket not connected');
    }
  }, [connected]);

  return { sendMessage, connected };
};
