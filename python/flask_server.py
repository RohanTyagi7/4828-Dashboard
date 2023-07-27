import flask
from flask import jsonify, request, make_response
from flask_cors import CORS, cross_origin
import ros2_node

app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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
    result = ros2_node.data
    resultArr = str(result.split('|'))
    jsonObj = {
        "fieldOriented": bool(resultArr[0]),
        "navx": float(resultArr[1]),
        "joystick": resultArr[2],
        "autoTurn": resultArr[3],
        "slowMode": bool(resultArr[4]),
        "profile": resultArr[5],
        "auton": resultArr[6],
        "controlsConnected": bool(resultArr[7]),
        "led": resultArr[8],
        "swerve": {
            "frontLeft": {
                "speed": float(resultArr[9]),
                "direction": float(resultArr[13]),
                "temperature": float(resultArr[17])
            },
            "frontRight": {
                "speed": float(resultArr[10]),
                "direction": float(resultArr[14]),
                "temperature": float(resultArr[18])
            },
            "backLeft": {
                "speed": float(resultArr[11]),
                "direction": float(resultArr[15]),
                "temperature": float(resultArr[19])
            },
            "backRight": {
                "speed": float(resultArr[12]),
                "direction": float(resultArr[16]),
                "temperature": float(resultArr[20])
            },
        },
        "airTank": float(resultArr[21]),
        "intakePiston": {
            "state": bool(resultArr[22].substring(0,resultArr[22].index('/'))),
            "value": float(resultArr[22].substring(resultArr[22].index('/')+1))
        },
        "elevatorSliderPiston": {
            "state": bool(resultArr[23].substring(0,resultArr[22].index('/'))),
            "value": float(resultArr[23].substring(resultArr[22].index('/')+1))
        },
        "elevatorPivotPiston": {
            "state": bool(resultArr[24].substring(0,resultArr[22].index('/'))),
            "value": float(resultArr[24].substring(resultArr[22].index('/')+1))
        },
        "elevatorPosition": {
            "state": bool(resultArr[25].substring(0,resultArr[22].index('/'))),
            "value": float(resultArr[25].substring(resultArr[22].index('/')+1))
        },
        "battery": float(resultArr(26)),
        "controller": {
            "button": {
                "b0": bool(int(resultArr(27))),
                "b1": bool(int(resultArr(28))),
                "b2": bool(int(resultArr(29))),
                "b3": bool(int(resultArr(30))),
                "b4": bool(int(resultArr(31))),
                "b5": bool(int(resultArr(32))),
                "b6": bool(int(resultArr(33))),
                "b7": bool(int(resultArr(34))),
                "b8": bool(int(resultArr(35))),
                "b9": bool(int(resultArr(36))),
                "b10": bool(int(resultArr(37))),
                "b11": bool(int(resultArr(38))),
                "b12": bool(int(resultArr(39))),
                "b13": bool(int(resultArr(40)))
            },
            "axis": {
                "a0": float(resultArr(41)),
                "a1": float(resultArr(42)),
                "a2": float(resultArr(43)),
                "a3": float(resultArr(44)),
                "a4": float(resultArr(45)),
                "a5": float(resultArr(46))
            }
        }
    }
    return (jsonObj)
    
    

if __name__ == '__main__':
    app.run(host='localhost', port=4000, debug=True)
