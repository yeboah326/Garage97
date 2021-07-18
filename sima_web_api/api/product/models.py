from sima_web_api.api import db


class Product(db.Model):
    __tablename__ = "Product"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    business_id = db.Column(db.Integer, db.ForeignKey("Business.id"), nullable=False)
    stocks = db.relationship("Stock", backref="Product", lazy=True)
