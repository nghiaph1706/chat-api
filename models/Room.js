const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
    members: {
        type: Array,
        required: true
    },
    create: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Room', RoomSchema)