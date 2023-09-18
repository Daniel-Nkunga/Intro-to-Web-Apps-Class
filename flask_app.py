# from flask import Flask, send_from_directory
from flask import *

app = Flask(__name__)
app.secret_key = '88'

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

questions = [
    'question1.html',
    'question2.html',
    'question3.html',
    'question4.html',
    'question5.html',
    'question6.html',
    'question7.html',
    'question8.html',
    'question9.html',
]

@app.route('/quiz', methods=['GET'])
def quiz():
    num = request.args.get("quiz", None)
    if num is None:
        return redirect(url_for("quiz", quiz=1))
    num = int(num)
    if num == 1:
        return send_from_directory('static', 'question1.html')
    elif num == 2:
        return send_from_directory('static', 'question2.html')
    elif num == 3:
        return send_from_directory('static', 'question3.html')
    elif num == 4:
        return send_from_directory('static', 'question4.html')
    elif num == 5:
        return send_from_directory('static', 'question5.html')
    elif num == 6:
        return send_from_directory('static', 'question6.html')
    elif num == 7:
        return send_from_directory('static', 'question7.html')
    elif num == 8:
        return send_from_directory('static', 'question8.html')
    elif num == 9:
        return send_from_directory('static', 'question9.html')
    else: 
        return "Invalid quiz question number."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4208)