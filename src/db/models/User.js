const bcrypt = require('bcrypt')
const jwtConfig = require('../../config/jwt-config')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        isAdmin: Boolean
    },
    {
        timestamps: true,
        strict: false,
        toJSON: {virtuals: true}
    }
)

UserSchema.virtual('bookings', {
    ref: 'Booking',
    localField: '_id',
    foreignField: 'userId',
    justOne: false
})

//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, jwtConfig.secret, { expiresIn: '24h' });
}

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password)
}

UserSchema.statics.authenticate  = function(email, password) {
    return this.findOne({email: email})
        .then(user => {

            if(!user) return Promise.reject({message: 'User doesent exists'})

            return user.comparePassword(password)
                .then(isMatch => {

                    if(!isMatch) return Promise.reject({message: 'Email or Password not correct.'})

                    return Promise.resolve(user)
                })
        })
}

//Hashing and salting password on save
UserSchema.pre('save', function(next) {
    var user = this

    if (!user.isModified('password')) {return next()};

    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
            return next(err)
        }

        user.password = hash
        next();
    })
})

module.exports = mongoose.model("User", UserSchema)