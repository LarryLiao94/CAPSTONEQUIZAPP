# from app.models import db, User, Question, Answer, environment, SCHEMA

# def seed_answers():
#     # Create some answers
#     a1 = Answer(question_id=1, answer_text="Paris", is_correct=True)
#     a2 = Answer(question_id=2, answer_text="Madrid", is_correct=True)
#     a3 = Answer(question_id=3, answer_text="Rome", is_correct=True)
#     a4 = Answer(question_id=4, answer_text="Berlin", is_correct=True)
#     a5 = Answer(question_id=5, answer_text="London", is_correct=True)
#     a6 = Answer(question_id=6, answer_text="Brasília", is_correct=True)
#     a7 = Answer(question_id=7, answer_text="Buenos Aires", is_correct=True)
#     a8 = Answer(question_id=8, answer_text="Mexico City", is_correct=True)
#     a9 = Answer(question_id=9, answer_text="Lima", is_correct=True)
#     a10 = Answer(question_id=10, answer_text="Santiago", is_correct=True)

#     db.session.add(a1)
#     db.session.add(a2)
#     db.session.add(a3)
#     db.session.add(a4)
#     db.session.add(a5)
#     db.session.add(a6)
#     db.session.add(a7)
#     db.session.add(a8)
#     db.session.add(a9)
#     db.session.add(a10)
#     db.session.commit()

#     # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_answers():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM answers")
        
#     db.session.commit()
