import flask
from flask import jsonify, request, make_response
from flask_cors import CORS, cross_origin
import ros2_node
import traceback
import json
import rticonnextdds_connector as rti
import os
import subprocess
import inspect
# from flask_limiter import Limiter
# from flask_limiter.util import get_remote_address

app = flask.Flask(__name__)
CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
# allowed_origins = ['http://localhost:3000/']
# cors = CORS(app, origins=allowed_origins)

# limiter = Limiter(
#     app=app,
#     key_func=get_remote_address,
#     default_limits=["200 per day", "50 per hour"]
# )

curr_path = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
xml_path = os.path.join(curr_path, "../src/xml/rticonf.xml")

run_already = False

auton_val = "None"
profile_val = "workshop"
led_val = "off"
joystick_val = "xbox"

def bool(string):
    return string == "True" or string == 1

@app.route('/')
# @limiter.limit("1 per minute")
def start():
    global run_already
    if not run_already:
        subprocess.call("gnome-system-monitor")
        os.system("gnome-system-monitor")
        ros2_node.main()
        publish()
        run_already = True
    return jsonify('Server is running')

@app.route('/data', methods=['GET'])
# @limiter.exempt
def getRos2Data():
    result = ros2_node.data
    if len(result) < 5:
        return {"text": "Error"}
    #result = "False|-0.0|xbox|off|False|Competition|High Place Auton|True|off|130|-0.0|0.0|-0.0|0.0|44.99999999999999|-45.0|-45.00000000000001|45.0|0.0|0.0|0.0|0.0|nan|True/-0.9|True/0.3|True/0.07|0.0|12.0|0|0|0|0|0|0|0|0|0|0|0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|"
    resultArr = str(result).split('|')
    jsonObj = [{
        "fieldOriented": bool(resultArr[0]),
        "navx": float(((180 - float(resultArr[1])*-1) + 180)%360),
        "joystick": resultArr[2],
        "autoTurn": resultArr[3],
        "slowMode": bool(resultArr[4]),
        "profile": resultArr[5],
        "auton": resultArr[6].replace('Auton', '').strip(),
        "controlsConnected": bool(resultArr[7]),
        "led": resultArr[8],
        "timeLeft": float(resultArr[9]),
        "swerve": {
            "frontLeft": {
                "speed": float(resultArr[10]),
                "direction": float(resultArr[14]),
                "temperature": float(resultArr[18])
            },
            "frontRight": {
                "speed": float(resultArr[11]),
                "direction": float(resultArr[15]),
                "temperature": float(resultArr[19])
            },
            "backLeft": {
                "speed": float(resultArr[12]),
                "direction": float(resultArr[16]),
                "temperature": float(resultArr[20])
            },
            "backRight": {
                "speed": float(resultArr[13]),
                "direction": float(resultArr[17]),
                "temperature": float(resultArr[21])
            },
        },
        "airTank": str(resultArr[22]),
        "intakePiston": {
            "state": bool(resultArr[23].split("/")[0]),
            "value": float(resultArr[23].split("/")[1]),
        },
        "elevatorSliderPiston": {
            "state": bool(resultArr[24].split("/")[0]),
            "value": float(resultArr[24].split("/")[1]),
        },
        "elevatorPivotPiston": {
            "state": bool(resultArr[25].split("/")[0]),
            "value": float(resultArr[25].split("/")[1]),
        },
        "elevatorPosition": float(resultArr[26]),
        "battery": float(resultArr[27]),
        "controller": {
            "button": {
                "b0": bool(float(resultArr[28])),
                "b1": bool(float(resultArr[29])),
                "b2": bool(float(resultArr[30])),
                "b3": bool(float(resultArr[31])),
                "b4": bool(float(resultArr[32])),
                "b5": bool(float(resultArr[33])),
                "b6": bool(float(resultArr[34])),
                "b7": bool(float(resultArr[35])),
                "b8": bool(float(resultArr[36])),
                "b9": bool(float(resultArr[37])),
                "b10": bool(float(resultArr[38])),
            },
            "axis": {
                "a0": float(resultArr[39]),
                "a1": float(resultArr[40]),
                "a2": float(resultArr[41]),
                "a3": float(resultArr[42]),
                "a4": float(resultArr[43]),
                "a5": float(resultArr[44]),
                "a6": float(resultArr[45]),
                "a7": float(resultArr[46]),
            }
        }
    }]
    if(jsonObj[0]['airTank']=="nan"):
        jsonObj[0]['airTank'] = 0
    
    # resp = flask.make_response(json.dumps(jsonObj))
    # resp.headers['Access-Control-Allow-Origin'] = '*'
    # resp.headers['X-Content-Type-Options'] = 'nosniff'
    
    return json.dumps(jsonObj)
    
@app.route('/profile')
def profile():
    type = request.args.get('type')
    try:
        global profile_val
        profile_val = str(type)
        publish()
        return jsonify('200 OK')
    except:
        return jsonify('Error setting profile to ' + type)
    
@app.route('/auton/')
def auton():
    type = request.args.get('type')
    try:
        global auton_val
        auton_val = str(type)
        publish()
        return jsonify('200 OK')
    except:
        return jsonify('Error setting auton to ' + type)
    
@app.route('/led')
def led():
    type = request.args.get('type')
    try:
        global led_val
        led_val = type
        publish()
        return jsonify('200 OK')
    except:
        return jsonify('Error setting led to ' + type)
    
@app.route('/joystick')
def joystick():
    type = request.args.get('type')
    try:
        global joystick_val
        joystick_val = type
        publish()
        return jsonify('200 OK')
    except:
        return jsonify('Error setting joystick to ' + type)
    
def publish():
    ros2_node.out = f"{auton_val}|{profile_val}|{led_val}|{joystick_val}"
    

if __name__ == '__main__':
    app.run(port=4000, debug=True, threaded=True)
