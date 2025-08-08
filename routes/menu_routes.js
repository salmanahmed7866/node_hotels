const express = require('express');
const routes = express();
const MenuItem = require("../models/menu_items.js");


routes.post('/menuItem', async (req, res) => {
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

routes.get('/menuItem/:tasteType', async (req, res) => {

    try {
        const tasteType = req.params.tasteType;
        if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sout') {
            const response = await MenuItem.find({ taste: tasteType })
            console.log("Data Fetched")

            res.status(200).json(response)
        }
        else {
            res.status(404).json({ error: 'invalid work type' })
        }
    }
    catch (err) {
        console.log(err)

    }

})

module.exports = routes;