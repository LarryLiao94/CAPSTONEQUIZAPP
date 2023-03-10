from flask import Blueprint, jsonify, request, json
from flask_login import current_user, login_required
from app.models import Quiz, db, User, Question, Choice
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

        for question in json.loads(request.data)["questions"]:
            print('AWPIOEJFAOWIEJFA', question)
            new_question = Question(
                quiz_id = quiz.id,
                question_text = question["question_text"],
                category_id = 1,
                user_id = current_user.id
            )
            db.session.add(new_question)
            db.session.commit()
            
            submitted_choices = question["choices"]
            for choice in submitted_choices:
                new_choice = Choice(
                    question_id = new_question.id,
                    choice = choice["choice"],
                    is_correct = choice["is_correct"]
                )
                db.session.add(new_choice)
            db.session.commit()

        
        return jsonify({'quiz': quiz.to_dict()}), 201
    else:
        return jsonify({'error': form.errors}), 400

@quiz_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def update_quiz(id):
    quiz = Quiz.query.get_or_404(id)
    form = QuizForm(csrf_enabled=False)
    if form.validate():
        quiz.title = form.title.data
        db.session.commit()

        # for question in json.loads(request.data)["questions"]:
        #     updated_question = Question.query.get_or_404(question["id"])
        #     updated_question.question_text = question["question_text"]
        #     db.session.commit()

        #     submitted_choices = question["choices"]
        #     for choice in submitted_choices:
        #         updated_choice = Choice.query.get_or_404(choice["id"])
        #         updated_choice.choice = choice["choice"]
        #         updated_choice.is_correct = choice["is_correct"]
        #         db.session.commit()
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
