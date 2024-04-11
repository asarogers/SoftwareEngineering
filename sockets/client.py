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
def return_robots_gps_coordinates(counter):
    gps = {
       "6": [34.7799225, -86.5679045],
"1": [34.779923, -86.5679145],
"2": [34.779931166666664, -86.5679145],
"3": [34.779933666666665, -86.5679045],
"4": [34.77993333333333, -86.5679045],
"5": [34.779934, -86.5679045],
"6": [34.77993466666667, -86.5678945],
"7": [34.779934833333336, -86.5678945],
"8": [34.77994, -86.5679045],
"9": [34.779938333333334, -86.5679145],
"10": [34.77994433333333, -86.5679045],
"11": [34.77994266666666, -86.5679045],
"12": [34.77994116666667, -86.5679145],
"13": [34.779916, -86.5679145],
"14": [34.779916, -86.5679045],
"15": [34.779916, -86.5679045]

    }

    try:
        if sio.connected:
            lat = gps[counter][0]
            long = gps[counter][1]
            coordinates = {'latitude': lat, 'longitude': long, "code": 200}
            sio.emit('send_robots_current_gps_coordinates', coordinates)
    except KeyError:
        # Handle the KeyError (invalid counter value) gracefully by doing nothing
        pass

# Connect to the server
sio.connect('http://192.168.1.229:1234')

sio.wait()

