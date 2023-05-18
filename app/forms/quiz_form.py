from flask_wtf import FlaskForm
from wtforms import (BooleanField, TextAreaField, IntegerField, StringField, SubmitField, FieldList, FormField)
from wtforms.validators import DataRequired
from .question_form import QuestionForm


class QuizForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    questions = FieldList(FormField(QuestionForm))
