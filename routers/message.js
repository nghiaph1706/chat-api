const { application } = require('express')
const express = require('express')
const router = express.Router()
const Message = require('../models/Message')

router.get('/:roomId', async (req, res) => {
    try {
        const messages = await Message.find({"roomId": req.params.roomId})
        res.status(200).json(messages)
    } catch (err) {
        res.status(404).json({ message: err })
    }
})

router.post('/', async (req, res) => {
    const message = new Message({
        roomId: req.body.roomId,
        sender: req.body.sender,
        text: req.body.text,
        createAt: req.body.createAt
    })

    try {
        const saveMessage = await message.save()
        const messages = await Message.find({"roomId": req.body.roomId})
        res.status(200).json(messages)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

module.exports = router