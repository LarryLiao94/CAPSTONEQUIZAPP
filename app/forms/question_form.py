from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, StringField, SubmitField)
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
    category_id = IntegerField('Category ID', coerce=int, validators=[DataRequired()])
    question_text = StringField('Question', validators=[DataRequired()])
    submit = SubmitField('Submit')
