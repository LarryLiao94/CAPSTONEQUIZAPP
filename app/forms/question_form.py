from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, StringField, SubmitField)
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
    category_id = IntegerField('Category ID', coerce=int, validators=[DataRequired()])
    quiz_id = IntegerField('Quiz ID', coerce=int)
    # question_text = StringField('Question', validators=[DataRequired()])
    # choices =



# {
#     "category_id" : 1,
#     "quiz_id" : 2,
#     "question_text": "testing",
#     "choices": [
#         {
#             "choice" : "correct",
#             "is_correct" : true
#         },
#         {
#             "choice" : "testing",
#             "is_correct" : false
#         },
#         {
#             "choice" : "testing",
#             "is_correct" : false
#         },
#         {
#             "choice" : "testing",
#             "is_correct" : false
#         }
#     ]
# }
