from flask.json import dumps, jsonify
from sima_web_api.api.product.models import Product
from sima_web_api.api.sale.models import Sale, SaleList
from sima_web_api.api.stock.models import Stock
from collections import Counter

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


def next_page_items(items, items_per_page, page_number):
    # Beginning of next page
    np_start = (page_number - 1) * items_per_page

    # End of next page
    np_end = page_number * items_per_page

    # Total items
    total_item_count = len(items)

    # Total number of pages
    if total_item_count % items_per_page == 0:
        total_page_count = total_item_count // items_per_page
    else:
        total_page_count = total_item_count // items_per_page + 1

    detail = {
        "start": np_start,
        "end": np_end,
        "total_item_count": total_item_count,
        "total_page_count": total_page_count,
    }

    try:
        detail["page_items"] = items[detail["start"] : detail["end"]]
        return detail
    except:
        detail["page_items"] = items[items_per_page * page_number :]
        return detail

# TODO: Finish the implementation
def get_top_customers(business_id):
    business_salelists = SaleList.query.filter_by(business_id=business_id)
    business_customer_json = list()
    Counter
    for salelist in business_salelists:
        if salelist.customer_name == "None" or salelist.customer_contact == "None":
            pass
        else:
            business_customer_json.append(
                {
                    "salelist_id": salelist.id,
                    "customer_name": salelist.customer_name,
                    "customer_contact": salelist.customer_contact,
                }
            )
# TODO: Fix serialization problem
def get_top_selling_products(business_id):
    # Get all business products
    business_products = Product.query.filter_by(business_id=business_id)
    
    # Business products info
    business_products_info = {}
    
    for product in business_products:
        sales_info = report_compute_sales_for_product(product_id=product.id)
        business_products_info[f"{product.name}"] = {
            "total_sales_quantity": dumps(sales_info["total_sales"]),
            "total_sales_money": sales_info["total_quantity"]
        }
    business_products_info = dict(business_products_info.items(),key=lambda x:x[1]["total_sales_money"],reverse=True)
    del business_products_info["key"]
    del business_products_info["reverse"]
    return business_products_info

# TODO: Fix serialization problem
def get_products_low_on_stock(business_id):
    # Get all business products
    business_products = Product.query.filter_by(business_id=business_id)

    # Business products info
    business_products_info = {}

    for product in business_products:
        sales_info = report_compute_sales_for_product(product_id=product.id)
        stock_info = report_compute_stocks_for_product(product_id=product.id)
        business_products_info[f"{product.name}"] = {
            "total_sales_quantity": sales_info["total_quantity"],
            "total_stock_quantity": stock_info["total_quantity"],
            "total_items_remaining": dumps(stock_info["total_quantity"] - sales_info["total_quantity"])
        }

    business_products_info = dict(business_products_info.items(),key=lambda x:x[1]["total_items_remaining"])
    del business_products_info["key"]
    return business_products_info
