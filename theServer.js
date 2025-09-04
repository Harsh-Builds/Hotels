const express = require('express');  
const app = express();  // our server

const db = require('./db'); // connection to database
require('dotenv').config();  // it is used for that, Node.js can load environment variables from  .env file into process.env.
const person = require('./models/person'); // import our person model.

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bodyParser = require('body-parser');
app.use(bodyParser.json()) // req.body :- store here 'req.body' after converting data in jsObject.

const PORT = process.env.PORT || 3000 ;  //It lets your server run on the hosting platform’s assigned port if available, otherwise falls back to port 3000 for local development.


// Middleware Function:-    A middleware function in Express is used to track, log, or control requests (like monitoring user traffic) before passing them to the next handler.
const logRequest = (req, res , next) =>{
  console.log(`[${new Date().toLocaleString()}] Request from : ${req.originalUrl} `);
  next();  // move on the next phase.
}
app.use(logRequest); // so, here we use our middleware.


// Varification function
passport.use(new LocalStrategy(async (username, password, done) => {
    // authentication logic here:-
    try {
          console.log('Recieved data :', username, password);
          const user = await person.findOne({username : username}); //findOne():- by this method we find only a single document in DB
           console.log("User from DB:", user);
          if(!user){
             console.log(" Username not found");
            return done(null, false, {message: 'Incorrect Username'});
          }
          const isPasswordmatch = user.password === password ? true:false;
           console.log("Password match:", isPasswordmatch);

          if (isPasswordmatch) {
             console.log("Auth success");
            return done(null, user);    // means user found 
          } else {
            return done(null, false, {message: 'Incorrect password'});
          }
    } catch (error) {
      return done(error);
    }

}))
app.use(passport.initialize());    // here we initialized the authentication in our server.

const localMiddleware =  passport.authenticate('local', {session: false}); // now we can use authentication via this variable.

app.get('/',localMiddleware, (req, res) => {
  res.send('Welcome to our Hotel');
})


// import the router file of person
const personRoutes = require('./routes/personRoutes');
// use routers
app.use('/person', personRoutes);


// import the router file of menu
const menuRoutes = require('./routes/menuRoutes');
// use routers
app.use('/menu', menuRoutes);



app.listen(3000, ()=>{
    console.log('server iss live');
})


