from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, StringField, SubmitField)
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
    category_id = IntegerField('Category ID')
    question_text = StringField('Question')
    