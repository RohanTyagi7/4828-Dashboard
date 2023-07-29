import ros2_node
import time 
time = time.time()
runmin = 5
ros2_node.main()
while time < time + 1000*60*runmin:
    print(str(time) + ":    " + ros2_node.data)