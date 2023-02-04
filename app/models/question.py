from .db import db, environment, SCHEMA, add_prefix_for_prod

class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    category_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('quizzes.id')), nullable=True)
    question_text = db.Column(db.String(255), nullable=False)

    choices = db.relationship('Choice', primaryjoin="(Question.id==Choice.question_id)", backref='questions', lazy=True, cascade="all, delete, delete-orphan")
    user_questions = db.relationship('User_Question', primaryjoin="(Question.id==User_Question.question_id)", backref='questions', lazy=True)
    


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'category_id': self.category_id,
            'quiz_id': self.quiz_id,
            'question_text': self.question_text,
            'choices': [choice.to_dict() for choice in self.choices]
        }
