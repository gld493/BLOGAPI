const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true

    },

    password: {
        type:String,
        required: [true, 'Please add a password']
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "admin"]
    },
    profile_img:{

        type:String,

    },

   

}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)