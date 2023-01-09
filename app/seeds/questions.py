from app.models import db, Question, environment, SCHEMA

# Adds demo questions to the questions table
def seed_questions():
    question1 = Question(user_id=1, category_id=1, question_text='Question 1',
                        option1='Correct', option2='Incorrect', option3='Incorrect', option4='Incorrect', correct_choice=1)
    question2 = Question(user_id=1, category_id=1, question_text='Question 2',
                        option1='Incorrect', option2='Correct', option3='Incorrect', option4='Incorrect', correct_choice=2)
    question3 = Question(user_id=1, category_id=1, question_text='Question 3',
                        option1='Incorrect', option2='Incorrect', option3='Correct', option4='Incorrect', correct_choice=3)
    question4 = Question(user_id=1, category_id=2, question_text='Question 4',
                        option1='Incorrect', option2='Incorrect', option3='Incorrect', option4='Correct', correct_choice=4)
    question5 = Question(user_id=1, category_id=2, question_text='Question 5',
                        option1='Correct', option2='Incorrect', option3='Incorrect', option4='Incorrect', correct_choice=1)
    question6 = Question(user_id=1, category_id=2, question_text='Question 6',
                        option1='Incorrect', option2='Correct', option3='Incorrect', option4='Incorrect', correct_choice=2)

    db.session.add(question1)
    db.session.add(question2)
    db.session.add(question3)
    db.session.add(question4)
    db.session.add(question5)
    db.session.add(question6)
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