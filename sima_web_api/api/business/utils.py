def compute_total_buying_price(stock_list):
    data = { 
        "total_buying_price":0
    }
    for stock in stock_list.stocks:
        data["total_buying_price"] += stock.buying_price
    return data

def compute_total_selling_price(sale_list):
    data = {
        "total_selling_price":0
    }
    for sale in sale_list.sales:
        data["total_selling_price"] += sale.selling_price
    return data

def compute_total_quantity_stocklist(stock_list):
    data = {
        "total_quantity": 0
    }
    for stock in stock_list.stocks:
        data["total_quantity"] += stock.quantity
    return data

def compute_total_quantity_salelist(sale_list):
    data = {
        "total_quantity": 0
    }
    for sale in sale_list.sales:
        data["total_quantity"] += sale.quantity
    return data