from flask import Blueprint, jsonify, request, json
from flask_login import current_user, login_required
from app.models import Question, db, User, Choice, User_Question, Quiz, Category
from app.forms.user_question_form import UserQuestionForm

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

@user_question_routes.route('/', methods=['POST'])
# @login_required
def create_user_question():
    form = UserQuestionForm(csrf_enabled=False)
    if form.validate():
        user_question = User_Question(
            user_id=current_user.id,
            question_id=form.question_id.data,
            user_choice=form.user_choice.data
        )
        db.session.add(user_question)
        db.session.commit()
        return jsonify({'user_question': user_question.to_dict()}), 201
    else:
        return jsonify({'error': form.errors}), 400

# @user_question_routes.route('/quiz/<int:quiz_id>')
# @login_required
# def get_user_questions_by_quiz_id(quiz_id):
#     user_questions = User_Question.query.join(Question, User_Question.question_id == Question.id) \
#                                    .filter(Question.quiz_id == quiz_id) \
#                                    .filter(User_Question.user_id == current_user.id) \
#                                    .all()
#     return jsonify({
#         'user_questions': [user_question.to_dict() for user_question in user_questions]
#     })

# @user_question_routes.route('/category/<int:category_id>')
# @login_required
# def get_user_questions_by_category_id(category_id):
#     user_questions = User_Question.query.join(Question, User_Question.question_id == Question.id) \
#                                    .join(Quiz, Question.quiz_id == Quiz.id) \
#                                    .filter(Quiz.category_id == category_id) \
#                                    .filter(User_Question.user_id == current_user.id) \
#                                    .all()
#     return jsonify({
#         'user_questions': [user_question.to_dict() for user_question in user_questions]
#     })

@user_question_routes.route('/quiz/<int:quiz_id>')
@login_required
def get_user_questions_by_quiz_id(quiz_id):
    user_questions = User_Question.query.join(Question, User_Question.question_id == Question.id) \
                                   .filter(Question.quiz_id == quiz_id) \
                                   .filter(User_Question.user_id == current_user.id) \
                                   .all()
    correct_count = User_Question.query.join(Question, User_Question.question_id == Question.id) \
                                       .join(Choice, User_Question.user_choice == Choice.id) \
                                       .filter(Question.quiz_id == quiz_id) \
                                       .filter(User_Question.user_id == current_user.id) \
                                       .filter(Choice.is_correct == True) \
                                       .count()
    total_count = User_Question.query.join(Question, User_Question.question_id == Question.id) \
                                     .filter(Question.quiz_id == quiz_id) \
                                     .filter(User_Question.user_id == current_user.id) \
                                     .count()
    return jsonify({
        'user_questions': [user_question.to_dict() for user_question in user_questions],
        'results': f'{correct_count} correct out of {total_count} total questions'
    })
@user_question_routes.route('/category/<int:category_id>')
@login_required
def get_user_questions_by_category_id(category_id):
    user_questions = User_Question.query.join(Question, User_Question.question_id == Question.id) \
                                   .join(Category, Question.category_id == category_id) \
                                   .filter(User_Question.user_id == current_user.id) \
                                   .all()
    correct_count = User_Question.query.join(Question, User_Question.question_id == Question.id) \
                                       .join(Category, Question.category_id == category_id) \
                                       .join(Choice, User_Question.user_choice == Choice.id) \
                                       .filter(User_Question.user_id == current_user.id) \
                                       .filter(Choice.is_correct == True) \
                                       .count()
    total_count = User_Question.query.join(Question, User_Question.question_id == Question.id) \
                                     .join(Category, Question.category_id == category_id) \
                                     .filter(User_Question.user_id == current_user.id) \
                                     .count()
    return jsonify({
        'user_questions': [user_question.to_dict() for user_question in user_questions],
        'results': f'{correct_count} correct out of {total_count} total questions'
    })

