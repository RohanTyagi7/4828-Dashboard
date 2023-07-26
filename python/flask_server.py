import flask
from flask import jsonify
import ros2_node

app = flask.Flask(__name__)

run_already = False

@app.route('/')
def start():
    global run_already
    if not run_already:
        ros2_node.main()
        run_already = True
    return jsonify('Server is running')

@app.route('/data')
def getRos2Data():
    return jsonify(ros2_node.data)

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)