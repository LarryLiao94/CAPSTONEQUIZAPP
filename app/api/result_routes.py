# from flask import Blueprint, jsonify
# from flask_login import login_required
# from app.models import Answer, Category

# @result_routes.route('/:categoryId')
# @login_required
# def result():
#     answers = Answer.query.all() #find by category id to show only answers for respective category

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

