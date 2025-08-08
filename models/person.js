const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const personSchema = mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        unique: true


    },
    age: {
        type: Number,
        // required: true
    },
    username: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    }
})

personSchema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password, salt)

        person.password = hashPassword;
        next();
    }
    catch (err) {
        return next(err)
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        console.log('candidate password:',candidatePassword,'user password: ',this.password,"is match: ", isMatch)
        return isMatch;
    }
    catch (err) {
        throw err
    }
}
const Person = mongoose.model('person', personSchema);

module.exports = Person;