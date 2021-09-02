const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})

    res.send(users)
})

usersRouter.post('/', async (req, res, next) => {
    const body = req.body

    if (!body.password || body.password.length < 3) {
        return res.status(400).json({ error: 'Password is required and length must be at least 3 symbols' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    try {
        const savedUser = await user.save();
        res.json(savedUser)
    } catch (err) {
        console.log(err)
        next(err)
    }


    
})

module.exports = usersRouter