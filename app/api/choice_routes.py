from flask import Blueprint, jsonify, request, json
from flask_login import current_user, login_required
from app.models import Question, db, User, Choice
from app.forms.choice_form import ChoiceForm

choice_routes = Blueprint('choices', __name__)

@choice_routes.route('/<int:id>', methods=['PUT'])
def update_choice(id):
    choice = Choice.query.get_or_404(id)
    form = ChoiceForm(csrf_enabled=False)
    if form.validate():
        choice.choice = form.choice.data
        choice.is_correct = form.is_correct.data
        db.session.commit()
        return jsonify({'choice': choice.to_dict()}), 201
    else:
        return jsonify({'error': form.errors}), 400
