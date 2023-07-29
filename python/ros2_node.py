import rclpy
from std_msgs.msg import String

data = ""
out = ""

def callback(msg):
    global data
    data = msg.data

def main(args=None):
    # make sure this is only run once
    rclpy.init(args=args)      
    node = rclpy.create_node('my_subscriber')
    sub = node.create_subscription(String, '/dashboard_data', callback, 10)
    pub = node.create_publisher(String, '/dashboard_pub', 10)
    
    output_msg = String()
    
    def timer_callback():
        global out
        output_msg.data = out
        pub.publish(output_msg)
        
    timer_period = 0.1  # seconds
    timer = node.create_timer(timer_period, timer_callback)
    
    rclpy.spin(node)

    node.destroy_timer(timer)
    node.destroy_node()
    rclpy.shutdown()