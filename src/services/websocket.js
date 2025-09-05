// services/websocket.js
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { getAuthToken, getWebSocketUrl } from './api';

let stompClient = null;
let isConnecting = false;
let reconnectTimeout = null;
let connectionCallbacks = { onConnect: null, onError: null };

let connectionAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 3;

export const connectWebSocket = (onConnect, onError) => {
  try {
    const token = getAuthToken();
    if (!token) {
      onError?.('No authentication token');
      return null;
    }

    // Store callbacks for reconnection
    connectionCallbacks.onConnect = onConnect;
    connectionCallbacks.onError = onError;

    if (stompClient && isConnected()) {
      console.log('WebSocket already connected');
      onConnect?.();
      return stompClient;
    }

    if (isConnecting) {
      console.log('WebSocket connection already in progress');
      return stompClient;
    }

    isConnecting = true;
    
    const wsUrl = getWebSocketUrl();
    console.log('🔌 Connecting to WebSocket at:', wsUrl);

    // Clear any existing reconnect timeout
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }

    const socket = new SockJS(wsUrl);
    stompClient = Stomp.over(socket);

    stompClient.reconnect_delay = 5000;
    
    // Disable debug logging
    stompClient.debug = null;
    
    // Set heartbeat
    stompClient.heartbeat.outgoing = 20000;
    stompClient.heartbeat.incoming = 20000;

    // Add authentication header
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    
    stompClient.connect(headers, () => {
      console.log('WebSocket connected successfully',wsUrl);
      isConnecting = false;
      onConnect?.();
    }, (error) => {
      console.error('WebSocket connection error:', error);
      isConnecting = false;
      onError?.(error);
      
      // Auto-reconnect after 3 seconds
      scheduleReconnect();
    });

    // Handle disconnect
    socket.onclose = () => {
      console.log('WebSocket disconnected');
      stompClient = null;
      isConnecting = false;
      scheduleReconnect();
    };

    return stompClient;
  } catch (error) {
    console.error('Failed to create WebSocket connection:', error);
    isConnecting = false;
    onError?.(error);
    scheduleReconnect();
    return null;
  }
};

const scheduleReconnect = () => {
  if (reconnectTimeout || connectionAttempts >= MAX_RECONNECT_ATTEMPTS) return;
  
  connectionAttempts++;
  
  reconnectTimeout = setTimeout(() => {
    reconnectTimeout = null;
    if (!isConnected() && !isConnecting) {
      console.log(`🔄 Reconnect attempt ${connectionAttempts}/${MAX_RECONNECT_ATTEMPTS}`);
      connectWebSocket(connectionCallbacks.onConnect, connectionCallbacks.onError);
    }
  }, 3000 * connectionAttempts); // Exponential backoff
};

export const subscribeToRoom = (roomId, callback) => {
  if (stompClient && stompClient.connected) {
    try {
      return stompClient.subscribe(`/topic/rooms/${roomId}`, (message) => {
        try {
          callback(JSON.parse(message.body));
        } catch (parseError) {
          console.error('Failed to parse message:', parseError);
        }
      });
    } catch (subscribeError) {
      console.error('Failed to subscribe to room:', subscribeError);
    }
  }
  return null;
};

export const subscribeToPrivateChat = (chatId, callback) => {
  if (stompClient && stompClient.connected) {
    try {
      console.log('Subscribing to private chat topic:', `/topic/private/${chatId}`);
      return stompClient.subscribe(`/topic/private/${chatId}`, (message) => {
        try {
          callback(JSON.parse(message.body));
        } catch (parseError) {
          console.error('Failed to parse private message:', parseError);
        }
      });
    } catch (subscribeError) {
      console.error('Failed to subscribe to private chat:', subscribeError);
    }
  } else {
    console.error('WebSocket not connected for private chat subscription');
  }
  return null;
};

export const sendMessage = (roomId, message) => {
  if (stompClient && stompClient.connected) {
    try {
      stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(message));
    } catch (sendError) {
      console.error('Failed to send message:', sendError);
    }
  } else {
    console.error('WebSocket not connected');
  }
};

export const sendPrivateMessage = (chatId, message) => {
  if (stompClient && stompClient.connected) {
    try {
      console.log('Sending to private endpoint:', `/app/private/${chatId}`, message);
      stompClient.send(`/app/private/${chatId}`, {}, JSON.stringify(message));
    } catch (sendError) {
      console.error('Failed to send private message:', sendError);
    }
  } else {
    console.error('WebSocket not connected for private message');
  }
};

export const disconnectWebSocket = () => {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
  
  if (stompClient && stompClient.connected) {
    try {
      stompClient.disconnect(() => {
        console.log('WebSocket disconnected gracefully');
      });
    } catch (error) {
      console.error('Error disconnecting WebSocket:', error);
    }
  }
  
  stompClient = null;
  isConnecting = false;
  connectionCallbacks = { onConnect: null, onError: null };
};

export const isConnected = () => {
  return stompClient && stompClient.connected;
};

export const isConnectingState = () => {
  return isConnecting;
};
