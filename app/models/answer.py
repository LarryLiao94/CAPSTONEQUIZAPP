from .db import db, environment, SCHEMA, add_prefix_for_prod

class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('quizzes.id')), nullable=True)
    is_correct = db.Column(db.Boolean, nullable=False)

    def to_dict(self):
        return {
            'id' : self.id,
            'question_id' : self.question_id,
            'quiz_id' : self.quiz_id,
            'is_correct' : self.is_correct
        }