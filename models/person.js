const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // for sequred password .

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
    }, 

    username : {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

});

// For hash (sequred way of password ) generation
personSchema.pre('save', async function (next){            // pre is a middleware func. that triggers and runs whenever we performed save operation.

    const person = this;            // this inside a Mongoose middleware hook (pre or post) refers to the document instance that is being saved.
                                    //So, when you do const person = this;, you’re basically assigning the current document (the object you’re about to save into MongoDB) to a variable called person

        // hash the password only if it has been modified (or new). (ex. if we just update salary of a person so we doesnt chng in password .)
    if(!person.isModified('password')){
            return next();
    }
    try {
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // override the plain password with the hashed one
        person.password = hashedPassword;
        next()                       // basically, next()is a callback function provided by mongoose that always called at the end . It define that procceed to next and other phases this current operation or phase now completed.  
    } catch (error) {
        return next(error);     //next(error) = “Hey Mongoose, something went wrong, handle this error instead of continuing.”
    }
})                          

// here we attached our comparePassword(from auth.js file) method to schema
personSchema.methods.comparePassword = async function (enteredpassword){
    try {
        // use bcrypt to comapare the provided pasword with the hashed pasword(that is already stored in DB)
        const isMatch = await bcrypt.compare(enteredpassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

// create person model:- by this we actually interact with database using that schema we defined
const person = mongoose.model('person', personSchema );         // here model represent a collection of database.
module.exports = person;
