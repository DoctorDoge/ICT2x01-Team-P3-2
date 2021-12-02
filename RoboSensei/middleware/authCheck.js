const express = require('express');
const router = express.Router();
const passport = require('passport');
var itemRouter = express.Router({
    strict: true
});
router.use('/:user', itemRouter);

// check authentication before can access the route
exports.authCheck = async (req, res, next) => {
    if(req.user){
        next();
    } else {
        res.redirect('/login');
    }
}
