from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Question, db, User

question_routes = Blueprint('questions', __name__)

#get all questions
@question_routes.route('/')
@login_required
def get_all_questions():
    questions = Question.query.all()
    return jsonify({
        'questions': [question.to_dict() for question in questions]
    })

#get question by question ID
@question_routes.route('/<int:id>')
@login_required
def get_question_by_id(id):
    question = Question.query.get_or_404(id)
    return question.to_dict()

#delete question by ID
@question_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_question(id):
    question = Question.query.get_or_404(id)
    if(current_user.is_admin == True):
        db.session.delete(question)
        db.session.commit()
        return f'Question {id} deleted'
    return 'Unauthorized'

@question_routes.route('/', methods=["POST"])
@login_required
def create_new_question():
    form = QuestionForm

# @question_routes.route('/questions', methods=['POST'])
# @login_required
# def create_question():
#     question = request.data
#     new_question = Question(
#         user_id = current_user
#         # the other data
#     )

#     for choice in question['choices']:
#         Choice.new(

#         )