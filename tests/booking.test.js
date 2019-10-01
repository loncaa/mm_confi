const assert = require('assert')

const UserService = require('../src/services/user-service')
const BookingService = require('../src/services/booking-service')

const bookingTitle = 'Title'
const bookingTime = '2019-09-30 21:18:48.010Z'

let user;
let bookingObj;

beforeEach(async (done) => {
    user = await UserService.create('test@test.hr', '1234', true)

    done()
})

describe('Creating documents', done => {
    it('creates a booking', done => {

        BookingService.createBooking(user._id, bookingTitle, bookingTime)
            .then(booking => {

                assert(booking.title === bookingTitle)
                assert(booking.userId === user._id)
                assert(booking.time === bookingTime)

                bookingObj = booking;

                done()
            })
    })
})

describe('List documents', done => {
    it('list a booking', done => {

        BookingService.listBookings(user._id)
            .then(bookings => {

                assert(Array.isArray(bookings))
                assert(bookings.length === 1)

                done()
            })
    })
})


describe('Deleting documents', done => {
    it('deletes a booking', done => {

        BookingService.deleteBooking(user._id, bookingObj._id)
            .then(response => {
                assert(response.isDeleted)
                done();
            })
    })
})