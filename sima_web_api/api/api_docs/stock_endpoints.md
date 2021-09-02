# SIMA Web API Documentation
## Stock Endpoints
#
### Check sale blueprint endpoint

`GET stock/hello`

**Response**

SUCCESS: **200 OK**
<pre>
{
    "message": "Stock blueprint working"
}
</pre>
#

### Get all stock by stocklist id

`GET stock/stock_list/{stock_list_id}`

**Response**

SUCCESS: **200 OK**
<pre>
[
    {
        "id": {stock.id},
        "product": {product.name},
        "buying_price": {stock.buying_price},
        "quantity": {stock.quantity},
        "created_on": {stock.created_on},
    },
    {
        "id": {stock.id},
        "product": {product.name},
        "buying_price": {stock.buying_price},
        "quantity": {stock.quantity},
        "created_on": {stock.created_on},
    }
]
</pre>

ERROR: **400 BAD REQUEST**
<pre>
{
    "message":"Could not process request"
}
</pre>
#

### Get stock by id

`GET stock/{stock_id}`

**Response**

SUCCESS: **200 OK**
<pre>
{
    "id": {stock.id},
    "product": {product.name},
    "buying_price": {stock.buying_price},
    "quantity": {stock.quantity},
    "created_on": {stock.created_on},
}
</pre>

ERROR: **400 BAD REQUEST**
<pre>
{
    "message":"Could not process request"
}
</pre>

#

### Delete stock by id

`DELETE stock/{stock_id}`

**Response**

SUCCESS: **200 OK**
<pre>
{
    "message": "Stock deleted successfully"
}
</pre>

ERROR: **400 BAD REQUEST**
<pre>
{
    "message": "Could not process request"
}
</pre>
#

### Update stock by id

`PUT stock/{stock_id}`

**Response**

SUCCESS: **200 OK**
<pre>
{
    "message": "Stock updated successfully"
}
</pre>

ERROR: **400 BAD REQUEST**
<pre>
{
    "message":"Could not process request"
}
</pre>

#
### Add stock to existing stocklist
`POST stock/add/{stock_list_id}`

**Request Body**
<pre>
{
    "stocks": [
        {"quantity": {qty}, "buying_price": {buying_price}, "product_id": product_id},
        {"quantity": {qty}, "buying_price": {buying_price}, "product_id": product_id},
        {"quantity": {qty}, "buying_price": {buying_price}, "product_id": product_id},
        {"quantity": {qty}, "buying_price": {buying_price}, "product_id": product_id},
    ]
}
</pre>

**Response**

SUCCESS: **201 CREATED**
<pre>
{
    "message": "New stock added successfully"
}
</pre>

ERROR (*When no data has been passed*): **400 BAD REQUEST**
<pre>
{
    "message":"No data passed"
}
</pre>

ERROR (*When there was an error while processing the request*): **400 BAD REQUEST**
<pre>
{
    "message":"Could not process request"
}
</pre>

#
### Create new stocklist

`POST stock/list`

**Request Body**
<pre>
{
    "business_id": {business_id},
    "stock_list": [
        {"quantity": {qty}, "buying_price": {buying_price}, "product_id": product_id},
        {"quantity": {qty}, "buying_price": {buying_price}, "product_id": product_id},
        {"quantity": {qty}, "buying_price": {buying_price}, "product_id": product_id},
        {"quantity": {qty}, "buying_price": {buying_price}, "product_id": product_id},
    ]
}
</pre>

**Response**

SUCCESS: **201 CREATED**
<pre>
{
    "message": "Stocks created successfully"
}
</pre>

ERROR: **400 BAD REQUEST**
<pre>
{
    "message": "Could not process requesst",
}
</pre>

#

### Get stocklist by id

`GET stock/list/{stocklist_id}`

**Response**

SUCCESS: **200 OK**
<pre>
{
    "id": {stock_list.id},
    "name": {stock_list.name},
    "created_on": {stock_list.created_on}
}
</pre>

ERROR: **400 BAD REQUEST**
<pre>
{
    "message": "Could not delete stock list"
}
</pre>

#

### Delete stocklist by id

`DELETE stock/list/{stocklist_id}`

**Response**

SUCCESS: **200 OK**
<pre>
{
    "message": "Stock list deleted successfully"
}
</pre>

ERROR: **400 BAD REQUEST**
<pre>
{
    "message": "Could not delete stock list"
}
</pre>

#

### Update stocklist by id

`PUT stock/list/{stocklist_id}`

**Response**

SUCCESS: **200 OK**
<pre>
{
    "message": "Sale list updated sucessfully"
}
</pre>

ERROR: **400 BAD REQUEST**
<pre>
{
    "message":"Could not process request"
}
</pre>

#

