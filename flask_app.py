from flask import *
import uuid
import time
import threading
from random import randint, random

app = Flask(__name__)
positions = {}
nonces = {}
from random import randint, random

@app.route('/')
def hello():
    return render_template('index.html')

def clean_positions():
    current_time = int(time.time()*1000000)
    keys_to_remove = [key for key, val in positions.items() if current_time - val['timestamp'] > 15e6]
    for key in keys_to_remove:
        del positions[key]
        del nonces[key]

@app.route('/connect')
def connect():
    unique_id = str(uuid.uuid4())
    nonce = str(uuid.uuid4())
    nonces[unique_id] = nonce

    # Choose a new position that is not within 32 units of any other
    position_assigned = False
    while not position_assigned:
        x_new = round((randint(0, 1000) // 32) * 32)
        y_new = round((randint(0, 1000) // 32) * 32)
        position_assigned = True
        for pos in positions.values():
            if abs(pos['x'] - x_new) <= 32 and abs(pos['y'] - y_new) <=32:
                position_assigned = False
                break
    positions[unique_id] = {'x': x_new, 'y': y_new, 'timestamp': int(time.time()*1000000)}

    return jsonify({'unique_id': unique_id, 'nonce': nonce, 'x': x_new, 'y': y_new})

@app.route('/set_position')
def set_position():
    unique_id = request.args.get('unique_id')
    nonce = request.args.get('nonce')
    x = request.args.get('x')
    y = request.args.get('y')


    if unique_id not in nonces or nonces[unique_id] != nonce:
        return "Invalid unique ID or nonce", 400

    past_x=positions[unique_id]["x"]
    past_y=positions[unique_id]["y"]

    try:
        x = round(int(x) / 32) * 32
        y = round(int(y) / 32) * 32
    except ValueError:
        return "x and y must be integers", 400

    if abs(past_x-x)>32 or abs(past_y-y)>32:
        return "you have gone too far!!!", 400


    for uuid, pos in positions.items():
        if uuid != unique_id and (abs(pos['x'] - x) <= 32 and abs(pos['y'] - y) <= 32):
            return "Position too close to another player", 403

    positions[unique_id] = {'x': x, 'y': y, 'timestamp': int(time.time()*1000000)}
    return "Position set successfully"

@app.route('/get_positions')
def get_positions():
    unique_id = request.args.get('unique_id')
    nonce = request.args.get('nonce')
    if unique_id not in nonces or nonces[unique_id] != nonce:
        return "Invalid unique ID or nonce", 400
    current_time = int(time.time()*1000000)
    positions[unique_id]["timestamp"]=current_time
    clean_positions()
    return jsonify(positions)

if __name__ == '__main__':
    app.run(debug=True)