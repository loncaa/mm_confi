const nodemailer = require('nodemailer')
const mailerConfig = require('../config/nodemailer-config')

const transport = nodemailer.createTransport({
    service: mailerConfig.service,
    auth: {
        user: mailerConfig.user,
        password: mailerConfig.password
    }
})

transport.config = mailerConfig

module.exports = transport