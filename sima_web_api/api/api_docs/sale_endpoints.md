# SIMA Web API Documentation
## Sale Endpoints
#
### Check sale blueprint endpoint

`GET sale/hello`

SUCCESS: **200 OK**

<pre>
{
    "message": "Sale blueprint working"
}
</pre>

### Get all sale by salelist id

`GET sale/sale_list/{sale_list_id}`

SUCCESS: **200 OK**

<pre>
[
    {
        "id": {sale.id},
        "product": {product.name}
        "selling_price": {sale.selling_price},
        "quantity": {sale.quantity},
        "created_on": {sale.created_on},
    },
    {
        "id": {sale.id},
        "product": {product.name}
        "selling_price": {sale.selling_price},
        "quantity": {sale.quantity},
        "created_on": {sale.created_on},
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

### Get sale by id

`GET sale/{sale_id}`

SUCCESS: **200 OK**

<pre>
{
    "id": {sale.id},
    "product": {product.name}
    "selling_price": {sale.selling_price},
    "quantity": {sale.quantity},
    "created_on": {sale.created_on},
}
</pre>

ERROR: **400 BAD REQUEST**

<pre>
{
    "mesage":"Could not process request"
}
</pre>
#

### Delete sale by id

`DELETE sale/{sale_id}`

SUCCESS: **200 OK**

<pre>
{
    "message": "Sale deleted successfully"
}
</pre>

ERROR: **400 BAD REQUEST**

<pre>
{
    "message":"Could not process request"
}
</pre>
#

### Update sale by id

`PUT sale/{sale_id}`

SUCCESS: **200 OK**

<pre>
{
    "message": "Sale of product updated successfully"
}
</pre>

ERROR: **400 BAD REQUEST**

<pre>
{
    "message":"Could not process request"
}
</pre>
#
### Add sale to existing salelist

`POST sale/add/{sale_list_id}`

**Request Body**
<pre>
{
    "sales": [
        {"quantity": {qty}, "selling_price": {selling_price}, "product_id": {product_id}},
        {"quantity": {qty}, "selling_price": {selling_price}, "product_id": {product_id}},
        {"quantity": {qty}, "selling_price": {selling_price}, "product_id": {product_id}}
        ]
}
</pre>

**Response**
SUCCESS: **201 CREATED**
<pre>
{
    "message":"New sale added successfully"
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
### Create new salelist

`POST sale/list`

**Request Body**
<pre>
{
    "business_id": {business_id},
    "customer_details": {
        "customer_name": {customer.name}, 
        "customer_contact": "{customer.contact}"
    },
    "sale_list": [
        {"quantity": {qty}, "selling_price": {selling_price}, "product_id": {product_id}},
        {"quantity": {qty}, "selling_price": {selling_price}, "product_id": {product_id}},
        {"quantity": {qty}, "selling_price": {selling_price}, "product_id": {product_id}},

    ]
}
</pre>

**Response**

SUCCESS: **201 CREATED**
<pre>
{
    "message": "Sale created successfully"
}
</pre>
#

### Get salelist by id

`GET sale/list/{sale_list_id}`

**Response**

SUCCESS: **200 OK**
<pre>
{
    "id": {sale_list.id},
    "name": {sale_list.name},
    "created_on": {sale_list.created_on},
    "customer_name": {sale_list.customer_name},
    "customer_contact": {sale_list.customer_contact},
}
</pre>

ERROR: **400 BAD REQUEST**
<pre>
{
    "message":"Could not process request"
}
</pre>
#

### Delete salelist by id

`DELETE sale/list/{sale_list_id}`

**Response**

SUCCESS: **200 OK**
<pre>
{
    "message": "Sale list deleted successfully"
}
</pre>

ERROR: **400 BAD REQUEST**
<pre>
{
    "message": "Could not process request"
}
</pre>
#

### Update salelist by id

`PUT sale/list/{sale_list_id}`

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