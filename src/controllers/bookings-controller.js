var express = require('express');
var router = express.Router();

const BookingService = require('../services/booking-service')

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

    BookingService.deleteBooking(bookingId)
        .then(booking => {
            res.status(200).json({ok: true, isDeleted: !!(booking), booking: booking})
        })
        .catch(error => {
            res.status(300).json({ok: false, message: `Failed to delete bookings! ${error.message}`});
        })

})

module.exports = router