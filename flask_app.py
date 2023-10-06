# from flask import Flask, send_from_directory
from flask import *
import random

app = Flask(__name__,static_folder="static")
app.secret_key = 'wowcool88'

@app.route('/')
def serve_home():
    return send_from_directory('static', 'HelloThere.html')

@app.route('/homepage')
def serve_homepage():
    return send_from_directory('static', 'BiositeHomepage.html')

@app.route('/about')
def serve_about():
    return send_from_directory('static', 'BiositeAboutMe.html')

@app.route('/schedule')
def serve_schedule():
    return send_from_directory('static', 'BiositeSchedule.html')

@app.route('/favorite')
def serve_favorite():
    return send_from_directory('static', 'BiositeFavoriteWebsites.html')

@app.route('/other')
def serve_other():
    return send_from_directory('static', 'BiositeOther.html')

@app.route('/bad')
def serve_bad():
    return send_from_directory('static', 'BadCSS.html')

@app.route('/good')
def serve_good():
    return send_from_directory('static', 'CSS Zen Garden_ The Beauty of CSS Design.html')

@app.route('/valid')
def serve_valid():
    return send_from_directory('static', 'HelloThere.html')

mascots=["elmo", "barney", "mario"]

@app.route('/quiz')
def quiz():
    if request.method == "GET" and "quiz" in request.args:
        num = int(request.args['quiz'])
        print(num)
        if num == 1:
            session["device"] = request.args["device"]
        elif num == 2:
            session["amount"]=request.args["amount"]
        elif num == 3:
            session["price"]=request.args["price"]
        elif num == 4:
            session["color"]=request.args["color"]
        elif num == 5:
            session["multiplayer"]=request.args["multiplayer"]
        elif num == 6:
            session["frequency"]=request.args["frequency"]
        elif num == 7:
            session["victory"]=request.args["victory"]
        elif num == 8:
            session["completion"]=request.args["completion"]
        elif num == 9:
            session["LoL"]=request.args["LoL"]
        print(session.items())
        return render_template(f'form{num+1}.html',**request.args)
    return render_template('form1.html')


@app.route('/passed')
def passed():
    return render_template('passed.html')

@app.route('/game')
def serve_game():
    return send_from_directory('static', 'Game.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4208)