// hooks/useWebSocket.js - REVERT TO ORIGINAL
import { useEffect, useRef, useState, useCallback } from 'react';
import { 
  connectWebSocket, 
  subscribeToRoom, 
  sendMessage as sendWsMessage, 
  disconnectWebSocket,
  isConnected,
  isConnectingState
} from '../services/websocket';

export const useWebSocket = (roomId, onMessage) => {
  const [connected, setConnected] = useState(false);
  const subscriptionRef = useRef(null);
  const onMessageRef = useRef(onMessage);

  // Keep the onMessage ref updated
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  // Connect to WebSocket
  useEffect(() => {
    let isMounted = true;

    const handleConnect = () => {
      if (isMounted) {
        console.log('✅ WebSocket connected successfully');
        setConnected(true);
        
        // Subscribe immediately after connection
        if (roomId) {
          console.log('🔄 Auto-subscribing to room:', roomId);
          subscriptionRef.current = subscribeToRoom(roomId, (message) => {
            console.log('📨 Received real-time message:', message);
            onMessageRef.current?.(message);
          });
        }
      }
    };


    const handleError = (error) => {
      if (isMounted) {
        console.error('WebSocket connection failed:', error);
        setConnected(false);
      }
    };

    if (isConnected()) {
      handleConnect();
    } else {
      connectWebSocket(handleConnect, handleError);
    }

    return () => {
      isMounted = false;
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
      
      // Only disconnect if we're actually connected
      if (isConnected() || isConnectingState()) {
        disconnectWebSocket();
      }
      
      setConnected(false);
    };
  }, [roomId]);

  // Subscribe to room when connected and roomId changes
  useEffect(() => {
    if (roomId && connected) {
      // Unsubscribe from previous room
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }

      // Subscribe to new room
      subscriptionRef.current = subscribeToRoom(roomId, (message) => {
        onMessageRef.current?.(message);
      });
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [roomId, connected]);

  const sendMessage = useCallback((roomId, message) => {
    if (connected) {
      console.log('📤 Sending message via WebSocket:', message);

      sendWsMessage(roomId, message);
    } else {
      console.error('Cannot send message: WebSocket not connected');
    }
  }, [connected]);

  return { sendMessage, connected };
};
