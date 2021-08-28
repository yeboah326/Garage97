from sima_web_api.api.sale.models import Sale
from sima_web_api.api.stock.models import Stock


def compute_total_buying_price(stock_list):
    data = {"total_buying_price": 0}
    for stock in stock_list.stocks:
        data["total_buying_price"] += stock.buying_price
    return data


def compute_total_selling_price(sale_list):
    data = {"total_selling_price": 0}
    for sale in sale_list.sales:
        data["total_selling_price"] += sale.selling_price
    return data


def compute_total_quantity_stocklist(stock_list):
    data = {"total_quantity": 0}
    for stock in stock_list.stocks:
        data["total_quantity"] += stock.quantity
    return data


def compute_total_quantity_salelist(sale_list):
    data = {"total_quantity": 0}
    for sale in sale_list.sales:
        data["total_quantity"] += sale.quantity
    return data


# Data for report generated
def report_compute_sales_for_product(product_id):
    product_sales = Sale.query.filter_by(product_id=product_id)
    total_sales = 0
    total_quantity = 0
    for sale in product_sales:
        total_sales += sale.selling_price
        total_quantity += sale.quantity
    return {"total_sales": total_sales, "total_quantity": total_quantity}


def report_compute_stocks_for_product(product_id):
    product_stock = Stock.query.filter_by(product_id=product_id)
    total_stock = 0
    total_quantity = 0
    for stock in product_stock:
        total_stock += stock.buying_price
        total_quantity += stock.quantity
    return {"total_stock": total_stock, "total_quantity": total_quantity}
