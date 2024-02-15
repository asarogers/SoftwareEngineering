import socket

#                  ipv4             tcp
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# pass tuple of ip and port we wish to connect to
        #   ip                  port
# s.connect(("192.168.1.209", 1234))
#s.connect((socket.gethostname(), 1234))
s.connect(("192.168.104.34", 1234))
#socket sends and recieves data

#how much data would we like to recieve at once?
msg = s.recv(1024)

print(msg.decode("utf-8"))

if msg:
    s.send(bytes("more data","utf-8"))


