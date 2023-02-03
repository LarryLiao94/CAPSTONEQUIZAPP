from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Question, db, User, Category

category_routes = Blueprint('categories', __name__)

#get all questions
@category_routes.route('/')
# @login_required
def get_all_categories():
    categories = Category.query.all()
    print(categories[0].questions, 'HASOIDJFAOISDJF')
    return jsonify({
        'categories': [category.to_dict() for category in categories]
    })

def to_dict(self):
    data = {
        'id': self.id,
        'category_name': self.category_name,
        'questions': [question.to_dict() for question in self.questions]
    }
    return data


#get question by question ID
@category_routes.route('/<int:id>')
@login_required
def get_category_by_id(id):
    category = Category.query.get_or_404(id)
    return category.to_dict()
