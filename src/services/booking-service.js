const User = require('../db/models/User')
const Booking = require('../db/models/Booking')

function createBooking(userId, title, time) {

    const booking = new Booking({
        userId,
        time,
        title
    })

    return booking.save()
}

function deleteBooking(userId, bookingId){
    return Booking.findOneAndRemove({_id: bookingId, userId: userId})
}

function listBookings(userId){
    return Booking.find({userId: userId})
}

module.exports = {
    createBooking,
    deleteBooking,
    listBookings
}