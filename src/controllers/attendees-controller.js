var express = require('express');
var router = express.Router();

const AttendeeService = require('../services/attendee-service')
const NodeMailerService = require('../services/nodemailer-service')

const mapping = 'attendees'

router.get(`/${mapping}/booking/:bookingId`, function(req, res){
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
router.post(`/${mapping}/booking/:bookingId`, function (req, res) {
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
router.delete(`/${mapping}/:id`, function (req, res) {
    const attendeeId = req.params.id

    if(!attendeeId)
        return res.status(300).json({ok: false, message: 'Required params not found'})

    AttendeeService.deleteAttendee(attendeeId)
        .then(attendee => {
            res.status(200).json({ok: true, isDeleted: !!(attendee), attendee: attendee})
        })
        .catch(error => {
            res.status(300).json({ok: false, message: `Failed to delete attendee! ${error.message}`});
        })
})

module.exports = router