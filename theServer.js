const express = require('express');  
const app = express();  // our server

const db = require('./db'); // connection to database
require('dotenv').config();  // it is used for that, Node.js can load environment variables from  .env file into process.env.

const passport = require('./auth'); // import here .auth file.(handles authentications)

const bodyParser = require('body-parser');
app.use(bodyParser.json()) // req.body :- store here 'req.body' after converting data in jsObject.

const PORT = process.env.PORT || 3000 ;  //It lets your server run on the hosting platform’s assigned port if available, otherwise falls back to port 3000 for local development.


// Middleware Function:-    A middleware function in Express is used to track, log, or control requests (like monitoring user traffic) before passing them to the next handler.
const logRequest = (req, res , next) =>{
  console.log(`[${new Date().toLocaleString()}] Request from : ${req.originalUrl} `);
  next();  // move on the next phase.
}
app.use(logRequest); // so, here we use our middleware.


app.use(passport.initialize());    // here we initialized the authentication in our server.
const localMiddleware =  passport.authenticate('local', {session: false}); // now we can use authentication via this variable.

app.get('/', (req, res) => {
  res.send('Welcome to our Hotel');
})


// import the router file of person
const personRoutes = require('./routes/personRoutes');
// use routers
app.use('/person', localMiddleware, personRoutes);


// import the router file of menu
const menuRoutes = require('./routes/menuRoutes');
// use routers
app.use('/menu', menuRoutes);


// server is active or listen at this port or address.
app.listen(3000, ()=>{
    console.log('server iss live');
})


