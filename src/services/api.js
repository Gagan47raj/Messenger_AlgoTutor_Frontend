const API_BASE = 'http://localhost:8080/api';

export const api = {
  // Room endpoints
  createRoom: (data) => 
    fetch(`${API_BASE}/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  getRooms: () => 
    fetch(`${API_BASE}/rooms`).then(res => res.json()),

  // Message endpoints
  getMessages: (roomId, page = 0, size = 50) => 
    fetch(`${API_BASE}/rooms/${roomId}/messages?page=${page}&size=${size}`)
      .then(res => res.json()),

  sendMessage: (roomId, data) => 
    fetch(`${API_BASE}/rooms/${roomId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
};