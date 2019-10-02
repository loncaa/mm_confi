var authorizationController = require('./authorization-controller');
var usersController = require('./users-controller');
var bookingsController = require('./bookings-controller')
var attendeesController = require('./attendees-controller')

const jwtConfig = require('../config/jwt-config')
const jwtCheckMiddleware = require('../middleware/jwt-check-middleware')

function connectRoutes(path, app) {

    //Check jwt token middleware
    app.use(jwtCheckMiddleware().unless({path: jwtConfig.jwtIgnoreUrls}))

    app.use(path, authorizationController)
    app.use(path, usersController)
    app.use(path, bookingsController)
    app.use(path, attendeesController)
}

module.exports = {
    connectRoutes
}