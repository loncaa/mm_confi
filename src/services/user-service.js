const User = require('../db/models/User')
const ValidatorHelper = require('../helpers/validator-helper')

const BookingService = require('./booking-service')

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
    return BookingService.deleteAllUserBookings(userId)
        .then(response => {
            return User.findOneAndDelete({_id: userId})
        })
}

module.exports = {
    deleteUser,
    authenticate,
    createUser,
    findById
}