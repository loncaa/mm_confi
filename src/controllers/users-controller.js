var jswonwebstoken = require('jsonwebtoken')
var express = require('express');
var router = express.Router();

const UserService = require('../services/user-service')

const mapping = 'user'

//create user
router.post(`/${mapping}/signin`, function(req, res, next) {

    const email = req.body.email
    const password = req.body.password
    const isAdmin = !!(req.body.isAdmin)

    if(email && password) {
        return UserService.create(email, password, isAdmin)
            .then(user => {

                return res.status(200).json({ok: true, user: user})
            })
            .catch(error => {
                return res.status(400).json({ok: false, message: `${error.message}`})
            })
    }

    res.status(300).json({ok: false , message: 'respond with a resource'});
});

//GET user data by id
router.get(`/${mapping}/:id`, function(req, res, next) {

    const userId = req.params.id

    UserService.findById(userId)
        .then(user => {
            res.status(200).json({ok: true, user: user})
        })
        .catch(error => {
            res.status(400).json({ok: false, message: `${error.message}`})
        })
});

module.exports = router;
