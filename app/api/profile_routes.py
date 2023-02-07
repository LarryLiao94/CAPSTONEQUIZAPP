from flask import Blueprint, jsonify, request, json
from flask_login import current_user, login_required
from app.models import Question, db, User, Choice, User_Question, Quiz, Category

profile_routes = Blueprint('profile', __name__)

@profile_routes.route('/')
def get_user_questions_and_quizzes():
    quizzes = Quiz.query.filter(Quiz.user_id == current_user.id).all()
    questions = Question.query.filter(Question.user_id == current_user.id).all()

    return jsonify({
        'quizzes': [quiz.to_dict() for quiz in quizzes],
        'questions': [question.to_dict() for question in questions]
    })
