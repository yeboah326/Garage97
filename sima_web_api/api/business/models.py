from sima_web_api.api import db


class Business(db.Model):
    __tablename__ = "Business"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    user_id = db.Column(db.Integer,db.ForeignKey('User.id'),nullable=False)