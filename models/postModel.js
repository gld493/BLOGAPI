const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add title']
    },

    article: {
        type: String,
        required: [true, 'Please add article']
    }
})

module.exports = mongoose.model('Post', postSchema)