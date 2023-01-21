from app.models import db, Question, environment, SCHEMA

# Adds demo questions to the questions table
def seed_questions():
    question1 = Question(user_id=1, category_id=1, quiz_id=1, question_text="test question 1")
    question2 = Question(user_id=1, category_id=1, quiz_id=1, question_text="test question 2")
    question3 = Question(user_id=1, category_id=2, quiz_id=1, question_text="test question 3")
    question4 = Question(user_id=1, category_id=2, quiz_id=1, question_text="test question 4")
    question5 = Question(user_id=1, category_id=3, quiz_id=3, question_text="test question 5")
    question6 = Question(user_id=1, category_id=3, quiz_id=3, question_text="test question 6")
    question7 = Question(user_id=1, category_id=3, quiz_id=3, question_text="test question 7")
    question8 = Question(user_id=1, category_id=3, quiz_id=3, question_text="test question 8")
    question9 = Question(user_id=1, category_id=3, quiz_id=3, question_text="test question 9")
    question10 = Question(user_id=1, category_id=3, quiz_id=3, question_text="test question 10")
    question11 = Question(user_id=1, category_id=3, quiz_id=3, question_text="test question 11")
    question12 = Question(user_id=1, category_id=3, quiz_id=3, question_text="test question 12")
    question13 = Question(user_id=1, category_id=3, quiz_id=3, question_text="test question 13")
    question14 = Question(user_id=1, category_id=3, quiz_id=3, question_text="test question 14")
    question15 = Question(user_id=1, category_id=3, quiz_id=3, question_text="test question 15")
    question16 = Question(user_id=1, category_id=3, quiz_id=3, question_text="test question 16")


    db.session.add(question1)
    db.session.add(question2)
    db.session.add(question3)
    db.session.add(question4)
    db.session.add(question5)
    db.session.add(question6)
    db.session.add(question7)
    db.session.add(question8)
    db.session.add(question9)
    db.session.add(question10)
    db.session.add(question11)
    db.session.add(question12)
    db.session.add(question13)
    db.session.add(question14)
    db.session.add(question15)
    db.session.add(question16)
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
