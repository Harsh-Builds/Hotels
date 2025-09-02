const express = require('express');  
const app = express();  // our server

const db = require('./db'); // connection to database

const bodyParser = require('body-parser');
app.use(bodyParser.json()) // req.body :- store here 'req.body' after converting data in jsObject.


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


