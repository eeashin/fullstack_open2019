const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('blogs api init', () => {
  test('blogs are returned as json', async () => {
    api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('GET /blogs', () => {
  test('body.length', async () => {
    const response = await api.get('/api/blogs').expect(200)
    expect(response.body.length).toBe(4)
  })
  test('has id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})



afterAll(() => {
  mongoose.connection.close()
})