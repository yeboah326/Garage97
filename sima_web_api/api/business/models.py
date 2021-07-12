from sima_web_api.api import db


class Business(db.Model):
    __tablename__ = "Business"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    user_id = db.Column(db.Integer,db.ForeignKey('User.id'),nullable=False)
    prodcuts = db.relationship('Product',backref='Business',lazy=True)


class Product(db.Model):
    __tablename__ = "Product"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100))
    business_id = db.Column(db.Integer,db.ForeignKey("Business.id"), nullable=False)
    stocks = db.relationship("Stock",backref="Product",lazy=True)

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

class Sale(db.Model):
    __tablename__ = "Sale"
    id = db.Column(db.Integer,primary_key=True)
    quantity = db.Column(db.Integer)
    sellingPrice = db.Column(db.Numeric(5,2))
    product_id = db.Column(db.Integer,db.ForeignKey("Product.id"), nullable=False)
    saleList_id = db.Column(db.Integer,db.ForeignKey("SaleList.id"), nullable=False)


class SaleList(db.Model):
    __tablename__ = "SaleList"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100))
    customerName = db.Column(db.String(50))
    customerContact = db.Column(db.String(10))
