const mongoose = require('mongoose');

menuItemSchema = mongoose.Schema({
    name: {
        type: String,

    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true,
    },
    ingrediant:{
        type:[String],
        default:[]
    }
})

const MenuItem=mongoose.model('menuItem',menuItemSchema);

module.exports=MenuItem;