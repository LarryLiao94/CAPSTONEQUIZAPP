from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Question, db, User

question_routes = Blueprint('questions', __name__)


@question_routes.route('/', methods=['POST'])
@login_required
def create_question():
    form = QuestionForm(request.form, csrf_enabled=False)
    if form.validate():
        question = Question(
            category_id = form.category_id.data,
            question_text = form.question_text.data
        )
        db.session.add(question)
        db.session.commit()
        return jsonify({'question': question.to_dict()}), 201
    else:
        return jsonify({'error': form.errors}), 400

@question_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_question(id):
    question = Question.query.get_or_404(id)
    form = QuestionForm(request.form, csrf_enabled=False)
    if form.validate():
        question.category_id = form.category_id.data
        question.question_text = form.question_text.data
        db.session.commit()
        return jsonify({'question': question.to_dict()}), 201
    else:
        return jsonify({'error': form.errors}), 400


#get all questions
@question_routes.route('/')
@login_required
def get_all_questions():
    questions = Question.query.all()
    return jsonify({
        'questions': [question.to_dict() for question in questions]
    })

def to_dict(self):
    data = {
        'id': self.id,
        'question_text': self.question_text,
        'choices': [choice.to_dict() for choice in self.choices]
    }
    return data


#get question by question ID
@question_routes.route('/<int:id>')
@login_required
def get_question_by_id(id):
    question = Question.query.get_or_404(id)
    return question.to_dict()

# #delete question by ID
# @question_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
# def delete_question(id):
#     question = Question.query.get_or_404(id)
#     if(current_user.is_admin == True):
#         db.session.delete(question)
#         db.session.commit()
#         return f'Question {id} deleted'
#     return 'Unauthorized'

# @question_routes.route('/', methods=["POST"])
# @login_required
# def create_new_question():
#     form = QuestionForm

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
