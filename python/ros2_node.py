import networktables
from networktables import NetworkTables, NetworkTable

send_nt : NetworkTable = None
recieve_nt : NetworkTable = None

def initNetworkTables():
    global send_nt
    global recieve_nt
    if send_nt == None or recieve_nt == None:
        NetworkTables.initialize(server="localhost")
        recieve_nt = NetworkTables.getTable("Dashboard")
        send_nt = NetworkTables.getTable("Dashboard_Sub")
    return (send_nt, recieve_nt)

def getData():
    if recieve_nt == None:
        initNetworkTables()
    return recieve_nt.getString("dashboard", "None")

def putData(data):
    if send_nt == None:
        initNetworkTables()
    send_nt.putString("dashboard", data)

def main(args=None):
    # make sure this is only run once
    global send_nt
    global recieve_nt
    if send_nt or recieve_nt == None:
        send_nt, recieve_nt = initNetworkTables()

