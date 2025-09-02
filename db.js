
// In this file db.js, we create a connection with mongoDB database via mongoose which is like a bridge to connect or communicate with database.
// After writing all code to make the connection , we need to export this file to our main nodejs file to connect with MongoDB.

const mongoose = require('mongoose');  //here we import the mongoose library.

//Define the mongodb connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'  // here we replace mydayabse with our databse name that we want.

// set up mongoDB connection:-

mongoose.connect(mongoURL, {
    // useNewUrlParser : true,     // these both are just mandatory parameter to prevent future problems during database connection.
    // useUnifiedTopology: true         // in this version they are not workable.
})

//Get the default connection
// Mongoose maintains a default connection object representing the mongoDb connection.

const theDB = mongoose.connection;

// Define event listners for database connection.
// here 'connected' automatically listened by thedb object when database server is connected , and it shows the msg that we write into the function.
// similarly there are more events like error, disconnected --> these are like in js eventlistners click, hover etc.

theDB.on('connected', () => {        
    console.log('Connected to MongoDB server');
})

theDB.on('error', (err) => {        
    console.log('Mongo connection error', err);
})

theDB.on('disconnected', () => {        
    console.log('DisConnected to MongoDB server');
})

// Now, Export the DataBase connection.
module.exports = theDB;
