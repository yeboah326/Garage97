from sima_web_api.api import db


class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(100))
    date_of_birth = db.Column(db.DateTime)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(100))
    display_name = db.Column(db.String(15))
    contact_one = db.Column(db.String(10))
    contact_two = db.Column(db.String(10))
    businesses = db.relationship("Business", backref="User", lazy=True)
