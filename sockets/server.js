const SocketServer = {
  io: null, // Reference to the socket.io instance
  connectedClients: new Map(), // Map to store connected clients
  res: null, // Response object

  startServer() {
    const io = require('socket.io')();
    SocketServer.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected');
      SocketServer.connectedClients.set(socket.id, socket); // Store the connected client

      socket.on('disconnect', () => {
        console.log('Client disconnected');
        SocketServer.connectedClients.delete(socket.id); // Remove the disconnected client
      });

      // Print first msg from client upon connection
      socket.on("client_connected", (data) => {
        console.log(data);
      });

      // Confirm the robot has started
      socket.on('confirm_robot_started', (data) => {
        console.log('Message from client:', data);

        // Send data to frontend if response object exists
        if (SocketServer.res) {
          SocketServer.res.json({...data});
          SocketServer.res = null; // Reset res
        }
      });

      // Send robot's current location to the frontend
      socket.on("send_robots_current_gps_coordinates", (data) => {
        console.log('Sending coordinates:', data);

        // Send data to frontend if response object exists
        if (SocketServer.res) {
          SocketServer.res.json({...data});
          SocketServer.res = null; // Reset res object after sending the response
        }
      });
    });

    io.listen(1234, { host: "0.0.0.0" });
    console.log('Server listening on port 1234');
  },

  startRobot(req, res) {
    console.log("This is the data that needs to be sent", req.body);
    // Loop through connected clients and send a message
    for (const [socketId, socket] of SocketServer.connectedClients.entries()) {
      socket.emit('start_robot', req.body); // Assuming req.body contains coordinates
    }
    // Store the response object to send back to the frontend when coordinates are received
    SocketServer.res = res;
  },

  retrieveGPSCoordinates(req, res) {
    console.log("called")
    // Emit to all connected clients
    for (const [socketId, socket] of SocketServer.connectedClients.entries()) {
      socket.emit('return_robots_gps_coordinates', req.body); // Assuming req.body contains coordinates
    }
    // Store the response object to send back to the frontend when coordinates are received
    SocketServer.res = res;
  }

};





module.exports = SocketServer;
