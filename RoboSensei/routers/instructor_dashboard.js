const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');

const saltRounds = 10;
const User = require('../models/instructor.model');
const authCheck = require('../middleware/authCheck');


router.get('/' , authCheck.authCheck , async (req, res) => {
    res.render('instructor_dashboard');
})

router.get('/configuration' , authCheck.authCheck , async (req, res) => {
    res.render('configuration');
})

router.post('/configuration', authCheck.authCheck, async (req, res) => {

})

module.exports = router;