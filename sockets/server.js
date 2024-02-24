const SocketServer = {
  io: null, // Reference to the socket.io instance
  connectedClients: new Map(), // Map to store connected clients

  startServer: () => {
    const io = require('socket.io')();
    SocketServer.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected');
      SocketServer.connectedClients.set(socket.id, socket); // Store the connected client

      socket.on('client_message', (data) => {
        console.log('Received message from client:', data);
        socket.emit('server_message', 'more data');
      });

      socket.emit('server_message', 'Hello from server');

      socket.on('disconnect', () => {
        console.log('Client disconnected');
        SocketServer.connectedClients.delete(socket.id); // Remove the disconnected client
      });
    });

    io.listen(1234, { host: "0.0.0.0" });
    console.log(io.httpServer.address());
    console.log('Server listening on port 1234');
  },

  updateCoordinates: (req, res) => {
    console.log("this is the data that needs to be send", req.body)
    // Loop through connected clients and send a message
    for (const [socketId, socket] of SocketServer.connectedClients.entries()) {
      socket.emit('server_message', req.body); // Assuming req.body contains coordinates
    }
    res.send("Message sent to connected clients");
  }
};

module.exports = SocketServer;
