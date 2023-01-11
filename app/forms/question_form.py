from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, StringField, SubmitField)
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
    category_id = IntegerField('Category ID', validators=[DataRequired()])
    question_text = StringField('Question', validators=[DataRequired()])

# {
#     "category_id" : 2,
#     "quiz_id" : 2,
#     "question_text": "NEWQUESTION",
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
#
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
