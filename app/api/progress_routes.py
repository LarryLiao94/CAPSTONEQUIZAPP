from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Question, db, User, Category, Progress

progress_routes = Blueprint('progress', __name__)

@progress_routes.route('/')
@login_required
def progress():
    """
    Query for all categories and returns all the questions in that category
    """
    progress = Progress.query.all()
    return jsonify({
        'progress': [x.to_dict() for x in progress]
    })

# @user_routes.route('/')
# @login_required
# def users():
#     """
#     Query for all users and returns them in a list of user dictionaries
#     """
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}


# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     user = User.query.get(id)
#     return user.to_dict()
