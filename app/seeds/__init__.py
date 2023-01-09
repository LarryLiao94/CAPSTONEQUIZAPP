from flask.cli import AppGroup
from .users import seed_users, undo_users
from .questions import seed_questions, undo_questions
from .choices import seed_choices, undo_choices
from .categories import seed_categories, undo_categories
from .quizzes import seed_quizzes, undo_quizzes
from .user_questions import seed_user_questions, undo_user_questions
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    seed_users()
    seed_categories()
    seed_choices()
    seed_questions()
    seed_quizzes()
    seed_user_questions()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # undo_questions()
    # undo_answers()
    # Add other undo functions here
