require('./test-helper')

const assert = require('assert')
const UserService = require('../src/services/user-service')

const userEmail = 'user@test.com'
const userPassword = '1234'
const isUserAdmin = true

let userObj

function assertHelper(user) {
    assert(user)
    assert(user.email === userEmail)
    assert(user.isAdmin === isUserAdmin)
}

describe('User mocha test', () => {
    it('creates a user', done => {

        UserService.createUser(userEmail, userPassword, isUserAdmin)
            .then(user => {

                assertHelper(user)
                assert(user.comparePassword(userPassword))

                userObj = user
                done()
            })
            .catch(error => {
                console.log(error.message)
                done()
            })
    })

    it('finds a user', done => {

        UserService.findById(userObj._id)
            .then(user => {
                assertHelper(user)
                done()
            })
            .catch(error => {
                console.log(error.message)
                done()
            })
    })

    it('authenicate a user', done => {

        UserService.authenticate(userObj.email, userPassword)
            .then(user => {

                assertHelper(user)
                done()
            })
            .catch(error => {
                console.log(error.message)
                done()
            })
    })

    it('delete user', done => {

        UserService.deleteUser(userObj._id)
            .then(user => {

                assert(!!(user))
                done()
            })
            .catch(error => {
                console.log(error.message)
                done()
            })
    })
})