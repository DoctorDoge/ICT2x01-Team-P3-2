const express = require('express');
const model = require('../models/robo_model');
const router = new express.Router();

router.get('/page', async (req, res) => {
    try{
        const models = await model.find({});
        res.status(200).send(models);
    } catch(error){
        res.status(500).send(error);
    }
})

module.exports = router;