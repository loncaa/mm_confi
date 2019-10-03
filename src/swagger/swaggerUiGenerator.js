const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./documentation')

function setupSwaggerDocumentation(app){
    app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
}

module.exports = {
    setupSwaggerDocumentation
}