  const net = require("net");
  const serverAddress = "192.168.1.229";
  const port =1234;
  
  async  function sendCommand(req, res){
    const {command} = req.body
  
    const socket = net.createConnection({host: serverAddress, port:port}, ()=>{
      console.log("connected to server!");
  
      socket.write(command.label)
  
      socket.end();
    })
  
    socket.on("data", (data)=>{
      console.log(`Recieved data from server: ${data}`)
      res.status(200)
    })
  
    // Handle the connection being closed
  socket.on('end', () => {
    console.log('Connection closed by the server');
  });
  
  // Handle errors
  socket.on('error', (err) => {
    console.error(`Error: ${err.message}`);
  });
  
   console.log("sending")
  
    res.status(200)
  }
  
  module.exports = {sendCommand: sendCommand}
  


