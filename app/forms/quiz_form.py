from flask_wtf import FlaskForm
from wtforms import (BooleanField, TextAreaField, IntegerField, StringField, SubmitField, FieldList, FormField)
from wtforms.validators import DataRequired
from .question_form import QuestionForm

# class ChoiceForm(FlaskForm):
#     choice = StringField('Choice Text', validators=[DataRequired()])
#     is_correct = BooleanField('Is Correct')

# class QuestionForm(FlaskForm):
#     question_text = StringField('Question Text', validators=[DataRequired()])
#     choices = FieldList(FormField(ChoiceForm))

class QuizForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    questions = FieldList(FormField(QuestionForm))
