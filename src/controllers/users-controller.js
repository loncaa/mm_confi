var express = require('express');
var router = express.Router();

const UserService = require('../services/user-service')

const mapping = 'user'

//create user
router.post(`/${mapping}/signin`, function(req, res, next) {

    const email = req.body.email
    const password = req.body.password
    const isAdmin = !!(req.body.isAdmin)

    if(!email || !password)
        return res.status(300).json({ok: false, message: 'Required params not found'})

    UserService.createUser(email, password, isAdmin)
        .then(user => {

            return res.status(200).json({ok: true, user: user})
        })
        .catch(error => {
            return res.status(400).json({ok: false, message: `${error.message}`})
        })
});

//GET user data by id
router.get(`/${mapping}/:id`, function(req, res, next) {

    const userId = req.params.id

    if(!userId)
        return res.status(300).json({ok: false, message: 'Required params not found'})

    UserService.findById(userId)
        .then(user => {
            res.status(200).json({ok: true, user: user})
        })
        .catch(error => {
            res.status(400).json({ok: false, message: `${error.message}`})
        })
});

module.exports = router;
