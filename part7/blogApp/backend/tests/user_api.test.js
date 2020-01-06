const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('User', () => {
  test('password missing', async () => {
    const userPassMissing = {
      username: 'passtest',
      name: 'Pass User',
      //password: 'password!'
    }
    await api
      .post('api/blogs/')
      .send(userPassMissing)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})