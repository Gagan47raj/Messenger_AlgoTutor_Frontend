import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;
let isConnecting = false;

export const connectWebSocket = (onConnect, onError) => {
  try {
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
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);
    
    stompClient.reconnect_delay = 5000;
    
    stompClient.connect({}, () => {
      console.log('WebSocket connected');
      isConnecting = false;
      onConnect?.();
    }, (error) => {
      console.error('WebSocket connection error:', error);
      isConnecting = false;
      onError?.(error);
    });

    return stompClient;
  } catch (error) {
    console.error('Failed to create WebSocket connection:', error);
    isConnecting = false;
    onError?.(error);
    return null;
  }
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

export const disconnectWebSocket = () => {
  if (stompClient && stompClient.connected) {
    try {
      stompClient.disconnect();
      console.log('WebSocket disconnected');
    } catch (error) {
      console.error('Error disconnecting WebSocket:', error);
    }
  } else if (stompClient) {
    console.log('WebSocket was not connected, cleaning up');
  }
  stompClient = null;
  isConnecting = false;
};

export const isConnected = () => {
  return stompClient && stompClient.connected;
};

export const isConnectingState = () => {
  return isConnecting;
};