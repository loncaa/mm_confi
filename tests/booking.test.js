require('./test-helper')

const assert = require('assert')

const UserService = require('../src/services/user-service')
const BookingService = require('../src/services/booking-service')

const bookingTitle = 'Title'
const bookingTime = '2019-09-30 21:18:48.010Z'

let userObj;
let bookingObj;

before(done => {
   UserService.createUser('test@test.hr', '1234', true)
       .then(user => {

           userObj = user
           done()
       })
})

function assertHelper(booking) {
    assert(booking)
    assert(booking.title === bookingTitle)
    assert(booking.userId.toString() === userObj._id.toString())
}

describe('Booking mocha test', () => {
    it('creates a booking', done => {

        BookingService.createBooking(userObj._id, bookingTitle, bookingTime)
            .then(booking => {

                assertHelper(booking)
                bookingObj = booking;

                done()
            })
            .catch(error => {
                console.log(error.message)
                done()
            })
    })

    it('list a booking', done => {

        BookingService.listBookings(userObj._id)
            .then(bookings => {

                assert(Array.isArray(bookings))
                assert(bookings.length === 1)
                assertHelper(bookings[0])

                done()
            })
            .catch(error => {
                console.log(error.message)
                done()
            })
    })

    it('deletes a booking', done => {

        BookingService.deleteBooking(bookingObj._id)
            .then(booking => {

                assert(!!(booking))
                done();
            })
            .catch(error => {
                console.log(error.message)
                done()
            })
    })
})