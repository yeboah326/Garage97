from sima_web_api.api import db

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
