const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var itemRouter = express.Router({ strict: true });
router.use('/:instructor', itemRouter);
const User = require('../models/instructor.model');

router.post('/', async (req, res) => {
    await User.create({
        _id: new mongoose.Types.ObjectId(),
        role: "instructor",
        password: bcrypt.hashSync(req.body.password, saltRounds)
    }).then((result) => {
                res.send(result);
            })
            .catch((err) => {});
})


router.get("/",(req,res)=>{
    console.log('hit')
    res.send("test")
})

module.exports = router;