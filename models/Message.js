const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createAt:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Message', MessageSchema)