from flask import Blueprint, jsonify, request, json
from flask_login import current_user, login_required
from app.models import Question, db, User, Choice
from app.forms.question_form import QuestionForm


question_routes = Blueprint('questions', __name__)


@question_routes.route('/', methods=['POST'])
# @login_required
def create_question():
    # import ipdb; ipdb.set_trace()
    form = QuestionForm(csrf_enabled=False)
    if form.validate():
        question = Question(
            category_id = form.category_id.data,
            user_id = current_user.id,
            question_text = form.question_text.data
        )
        db.session.add(question)
        db.session.commit()
        # for choice in question["choices"]
        submitted_choices = json.loads(request.data)["choices"]
        for choice in submitted_choices:
            new_choice = Choice(
                question_id = question.id,
                choice = choice["choice"],
                is_correct = choice["is_correct"]
            )
            db.session.add(new_choice)
        db.session.commit()

        return jsonify({'question': question.to_dict()}), 201
    else:
        return jsonify({'error': form.errors}), 400

@question_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_question(id):
    question = Question.query.get_or_404(id)
    form = QuestionForm(csrf_enabled=False)
    if form.validate():
        question.category_id = form.category_id.data
        question.question_text = form.question_text.data
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
    return jsonify({'message': 'Question deleted successfully'}), 204


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

# #delete question by ID
# @question_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
# def delete_question(id):
#     question = Question.query.get_or_404(id)
#     if(current_user.is_admin == True):
#         db.session.delete(question)
#         db.session.commit()
#         return f'Question {id} deleted'
#     return 'Unauthorized'

# @question_routes.route('/', methods=["POST"])
# @login_required
# def create_new_question():
#     form = QuestionForm

# @question_routes.route('/questions', methods=['POST'])
# @login_required
# def create_question():
#     question = request.data
#     new_question = Question(
#         user_id = current_user
#         # the other data
#     )

#     for choice in question['choices']:
#         Choice.new(

#         )


    # question = json.loads(request.data)
    # print(question["choices"],'OISADJFOAIDJF')
    # new_question = Question(
    #     user_id = current_user.get_id(),
    #     category_id = int(question["category_id"]),
    #     quiz_id = int(question["quiz_id"]),
    #     question_text = question["question_text"]
    # )
    # db.session.add(new_question)
    # db.session.commit()
    # print(new_question.id, "NEW QUESTIONNNNNNN")
    # print(new_question.id, ' POST NEW QUESTION')
    # test_choice = Choice(
    #     question_id = int(new_question.id),
    #     choice = "testing choice   ",
    #     is_correct = True
    # )
    # db.session.add(test_choice)
    # db.session.commit()
    # print(test_choice, "test choice")

    # for choice in question["choices"]:
    #     new_choice = Choice(
    #         question_id = int(new_question.id),
    #         choice = choice["choice"],
    #         is_correct = choice["is_correct"]
    #     )
    #     db.session.add(new_choice)
    # db.session.commit()
    # print("testing")
    # new_question["choices"] = [Choice() for choice in new_question["choices"]]
    # return new_question.to_dict()
