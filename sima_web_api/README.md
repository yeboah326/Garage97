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
#

### Get all users
`GET /users`
#

### Get user by id
`GET /users/{public_id}`
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
#

### Delete user
`DELETE /users/{public_id}`

 
## Business Based Endpoints
#
### Get all businesses
`GET /business`