var authorizationController = require('./authorization-controller');
var usersController = require('./users-controller');
var bookingsController = require('./bookings-controller')
var attendeesController = require('./attendees-controller')

const jwtConfig = require('../config/jwt-config')
const jwtCheckMiddleware = require('../middleware/jwt-check-middleware')

function exposeAppRoutes(pathPrefix, app) {

    //Check jwt token middleware
    app.use(jwtCheckMiddleware().unless({path: jwtConfig.jwtIgnoreUrls}))

    app.use(pathPrefix, authorizationController)
    app.use(pathPrefix, usersController)
    app.use(pathPrefix, bookingsController)
    app.use(pathPrefix, attendeesController)
}

module.exports = {
    exposeAppRoutes
}