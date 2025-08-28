import { useState, useEffect, useCallback, useRef } from "react";
import { RoomList } from "./components/RoomList";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import { Header } from "./components/Header";
import { CreateRoomModal } from "./components/CreateRoomModal";
import { CreatePrivateChatModal } from "./components/CreatePrivateChatModal";
import { PrivateChatList } from "./components/PrivateChatList";
import { LandingPage } from "./components/LandingPage";
import { AuthModal } from "./components/AuthModal";
import { useApi } from "./hooks/useApi";
import { useWebSocket } from "./hooks/useWebSocket";
import { usePrivateChat } from "./hooks/usePrivateChat";
import { useAuth } from "./contexts/AuthContext";
import { api } from "./services/api";

function App() {
  // Existing state
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showMates, setShowMates] = useState(false);

  // New private chat state
  const [privateChats, setPrivateChats] = useState([]);
  const [currentPrivateChat, setCurrentPrivateChat] = useState(null);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [showCreatePrivateChat, setShowCreatePrivateChat] = useState(false);

  const { callApi, loading, error, setError } = useApi();
  const { user, login, register, logout, isAuthenticated } = useAuth();

  // Message handlers
  const messageHandlerRef = useRef();
  const privateMessageHandlerRef = useRef();

  const handleNewMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const handleNewPrivateMessage = useCallback((message) => {
    console.log('New private message received in App:', message);
    setPrivateMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    messageHandlerRef.current = handleNewMessage;
    privateMessageHandlerRef.current = handleNewPrivateMessage;
  }, [handleNewMessage, handleNewPrivateMessage]);

  // WebSocket connections
  const { sendMessage: sendWsMessage, connected } = useWebSocket(
    currentRoom?.roomId,
    (message) => messageHandlerRef.current?.(message)
  );

  const { sendMessage: sendPrivateWsMessage, connected: privateConnected } = usePrivateChat(
    currentPrivateChat?.chatId,
    handleNewPrivateMessage
  );

  // Load functions
  const loadRooms = useCallback(async () => {
    if (!isAuthenticated) return;
    await callApi(() => api.getRooms(), setRooms);
  }, [callApi, isAuthenticated]);

  const loadPrivateChats = useCallback(async () => {
    if (!isAuthenticated) return;
    await callApi(() => api.getPrivateChats(), setPrivateChats);
  }, [callApi, isAuthenticated]);

  const loadMessages = useCallback(async (roomId) => {
    if (!isAuthenticated) return;
    await callApi(() => api.getMessages(roomId), setMessages);
  }, [callApi, isAuthenticated]);

  const loadPrivateMessages = useCallback(async (chatId) => {
    if (!isAuthenticated) return;
    await callApi(() => api.getPrivateMessages(chatId), setPrivateMessages);
  }, [callApi, isAuthenticated]);

  // Room handlers
  const handleSelectRoom = async (room) => {
    setCurrentRoom(room);
    setCurrentPrivateChat(null);
    await loadMessages(room.roomId);
    setShowChat(true);
    setShowMates(false);
  };

  // Private chat handlers
  const handleSelectPrivateChat = async (chat) => {
    setCurrentPrivateChat(chat);
    setCurrentRoom(null);
    await loadPrivateMessages(chat.chatId);
    setShowMates(true);
    setShowChat(false);
  };

  const handleCreatePrivateChat = async (data) => {
    try {
      const newChat = await api.createPrivateChat(data);
      setPrivateChats(prev => [newChat, ...prev]);
      setShowCreatePrivateChat(false);
      // Optionally select the new chat
      setCurrentPrivateChat(newChat);
      setShowMates(true);
    } catch (error) {
      console.error('Failed to create private chat:', error);
      setError('Failed to create private chat');
    }
  };

  // Navigation handlers
  const handleEnterChat = () => {
    setShowChat(true);
    setShowMates(false);
    setCurrentPrivateChat(null);
  };

  const handleViewMates = () => {
    setShowMates(true);
    setShowChat(false);
    setCurrentRoom(null);
    loadPrivateChats();
  };

  const handleBackToLobby = () => {
    setShowChat(false);
    setShowMates(false);
    setCurrentRoom(null);
    setCurrentPrivateChat(null);
    setMessages([]);
    setPrivateMessages([]);
  };

  // Message sending handlers
  const handleSendMessage = async (content) => {
    if (sending || !user) return;
    setSending(true);
  
    try {
      if (currentRoom) {
        // Room message (existing code)
        const messageData = { content };
        if (connected) {
          sendWsMessage(currentRoom.roomId, messageData);
        } else {
          const newMessage = await api.sendMessage(currentRoom.roomId, messageData);
          handleNewMessage(newMessage);
        }
      } else if (currentPrivateChat) {
        // Private message
        const messageData = { content };
        console.log('Sending private message via WebSocket:', currentPrivateChat.chatId, messageData);
        
        if (privateConnected) {
          sendPrivateWsMessage(currentPrivateChat.chatId, messageData);
        } else {
          console.log('WebSocket not connected, sending via API');
          const newMessage = await api.sendPrivateMessage(currentPrivateChat.chatId, messageData);
          handleNewPrivateMessage(newMessage);
        }
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // Media upload handler
  const handleMediaUpload = async (file, caption, messageType) => {
    try {
      setSending(true);
      if (currentRoom) {
        await api.sendMediaMessage(currentRoom.roomId, file, caption, messageType);
      } else if (currentPrivateChat) {
        // You'll need to implement private media messages in your backend
        console.log('Private media messages coming soon');
      }
    } catch (error) {
      console.error('Failed to send media:', error);
      setError('Failed to send media');
    } finally {
      setSending(false);
    }
  };

  // Other handlers remain the same...
  const handleCreateRoom = async (roomData) => {
    await callApi(
      () => api.createRoom(roomData),
      (newRoom) => {
        setRooms((prev) => [...prev, newRoom]);
        setShowCreateRoom(false);
        setCurrentRoom(newRoom);
        setShowChat(true);
        setShowMates(false);
      }
    );
  };

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      setShowAuthModal(false);
      await loadRooms();
      await loadPrivateChats();
    } catch (err) {
      // Error handled by auth context
    }
  };

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      setShowAuthModal(false);
      await loadRooms();
      await loadPrivateChats();
    } catch (err) {
      // Error handled by auth context
    }
  };

  // Effects
  useEffect(() => {
    if (isAuthenticated) {
      loadRooms();
      loadPrivateChats();
    }
  }, [loadRooms, loadPrivateChats, isAuthenticated]);

  useEffect(() => {
    if (currentRoom && showChat && isAuthenticated) {
      loadMessages(currentRoom.roomId);
    }
  }, [currentRoom, loadMessages, showChat, isAuthenticated]);

  useEffect(() => {
    if (currentPrivateChat && showMates && isAuthenticated) {
      loadPrivateMessages(currentPrivateChat.chatId);
    }
  }, [currentPrivateChat, loadPrivateMessages, showMates, isAuthenticated]);

  // Render logic
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen cyber-bg">
        <LandingPage
          onAuth={() => setShowAuthModal(true)}
          onEnterChat={handleEnterChat}
          onViewMates={handleViewMates}
        />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
          loading={loading}
          error={error}
        />
      </div>
    );
  }

  // Chat interface
  if (showChat) {
    return (
      <div className="min-h-screen cyber-bg">
        <Header user={user} onLogout={logout} connected={connected} />

        <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
          <div className="flex gap-6 h-[calc(100vh-140px)]">
            <RoomList
              rooms={rooms}
              currentRoom={currentRoom}
              onSelectRoom={handleSelectRoom}
              onCreateRoom={() => setShowCreateRoom(true)}
              onBackToLobby={handleBackToLobby}
            />

            <div className="flex-1 flex flex-col cyber-glass rounded-xl hologram">
              {currentRoom ? (
                <>
                  <div className="p-4 sm:p-6 border-b border-neon-blue/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-cyber font-bold gradient-cyber">
                          {currentRoom.name}
                        </h2>
                        <p className="text-neon-blue/60 text-sm font-mono">
                          ROOM_ID: {currentRoom.roomId}
                        </p>
                      </div>
                      <button
                        onClick={handleBackToLobby}
                        className="text-neon-blue/60 hover:text-neon-blue text-sm font-cyber"
                      >
                        ← RETURN_TO_LOBBY
                      </button>
                    </div>
                  </div>

                  <MessageList
                    messages={messages}
                    currentUser={user?.username}
                  />
                  <MessageInput
                    onSendMessage={handleSendMessage}
                    onMediaUpload={handleMediaUpload}
                    disabled={loading || sending || !user}
                    connected={connected}
                  />
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-float">🌐</div>
                    <h3 className="text-xl font-cyber font-bold gradient-cyber mb-2">
                      SELECT_NEURAL_CHANNEL
                    </h3>
                    <p className="text-neon-blue/60 font-mono">
                      Choose a room to begin data transmission
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <CreateRoomModal
          isOpen={showCreateRoom}
          onClose={() => setShowCreateRoom(false)}
          onCreateRoom={handleCreateRoom}
          loading={loading}
        />
      </div>
    );
  }

  // Private chats interface
  if (showMates) {
    return (
      <div className="min-h-screen cyber-bg">
        <Header user={user} onLogout={logout} connected={privateConnected} />

        <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
          <div className="flex gap-6 h-[calc(100vh-140px)]">
            <div className="w-80 cyber-glass rounded-xl p-4 hologram">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-cyber font-bold gradient-cyber">PRIVATE_LINKS</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowCreatePrivateChat(true)}
                    className="text-neon-pink hover:text-neon-pink/80 font-cyber text-sm"
                    title="Create Private Chat"
                  >
                    + NEW_LINK
                  </button>
                  <button
                    onClick={handleBackToLobby}
                    className="text-neon-blue/60 hover:text-neon-blue text-sm font-cyber"
                  >
                    ← LOBBY
                  </button>
                </div>
              </div>
              
              <PrivateChatList
                chats={privateChats}
                onChatSelect={handleSelectPrivateChat}
                selectedChatId={currentPrivateChat?.chatId}
                currentUser={user}
              />
            </div>

            <div className="flex-1 flex flex-col cyber-glass rounded-xl hologram">
              {currentPrivateChat ? (
                <>
                  <div className="p-4 sm:p-6 border-b border-neon-pink/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-cyber font-bold text-neon-pink">
                          PRIVATE_CHANNEL
                        </h2>
                        <p className="text-neon-pink/60 text-sm font-mono">
                          TARGET: {currentPrivateChat.participant1Username === user.username 
                            ? currentPrivateChat.participant2Username 
                            : currentPrivateChat.participant1Username}
                        </p>
                      </div>
                      <div className="text-xs font-mono text-neon-pink/60">
                        ENCRYPTED_P2P_LINK
                      </div>
                    </div>
                  </div>

                  <MessageList
                    messages={privateMessages}
                    currentUser={user?.username}
                  />
                  <MessageInput
                    onSendMessage={handleSendMessage}
                    onMediaUpload={handleMediaUpload}
                    disabled={loading || sending || !user}
                    connected={privateConnected}
                    isPrivateChat={true}
                  />
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-pulse">🔐</div>
                    <h3 className="text-xl font-cyber font-bold text-neon-pink mb-2">
                      SELECT_PRIVATE_CHANNEL
                    </h3>
                    <p className="text-neon-pink/60 font-mono">
                      Choose a contact for secure P2P communication
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <CreatePrivateChatModal
          isOpen={showCreatePrivateChat}
          onClose={() => setShowCreatePrivateChat(false)}
          onCreateChat={handleCreatePrivateChat}
          loading={loading}
        />
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen cyber-bg">
      <Header user={user} onLogout={logout} />
      <LandingPage
        onAuth={() => setShowAuthModal(true)}
        onEnterChat={handleEnterChat}
        onViewMates={handleViewMates}
      />
    </div>
  );
}

export default App;
