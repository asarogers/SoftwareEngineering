import socketio

# Create a Socket.IO client instance
sio = socketio.Client()

# Define event handlers
@sio.event
def connect():
    print('Connected')
    sio.emit('client_message', 'Hello from Python')

@sio.event
def connect_error():
    print('Connection failed')

@sio.event
def disconnect():
    print('Disconnected')

@sio.event
def server_message(data):
    print('Received message:', data)
    # Send more data if needed
    sio.emit('more_data', 'more data')

# Connect to the server
sio.connect('http://192.168.1.229:1234')

# Keep the connection alive
sio.wait()
