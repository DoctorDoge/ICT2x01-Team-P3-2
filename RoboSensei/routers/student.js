const express = require('express');
const router = express.Router();

const User = require('../models/instructor.model');
const authCheck = require('../middleware/authCheck');


router.get('/', async (req, res) => {
    if(req.isAuthenticated()){
        req.logOut();
    }
    res.redirect('/game');
})


module.exports = router;