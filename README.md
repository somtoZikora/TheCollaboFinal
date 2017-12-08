# TheCollaboFinal

This is a MEAN stack project for pairing students up to solve assignments and exam Questions.

## Development server
Run `nodemon Server.js` to start the server. Navigate to `http://localhost:3000/`

After making changes in the src folder, run `ng build`, then run `nodemon Server.js` to start the server again. Changes made outside 
src folder are updated automatically

## Send Grid
Create an account with `https://sendgrid.com/` for the email carrier

## Mongo DB
Create an account with `https://mlab.com/`

## env file
Create a file and name it .env in the root folder. Paste the code  
below with account details for Send Grid and Mlab  
`SENDGRID_USER` = send-grid-username  
`SENDGRID_PASSWORD` = send-grid-password  
`MONGODB_URI` = mongo-db-uri

