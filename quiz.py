from flask_wtf import *
from wtforms import *
from wtforms.validators import *
from random import *

class CorrectAnswer(object):
    def __init__(self, answer):
        self.answer = answer

def __call__(self, form, field):
    message = 'Incorrect answer'

if field.data != self.answer:
    raise ValidationError(message)

class PopQuiz(Form):
    class Meta:
        csrf = False
    q1 = RadioField(
        "The answer to question one is False.",
        choices=[('True', 'True'), ('False', 'False')],
        validators=[CorrectAnswer('False')]
    )