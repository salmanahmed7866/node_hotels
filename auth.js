const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require("./models/person")


passport.use(new localStrategy(async (username, password, done) => {
    try {
        console.log("Received Credentials:", username, password);
        const user =await Person.findOne({ username })
        if (!user) 
            return done(null, false, { message: "User not Found" })
        
        const isPasswordMatch = await user.comparePassword(password)
        console.log('is password match :',isPasswordMatch)
        if (isPasswordMatch) {               
            return done(null, user)
        }
        else {
            return done(null, false, { message: "Incorrect password" })
        }

    }
    catch (e) {
        return done(e);
    }
}))

module.exports=passport