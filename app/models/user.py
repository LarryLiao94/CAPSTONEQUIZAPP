from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)

    progress = db.relationship('Progress', primaryjoin="(User.id==Progress.user_id)", backref='users', lazy=True)
    quizzes = db.relationship('Quiz', primaryjoin="(User.id==Quiz.user_id)", backref='users', lazy=True)
    questions = db.relationship('Question', primaryjoin="(User.id==Question.user_id)", backref='users', lazy=True)
    user_questions = db.relationship('User_Question', primaryjoin="(User.id==User_Question.user_id)", backref='users', lazy=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
