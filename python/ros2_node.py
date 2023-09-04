import networktables
from networktables import NetworkTables, NetworkTable

nt : NetworkTable = None

def initNetworkTables():
    global nt
    if nt == None:
        NetworkTables.initialize(server="localhost")
        nt = NetworkTables.getTable("Dashboard")
    return nt

def getData():
    if nt == None:
        initNetworkTables()
    return nt.getString("dashboard", "None")

def putData(data):
    if nt == None:
        initNetworkTables()
    nt.putString("dashboard_sub", data)

def main(args=None):
    # make sure this is only run once
    global nt
    if nt == None:
        initNetworkTables()

