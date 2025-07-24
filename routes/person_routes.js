const express = require('express');
const routes = express();
const Person = require("../models/person.js")
const MenuItem = require("../models/menu_items.js");


routes.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(200).json(e);

    }

})


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
        res.status(200).json({message:'Deleted Succesufully'})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
});

module.exports = routes;