from sima_web_api.api import db

class Stock(db.Model):
    __tablename__ = "Stock"
    id = db.Column(db.Integer,primary_key=True)
    quantity = db.Column(db.Integer)
    buyingPrice = db.Column(db.Numeric(5,2))
    product_id = db.Column(db.Integer,db.ForeignKey("Product.id"), nullable=False)
    stockList_id = db.Column(db.Integer,db.ForeignKey("StockList.id"), nullable=False)


class StockList(db.Model):
    __tablename__ = "StockList"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100))
    stocks = db.relationship("Stock",backref="StockList",lazy=True)
