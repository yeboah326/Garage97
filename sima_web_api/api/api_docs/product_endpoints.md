# SIMA Web API Documentation
# Product Endpoints
### Check product blueprint endpoint
`GET /product/hello`

SUCCESS: **200 OK**

<pre>
{
    "message": "Hello"
}
</pre>
#
### Get product by id
`GET /product/{product_id}`

SUCCESS: **200 OK**
<pre>
{
    "name":Kako Cube
}
</pre>
ERROR: **400 BAD REQUEST**
<pre>
{
    "message":"Could not process request"
}
</pre>
#
### Delete product by id
`DELETE /product/{product_id}`

SUCCESS: **200 OK**
<pre>
{
    "message": "Product deleted successfully"
}
</pre>

ERROR: **400 BAD REQUEST**
<pre>
{
    "message":"Could not process request"
}
</pre>
#
### Update product info
`PUT/product/{product_id}`

SUCCESS: **200 OK**
<pre>
{
    "message": "Product info updated successfully"
}
</pre>
ERROR: **400 BAD REQUEST**
<pre>
{
    "message":"Could not process request"
}
</pre>
#

### Get all sale for a product
`GET product/{product_id}/sale`

SUCCESS: **200 OK**
<pre>
{
    "product": {product_name},
    "product_sales":[
        {
            "id": {sale.id},
            "quantity": {sale.quantity},
            "selling_price": {sale.selling_price},
            "created_on": {sale.created_on}
        },
                {
            "id": {sale.id},
            "quantity": {sale.quantity},
            "selling_price": {sale.selling_price},
            "created_on": {sale.created_on}
        },
        {
            "id": {sale.id},
            "quantity": {sale.quantity},
            "selling_price": {sale.selling_price},
            "created_on": {sale.created_on}
        }
    ]
}
</pre>
ERROR: **400 BAD REQUEST**
<pre>
{
    "message":"Could not process request"
}
</pre>
#

### Get all stock for a product
`GET product/{product_id}/stock`

SUCCESS: **200 OK**
<pre>
{
    "product":{product.name},
    "product_stocks":[
        {
            "id": {stock.id},
            "quantity": {stock.quantity},
            "buying_price": {stock.buying_price},
            "created_on": {stock.created_on},
        },
        {
            "id": stock.id,
            "quantity": stock.quantity,
            "buying_price": str(stock.buying_price),
            "created_on": stock.created_on,
        },
        {
            "id": stock.id,
            "quantity": stock.quantity,
            "buying_price": str(stock.buying_price),
            "created_on": stock.created_on,
        }

    ]
}
</pre>
ERROR: **400 BAD REQUEST**
<pre>
{
    "message":"Could not process request"
}
</pre>

#

### Delete all sale for a product
`GET product/{product_id}/stock`

SUCCESS: **200 OK**
<pre>
{
    "message": "Sales deleted successfully"
}
</pre>

ERROR: **400 BAD REQUEST**
<pre>
{
    "message":"Could not process request"
}
</pre>