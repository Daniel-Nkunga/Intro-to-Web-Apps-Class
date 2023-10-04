# from flask import Flask, send_from_directory
from flask import *

app = Flask(__name__)
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

# @app.route('/quiz', methods=['GET'])
# def quiz():
#     # Get the question number from the URL query parameter
#     question_number = request.args.get('question_number', type=int)
    
#     # Load the corresponding question HTML file
#     question_filename = f'questions/question{question_number}.html'

#     try:
#         with open(question_filename, 'r') as question_file:
#             question_content = question_file.read()
#     except FileNotFoundError:
#         return "Question not found"

#     return render_template('quiz.html', question_content=question_content)

@app.route('/passed')
def passed():
    return render_template('passed.html')

@app.route('/game')
def serve_game():
    return send_from_directory('static\Game', 'Game.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4208)