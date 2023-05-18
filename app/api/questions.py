from flask import Blueprint, jsonify, request, json
from flask_login import current_user, login_required
from app.models import Question, db, User, Choice
from app.forms.question_form import QuestionForm


question_routes = Blueprint('questions', __name__)


@question_routes.route('/', methods=['POST'])
# @login_required
def create_question():
    form = QuestionForm(csrf_enabled=False)
    if form.validate():
        new_question = Question(
            category_id = form.category_id.data,
            user_id = current_user.id,
            question_text = form.question_text.data,
            quiz_id = form.quiz_id.data,
            choices=[]
        )
        db.session.add(new_question)
        db.session.commit()
        # Each choice takes the data from the form and is created to the question that the choice belongs to within this question post method
        print(json.loads(request.data)["choices"])
        for choice in json.loads(request.data)["choices"]:
            new_choice = Choice(
                question_id = new_question.id,
                choice = choice["choice"],
                is_correct = choice["is_correct"]
            )
            db.session.add(new_choice)
        db.session.commit()

        return jsonify({'question': new_question.to_dict()}), 201
    else:
        return jsonify({'error': form.errors}), 400

@question_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_question(id):
    question = Question.query.get_or_404(id)
    form = QuestionForm(csrf_enabled=False)
    if form.validate():
        # if form.category_id.data:
        #     question.category_id = form.category_id.data
        question.question_text = form.question_text.data
        question.category_id = form.category_id.data
        question.quiz_id = form.quiz_id.data
        db.session.commit()
        return jsonify({'question': question.to_dict()}), 201
    else:
        return jsonify({'error': form.errors}), 400

@question_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_question(id):
    question = Question.query.get_or_404(id)
    db.session.delete(question)
    db.session.commit()
    return jsonify({'message': 'Question deleted successfully'}), 200


#get all questions
@question_routes.route('/')
@login_required
def get_all_questions():
    questions = Question.query.all()
    return jsonify({
        'questions': [question.to_dict() for question in questions]
    })

def to_dict(self):
    data = {
        'id': self.id,
        'question_text': self.question_text,
        'choices': [choice.to_dict() for choice in self.choices]
    }
    return data


#get question by question ID
@question_routes.route('/<int:id>')
@login_required
def get_question_by_id(id):
    question = Question.query.get_or_404(id)
    return question.to_dict()