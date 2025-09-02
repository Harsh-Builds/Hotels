const mongoose = require('mongoose');

const menuItems = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
          type: Number,
         required: true
    },

    taste: {
        type: String,
        enum: ['spicy', 'sweet'],   // either spicy or sweet
        required: true
    },

    is_Drink: {
        type: Boolean,
        default: false
    },

    ingredients: {
        type: [String],
        default : []
    },

    num_Of_Sales : {
        type: Number,
        default: 0
    }

});


const theMenu = mongoose.model('theMenu', menuItems);
module.exports = theMenu;