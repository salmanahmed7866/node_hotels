const express = require('express');
const app = express();
const db = require("./db")
const bodyParser = require('body-parser');
const personRoutes = require('./routes/person_routes.js')
const menuRoutes = require('./routes/menu_routes.js')
require('dotenv').config();
const passport = require('./auth.js');
app.use(bodyParser.json());





// Middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); 
}
//app.use(logRequest);
app.use(passport.initialize());
const localAuthMiddleWare=passport.authenticate('local',{session:false})

app.get('/', localAuthMiddleWare,function (req, res) {
    res.send("Welcome to this hotel");
})

app.use('/person', personRoutes);
app.use('/menu',menuRoutes)

const port = process.env.port;
app.listen(port, () => {
    console.log("listing on port 3000");
})