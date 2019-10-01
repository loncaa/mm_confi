const User = require('../db/models/User')
const ValidatorHelper = require('../helpers/validator-helper')

function authenticate(email, password) {
    return User.authenticate(email, password)
}

function createUser(email, password, isAdmin = false){

    if(!ValidatorHelper.validateEmail(email))
        return Promise.reject({message: 'Email is not valid'})

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

function deleteUser(userId){
    return User.findOneAndRemove({_id: userId})
}

module.exports = {
    deleteUser,
    authenticate,
    createUser,
    findById
}