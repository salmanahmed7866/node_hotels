const mongoose = require('mongoose')
require('dotenv').config();


const mongoosUrl='mongodb://localhost:27017/hotels'
// const mongoosUrl= 'mongodb+srv://salmanahmed7866:salman1234@cluster0.5cjqvnc.mongodb.net/'
//const mongoosUrl=process.env.mongooseUrl;
mongoose.connect(mongoosUrl,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
});


const db=mongoose.connection;

db.on('connected',()=>{

    console.log('Connected to mongo db server');

})

db.on('error',(err)=>{
        console.log('Mongo db connection error:',err);
        

})

db.on('disconnected',()=>{
        console.log('Mongo db Disconnected');

})


module.exports=db;