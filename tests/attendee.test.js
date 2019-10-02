require('./test-helper')

const assert = require('assert')

const UserService = require('../src/services/user-service')
const BookingService = require('../src/services/booking-service')
const AttendeeService = require('../src/services/attendee-service')

let firstname = 'John'
let lastname = 'Doe'
let email = 'john.doe@gmail.com'
let phone = '+385'

let bookingObj
let attendeeObj

function assertHelper(attendee) {
    assert(attendee)
    assert(attendee.firstname === firstname)
    assert(attendee.lastname === lastname)
    assert(attendee.email === email)
    assert(attendee.phone === phone)
}

before(done => {
    UserService.createUser('user@email.com', '1234', true)
        .then(user => {

            assert(user)

            BookingService.createBooking(user._id, 'Title', new Date())
                .then(booking => {

                    assert(booking)

                    bookingObj = booking

                    done()
                })
        })
})

describe('Attendee mocha test', () => {

    it('set attendee to booking', done => {

        AttendeeService.addAttendee(bookingObj._id, firstname, lastname, email, phone)
            .then(attendee => {

                assertHelper(attendee)

                attendeeObj = attendee

                done()
            })
    })

    it('set attendee code', done => {

        const code = `C${bookingObj._id}${attendeeObj._id}`

        AttendeeService.setAttendeeCode(attendeeObj._id, code)
            .then(updated => {
                assert(updated.ok)

                attendeeObj.code = code
                done()
            })
    })

    it('list attendees of booking', done => {

        AttendeeService.listAttendees(bookingObj._id)
            .then(attendees => {

                assert(Array.isArray(attendees))
                assert(attendees.length === 1)
                assertHelper(attendees[0])

                done()
            })
    })

    it('remove attendee from booking', done => {

        AttendeeService.deleteAttendee(attendeeObj._id)
            .then(attendee => {

                assert(!!(attendee))

                done()
            })
    })
})