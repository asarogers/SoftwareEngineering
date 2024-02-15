const io = require('socket.io-client');

function connectToServer() {

  // server.js
const io = require('socket.io')(); // Import socket.io and initialize a server instance

// Event listener for connection
io.on('connection', (socket) => {
  console.log('Client connected');

  // Event listener for receiving messages from client
  socket.on('client_message', (data) => {
    console.log('Received message from client:', data);
    // Send more data if needed
    socket.emit('server_message', 'more data');
  });

  // Send initial message to the client upon connection
  socket.emit('server_message', 'Hello from server');

  // Event listener for disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server on port 1234
io.listen(1234);
console.log('Server listening on port 1234');

}

// Export the function
module.exports = connectToServer;
