from flask_wtf import FlaskForm
from wtforms import (TextAreaField, FormField, IntegerField, StringField, SubmitField, FieldList)
from wtforms.validators import DataRequired
from .choice_form import ChoiceForm

class QuestionForm(FlaskForm):
    category_id = IntegerField('Category ID')
    quiz_id = IntegerField('Quiz ID')
    question_text = StringField('Question', validators=[DataRequired()])
    choices = FieldList(FormField(ChoiceForm))
