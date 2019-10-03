var jwt = require('jsonwebtoken')
var jwtConfig = require('../config/jwt-config')

var express = require('express');
var router = express.Router();

const UserService = require('../services/user-service')

const mapping = 'auth'

router.post(`/${mapping}/login`, function(req, res, next) {

    const email = req.body.email
    const password = req.body.password

    if(!email || !password)
        return res.status(300).json({ok: false, message: 'Required params not found'})

    //check username/password
    UserService.authenticate(email, password)
        .then(user => {

            req.session.userId = user._id

            const token = user.generateAuthToken()
            res.status(200).json({ok: true, user: user, token: token})
        })
        .catch(error => {
            res.status(400).json({ok: false, message: `Authentication failed! ${error.message}`});
        })
});

router.post(`/${mapping}/logout`, function(req, res, next) {

    if(!req.session)
        return res.status(300).json({ok: false, message: 'Required params not found'})

    // delete session object
    req.session.destroy(function (err) {
        if (err) {
            res.status(400).json({ok: false, message: `Logout failed! ${err.message}`});
        } else {
            res.status(200).json({ok: true, user: req.user})
        }
    });
});

module.exports = router;
