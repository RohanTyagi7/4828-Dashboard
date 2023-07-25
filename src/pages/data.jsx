import * as rclnodejs from 'rclnodejs';
class Data {
  constructor() {
    rclnodejs.init().then(() => {
      this.node = new rclnodejs.createNode('dashboard')
      this.node.createSubscription('std_msgs/msg/String', 'dashboard_data', (msg) => {
        this.value = msg
        console.log("FROM DATA: ", this.value)
      })
    });
  }
}

export default Data;

/*
import * as rclnodejs from 'rclnodejs';
rclnodejs.init().then(() => {
  const node = new rclnodejs.Node('publisher_example_node');
  const publisher = node.createPublisher('std_msgs/msg/String', 'topic');
  publisher.publish(`Hello ROS 2 from rclnodejs`);
  node.spin();
});
*/