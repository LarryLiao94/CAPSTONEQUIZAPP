from .db import db, environment, SCHEMA, add_prefix_for_prod

class User_Question(db.Model):
    __tablename__ = 'user_questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    user_choice = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('choices.id')),nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'question_id' : self.question_id,
            'user_choice' : self.user_choice
        }
