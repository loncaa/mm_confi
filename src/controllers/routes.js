var authorizationRouter = require('./authorization-controller');
var usersRouter = require('./users-controller');
var bookingsRouter = require('./bookings-controller')

const jwtConfig = require('../config/jwt-config')
const jwtCheckMiddleware = require('../middleware/jwt-check-middleware')

function connectRoutes(path, app) {

    //Check jwt token middleware
    app.use(jwtCheckMiddleware().unless({path: jwtConfig.jwtIgnoreUrls}))

    app.use(path, authorizationRouter)
    app.use(path, usersRouter)
    app.use(path, bookingsRouter)
}

module.exports = {
    connectRoutes
}