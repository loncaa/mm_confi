var express = require('express');
var router = express.Router();

const BookingService = require('../services/booking-service')
const AttendeeService = require('../services/attendee-service')

const NodeMailerService = require('../services/nodemailer-service')

const mapping = 'bookings'

//list app bookings for user
router.get(`/${mapping}`, function(req, res) {

    const userId = req.session.userId

    BookingService.listBookings(userId)
        .then(bookings => {

            if(bookings && Array.isArray(bookings))
                return res.status(200).json({ok: true, list: bookings})
            else
                return Promise.reject({message: `Bookings not found`})
        })
        .catch(error => {
            res.status(300).json({ok: false, message: `Failed to list bookings! ${error.message}`});
        })

})

//create new booking for user
router.post(`/${mapping}`, function(req, res) {

    const userId = req.session.userId
    const title = req.body.title
    const time = req.body.time

    if(!title || !time)
        return res.status(300).json({ok: false, message: 'Required params not found'})

    BookingService.createBooking(userId, title, time)
        .then(booking => {
            res.status(200).json({ok: true, booking: booking})
        })
        .catch(error => {
            res.status(300).json({ok: false, message: `Failed to create bookings! ${error.message}`});
        })
})


//delete booking for user
router.delete(`/${mapping}/:bookingId`, function(req, res) {
    const userId = req.session.userId
    const bookingId = req.params.bookingId

    if(!userId || !bookingId)
        return res.status(300).json({ok: false, message: 'Required params not found'})

    BookingService.deleteBooking(userId, bookingId)
        .then(booking => {
            res.status(200).json({ok: true, deleted: !!(booking), booking: booking})
        })
        .catch(error => {
            res.status(300).json({ok: false, message: `Failed to delete bookings! ${error.message}`});
        })

})

// ## ATTENDEES

//fetch list of attendees for booking
router.get(`/${mapping}/:bookingId/attendees`, function(req, res){
    const bookingId = req.params.bookingId

    if(!bookingId)
        return res.status(300).json({ok: false, message: 'Required params not found'})

    AttendeeService.listAttendees(bookingId)
        .then(attendees => {
            res.status(200).json({ok: true, list: attendees})
        })
        .catch(error => {
            res.status(300).json({ok: false, message: `Failed to list attendees! ${error.message}`});
        })
})

//add attendee to booking
router.put(`/${mapping}/:bookingId/attendee`, function (req, res) {
    const bookingId = req.params.bookingId

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const phone = req.body.phone

    if(!firstname || !lastname || !email || !phone)
        return res.status(300).json({ok: false, message: 'Required params not found'})


    AttendeeService.addAttendee(bookingId, firstname, lastname, email, phone)
        .then(attendee => {

            const code = `C${bookingId}${attendee._id}`

            //send email to attendee
            //NodeMailerService.sendMail(email, code)

            return AttendeeService.setAttendeeCode(attendee._id, code)
                .then(updated => {

                    if(updated.ok){
                        attendee.code = code
                    }

                    res.status(200).json({ok: true, attendee: attendee})
                })
        })
        .catch(error => {
            res.status(300).json({ok: false, message: `Failed to add attendee! ${error.message}`});
        })

})

//remove attendee from booking
router.delete(`/${mapping}/:bookingId/attendee/:id`, function (req, res) {
    const bookingId = req.params.bookingId
    const attendeeId = req.params.id

    if(!bookingId || !attendeeId)
        return res.status(300).json({ok: false, message: 'Required params not found'})

    AttendeeService.removeAttendee(bookingId, attendeeId)
        .then(attendee => {
            res.status(200).json({ok: true, isDeleted: !!(attendee), attendee: attendee})
        })
        .catch(error => {
            res.status(300).json({ok: false, message: `Failed to delete attendee! ${error.message}`});
        })
})

module.exports = router