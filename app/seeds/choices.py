from app.models import db, Choice, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_choices():
    choice1 = Choice(question_id=1, choice='correct', is_correct=True)
    choice3 = Choice(question_id=1, choice='testing', is_correct=False)
    choice4 = Choice(question_id=1, choice='testing', is_correct=False)
    choice5 = Choice(question_id=1, choice='testing', is_correct=False)
    choice2 = Choice(question_id=2, choice='correct', is_correct=True)
    choice6 = Choice(question_id=2, choice='testing', is_correct=False)
    choice7 = Choice(question_id=2, choice='testing', is_correct=False)
    choice8 = Choice(question_id=2, choice='testing', is_correct=False)

    db.session.add(choice1)
    db.session.add(choice3)
    db.session.add(choice4)
    db.session.add(choice5)
    db.session.add(choice2)
    db.session.add(choice6)
    db.session.add(choice7)
    db.session.add(choice8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_choices():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.choices RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
