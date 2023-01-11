from .db import db, environment, SCHEMA, add_prefix_for_prod

class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)

    questions = db.relationship('Question', primaryjoin="(Category.id==Question.category_id)", backref='category', lazy=True)
    progress = db.relationship('Progress', primaryjoin="(Category.id==Progress.category_id)", backref='categories', lazy=True)


    def to_dict(self):
        return {
            'id' : self.id,
            'title': self.title,
            'questions': [question.to_dict() for question in self.questions]
        }
