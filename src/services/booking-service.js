const User = require('../db/models/User')
const Booking = require('../db/models/Booking')

const AttendeeService = require('./attendee-service')

function createBooking(userId, title, time) {

    const booking = new Booking({
        userId,
        time,
        title
    })

    return booking.save()
}

function deleteBooking(bookingId){
    return AttendeeService.deleteAllBookingAttendees(bookingId)
        .then(atendees => {
            return Booking.findOneAndDelete({_id: bookingId})
        })
}

function deleteAllUserBookings(userId){
    return listBookings(userId)
        .then(bookings => {

            const promises = []
            bookings.forEach(booking => promises.push(deleteBooking(booking._id)))

            return Promise.all(promises)
        })
}

function listBookings(userId){
    return Booking.find({userId: userId})
}

module.exports = {
    createBooking,
    deleteBooking,
    deleteAllUserBookings,
    listBookings
}