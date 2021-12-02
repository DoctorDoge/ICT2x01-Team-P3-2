const express = require('express');
const router = express.Router();

const User = require('../models/instructor.model');
const authCheck = require('../middleware/authCheck');


router.get('/' , authCheck.authCheck , async (req, res) => {
    res.render('instructor_dashboard');
})


module.exports = router;