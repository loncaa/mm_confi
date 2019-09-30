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

function removeAttendee(bookingId, attendeeId){
    return Attendee.findOneAndRemove({bookingId: bookingId, _id: attendeeId})
}

function listAttendees(bookingId){
    return Attendee.find({bookingId: bookingId})
}

function setAttendeeCode(attendeeId, code){
    return Attendee.update({_id: attendeeId}, {$set: {code: code}})
}

module.exports = {
    addAttendee,
    removeAttendee,
    listAttendees,
    setAttendeeCode
}