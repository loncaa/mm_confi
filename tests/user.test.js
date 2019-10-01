const assert = require('assert')
const UserService = require('../src/services/user-service')

const userEmail = 'user@test.com'
const userPassword = '1234'
const isUserAdmin = true

let userObj

function assertHelper(user) {
    assert(user.email === userEmail)
    assert(user.comparePassword(userPassword))
    assert(user.isAdmin === isUserAdmin)
}

describe('Creating document', done => {
    it('creates a user', done => {

        UserService.create(userEmail, userPassword, isUserAdmin)
            .then(user => {

                assertHelper(user)
                userObj = user
                done()
            })
    })
})

describe('Fetch document', done => {
    it('finds a user', done => {

        UserService.findById(userObj._id)
            .then(user => {

                assertHelper(user)
                done()
            })
    })
})

describe('Check document', done => {
    it('authenicate a user', done => {

        UserService.authenticate(userObj.email, userObj.password)
            .then(user => {

                assertHelper(user)

                done()
            })
    })
})