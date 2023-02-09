from app.models import db, Category, environment, SCHEMA


def seed_categories():
    cat1 = Category(title='Misc')
    cat2 = Category(title='Math')
    cat3 = Category(title='Movie')
    cat4 = Category(title='Music')
    cat5 = Category(title='Science')

    db.session.add(cat1)
    db.session.add(cat2)
    db.session.add(cat3)
    db.session.add(cat4)
    db.session.add(cat5)
    db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
