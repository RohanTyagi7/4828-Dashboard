import ros2_node
import time 
#import requests
#x=requests.get("http://localhost:4000/")
#print(x)
#ros2_node.main()
for x in  range(2000):
    times = time.time()
    print(str(times) + ":    " + ros2_node.data)
    time.sleep(1)