from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class UserQuestionForm(FlaskForm):
    question_id = IntegerField('question_id', validators=[DataRequired()])
    user_choice = IntegerField('user_choice', validators=[DataRequired()])