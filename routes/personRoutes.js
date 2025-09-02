const express = require('express');  
const router = express.Router();

const person = require('./../models/person'); // import our person model.

// POST method route to add a person:-

router.post('/', async (req, res) => {

  try {
    
    const dataFromUser = req.body;   //Assuming the request body contains the person data.

//     new creates an instance (document)
// In JavaScript, new is used to create an object instance from a class.
// Here, new Person({...}) means → make one new document based on the schema rules.
// Object instance just means → “a real copy created from the template (class/model)”.

    const newPerson = new person(dataFromUser);  //creates a new person document using the Mongoose model.


    const response = await newPerson.save();   // Line 1 → saves data in DB.

     console.log("Data is saved");      // Line 2 → log message only for your backend terminal.
      res.status(200).json(response);     // Line 3 → sends the saved data back to the client, so the user/app knows what was stored. 200 http code means success more eg, 400, 500 etc.

  } catch (err) {
    
      console.log(err);
      res.status(500).json({error : 'Internal server error'})
  }


})


// Get method that user see on display when he want to get data from database. of a person.
router.get('/', async (req, res) => {

  try {
    const data = await person.find();
    console.log('data fatched');
    res.status(200).json(data);

  } catch (error) {
    console.log(error);
     res.status(500).json({error : 'Internal server error'})
  }
})


//perametrized get method :-
router.get('/:workType', async (req, res) => {  // :worktype is a route parameter (also called a path variable).It means that this part of the URL is dynamic, not fixed..

  try {

    const worktype = req.params.workType;     // extract value from URL
    if(worktype == 'chef' || worktype == 'manager' || worktype == 'driver' ){

      const personData = await person.find({work: worktype});
      console.log("data fathched");
      res.status(200).json(personData);
    }else{
      res.status(404).json({error: 'Invalid work type'});
    }

  } catch (error) {
     console.log(error);
     res.status(500).json({error : 'Internal server error'})
  }
})


// Update method to update the person info. we use put for update.

router.put('/:uniqueID', async (req , res) => {      // here we make a path variable uniqueID , it means user need to enter that uniqueID of that particular person to update the info, this id is created by database automatically for a document called objectId/_ID.

      try {

        const personID = req.params.uniqueID;  //extract the id from the URL parameter.
        const updatePersonData = req.body;   // It stores the updated data for the user.

        // findByIdAndUpdate() its a inbuilt method of mongoose, is used to:

/* > Find a document by its _id in MongoDB
   > Update it with new values
   > Optionally return the updated document */

        const response = await person.findByIdAndUpdate(personID, updatePersonData, {
          new: true,            // return the updated document. if not set this true-->( By default, findByIdAndUpdate() returns the old document (before update).)
          runValidators: true,  // Run mongoose validation. if not set ths true--> (By default, Mongoose does not apply schema validation when using update methods)
        }) 
        
        if (!response) {   // Means, if given _id not found in database
          return res.status(404).json({error: 'Person not found'});
        }

        console.log('Data updated');
        res.status(200).json(response);

      } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Internal server error'})
      }
})


// Delete method to delete the data of a person:-

router.delete('/:id', async (req , res) => {     // here we make id variable path to take that unique id from user.
       
      try {
  
        const personId = req.params.id;   // extract that id from url.

        const response = await person.findByIdAndDelete(personId);      // its a inbuilt method of mongoose.

        
        if (!response) {   // Means, if given _id not found in database
          return res.status(404).json({error: 'Person not found'});
            }

            console.log('data fatched');
            res.status(200).json({message: 'Data deleted successfully'});

        } catch (error) {
             console.log(error);
             res.status(500).json({error : 'Internal server error'})
          }

})


// here we export router to import it our main server.js(where every thing happens)file:-
module.exports = router;
