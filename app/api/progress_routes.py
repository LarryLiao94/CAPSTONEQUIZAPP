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