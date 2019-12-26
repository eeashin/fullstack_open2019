const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    const users = await User.find({})
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {

    const body = request.body
    if (!body.password) {
        res.status(400).send("password is missing")
    } else if (body.password && body.password.length < 3) {
        res.status(400).send("Password length must 3 character")
    } else {
        try {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)

            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash
            })

            const savedUser = await user.save()

            response.json(savedUser)
        } catch (err) {
            next(err)
        }
    }
})

module.exports = usersRouter