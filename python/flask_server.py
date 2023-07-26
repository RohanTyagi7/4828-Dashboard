import flask
from flask import jsonify, request, make_response
from flask_cors import CORS, cross_origin
#import ros2_node

app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

run_already = False

@app.route('/')
def start():
    global run_already
    if not run_already:
        #ros2_node.main()
        run_already = True
    return jsonify('Server is running')

@app.route('/data')
def getRos2Data():
    #result = ros2_node.data
    result = "hello"
    return (jsonify(result))
    
    

if __name__ == '__main__':
    app.run(host='localhost', port=4000, debug=True)
