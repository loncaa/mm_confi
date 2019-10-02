const Attendee = require('../db/models/Attendee')

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

function deleteAttendee(attendeeId){
    return Attendee.findOneAndDelete({_id: attendeeId})
}

function deleteAllBookingAttendees(bookingId){
    return Attendee.deleteMany({bookingId: bookingId})
}

function listAttendees(bookingId){
    return Attendee.find({bookingId: bookingId})
}

function setAttendeeCode(attendeeId, code){
    return Attendee.updateOne({_id: attendeeId}, {$set: {code: code}})
}

module.exports = {
    addAttendee,
    deleteAttendee,
    deleteAllBookingAttendees,
    listAttendees,
    setAttendeeCode
}