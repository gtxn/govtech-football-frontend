# Govtech Football App

### Trying it out
Try the app hosted on S3 [here](http://govtech-football-app.s3-website-us-east-1.amazonaws.com)

Running locally: I would prefer not to expose my API url so I will zip the whole frontend repository and submit that as a file instead. After downloading the zip file, run `npm start`

### Architecture
#### Frontend
Built in react, hosted on S3. 

Used both MUI and tailwind for styling

Used amplify for login. Amplify is linked to a cognito user pool that was created using the serverless framework (below)

#### Backend
Used serverless framework to deploy resources (dynamoDB, apiGateway, lambda, cognito). 

Backend logic is implemented using apiGateway and lambda. 

Database is in dynamoDB for speed of programming.

Logs are also kept in dynamoDB. 


