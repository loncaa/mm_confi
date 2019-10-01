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

describe('Booking mocha test', () => {
    it('creates a booking', done => {

        BookingService.createBooking(userObj._id, bookingTitle, bookingTime)
            .then(booking => {

                assert(booking.title === bookingTitle)
                assert(booking.userId === userObj._id)
                //assert(booking.time === bookingTime)

                bookingObj = booking;

                done()
            })
    })

    it('list a booking', done => {

        BookingService.listBookings(userObj._id)
            .then(bookings => {

                assert(Array.isArray(bookings))
                assert(bookings.length === 1)

                done()
            })
    })

    it('deletes a booking', done => {

        BookingService.deleteBooking(userObj._id, bookingObj._id)
            .then(response => {
                assert(!!(response))
                done();
            })
    })
})