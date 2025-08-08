const express = require('express');
const routes = express();
const Person = require("../models/person.js")
const { jwtAuthMiddleware, generateToken } = require('./../jwt.js')


routes.post('/signup', async (req, res) => {
    try {
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');
        const token = generateToken(response.username);
        console.log('Token is : ', token);
        res.status(200).json({ response: response, token, token });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });

    }

})

routes.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        //find the user by username
        const user = await Person.findOne({ username: username })

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' })
        }
        //generate token

        const payload = {
            id: user.id, username: user.username

        }
        const token = generateToken(payload);

        res.json({ token });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })

    }
});

routes.get('/profile',jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        console.log('User Data:', userData);

        const userId = userData.id;
        const user = await Person.findById(userId)

        res.status(200).json({ user })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error' })
    }

});


routes.get('/', async (req, res) => {
    try {

        const data = await Person.find();


        console.log('data fetched');
        res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        res.status(200).json(e);

    }

})

routes.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidator: true
        })
        if (!response) {
            return res.status(200).json({ error: "person not found" })
        }

        console.log('update Succesufully')
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
});

routes.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(200).json({ error: "person not found" })
        }

        console.log('Deleted Succesufully')
        res.status(200).json({ message: 'Deleted Succesufully' })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
});

module.exports = routes;