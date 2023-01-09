from app.models import db, User_Question, environment, SCHEMA

# Adds demo questions to the questions table
def seed_user_questions():
    user_question1 = User_Question(user_id=1, question_id=1, user_choice=1)
    user_question2 = User_Question(user_id=1, question_id=2, user_choice=2)
    # question1 = Question(user_id=1, category_id=1, quiz_id=2, question_text="test question 3")
    # question1 = Question(user_id=1, category_id=2, quiz_id=2, question_text="test question 4")


    db.session.add(user_question1)
    db.session.add(user_question2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM user_questions")

    db.session.commit()
