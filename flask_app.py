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
#     num = request.args.get("quiz", None)
#     if num is None:
#         return redirect(url_for("quiz", quiz=1))
#     num = int(num)
#     if num == 1:
#         return send_from_directory('static', 'question1.html')
#     elif num == 2:
#         return send_from_directory('static', 'question2.html')
#     elif num == 3:
#         return send_from_directory('static', 'question3.html')
#     elif num == 4:
#         return send_from_directory('static', 'question4.html')
#     elif num == 5:
#         return send_from_directory('static', 'question5.html')
#     elif num == 6:
#         return send_from_directory('static', 'question6.html')
#     elif num == 7:
#         return send_from_directory('static', 'question7.html')
#     elif num == 8:
#         return send_from_directory('static', 'question8.html')
#     elif num == 9:
#         return send_from_directory('static', 'question9.html')
#     else: 
#         return "Invalid quiz question number."

# @app.route('/quiz', methods=['GET'])
# def generate_form():
#     previtems = {
#         'item1': 'value1',
#         'item2': 'value2',
#         'quiz_question': 'What is your name?',
#     }

#     # Render a template containing your code
#     return render_template('form_template.html', previtems=previtems)

# @app.route('/example')
# def serve_example():
#     return send_from_directory('static', 'JScriptExample.html')

#Segment to be Quiz 1, Quiz 2, etc. 

#SEWARD THINGS BELOW

# @app.route('/quiz')
# def quiz():
#     if request.method == "GET" and "quiz" in request.args:
#         num = int(request.args["quiz"])
#         return render_template(f"question{num+1}.html", previousitems=request.args)
#     return render_template("question1.html")

# @app.route('/quiz')
# def quiz():
#     quiz={"title":"Ceaning Implement","1":{"Option1"}}
#     if request.method == "GET" and "quiz" in request.args:
#         num = int(request.args["quiz"])
#         return render_template(f"question.html", previousitems=request.args)
#     return render_template("question.html", question=question)

@app.route('/quiz', methods=['GET', 'POST'])
def wtf_quiz():
    form = PopQuiz()
    if form.validate_on_submit():
        return redirected(url_for('passed')) return
    render_template('quiz.html', form=form)

@app.route('/passed')
def passed():
    return render_template('passed.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4208)