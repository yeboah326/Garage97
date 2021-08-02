def compute_total_buying_price(stock_list):
    data = { 
        "total_buying_price":0
    }
    for stock in stock_list:
        data["total_buying_price"] += stock.buying_price
    return data