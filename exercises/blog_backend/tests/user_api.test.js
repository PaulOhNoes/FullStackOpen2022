const mongoose = require('mongoose')
const supertest = require('supertest')
// const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({}) //delete all Users in the test database

  const initialUsers = [{
    username: 'Superman12',
    name: 'Superman',
    password: await bcrypt.hash('supermanpassword', 10),
  },
  {
    username: 'LuxOfLeague',
    name: 'Lux',
    password: await bcrypt.hash('demacia123', 10)
  },
  ]

  const userObjects = initialUsers.map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())

  await Promise.all(promiseArray)
})

test('Retrieving a list of all users', async () => {
  const allUsers = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
  
  expect(allUsers.body).toHaveLength(2)
})

test('Creating a new user', async () => {
  const usersAtStart = await User.find({})

  // console.log('How many user do we start with: ', usersAtStart.length)

  const user1 = {
    username: 'testUser',
    name: 'testUser',
    password: 'password',
  }

  await api.post('/api/users').send(user1).expect(201)

  const usersAtEnd = await User.find({})

  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
})

test('Adding an invalid user', async () => {
  const invalidUser1 = {
    username: 'i',
    name: 'invalidUser',
    password: 'password',
  }

  await api.post('/api/users').send(invalidUser1).expect(400)

  const invalidUser2 = {
    username: 'invalidUser',
    name: 'invalidUser2',
    password: 'pa',
  }

  await api.post('/api/users').send(invalidUser2).expect(400)

  const invalidUser3 = {
    username: 'in',
    name: 'invalidUser2',
    password: 'p',
  }

  await api.post('/api/users').send(invalidUser3).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
}, 100000) //incase the tests takes longer than the default (5000ms)