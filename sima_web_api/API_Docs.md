# SIMA Web API Documentation

## User Based Endpoints
#
### Create new user
`POST /users`

Body
<pre>
{
    "name":"John Doe",
    "password":"123456",
    "dateOfBirth":"2000-01-01",
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
        "contactOne": "",
        "contactTwo": "",
        "dateOfBirth": null,
        "displayName": "",
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
    "contactOne": "",
    "contactTwo": "",
    "dateOfBirth": null,
    "displayName": "",
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
### Get all businesses
`GET /business`