### Backend Challenge 

  Made the connection with the database with Docker Desktop.Tested the api endpoints with Postman and validation with JWT.So the first step is to download Docker Desktop if you haven't already. Next Dowload Postman or use alternatives.

 
## API Endpoints

#### Sign Up

```http
  POST http://localhost:3000/auth/signup/
```

| Key       | Value    | 
| :-------- | :------- | 
| `Content-Type` | `application/json` |

### Body Raw(Json)

```
{ 
"email": "test@example.com", 
"password": "pass", 
"firstName": "Smith", 
"lastName": "Chris", 
"age": 25 
}
```
 If everything was done correctly it should return a message "Successfully signed up". 

#### Login

```http
  POST http://localhost:3000/auth/login
```


| Key       | Value    | 
| :-------- | :------- | 
| `Content-Type` | `application/json` |

### Body Raw(Json)

```
{ "email": "test@example.com", "password": "pass" }
```
It should return your JWT access token which you're gonna use later ,so copy it.
#### 

### Search

```http
  POST http://localhost:3000/users/search
```

| Key       | Value    | 
| :-------- | :------- | 
| `Content-Type` | `application/json` |
|`Authorization`| `Bearer {yourJWTtoken}`|

### Body Raw(Json)

```
{
  "firstName": "John"
}
```
If everything is done correctly it should return an array with the searched users.
#### 

### Send-Friend-Request

```http
  POST http://localhost:3000/friend-requests/send/{userId}
```
#### userId is  Id in user.entity.ts

| Key       | Value    | 
| :-------- | :------- | 
|`Authorization`| `Bearer {yourJWTtoken}`|

If its's succesful it should show you the receiver id and sender(yourUser) id and the state of the request.

### Friend-Request-Received 

```http
  GET http://localhost:3000/friend-requests/received
```

| Key       | Value    | 
| :-------- | :------- | 
|`Authorization`| `Bearer {yourJWTtoken}`|

If it's succesful it should show you the id and status.

```http
  POST http://localhost:3000/friend-requests/accept/{userId}
```

| Key       | Value    | 
| :-------- | :------- | 
|`Authorization`| `Bearer {yourJWTtoken}`|

If it's succesful it will show the requestId.

```http
  POST http://localhost:3000/friend-requests/decline/{userId}
```

| Key       | Value    | 
| :-------- | :------- | 
|`Authorization`| `Bearer {yourJWTtoken}`|

