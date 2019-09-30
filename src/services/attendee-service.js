const Attendee = require('../db/models/Attendee')
const Booking = require('../db/models/Booking')

function addAttendee(bookingId, firstname, lastname, email, phone, code){

    const attendee = new Attendee({
        bookingId,
        firstname,
        lastname,
        email,
        phone,
        code
    })

    return attendee.save()
}

function removeAttendee(bookingId, attendeeId){
    return Attendee.findOneAndRemove({bookingId: bookingId, _id: attendeeId})
}

function listAttendees(bookingId){
    return Attendee.find({bookingId: bookingId})
}

module.exports = {
    addAttendee,
    removeAttendee,
    listAttendees
}