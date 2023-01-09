# from flask import Blueprint, jsonify
# from flask_login import login_required
# from app.models import Answer, Category

# @progress_routes.route('/')
# @login_required
# def progress():
#     """
#     Query for all categories and returns all the questions in that category
#     """
#     category_questions = 
#     answers = Answer.query.all() #get all questions and filter for correct vs incorrect and join with categories


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