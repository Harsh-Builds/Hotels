const express = require('express');  
const app = express();  // our server

const db = require('./db'); // connection to database
require('dotenv').config();  // it is used for that, Node.js can load environment variables from  .env file into process.env.

const bodyParser = require('body-parser');
app.use(bodyParser.json()) // req.body :- store here 'req.body' after converting data in jsObject.

const PORT = process.env.PORT || 3000 ;  //It lets your server run on the hosting platform’s assigned port if available, otherwise falls back to port 3000 for local development.


// Middleware Function:-    A middleware function in Express is used to track, log, or control requests (like monitoring user traffic) before passing them to the next handler.
const logRequest = (req, res , next) =>{
  console.log(`[${new Date().toLocaleString()}] Request from : ${req.originalUrl} `);
  next();  // move on the next phase.
}

app.use(logRequest); // so, here we use our middleware.

app.get('/', (req, res) => {
  res.send('Welcome to our Hotel');
})


// import the router file of person
const personRoutes = require('./routes/personRoutes');
// use routers
app.use('/person' , personRoutes);



// import the router file of menu
const menuRoutes = require('./routes/menuRoutes');
// use routers
app.use('/menu', menuRoutes);



app.listen(3000, ()=>{
    console.log('server iss live');
})


