const supertest = require("supertest")
const mongoose = require("mongoose")
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./blogs_helper')

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