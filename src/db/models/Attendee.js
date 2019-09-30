//firstname, lastname, email and phone number
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendeeSchema = new Schema({
        bookingId: {
            type: Schema.Types.ObjectId,
            require: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true
        },
        code: {
            type: String,
            unique: true
        },
    },
    {
        timestamps: true,
        strict: false
    })

module.exports = mongoose.model("Attendee", AttendeeSchema)