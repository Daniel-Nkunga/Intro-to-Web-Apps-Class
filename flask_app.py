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

# def quiz():
#     num = request.args.get("quiz", None) 
#     if num is None:
#         return redirect(url_for("quiz", quiz=1))
#     num = int(num) 
#     if num >= 1 and num <= 8: 
#         next_question = num + 1
#         return redirect(url_for("quiz", quiz=next_question))
#     elif num == 9:
#         return "You have completed the quiz. Thank you!"
#     else: 
#         return "Invalid quiz question number."
    
@app.route('/quiz', methods=['GET'])
def quiz():
    num = session.get("quiz", 1)  # Get the current question number from the session or default to 1

    if num >= 1 and num <= 8:  # Assuming you have questions from 1 to 8
        return send_from_directory('static', f'question{num}.html')
    elif num == 9:
        return "You have completed the quiz. Thank you!"
    else:
        return "Invalid quiz question number."

@app.route('/submit', methods=['POST'])
def submit():
    # Process the submitted answer here and determine the next question number
    # For example, you can check the submitted answer and increment the question number

    num = session.get("quiz", 1)  # Get the current question number from the session or default to 1
    if num < 8:  # Assuming you have questions from 1 to 8
        num += 1  # Go to the next question

    session["quiz"] = num  # Update the session with the new question number

    return redirect(url_for("quiz"))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4208)