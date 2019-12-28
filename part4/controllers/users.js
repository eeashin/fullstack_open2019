const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs',{title:1, author:1, url:1})
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {

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