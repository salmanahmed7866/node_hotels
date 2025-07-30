const express = require('express');
const app = express();
const db = require("./db")
const PersonModel = require("./models/person")
const MenuItem = require("./models/menu_items")
const bodyParser = require('body-parser');
const personRoutes=require('./routes/person_routes.js')
app.use(bodyParser.json());
require('dotenv').config();


app.use('/person',personRoutes);
app.post('/menuItem', async (req, res) => {
    try {
        const data = req.body
        const newmenuItem = new MenuItem(data)
        const response = await newmenuItem.save();
        console.log('data saved');

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(200).json(e);
    }
})

app.get('/menuItem/:tasteType', async (req, res) => {

    try {
        const tasteType = req.params.tasteType;
        if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sout') {
            const response = await MenuItem.find({ taste: tasteType })
            console.log("Data Fetched")

            res.status(200).json(response)
        }
        else{
             res.status(404).json({error:'invalid work type'})
        }
    }
    catch (err) {
        console.log(err)

    }

})

app.get('/', function (req, res) {
    res.send('Hello world');
    console.log("Hello World");

})

// const mongoose = require('mongoose')
// const mongoosUrl='mongodb://localhost:27017/mydb'
// mongoose.connect(mongoosUrl);
// const userSchema=mongoose.Schema({
//     name:String,
//     age:Number
// });

// const Model=mongoose.model('solar',userSchema);
// const emp=new Model({
//     name:"Salman Ahmed",
//     age:60
// }) 
//emp.save();
//const db=mongoose.connection;

// db.on('connected',()=>{

//     console.log('Connected to mongo db server');

// })

// db.on('error',(err)=>{
//         console.log('Mongo db connection error:',err);

// })

// db.on('disconnected',()=>{
//         console.log('Mongo db Disconnected');

// })
const port=process.env.port;
app.listen(port, () => {
    console.log("listing on port 3000");
})