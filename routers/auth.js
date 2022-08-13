const { application } = require('express')
const express = require('express')
const router = express.Router()
const Account = require('../models/Account')

router.post('/login', async (req, res) => {
    const loginAccount = await Account.findOne({"username" : req.body.username, "password" : req.body.password})
    if (loginAccount !== null) {
        res.status(200).json({userId: loginAccount._id})
    } else {
        res.status(404).json({message: "Not Found"})
    }
})

router.post('/signup', async (req, res) => {
    const check = await Account.find({"username": req.body.username})
    if (check.length > 0) {
        return res.status(406).json({message: "Username already in use"})
    }

    const account = new Account({
        username: req.body.username,
        password: req.body.password
    })

    try {
        const saveAccount = await account.save()
        res.status(200).json(saveAccount)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})


module.exports = router