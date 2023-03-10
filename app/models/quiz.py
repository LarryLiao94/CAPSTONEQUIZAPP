from .db import db, environment, SCHEMA, add_prefix_for_prod

class Quiz(db.Model):
    __tablename__ = 'quizzes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)

    questions = db.relationship('Question', primaryjoin="(Quiz.id==Question.quiz_id)", backref='quizzes', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title' : self.title,
            'questions': [question.to_dict() for question in self.questions]
        }
