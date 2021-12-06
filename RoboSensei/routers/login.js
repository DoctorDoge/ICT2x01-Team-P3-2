const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/instructor.model');

//Login Page
router.get('/', (req, res) => {
    //User is authenticated
    if (req.isAuthenticated()) {
        //Redirect to Dashboard
        res.render('instructor_dashboard');
    } else {
        //User is not Authenticated..Display Login Page
        res.render('login', {
            error: null
        });
    }
})

//Login Function
router.post("/", async (req, res) => {
    //Retrieve User based on Username
    const user = await User.find({});

    //User is found
    if (user) {
        //Password Match
        try {

            for (let i = 0; i < user.length; i++) {
                if (bcrypt.compareSync(req.body.password, user[i].password)) {
                    req.login(user[i], function (err) {

                        res.status(302).redirect('/instructor_dashboard');

                    })
                }
            }
            throw 'Invalid Password'; // generates an exception
        } catch (e) {
            // statements to handle any exceptions
            res.status(401).render('login', {
                error: e
            });
        }

    } else {
        //User not found
        res.status(400).render('login', {
            error: "User Not found"
        })
    }
})

passport.serializeUser(function (user, done) {
    console.log(user)
    done(null, user);
});

passport.deserializeUser(async function (userDetail, done) {
    let user = await User.findById(userDetail._id);
    done(null, user);
});


module.exports = router;