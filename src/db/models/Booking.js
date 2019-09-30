const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            require: true
        },
        title: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            require: true
        }
    },
    {
        timestamps: true,
        strict: false,
        toJSON: {virtuals: true}
    })

BookingSchema.virtual('attendees', {
    ref: 'Attendee',
    localField: '_id',
    foreignField: 'bookingId',
    justOne: false
})

module.exports = mongoose.model("Booking", BookingSchema)