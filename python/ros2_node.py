import rclpy
from std_msgs.msg import String

data = ""

def callback(msg):
    global data
    data = msg.data

def main(args=None):
    rclpy.init(args=args) 
    node = rclpy.create_node('my_subscriber')
    sub = node.create_subscription(String, 'dashboard_data', callback, 10)
    rclpy.spin(node)

    node.destroy_node()
    rclpy.shutdown()