from sima_web_api.api import db

class Sale(db.Model):
    __tablename__ = "Sale"
    id = db.Column(db.Integer,primary_key=True)
    quantity = db.Column(db.Integer)
    selling_price = db.Column(db.Numeric(5,2))
    created_on = db.Column(db.DateTime)
    product_id = db.Column(db.Integer,db.ForeignKey("Product.id"), nullable=False)
    sale_list_id = db.Column(db.Integer,db.ForeignKey("SaleList.id"), nullable=False)


class SaleList(db.Model):
    __tablename__ = "SaleList"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100))
    customer_name = db.Column(db.String(50))
    customer_contact = db.Column(db.String(10))
    created_on = db.Column(db.DateTime)
    product_id = db.Column(db.Integer,db.ForeignKey("Product.id"), nullable=False)