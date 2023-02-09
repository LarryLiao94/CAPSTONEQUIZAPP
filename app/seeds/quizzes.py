from app.models import db, Quiz, environment, SCHEMA

# Adds demo questions to the questions table
def seed_quizzes():
    quiz1 = Quiz(user_id=1, title="Demo Math Quiz")
    quiz2 = Quiz(user_id=1, title="Demo Science Quiz")
    quiz3 = Quiz(user_id=1, title="Demo Music Quiz")
    quiz4 = Quiz(user_id=1, title="Demo Movie Quiz")
    quiz5 = Quiz(user_id=2, title="Random Quiz")
    quiz6 = Quiz(user_id=2, title="Harry Potter Quiz")
    quiz7 = Quiz(user_id=2, title="Vocab Quiz")
    quiz8 = Quiz(user_id=2, title="Geography Quiz")
    quiz9 = Quiz(user_id=1, title="Challenge Math")
    quiz10 = Quiz(user_id=1, title="You won't get these")
    quiz11 = Quiz(user_id=1, title="Riddles")
    quiz12 = Quiz(user_id=1, title="Are you smarter than a 5th grader?")
    quiz13 = Quiz(user_id=1, title="Questions of life")
    quiz14 = Quiz(user_id=1, title="Impossible Questions")
    # question1 = Question(user_id=1, category_id=1, quiz_id=2, question_text="test question 3")
    # question1 = Question(user_id=1, category_id=2, quiz_id=2, question_text="test question 4")


    db.session.add(quiz1)
    db.session.add(quiz2)
    db.session.add(quiz3)
    db.session.add(quiz4)
    db.session.add(quiz5)
    db.session.add(quiz6)
    db.session.add(quiz7)
    db.session.add(quiz8)
    db.session.add(quiz9)
    db.session.add(quiz10)
    db.session.add(quiz11)
    db.session.add(quiz12)
    db.session.add(quiz13)
    db.session.add(quiz14)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_quizzes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.quizzes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM quizzes")

    db.session.commit()
