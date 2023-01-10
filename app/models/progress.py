from .db import db, environment, SCHEMA, add_prefix_for_prod

class Progress(db.Model):
    __tablename__ = 'progress'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('quizzes.id')), nullable=False)
    correct_answers = db.Column(db.Integer, nullable=False)
    total_answers = db.Column(db.Integer, nullable=False)

    

    def to_dict(self):
        return {
            'id': self.id,
            'category_id': self.category_id,
            'correct_answers': self.correct_answers,
            'total_answers': self.total_answers
        }
