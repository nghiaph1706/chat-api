const { application } = require('express')
const express = require('express')
const router = express.Router()
const Account = require('../models/Account')

router.get('', async (req, res) => {
    try {
        const accounts = await Account.find()
        res.status(200).json(accounts)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

router.get('/:accountId', async (req, res) => {
    try {
        const account = await Account.findById(req.params.accountId)
        res.status(200).json(account)
    } catch (err) {
        res.status(404).json({ message: err })
    }
})

router.post('', async (req, res) => {
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

router.put('/:accountId', async (req, res) => {
    try {
        const updateAccount = await Account.updateOne(
            { _id: req.params.accountId },
            {
                $set: {
                    username: req.body.username,
                    password: req.body.password
                }
            })
        res.status(200).json(updateAccount)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

router.delete('/:accountId', async (req, res) => {
    try {
        const removeAccount = await Account.remove({ _id: req.params.accountId })
        res.status(200).json(removeAccount)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})


module.exports = router