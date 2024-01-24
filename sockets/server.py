import socket

#                  ipv4             tcp
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(("192.168.12.223", 1234))
#socket sends and recieves data

#qeue of 5
s.listen(5)

while True:
    clientsocket, address = s.accept()
    print(f"connection from {address} has been established!")
    clientsocket.send(bytes("welcome to the server", "utf-8"))
    msg = clientsocket.recv(1024)
    print(msg.decode("utf-8"))