const supertest = require("supertest")
const mongoose = require("mongoose")
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./blogs_helper')

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})


const testUser =
{
    username: "Eashin",
    name: "Eashin Matubber",
    password: "password!"
}

beforeEach(async () => {

    await User.deleteMany({})
    const user = new User({
        username: "test1",
        name: "The Test1",
        password: "test1password"
    })
    await user.save()
});
describe('HTTP GET', () => {
    test('get all users', async () => {
        await api.get('/api/users').expect(200);
    })
})

describe('HTTP POST', () => {

    test('User validation', async () => {
        const usersAtStart = await helper.usersInDb()
        await api
            .post('/api/users')
            .send(testUser)
            .expect(200)
        const getAllUsers = await helper.usersInDb()
        console.log(getAllUsers)
        expect(getAllUsers.length).toBe(usersAtStart.length + 1)

    })
    test('Username missing', async () => {
        const usersAtStart = await helper.usersInDb()
        const invalidUser =
        {
            username: "",
            name: "John Doe",
            password: "not"
        }
        const result = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
        expect(result.error.text).toContain('User validation failed: username: Path `username` is required.')
        const getAllUsers = await helper.usersInDb()
        expect(getAllUsers.length).toBe(usersAtStart.length)

    })

})
afterAll(() => {
    mongoose.connection.close();
}); 