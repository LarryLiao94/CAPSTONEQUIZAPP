from flask import Blueprint, jsonify, request, json
from flask_login import current_user, login_required
from app.models import Quiz, db, User, Question
from app.forms.quiz_form import QuizForm

quiz_routes = Blueprint('quizzes', __name__)

@quiz_routes.route('/', methods=['POST'])
# @login_required
def create_quiz():
    form = QuizForm( csrf_enabled=False)
    if form.validate():
        quiz = Quiz(
            user_id=current_user.id,
            title=form.title.data,
            questions=[]  # initialize an empty list of questions
        )
        db.session.add(quiz)
        db.session.commit()

        # Get the list of question ids from the request data
        question_ids = json.loads(request.data)["question_ids"]
        # Fetch the questions from the database using the ids
        questions = Question.query.filter(Question.id.in_(question_ids)).all()
        # Add the questions to the quiz
        for question in questions:
            quiz.questions.append(question)

        db.session.commit()
        return jsonify({'quiz': quiz.to_dict()}), 201
    else:
        return jsonify({'error': form.errors}), 400

@quiz_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_quiz(id):
    quiz = Quiz.query.get_or_404(id)
    form = QuizForm(csrf_enabled=False)
    if form.validate():
        quiz.title = form.title.data
        db.session.commit()
        return jsonify({'quiz': quiz.to_dict()}), 201
    else:
        return jsonify({'error': form.errors}), 400

@quiz_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_quiz(id):
    quiz = Quiz.query.get_or_404(id)
    db.session.delete(quiz)
    db.session.commit()
    return jsonify({'message': 'Quiz deleted'}), 200

@quiz_routes.route('/<int:id>')
# @login_required
def get_quiz_by_id(id):
    quiz = Quiz.query.get_or_404(id)
    return quiz.to_dict()

@quiz_routes.route('/')
@login_required
def get_all_quizzes():
    quizzes = Quiz.query.all()
    print(quizzes[0].questions, 'AOISDFJAOWIFJAO;WEIF')
    return jsonify({
        'quizzes': [quiz.to_dict() for quiz in quizzes]
    })


def to_dict(self):
    data = {
        'id': self.id,
        'title': self.title,
        'questions': [question.to_dict() for question in self.questions]
    }
    return data
