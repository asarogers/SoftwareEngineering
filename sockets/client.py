import socketio
import time

# Create a Socket.IO client instance
sio = socketio.Client()


# Define a function to send location every 3 seconds if connected
def send_location():
    if sio.connected:
        lat = "34.78254556615218"
        long = "-86.56983030137167"
        coordinates = {'latitude': lat, 'longitude': long}
        sio.emit('confirm_robot_started', coordinates)

# Define event handlers
@sio.event
def connect():
    print('Connected to server')
    sio.emit('client_connected', 'Connection established with client')

@sio.event
def connect_error():
    print('Connection failed')

@sio.event
def disconnect():
    print('Disconnected')

@sio.event
def server_message(data):
    print('Message from server:', data)

@sio.event
def start_robot(data):
    print(data)

    # Tell the robot to move towards the new pickup location

    # Tell the website the robot has received the start command and send current coordinates
    if sio.connected:
        lat = "34.78254556615218"
        long = "-86.56983030137167"
        coordinates = {'latitude': lat, 'longitude': long, "code": 200}
        sio.emit('confirm_robot_started', coordinates)

@sio.event
def return_robots_gps_coordinates(data):
    # Send the new coordinates
    if sio.connected:
        lat = 34.78254556615218
        long = -86.56983030137167
        coordinates = {'latitude': lat, 'longitude': long, "code": 200}
        sio.emit('send_robots_current_gps_coordinates', coordinates)


# Connect to the server
sio.connect('http://192.168.50.34:1234')

sio.wait()
