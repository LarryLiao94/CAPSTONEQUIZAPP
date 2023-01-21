from app.models import db, Category, environment, SCHEMA


def seed_categories():
    cat1 = Category(
        title='A'
    )
    cat2 = Category(title='B')
    cat3 = Category(title='Testing')

    db.session.add(cat1)
    db.session.add(cat2)
    db.session.add(cat3)
    db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
