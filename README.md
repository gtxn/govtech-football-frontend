# Govtech Football App

## Trying it out
Try the app hosted on S3 [here](http://govtech-football-app.s3-website-us-east-1.amazonaws.com)

Running locally: I would prefer not to expose my API url (prevent DDoS) so I will zip the whole frontend repository and submit that as a file instead. After downloading the zip file, run `npm install` then `npm start`

Create a new account and have fun :D

## Architecture
### Frontend
Built in react, hosted on S3. 

Used both MUI and tailwind for styling

Used amplify for login. Amplify is linked to a cognito user pool that was created using the serverless framework (below)

### Backend
Used serverless framework to deploy resources (dynamoDB, apiGateway, lambda, cognito). 

Backend logic is implemented using apiGateway and lambda. 

Database is in dynamoDB for speed of programming.

Logs are also kept in dynamoDB.

## Security measures
### Securing API
I used a Cognito authorizer for API Gateway. What this means is that whenever a user makes a request to the API, the request goes through the Cognito Authorizer and must include a valid ID token. This JWT ID token was provided by Cognito upon login. This token also refreshes every hour, which prevents replay attacks.

DDoS attacks from public are not possible unless they hack Cognito, because I'm not charged in API Gateway for failed request. 

HOWEVER DDoS can be done if you are in the Cognito User Pool. To prevent this, I'll have to attach my HttpAPI to AWS CloudFront then AWS WAF. But this seemed like overkill, so I didn't implement this.

### XSS Attacks
These aren't really possible since React DOM automatically sanitises dangerous code by default. JSX expressions are XSS safe.

### CRSF Attacks
By default, Cognito Authorizers don't allow this because tokens are used. 

## Design choices
### Serverless
Serverless Framework was chosen so I can have Infrastructure as Code, ensuring that everyone would be able to see clearly what resources I have deployed.

### DynamoDB
I chose to put all team and match data into a single DynamoDB table. Each team will be an entry, and match data against other teams is stored as an attribute in this team. Admittedly, this is not the most space efficient because we have to store duplicate information of matches. However, in the context of ease and speed of programming, as well as cost of hosting, it was the option I chose. (Schema is in `frontend/src/utils/schema`)

Choosing DynamoDB table for logs was also chosen for speed of programming and ease of displaying. (Schema is in `frontend/src/utils/schema`). Using something like cloudWatch or cloudTrail would make displaying the log information on the frontEnd a lot more involved. (Setup wise, it'll also be a lot more work)

### API Gateway and Lambda
It costs less given we aren't expecting a constant stream of traffic. The style of programming is also a lot more modular, which makes it easy to test each function.

### User auth
For logging in, I allowed creation of new user because I assume this application would be used by various people across GovTech, and not limited to a specific group. In an ideal situation where I had a bit more time, I would assign roles in the Cognito User Pool to create a split between an Organiser and a Participant. With more time I'll also override the styling of the amplify `Authenticator` component to make it consistent with the rest of the page...

### Editing teams
For editing of teams, I only allowed users to edit team information (such as date of registration and group) if they haven't already put in match data. This is because to change this information would mess up the ranking as provided from matches, and the match data would be made invalid. 
