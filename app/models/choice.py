from .db import db, environment, SCHEMA, add_prefix_for_prod

class Choice(db.Model):
    __tablename__ = 'choices'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    choice = db.Column(db.String(255), nullable=True)
    is_correct = db.Column(db.Boolean)

    def to_dict(self):
        return {
            'id': self.id,
            'question_id': self.question_id,
            'choice': self.choice,
            'is_correct': self.is_correct
        }
    
