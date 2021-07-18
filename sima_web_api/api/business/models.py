from sima_web_api.api import db


class Business(db.Model):
    __tablename__ = "Business"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    products = db.relationship('Product',backref='Business',lazy=True)
    sale_lists = db.relationship('SaleList',backref='Business',lazy=True)
    stock_lists = db.relationship("StockList",backref="Business", lazy=True)
    description = db.Column(db.String(100))
    user_id = db.Column(db.Integer,db.ForeignKey('User.id'),nullable=False)