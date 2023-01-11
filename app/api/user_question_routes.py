from flask import Blueprint, jsonify, request, json
from flask_login import current_user, login_required
from app.models import Question, db, User, Choice, User_Question

user_question_routes = Blueprint('user_questions', __name__)

@user_question_routes.route('/')
@login_required
def get_all_user_questions():
    user_questions = User_Question.query.filter(User_Question.user_id == current_user.id).all()
    return jsonify({
        'user_questions': [user_question.to_dict() for user_question in user_questions]
    })

#correct user_questions
@user_question_routes.route('/correct')
@login_required
def get_correct_user_questions():
    user_questions = User_Question.query.join(Choice, User_Question.user_choice == Choice.id) \
                                   .filter(Choice.is_correct == True) \
                                   .filter(User_Question.user_id == current_user.id) \
                                   .all()
    print(user_questions[0].user_choice)
    return jsonify({
        'user_questions': [user_question.to_dict() for user_question in user_questions]
    })

@user_question_routes.route('/incorrect')
@login_required
def get_incorrect_user_questions():
    user_questions = User_Question.query.join(Choice, User_Question.user_choice == Choice.id) \
                                   .filter(Choice.is_correct == False) \
                                   .filter(User_Question.user_id == current_user.id) \
                                   .all()
    return jsonify({
        'user_questions': [user_question.to_dict() for user_question in user_questions]
    })
