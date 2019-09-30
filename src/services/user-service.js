const User = require('../db/models/User')

function authenticate(email, password) {
    return User.authenticate(email, password)
}

function create(email, password, isAdmin = false){
    const user = new User({
        email,
        password,
        isAdmin
    })

    return user.save();
}

function findById(id) {
    return User.findById(id).select("-password")
}

module.exports = {
    authenticate,
    create,
    findById
}