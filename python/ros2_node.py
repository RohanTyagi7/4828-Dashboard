import rclpy
from std_msgs.msg import String

data = ""
already_run = False

def callback(msg):
    global data
    data = msg.data

def main(args=None):
    # make sure this is only run once
    global already_run
    if already_run:
        return
    else:
        already_run = True
        rclpy.init(args=args)      
        node = rclpy.create_node('my_subscriber')
        sub = node.create_subscription(String, '/dashboard_data', callback, 10)
        rclpy.spin(node)

        node.destroy_node()
        rclpy.shutdown()