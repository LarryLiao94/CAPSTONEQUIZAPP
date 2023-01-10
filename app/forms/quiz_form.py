from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, StringField, SubmitField)
from wtforms.validators import DataRequired

class QuizForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    submit = SubmitField('Create')
