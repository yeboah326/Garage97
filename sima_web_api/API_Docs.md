# SIMA Web API Documentation

## User Based Endpoints
#

### Check user blueprint endpoint
`GET /users/hello`

SUCCESS: 200 OK
<pre>
{
    "message": "Users Blueprint successfully"
}
</pre>
### Create new user
`POST /users`

Body
<pre>
{
    "name":"John Doe",
    "password":"123456",
    "date_of_birth":"2000-01-01",
    "email":"jdoe@gmail.com"
}
</pre>
SUCCESS: **201 CREATED**

`{"message": "User successfully created"}`

ERROR: **400 BAD REQUEST**

#

### Get all users
`GET /users`

SUCCESS: **200 OK**

<pre>
{
    {
        "contact_one": "",
        "contact_two": "",
        "date_of_birth": null,
        "display_name": "",
        "email": "jdoe@gmail.com",
        "name": "John Doe",
        "public_id": "80d70372-44ad-4a19-855c-bf1115c3fb6d"
    }
}

</pre>
ERROR: **400 BAD REQUEST**

#

### Get user by id
`GET /users/{public_id}`

SUCCESS: **200 OK**

<pre>
{
    "contact_one": "",
    "contact_two": "",
    "date_of_birth": null,
    "display_name": "",
    "email": "jdoe@gmail.com",
    "name": "John Doe",
    "public_id": "80d70372-44ad-4a19-855c-bf1115c3fb6d"
}
</pre>
#

### Update user info
`PUT /users/{public_id}`



### Body
The body of the request should contain the field/fields to be changed
<pre>
{
    "email":"jdow@dowmail.com"
}
</pre>

SUCCESS: **200 OK**

<pre>
{
    "message":"User info updated successfully"
}
</pre>

ERROR: **400 BAD REQUEST**
#

### Delete user
`DELETE /users/{public_id}`

SUCCESS: **200 OK**
<pre>
{
    "message":"User deleted successfully"
}

</pre>
ERROR: **400 BAD REQUEST**
#

### User Login
<pre>
{
    "email":"jdow@dowmail.com",
    "password":"123456"
}
</pre>
SUCCESS: **200**

<pre>
{
    "token":token
}

</pre>
ERROR: **400 BAD REQUEST**

<pre>
{
    "message":"User not found"
}
</pre>

ERROR: **401 UNAUTHORIZED**
<pre>
{
    "message":"Authorization failed"
}
</pre>
#
## Business Based Endpoints
#
### Check business blueprint endpoint
`GET /business/hello`

SUCCESS: **200 OK**
<pre>
{
    "message": "Users Blueprint successfully"
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
# Product Endpoints
### Check product blueprint endpoint
`GET /product/hello`

SUCCESS: **200 OK**

<pre>
{
    "message": "Hello"
}
</pre>

ERROR: **400 BAD REQUEST**
