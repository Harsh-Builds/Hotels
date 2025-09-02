const mongoose = require('mongoose');


//define the person schema:-
const personSchema = mongoose.Schema({
    name: {
        type : String,
        required: true
    },

    age: {
         type: Number
    },

    work: {
        type: String,
        enum: ['chef', 'manager', 'driver'],
        required: true
    },

    mobile: {
        type: Number,
    },

    email: {
        type: String,
        required: true,
        unique: true        
    },

    homeTown: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
        required: true
    }
})

// create person model:- by this we actually interact with database using that schema we defined

const person = mongoose.model('person', personSchema );         // here model represent a collection of database.
module.exports = person;
