# genz Messenger Frontend

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)

Modern, responsive frontend for the genz Messenger real-time chat application built with React and TypeScript.

## 🚀 Features

- **Modern UI/UX**: Sleek cyberpunk-themed interface with glassmorphism effects
- **Real-time Messaging**: Instant message delivery using WebSocket
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Authentication**: JWT-based secure login and registration
- **Room-based Chat**: Join and create public chat rooms
- **Private Messaging**: Direct messaging between users
- **Media Upload**: Share images and files
- **Multi-instance Support**: Connect to different backend instances for testing

## 🛠️ Technologies

- **React 18** with Hooks
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Vite** for fast development
- **SockJS** + **STOMP.js** for WebSocket communication
- **Fetch API** for REST calls

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- genz Messenger Backend running

## ⚡ Quick Start

### 1. Clone the repository

git clone https://github.com/yourusername/genz-messenger-frontend.git
cd genz-messenger-frontend


### 2. Install dependencies


npm install

or
yarn install


### 3. Configure environment
Create a `.env` file:


REACT_APP_API_URL=http://localhost:8080
PORT=3000



### 4. Start development server

npm start

or
yarn start


The app will open at `http://localhost:3000`

## 🎨 UI Components

### Authentication
- Login/Register forms with validation
- JWT token management
- Protected routes

### Chat Interface
- Room list sidebar
- Message history with pagination
- Real-time message updates
- Media upload and preview

### Responsive Design
- Mobile-friendly layout
- Touch-optimized interactions
- Dark theme with cyberpunk aesthetics

## 🔧 Configuration

### Multiple Backend Instances
Configure different backend URLs for testing:

// For testing with multiple backend instances
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Dynamic port-based routing
if (window.location.port === "3000") {
backendPort = 8081;
} else if (window.location.port === "3001") {
backendPort = 8082;
}


### WebSocket Configuration

// WebSocket connection with authentication
const connectWebSocket = (onConnect, onError) => {
const socket = new SockJS(${API_BASE}/ws);
const stompClient = Stomp.over(socket);

stompClient.connect(
{ Authorization: Bearer ${token} },
onConnect,
onError
);
};


## 🏗️ Project Structure

src/
├── components/ # Reusable UI components
│ ├── auth/ # Authentication components
│ ├── chat/ # Chat-related components
│ └── ui/ # Basic UI components
├── contexts/ # React contexts
├── hooks/ # Custom React hooks
├── services/ # API and WebSocket services
├── styles/ # CSS and styling
└── utils/ # Helper functions



## 🎯 Key Features

### Real-time Messaging

// Subscribe to room messages
const { sendMessage, connected } = useWebSocket(roomId, (message) => {
setMessages(prev => [...prev, message]);
});

// Send message
const handleSendMessage = (content) => {
sendMessage(roomId, { content });
};


### Multi-instance Testing

// Support for testing with multiple backend instances
const backendPort = window.location.port === "3000" ? 8081 : 8082;
const API_BASE = http://localhost:${backendPort}/api;


## 🚀 Deployment

### Build for production
npm run build

or
yarn build


### Deploy to Netlify/Vercel
Build files will be in the 'build' directory
Configure your deployment platform to serve from this directory
## 🧪 Testing

### Run tests
npm test

or
yarn test

### E2E Testing

npm run cypress

or
yarn cypress


## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-optimized interactions
- PWA support for mobile installation
- Offline message queuing

## 🎨 Theming

The app features a cyberpunk-inspired theme with:
- Glassmorphism effects
- Neon color palette
- Smooth animations
- Dark mode by default

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


