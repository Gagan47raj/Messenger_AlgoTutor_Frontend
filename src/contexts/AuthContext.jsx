import { createContext, useContext, useState, useEffect } from 'react';
import { api, setAuthToken, getAuthToken } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // In AuthContext.jsx, update the useEffect to handle loading
useEffect(() => {
  const token = getAuthToken();
  if (token) {
    api.getCurrentUser()
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(() => {
        setAuthToken(null);
        setLoading(false);
      });
  } else {
    setLoading(false);
  }
}, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await api.login(credentials);
      setAuthToken(response.token);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await api.register(userData);
      setAuthToken(response.token);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};