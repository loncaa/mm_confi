const nodemailerHelper = require('../helpers/nodemailer-helper')

function sendMail(to, code){

    const options = {
        from: nodemailerHelper.config.email,
        to: to,
        subject: `Confirmation code`,
        test: `Your confirmatoin code for conference is: ${code}`
    }

    return nodemailerHelper.sendMail(options)
}

module.exports = {
    sendMail
}