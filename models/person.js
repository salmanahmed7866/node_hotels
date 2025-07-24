const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,

    },
    age:{
        type:Number,
        // required: true
    }
})

const PersonModel=mongoose.model('person',userSchema);

module.exports=PersonModel;