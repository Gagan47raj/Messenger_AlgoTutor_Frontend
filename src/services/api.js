const API_BASE = "http://localhost:8080/api";

// Store token in memory
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }
};

export const getAuthToken = () => {
  if (!authToken) {
    authToken = localStorage.getItem("authToken");
  }
  return authToken;
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Request failed");
  }
  return response.json();
};

export const api = {
  register: (data) =>
    fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    }).then(handleResponse),

  login: (data) =>
    fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    }).then(handleResponse),

    getCurrentUser: () => 
      fetch(`${API_BASE}/users/me`, {
        headers: getAuthHeaders(),
      }).then(handleResponse),

  // Room endpoints
  createRoom: (data) => 
    fetch(`${API_BASE}/rooms`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data),
    }).then(handleResponse),

    getRooms: () => 
      fetch(`${API_BASE}/rooms`, {
        headers: getAuthHeaders(),
      }).then(handleResponse),

  // Message endpoints
  getMessages: (roomId, page = 0, size = 50) => 
    fetch(`${API_BASE}/rooms/${roomId}/messages?page=${page}&size=${size}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),

    sendMessage: (roomId, data) => 
      fetch(`${API_BASE}/rooms/${roomId}/messages`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(data),
      }).then(handleResponse),
};
