const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this in production for security
    methods: ["GET", "POST"]
  }
});

// When a client connects
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for the "chatMessage" event from the client
  socket.on('chatMessage', (msg) => {
    console.log(`Received message: ${msg}`);
    // Echo the message back to the same client only
    socket.emit('message', msg);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server on port 3001 or the port specified in environment variables
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
