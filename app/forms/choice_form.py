from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, StringField, SubmitField, FieldList, BooleanField)
from wtforms.validators import DataRequired

class ChoiceForm(FlaskForm):
    choice = StringField('Choice', validators=[DataRequired()])
    is_correct = BooleanField('Is Correct')
