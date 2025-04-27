const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve frontend files
app.use(express.static('public'));

// Chatbot keyword responses
const chatbotResponses = {
  hello: 'Hi! How can I help you today?',
  help: 'I can assist you with anything. Just ask!',
  time: () => `The current time is ${new Date().toLocaleTimeString()}`
};

io.on('connection', (socket) => {
  console.log('🟢 New user connected');

  // Join a chat room
  socket.on('join room', (room) => {
    socket.join(room);
    socket.data.room = room; // Store room info on socket
    console.log(`User joined room: ${room}`);
  });

  // Handle chat messages
  socket.on('chat message', ({ message, username }) => {
    const room = socket.data.room || 'general';
    const lower = message.toLowerCase();

    // Bot response check
    if (chatbotResponses[lower]) {
      const response =
        typeof chatbotResponses[lower] === 'function'
          ? chatbotResponses[lower]()
          : chatbotResponses[lower];
      io.to(room).emit('chat message', `🤖 Chatbot: ${response}`);
    } else {
      io.to(room).emit('chat message', `${username}: ${message}`);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
app.use(express.static('public'));
