# SIMA Web API Documentation
## Business Endpoints
#
### Check business blueprint endpoint
`GET /business/hello`

SUCCESS: **200 OK**
<pre>
{
    "message": "Business Blueprint successfully"
}
</pre>
#
### Create new business
`POST /business`

Body
<pre>
{
    "name":"Kako Inc.",
}
</pre>
SUCCESS: **201 CREATED**

<pre>
{
    "message": "New business successfully created"
}
</pre>

ERROR: **400 BAD REQUEST**
#
### Get all businesses
`GET /business`

SUCCESS: **200 OK**
<pre>
[
    {
        "name": "Kako Inc."
    }
]
</pre>

ERROR: **400 BAD REQUEST**
#
### Get business by id
`GET /business/{business_id}`

SUCCESS: **200 OK**
<pre>
{
    "name": "Kako Inc."
}
</pre>


ERROR: **400 BAD REQUEST**
#
### Update business info
`PUT /business/{business_id}`

Body
<pre>
{
    "name": "Kako Inc. II"
}
</pre>

SUCCESS: **200 OK**
<pre>
{
    "message": "User info updated successfully"
}
</pre>

ERROR: **400 BAD REQUEST**
#
### Delete business by id
`DELETE /business/{business_id}`

SUCCESS: **200 OK**
<pre>
{
    "message":"Business successfully deleted"
}
</pre>

ERROR: **404 BAD REQUEST**

<pre>
{
    "message":"Business not found"
}
</pre>
#
### Get all business customers
`GET /business/{business_id}/customers`

SUCCESS: **200 OK**
<pre>
[
    {
        'customer_contact': '0543217725', 
        'customer_name': 'Kojo Boateng', 
        'salelist_id': 352
    },
    {
        'customer_contact': '0543217725', 
        'customer_name': 'Kojo Boateng', 
        'salelist_id': 352
    }
]
</pre>

ERROR: **400 BAD REQUEST**

<pre>
{
    "message":"Could not process request"
}
</pre>
