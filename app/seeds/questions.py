from app.models import db, Question, environment, SCHEMA

# Adds demo questions to the questions table
def seed_questions():
    question1 = Question(user_id=1, category_id=2, quiz_id=1, question_text="What is 2 + 2?")
    question2 = Question(user_id=1, category_id=2, quiz_id=1, question_text="What is the square root of 144?")
    question3 = Question(user_id=1, category_id=2, quiz_id=1, question_text="What is 5 x 7?")
    question4 = Question(user_id=1, category_id=2, quiz_id=1, question_text="What is 30 divided by 6?")
    question5 = Question(user_id=1, category_id=2, quiz_id=1, question_text="What is the value of x if 5x = 25?")
    
    question6 = Question(user_id=1, category_id=5, quiz_id=2, question_text="What is the scientific name for the common cold?")
    question7 = Question(user_id=1, category_id=5, quiz_id=2, question_text="What type of animal is a kangaroo?")
    question8 = Question(user_id=1, category_id=5, quiz_id=2, question_text="What is the smallest planet in our solar system?")
    question9 = Question(user_id=1, category_id=5, quiz_id=2, question_text="What is the chemical formula for water?")
    question10 = Question(user_id=1, category_id=5, quiz_id=2, question_text="What is the process by which plants make their own food?")
    
    question11 = Question(user_id=1, category_id=4, quiz_id=3, question_text="Who wrote the opera Carmen?")
    question12 = Question(user_id=1, category_id=4, quiz_id=3, question_text="Who is considered the King of Pop?")
    question13 = Question(user_id=1, category_id=4, quiz_id=3, question_text="What type of instrument is a saxophone?")
    question14 = Question(user_id=1, category_id=4, quiz_id=3, question_text="Who wrote the song Bohemian Rhapsody?")
    question15 = Question(user_id=1, category_id=4, quiz_id=3, question_text="Who is the lead singer of the band Coldplay?")

    question16 = Question(user_id=1, category_id=3, quiz_id=4, question_text="Who directed the movie The Godfather?")
    question17 = Question(user_id=1, category_id=3, quiz_id=4, question_text="Who played the lead role in the movie Forrest Gump?")
    question18 = Question(user_id=1, category_id=3, quiz_id=4, question_text="What was the name of the ship in the movie Titanic?")
    question19 = Question(user_id=1, category_id=3, quiz_id=4, question_text="Who played the character Iron Man in the Marvel Cinematic Universe?")
    question20 = Question(user_id=1, category_id=3, quiz_id=4, question_text="What district was Katniss Everdeen from in The Hunger Games?")

    question21 = Question(user_id=2, category_id=1, quiz_id=5, question_text="What is the most popular sport in the world?")
    question22 = Question(user_id=2, category_id=1, quiz_id=5, question_text="I scratch your back you ______")
    question23 = Question(user_id=2, category_id=1, quiz_id=5, question_text="What is the name of the world's largest desert?")
    question24 = Question(user_id=2, category_id=1, quiz_id=5, question_text="What is the color of a ripe banana?")
    question25 = Question(user_id=2, category_id=1, quiz_id=5, question_text="How fast can a cheetah run?")

    question26 = Question(user_id=2, category_id=3, quiz_id=6, question_text="Who is the author of the Harry Potter series?")
    question27 = Question(user_id=2, category_id=3, quiz_id=6, question_text="Who is the main villain in the Harry Potter series?")
    question28 = Question(user_id=2, category_id=3, quiz_id=6, question_text="Who is Harry Potter's best friend?")
    question29 = Question(user_id=2, category_id=3, quiz_id=6, question_text="What is the name of the school of magic that Harry Potter attends?")
    question30 = Question(user_id=2, category_id=3, quiz_id=6, question_text="What is the name of the sport played on broomsticks in the Harry Potter universe?")
    
    question31 = Question(user_id=2, category_id=1, quiz_id=7, question_text="What is the meaning of the word ambiguous?")
    question32 = Question(user_id=2, category_id=1, quiz_id=7, question_text="What is the meaning of the word felicity?")
    question33 = Question(user_id=2, category_id=1, quiz_id=7, question_text="What is the meaning of the word aloof?")
    question34 = Question(user_id=2, category_id=1, quiz_id=7, question_text="What is the meaning of the word luminescent?")
    question35 = Question(user_id=2, category_id=1, quiz_id=7, question_text="What is the meaning of the word incognito?")

    question36 = Question(user_id=2, category_id=1, quiz_id=8, question_text="What is the capital of Australia?")
    question37 = Question(user_id=2, category_id=1, quiz_id=8, question_text="What is the longest river in Africa?")
    question38 = Question(user_id=2, category_id=1, quiz_id=8, question_text="What is the largest ocean in the world?")
    question39 = Question(user_id=2, category_id=1, quiz_id=8, question_text="What is the name of the mountain range that runs through Spain?")
    question40 = Question(user_id=2, category_id=1, quiz_id=8, question_text="What is the capital of Brazil?")

    question41 = Question(user_id=1, category_id=2, quiz_id=9, question_text="What is the value of the expression (2x + 3)^2, where x = 2?")
    question42 = Question(user_id=1, category_id=2, quiz_id=9, question_text="What is the derivative of the function f(x) = x^3 with respect to x?")

    question43 = Question(user_id=1, category_id=2, quiz_id=10, question_text="What is the value of x in the equation x^2 + 4x + 4 = 0?")
    question44 = Question(user_id=1, category_id=2, quiz_id=10, question_text="What is the equation of the line that passes through the point (3,4) and has a slope of 2?")

    question45 = Question(user_id=1, category_id=1, quiz_id=11, question_text="I am light as a feather, but even the strongest man cannot hold me for much longer than a minute. What am I?")
    question46 = Question(user_id=1, category_id=1, quiz_id=11, question_text="I am always hungry. I must always be fed, The finger I touch, will soon turn red. What am I?")

    question47 = Question(user_id=1, category_id=2, quiz_id=12, question_text="What is the sum of 3 and 7?")
    question48 = Question(user_id=1, category_id=1, quiz_id=12, question_text="Who wrote the famous novel To Kill a Mockingbird?")
    question49 = Question(user_id=1, category_id=1, quiz_id=12, question_text="Who was the first President of the United States?")
    question50 = Question(user_id=1, category_id=1, quiz_id=12, question_text="How many states are in the United States?")
    question51 = Question(user_id=1, category_id=1, quiz_id=12, question_text="What is the largest planet in our solar system?")

    question52 = Question(user_id=1, category_id=1, quiz_id=13, question_text="What is the most important thing in life?")
    question53 = Question(user_id=1, category_id=1, quiz_id=13, question_text="What is the key to success?")

    question54 = Question(user_id=1, category_id=1, quiz_id=14, question_text="Is this statement true or false?")
    question55 = Question(user_id=1, category_id=1, quiz_id=14, question_text="Can you ever know everything?")

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
    db.session.add(question17)
    db.session.add(question18)
    db.session.add(question19)
    db.session.add(question20)
    db.session.add(question21)
    db.session.add(question22)
    db.session.add(question23)
    db.session.add(question24)
    db.session.add(question25)
    db.session.add(question26)
    db.session.add(question27)
    db.session.add(question28)
    db.session.add(question29)
    db.session.add(question30)
    db.session.add(question31)
    db.session.add(question32)
    db.session.add(question33)
    db.session.add(question34)
    db.session.add(question35)
    db.session.add(question36)
    db.session.add(question37)
    db.session.add(question38)
    db.session.add(question39)
    db.session.add(question40)
    db.session.add(question41)
    db.session.add(question42)
    db.session.add(question43)
    db.session.add(question44)
    db.session.add(question45)
    db.session.add(question46)
    db.session.add(question47)
    db.session.add(question48)
    db.session.add(question49)
    db.session.add(question50)
    db.session.add(question51)
    db.session.add(question52)
    db.session.add(question53)
    db.session.add(question54)
    db.session.add(question55)
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
