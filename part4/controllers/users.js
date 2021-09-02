const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1 })

    res.send(users)
})

usersRouter.post('/register', async (req, res, next) => {
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

usersRouter.post('/login', async (req, res, next) => {
    const body = req.body

    const user = await User.findOne({ username: body.username })
    const correctPass = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

    if (!user || !correctPass) {
        return res.status(401).json({ error: 'Username or password incorrect' })
    }


    const userToken = {
        username: body.username,
        id: user._id
    }

    const token = jwt.sign(userToken, process.env.SECRET)

    res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = usersRouter