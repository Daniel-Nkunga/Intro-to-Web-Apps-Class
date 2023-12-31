from flask import Flask
from flask import *
import random
from flask import Flask, jsonify, render_template, request, redirect, url_for
import firebase_admin
from firebase_admin import credentials, firestore
import os
import pathlib
import requests
from flask import *
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
import google.auth.transport.requests
import time
import collections
import re
import json
from pip._vendor import cachecontrol

app = Flask(__name__,static_folder="static")
app.secret_key = "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"
# os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" #REMOVE THIS WHEN YOU DEPLOY

GOOGLE_CLIENT_ID = "143525210526-jq3s8qlmh9bprh8f5m04qqfcjuhpggso.apps.googleusercontent.com"  
#client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "oath.json")  #set the path to where the .json file you got Google console is
import socket

flow = Flow.from_client_secrets_file(  
	# client_secrets_file=".gitignore/oath.json",
    client_secrets_file="oath.json",
	scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],  
	redirect_uri="https://danielnkunga.pythonanywhere.com" #FIX THIS WHEN YOU DEPLOY
	)


def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "sub" not in session:  # Authorization required
            return redirect(url_for('login'))  # Redirect to the login route
        else:
            return function(*args, **kwargs)

    return wrapper

@app.route('/login')
def login():
    authorization_url, state = flow.authorization_url()
    session['oauth_state'] = state
    return redirect(authorization_url)

@app.route('/callback')
def callback():
    flow.fetch_token(authorization_response=request.url)
    userinfo = flow.userinfo()
    session['sub'] = userinfo['sub']
    return redirect(url_for('index'))

print(os.getcwd())
print("\n\n")
# cred = credentials.Certificate("..\creds.json")  # Replace with the path to your Firebase Admin SDK key
cred = credentials.Certificate("creds.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/')
# @login_is_required  # Apply the login_is_required decorator to the index route
def index():
    return render_template('index.html')

@app.route('/add_dot', methods=['POST'])
def add_dot():
    data = request.get_json()

    if 'x' in data and 'y' in data and 'itemName' in data:
        x = data['x']
        y = data['y']
        itemName = data['itemName']
        itemDescription = data.get('itemDescription', '')  # Optional, may not be present

        # Add the dot data to the "dots" collection
        doc_ref = db.collection('dots').add({
            'x': x,
            'y': y,
            'itemName': itemName,
            'itemDescription': itemDescription,
            'timestamp': firestore.SERVER_TIMESTAMP
        })

        return jsonify({'status': 'success', 'dotId': doc_ref.id})
    else:
        return jsonify({'status': 'error', 'message': 'Invalid data format'})

@app.route('/delete_dot', methods=['POST'])
def delete_dot():
    data = request.get_json()

    if 'dotId' in data:
        dot_id = data['dotId']

        # Delete the dot from the database based on the dotId
        db.collection('dots').document(dot_id).delete()

        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'error', 'message': 'Invalid data format'})

@app.route('/get_dots')
def get_dots():
    docs = db.collection('dots').stream()
    dots = [{'id': doc.id, **doc.to_dict()} for doc in docs]
    return jsonify(dots)

@app.route('/homepage')
@login_is_required
def serve_homepage():
    return send_from_directory('static', 'Biosite/BiositeHomepage.html')

@app.route('/about')
def serve_about():
    return send_from_directory('static', 'Biosite/BiositeAboutMe.html')

@app.route('/schedule')
def serve_schedule():
    return send_from_directory('static', 'Biosite/BiositeSchedule.html')

@app.route('/favorite')
def serve_favorite():
    return send_from_directory('static', 'Biosite/BiositeFavoriteWebsites.html')

@app.route('/other')
def serve_other():
    return send_from_directory('static', 'Biosite/BiositeOther.html')

@app.route('/bad')
def serve_bad():
    return send_from_directory('static', 'BadCSS/BadCSS.html')

@app.route('/good')
def serve_good():
    return send_from_directory('static', 'CoolCSS/CSS Zen Garden_ The Beauty of CSS Design.html')

@app.route('/valid')
def serve_valid():
    return send_from_directory('static', 'HelloThere.html')

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
    #Boy, I sure do love some easy to code, hard to read, heavily unoptomized code
    #Variables
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
    #Result Value Assignment
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
    #Final Results
    print(gamer)
    print(playstyle)
    print(gaymer)
    if(gamer <= 12):
        result1 = "CASUAL"
        message1 = "Casual Gamers enjoy playing videogames, but might not play them that often. Whether that be to finding more enjoyment in other things or not having the time, Casual Gamers don't play many games in thier off times. This means the games they do play are of high value to them."
    elif(12 < gamer <= 18):
        result1 = "TRY HARD"
        message1 = "Try Hard Gamers really enjoy playing games. Though they may not be perceived as \"try hard\" in the gaming community, they definitely are among the public. They either have a wide variety of games they play or a select few that they love to death. They are always actively seeking out more games to play and enjoy gaming whenever they play."
    elif(18 < gamer <= 24):
        result1 = "COMPETITVE"
        message1 = "Competitive Gamers don't just enjoy playing games, they enjoy grinding them out. Though the idea of \"practicing\" videogames might sound ridiculous to someone outside of the gaming community. Competitve Gamers don't even bat an eye because at the end of the day, they're still gaming. Competitve Gamers always have a game they say is their favorite and a game they are playing the most at the momement. It is a rare momment when both of those games align."
    else:
        result1 = "NO LIFE"
        message1 = "No Life Gamers are considered to be try hards among the gaining community and unreasonable to anyone outside of it. Practicing is no longer for fun, its to \"git gud,\" the ultimate goal of any tryhard gamer. Some of the games they play bring out such a rage in them to the point where an outsider might ask if they're even having fun. They don't know either. At the end of the day, they will never stop gaming. Whether that's becuase they still enoy it or becuase of the sum-cost fallicy is unknown by NASA's greatest minds."
    if(gamer <= 14):
        result2 = "GAMER"
        message2 = "Gamers are you garden variety gamer. They play games from time to time and definetly have a favorite, most likely a game they play in their childhood. They might not be as into it as everyone else, but that doesn't mean they enjoy it any less."
        picture = "\static\Images\gamer.jpg"
    elif(14 < gamer <= 22):
        result2 = "HOBBIEST"
        message2 = "Hobbiest are gamers that find games to be something of value. They enjoy talking about, watching, and, most of all, playing games. Hobbiest have high ambitions when it comes to gaming. Whether that be completing thier game library (impossible), finishing their gaming backlog (impossible), or creating their own game (theoretical). Gaming means a lot to them."
    else:
        result2 = "COMPLETIONIST"
        message2 = "Completionist are gamers who take thier hobby very seriously. Though they might not achieve all the goals the Hobbiest have (because most of them are impossible), they are definetly on their way to becoming their perfect gamer."
    if(gaymer == True):
        result3 = "GAYMER B)"
        message3 = "Rainbow PC. Rainbow Controller. Rainbow Keyboard. Rainbow Lights. Rainbow Everything. These gamers know that gaming is about the looks, and they always look EBIC when gaming B)"
    else:
        result3 = ""
        message3 = ""
    # Render the final page template and pass the session data to it
    return render_template('final.html', device=device, amount=amount, price=price, color=color, multiplayer=multiplayer, frequency=frequency, victory=victory, completion=completion, LoL=LoL, result1=result1, result2=result2, result3=result3, message1=message1, message2=message2, message3=message3)

@app.route('/passed')
def passed():
    return render_template('passed.html')

@app.route('/game')
def serve_game():
    return send_from_directory('static', 'Game/FillerGame.html')

@app.route('/survey')
def serve_survey():
    if 'voted' in session:
        return redirect(url_for('results'))
    return render_template('vote.html')


@app.route('/vote', methods=['POST'])
def vote():
    fruit = request.form.get('fruit')
    escaped_fruit = html.escape(fruit)
    if escaped_fruit:
        fruit_ref = db.collection('votes').where('fruit', '==', escaped_fruit).stream()
        for doc in fruit_ref:
            doc_ref = db.collection('votes').document(doc.id)
            current_count = doc.to_dict().get('count', 0)
            doc_ref.update({
                'count': current_count + 1,
                'timestamp': firestore.SERVER_TIMESTAMP
            })
            return redirect(url_for('results'))
        vote_ref = db.collection('votes').add({
            'fruit': escaped_fruit,
            'count': 1,
            'timestamp': firestore.SERVER_TIMESTAMP
        })
        session['voted'] = True

    return redirect(url_for('results'))

@app.route('/results')
def results():
    fruits = {}
    docs = db.collection('votes').stream()
    for doc in docs:
        fruit = doc.to_dict().get('fruit')
        count = doc.to_dict().get('count', 0)
        fruit = fruit.capitalize()
        fruits[fruit] = count
    return render_template('results.html', fruits=fruits)

@app.route('/todo')
def todo():
    return render_template('list.html')

def get_subitems_for_task(task_id):
    subitems_collection = db.collection('todo_list').document(task_id).collection('subitems')
    subitems_docs = subitems_collection.stream()

    subitems = []
    for subitem_doc in subitems_docs:
        subitem = subitem_doc.to_dict()
        subitem["_id"] = subitem_doc.id
        subitems.append(subitem)

    return subitems

@app.route('/list')
def todolist():
    docs = db.collection('todo_list').stream()
    output = []
    for doc in docs:
        doc_dict = doc.to_dict()
        doc_dict["_id"] = doc.id

        # Add subitems to the data if available
        subitems = get_subitems_for_task(doc.id)
        doc_dict["subitems"] = subitems

        output.append(doc_dict)
 
    return jsonify(output)
    
@app.route('/toggle/<doc_id>')
def toggle(doc_id):
    docref = db.collection('todo_list').document(doc_id)
    doc = docref.get()
    if doc.exists:
        is_complete = doc.to_dict().get('is_complete', False)
        docref.update({"is_complete": not is_complete})
    return ""

@app.route('/add', methods=['GET'])
def add_item():
    if "item" in request.args:
        item=request.args["item"]
        db.collection('todo_list').add({
            'item': item,
            'is_complete': False,
            'timestamp': firestore.SERVER_TIMESTAMP
        })
    return ""

@app.route('/delete/<item_id>', methods=['DELETE'])
def delete_item(item_id):
    try:
        db.collection('todo_list').document(item_id).delete()
        return {"message": "Item deleted successfully"}, 200
    except Exception as e:
        return {"error": str(e)}, 500

@app.route('/addSubitem/<task_id>', methods=['GET'])
def add_subitem(task_id):
    if "subitem" in request.args:
        subitem = request.args["subitem"]
        subitems_collection = db.collection('todo_list').document(task_id).collection('subitems')
        subitems_collection.add({
            'subitem': subitem,
            'timestamp': firestore.SERVER_TIMESTAMP
        })
    return ""

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)