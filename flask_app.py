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
        if num == 9:
            return redirect('/final')

        return render_template(f'form{num+1}.html', **request.args)
    
    return render_template('form1.html')

@app.route('/final')
def final():
    # Retrieve the data stored in the session
    playstyle = 0
    gamer = 0
    gaymer = False
    device = session.get("device")
    amount = session.get("amount")
    price = session.get("price")
    color = session.get("color")
    multiplayer = session.get("multiplayer")
    frequency = session.get("frequency")
    victory = session.get("victory")
    completion = session.get("completion")
    LoL = session.get("LoL")
    if(device == "PC"):
        playstyle += 2
        gamer += 2
    if(device == "Mobile"):
        playstyle -= 1
        gamer += 1
    if(device == "Console"):
        playstyle += 1
        gamer += 2
    if(device == "Retro"):
        playstyle += 1
        gamer += 1
    if(amount == "0-5 Hours"):
        playstyle += 1
        gamer += 0
    if(amount == "6-15 Hours"):
        playstyle += 1
        gamer += 1
    if(amount == "16-25 Hours"):
        playstyle += 2
        gamer += 1
    if(amount == "26+ Hours"):
        playstyle += 2
        gamer += 1
    if(price == "Free"):
        playstyle += 1
        gamer += 1
    if(price == "$1-$30"):
        playstyle += 1
        gamer += 1
    if(price == "$31-$60"):
        playstyle += 2
        gamer += 1
    if(price == "$60+"):
        playstyle += 3
        gamer += 2
    if(color == "RAINBOW"):
        playstyle += 2
        gamer += 2
        gaymer = True
    if(color != "RAINBOW"):
        playstyle += 3
        gamer += 1
    if(multiplayer == "Singleplayer"):
        playstyle += 2
        gamer += 1
    if(multiplayer == "Monthly"):
        playstyle += 1
        gamer += 2
    if(multiplayer == "Weekly"):
        playstyle += 2
        gamer += 1
    if(multiplayer == "Daily"):
        playstyle += 3
        gamer += 2
    if(frequency == "Offline"):
        playstyle += 1
        gamer += 1
    if(frequency == "Monthly"):
        playstyle += 2
        gamer += 1
    if(frequency == "Weekly"):
        playstyle += 2
        gamer += 2
    if(frequency == "Daily"):
        playstyle += 3
        gamer += 3
    if(victory == "for_fun"):
        playstyle -= 1
        gamer += 1
    if(victory == "rarely"):
        playstyle += 0
        gamer += 0
    if(victory == "often"):
        playstyle += 1
        gamer += 1
    if(victory == "always"):
        playstyle += 2
        gamer += 3
    if(completion == "none"):
        playstyle += 1
        gamer += 1
    if(completion == "few"):
        playstyle += 1
        gamer += 1
    if(completion == "average"):
        playstyle += 2
        gamer += 2
    if(completion == "majority"):
        playstyle += 4
        gamer += 3
    if(LoL == "innocent"):
        playstyle -= 1
        gamer -= 1
    if(LoL == "wrong"):
        playstyle += 4
        gamer += 4
    if(LoL == "right"):
        playstyle += 1
        gamer += 1
    print(gamer)
    print(playstyle)
    print(gaymer)
    # Render the final page template and pass the session data to it
    return render_template('final.html', device=device, amount=amount, price=price, color=color,
                           multiplayer=multiplayer, frequency=frequency, victory=victory,
                           completion=completion, LoL=LoL)

@app.route('/passed')
def passed():
    return render_template('passed.html')

@app.route('/game')
def serve_game():
    return send_from_directory('static', 'Game.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4208)