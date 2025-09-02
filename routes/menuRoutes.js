const express = require('express');  
const router = express.Router();

const theMenu = require('./../models/menuItems'); //import our theMenu model.


// POST  method to get menu details:-
router.post('/', async (req, res) => {
  try {
    
    const menuData = req.body;  // data saved here from the client and parse into js object.
    const newMenuItem = new theMenu(menuData);

    const response = await newMenuItem.save();
    console.log('Menu Data saved');
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
     res.status(500).json({error: 'Make sure you filled correct info'});
  }
}) 


// Get method for menu:-

router.get('/', async (req, res) => {
    try {
       const data = await theMenu.find();
       console.log('data fatched');
       res.status(200).json(data);

    } catch (error) {
       console.log(error);
      res.status(500).json({error: 'internal server error'});
    }
})


//perametrized get method :-
router.get('/:tasteType', async (req, res) => {
    try {

      const Thetaste = req.params.tasteType; // extract tastetype from url or path

      if (Thetaste == 'sweet' || Thetaste == 'spicy') {
        const data = await theMenu.find({taste : Thetaste});
        console.log('data fatched');
        res.status(200).json(data);

      }else{
        res.status(404).json({error: 'Invalid type of taste'});
      }
      
    } catch (error) {
      confirm.log(error);
     res.status(500).json({error: 'internal server error'});
    }
})

// export the router

module.exports = router;