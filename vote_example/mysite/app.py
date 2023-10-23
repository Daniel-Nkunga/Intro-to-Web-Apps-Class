from flask import Flask, jsonify, render_template, request, redirect, url_for
import firebase_admin
from firebase_admin import credentials, firestore
import html

# Initialize Flask app
app = Flask(__name__)

# Firebase setup
cred = credentials.Certificate("../creds.json")  # Replace with the path to your Firebase Admin SDK key
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/vote', methods=['POST'])
def vote():
    animal = request.form.get('animal')
    if animal:
        vote_ref = db.collection('votes').add({
            'animal': animal,
            'timestamp': firestore.SERVER_TIMESTAMP  # Assuming you might want a timestamp for each vote
        })
        print(vote_ref[-1].id)
    return redirect(url_for('results'))


@app.route('/check/<doc_id>', methods=['GET'])
def check_id(doc_id):
    doc_ref = db.collection('votes').document(doc_id)
    doc = doc_ref.get()
    if doc.exists:
        return jsonify({"exists": "yes"})
    else:
        return jsonify({"exists": "no"})


@app.route('/results')
def results():
    votes = {}
    docs = db.collection('votes').stream()
    for doc in docs:
        animal = doc.to_dict().get('animal')
        votes[animal] = votes.get(animal, 0) + 1
    return render_template('results.html', votes=votes)

@app.route('/user_info')
def user_info():
    out=f"<p>ip:{request.remote_addr}</p>"
    for key,value in request.headers:
        out+=f"<p>{key}:{value}</p>"
    return out


if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port=80)
