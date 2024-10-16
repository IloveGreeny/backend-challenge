Made the connection with the database with Docker Desktop.Tested the api endpoints with Postman and validation with JWT.So the first step is to download Docker Desktop if you haven't already.
So basically run this docker command docker run -e POSTGRES_PASSWORD=`{yourpostgrespassword}` -e POSTGRES_DB=`{db_name}` -p 5432:5432 --name=backend-pg -d postgres.
Then run the image if the download has completed you should see your container running with the name backend-pg,now you can connect the PostGreSql with Nest JS. Then you need to change the default values that put in .env. The first two can stay the same. POSTGRES_USER,POSTGRES_PASSWORD,POSTGRES_DB,jwt_secret,jwt_expired change to your needs.Start the Nest JS npm run dev:start command in the terminal.To test the endpoints I used Postman ,so if you do n't have it download it or use alternatives. To test the connections you need a request.The request url should be http://localhost:3000/auth/signup or /auth/login or /auth/search depends on whichever one you're using.After you create one if you want to signup you need change HTTP default method from GET to POST. Also go to the Headers and put Content-Type as key and application/json as value.
Then go to body select the raw option(JSON). Write a simple json like this 
{
  "email": "test@example.com",
  "password": "pass",
  "firstName": "Smith",
  "lastName": "Chris",
  "age": 25
}
If everything was done correctly it should return a message "Successfully signed up".
Now to the login to login you need another json like this 
{
  "email": "test@example.com",
  "password": "pass"
}
It should return your JWT access token which you're gonna use later ,so copy it.
Now to the search other users your going to be logged in and to check if your logged in or not we're gonna use that JWT access token in Headers Key:Authorization Value: Bearer <yourjwtaccesstoken>.Another Header is the Content-Type like in sign up. Key: Content-Type , Value:application/json.
If everything is done correctly it should return an array with the searched users.
Now onto the friend-requests.The url changes now to http://localhost:3000/friend-requests/send/{:userid},/friend-requests/accept/{:userId},/friend-requests/decline/{:userId} all of this use POST HTTP METHOD but /friend-request/received/ uses GET. The userId is the Id in user.entity.
So if you want to send a friend request you need /friend-request/send/{:userId} with POST HTTP Method.Same Authorization header as in login with the the bearer token.If its's succesful it should show you the receiver id and sender(yourUser) id and the state of the request.Onto to the /friend-requests/received Change the POST Method to the GET Method.Put the same Headers as in /login and /friend-requests/send/{:userId} Authorization Bearer <jsonwebtoken>.If it's succesful it should show you the id and status.
Now to accepting friend requests with POST Method url /friend-requests/accept/{:userId}.Same Headers as the last 3.Authorization Bearer jwt.Now to Declining the url is /friend-requests/decline/{:userId}.Same Header as the last 4. Authorization Bearer jwt.
