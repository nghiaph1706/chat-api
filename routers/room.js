const { application } = require('express')
const express = require('express')
const router = express.Router()
const Room = require('../models/Room')

router.get('', async (req, res) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

router.get('/:roomId', async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId)
        res.status(200).json(room)
    } catch (err) {
        res.status(404).json({ message: err })
    }
})

router.get('/userId/:userId', async (req, res) => {
    try {
        const rooms = await Room.find({members: req.params.userId})
        res.status(200).json(rooms)
    } catch (err) {
        res.status(404).json({ message: err })
    }
})

router.post('/', async (req, res) => {
    const room = new Room({
        members: req.body.members
    })

    try {
        const saveRoom = await room.save()
        res.status(200).json(saveRoom)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

router.put('/:roomId', async (req, res) => {
    try {
        const updateRoom = await Room.updateOne(
            { _id: req.params.roomId },
            {
                $set: {
                    members: req.body.members
                }
            })
        res.status(200).json(updateRoom)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

router.delete('/:roomId', async (req, res) => {
    try {
        const removeRoom = await Room.remove({ _id: req.params.roomId })
        res.status(200).json(removeRoom)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

module.exports = router