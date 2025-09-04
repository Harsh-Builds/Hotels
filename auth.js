// In this file , we sets up a passport with local authentication strategy, using a person model for username and password.

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person'); // import our person model.


// Varification function
passport.use(new LocalStrategy(async (username, password, done) => {
    // authentication logic here:-
    try {
          console.log('Recieved data :', username, password);
          const user = await person.findOne({username : username}); //findOne():- by this method we find only a single document in DB
          //  console.log("User from DB:", user);
          if(!user){
             console.log(" Username not found");
            return done(null, false, {message: 'Incorrect Username'});
          }
          const isPasswordmatch = user.password === password ? true:false;
          //  console.log("Password match:", isPasswordmatch);

          if (isPasswordmatch) {
            //  console.log("Auth success");
            return done(null, user);    // means user found 
          } else {
            return done(null, false, {message: 'Incorrect password'});
          }
    } catch (error) {
      return done(error);
    }

}));

module.exports = passport; //export configured passport.