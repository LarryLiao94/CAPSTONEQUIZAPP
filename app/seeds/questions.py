from app.models import db, Question, environment, SCHEMA

# Adds demo questions to the questions table
def seed_questions():
    question1 = Question(user_id=1, category_id=1, quiz_id=1, question_text="test question 1")
    question2 = Question(user_id=1, category_id=1, quiz_id=1, question_text="test question 2")
    # question1 = Question(user_id=1, category_id=1, quiz_id=2, question_text="test question 3")
    # question1 = Question(user_id=1, category_id=2, quiz_id=2, question_text="test question 4")


    db.session.add(question1)
    db.session.add(question2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM questions")

    db.session.commit()
