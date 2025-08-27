import { useState, useEffect, useCallback, useRef } from "react";
import { RoomList } from "./components/RoomList";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import { Header } from "./components/Header";
import { CreateRoomModal } from "./components/CreateRoomModal";
import { LandingPage } from "./components/LandingPage";
import { AuthModal } from "./components/AuthModal";
import { useApi } from "./hooks/useApi";
import { useWebSocket } from "./hooks/useWebSocket";
import { useAuth } from "./contexts/AuthContext";
import { api } from "./services/api";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showMates, setShowMates] = useState(false);

  const { callApi, loading, error, setError } = useApi();
  const { user, login, register, logout, isAuthenticated } = useAuth();

  // Create a ref to store the latest message handler
  const messageHandlerRef = useRef();

  // Update the ref when handleNewMessage changes
  const handleNewMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    messageHandlerRef.current = handleNewMessage;
  }, [handleNewMessage]);

  // Use WebSocket with the ref function
  const { sendMessage: sendWsMessage, connected } = useWebSocket(
    currentRoom?.roomId,
    (message) => messageHandlerRef.current?.(message)
  );

  const loadRooms = useCallback(async () => {
    if (!isAuthenticated) return;

    await callApi(() => api.getRooms(), setRooms);
  }, [callApi, isAuthenticated]);

  const loadMessages = useCallback(
    async (roomId) => {
      if (!isAuthenticated) return;

      await callApi(() => api.getMessages(roomId), setMessages);
    },
    [callApi, isAuthenticated]
  );

  const handleSelectRoom = async (room) => {
    setCurrentRoom(room);
    await loadMessages(room.roomId);
    setShowChat(true);
  };

  const handleJoinRoom = (roomId) => {
    const room = rooms.find((r) => r.roomId === roomId);
    if (room) {
      handleSelectRoom(room);
    }
  };

  const handleEnterChat = () => {
    setShowChat(true);
    setShowMates(false);
  };

  const handleViewMates = () => {
    setShowMates(true);
    setShowChat(false);
    // You'll need to implement the mates view functionality
  };

  const handleSendMessage = async (content) => {
    if (sending || !user) return;

    setSending(true);
    const messageData = { content };

    try {
      if (connected) {
        sendWsMessage(currentRoom.roomId, messageData);
      } else {
        const newMessage = await api.sendMessage(
          currentRoom.roomId,
          messageData
        );
        handleNewMessage(newMessage);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const handleCreateRoom = async (roomData) => {
    await callApi(
      () => api.createRoom(roomData),
      (newRoom) => {
        setRooms((prev) => [...prev, newRoom]);
        setShowCreateRoom(false);
        setCurrentRoom(newRoom);
        setShowChat(true);
      }
    );
  };

  const handleBackToLobby = () => {
    setShowChat(false);
    setCurrentRoom(null);
    setMessages([]);
  };

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      setShowAuthModal(false);
      await loadRooms();
    } catch (err) {
      // Error handled by auth context
    }
  };

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      setShowAuthModal(false);
      await loadRooms();
    } catch (err) {
      // Error handled by auth context
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadRooms();
    }
  }, [loadRooms, isAuthenticated]);

  useEffect(() => {
    if (currentRoom && showChat && isAuthenticated) {
      loadMessages(currentRoom.roomId);
    }
  }, [currentRoom, loadMessages, showChat, isAuthenticated]);

  // Show loading state while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <LandingPage
          onAuth={() => setShowAuthModal(true)}
          onEnterChat={handleEnterChat}
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

  // Show chat interface if authenticated and showChat is true
  if (showChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Header user={user} onLogout={logout} />

        <div className="container mx-auto p-4 max-w-7xl">
          <div className="flex gap-6 h-[calc(100vh-140px)]">
            <RoomList
              rooms={rooms}
              currentRoom={currentRoom}
              onSelectRoom={handleSelectRoom}
              onCreateRoom={() => setShowCreateRoom(true)}
              onBackToLobby={handleBackToLobby}
            />

            <div className="flex-1 flex flex-col glass-effect rounded-xl">
              {currentRoom ? (
                <>
                  <div className="p-4 border-b border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          {currentRoom.name}
                        </h2>
                        <p className="text-white/60 text-sm">
                          Room ID: {currentRoom.roomId}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              connected ? "bg-green-400" : "bg-red-400"
                            }`}
                          />
                          <span className="text-sm text-white/60">
                            {connected ? "Connected" : "Disconnected"}
                          </span>
                        </div>
                        <button
                          onClick={handleBackToLobby}
                          className="text-white/60 hover:text-white text-sm"
                        >
                          ← Back to Lobby
                        </button>
                      </div>
                    </div>
                  </div>

                  <MessageList
                    messages={messages}
                    currentUser={user?.username}
                  />
                  <MessageInput
                    onSendMessage={handleSendMessage}
                    disabled={loading || sending || !user}
                    connected={connected}
                  />
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-xl font-semibold mb-2">
                      Select a room to start chatting
                    </h3>
                    <p className="text-white/60">
                      Choose from the list or create a new room
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

        {error && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
            Error: {error}
          </div>
        )}
      </div>
    );
  }

  {showMates && (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900">
      <Header user={user} onLogout={logout} />
      {/* Implement your mates view component here */}
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">Mates View</h2>
        <p className="text-cyan-200">One-on-one messaging interface coming soon...</p>
      </div>
    </div>
  )}

  // Show landing page with welcome message for authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header user={user} onLogout={logout} />
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

export default App;
