from sima_web_api.api import db


class Stock(db.Model):
    __tablename__ = "Stock"
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    buying_price = db.Column(db.Numeric(5, 2))
    created_on = db.Column(db.DateTime)
    product_id = db.Column(db.Integer, db.ForeignKey("Product.id"), nullable=False)
    stock_list_id = db.Column(db.Integer, db.ForeignKey("StockList.id",ondelete="CASCADE"), nullable=False)


class StockList(db.Model):
    __tablename__ = "StockList"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    created_on = db.Column(db.DateTime)
    business_id = db.Column(db.Integer, db.ForeignKey("Business.id"), nullable=False)
    stocks = db.relationship("Stock", backref="StockList", lazy=True,passive_deletes=True)
