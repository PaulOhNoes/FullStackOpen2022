const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({}) //delete all blogs in the test database

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  
  await Promise.all(promiseArray)
})

test('async get request of all blogs', async () => {
  // console.log('Getting all blogs')

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('check if id property is there', async () => {
  const blog = await Blog.findOne({}) //defaults to retrieve a random blog
  expect(blog.id).toBeDefined() //checks if the id property is defined
})

test('verify adding a new blog works', async () => {
  const newBlog = {
    title: 'testing new blog 4',
    author: 'test admin',
    url: 'https://www.google.com',
    likes: 12,
  }

  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  
  const blogs = await Blog.find({})

  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
})

test('verify if the likes property is missing from the request, it will default to 0', async () => {
  const newBlog = {
    title: 'testing new blog 5',
    author: 'test admin',
    url: 'https://www.google.com',
  }

  const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBeDefined()
  expect(Number(response.body.likes)).toBe(0)
})

test('verify if adding a new blog w/o a title and url properties will return a 400 bad request', async () => {
  const newBlog = {
    author: 'test admin',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('verify updating a blog works', async () => {
  const randomBlog = await Blog.findOne({}) //picks a random blog
  const processedBlog = JSON.parse(JSON.stringify(randomBlog)) // parses the random blog object and removes all the extra content
 
  const response = await api.put(`/api/blogs/${randomBlog.id}`).send({ ...processedBlog, likes: 1000 }).expect(200)

  // console.log('random blog likes: ', randomBlog.likes)
  // console.log('response blog likes: ', response.body.likes)

  expect(response.body.likes).not.toBe(randomBlog.likes)
})

test('verify adding a new blog with a new user works', async () => {
  const newBlog = {
    title: 'testing new blog 4',
    author: 'test admin',
    url: 'https://www.google.com',
    likes: 12,
  }

  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  
  const findNewBlog = await Blog.findOne({ title: 'testing new blog 4' })

  console.log(findNewBlog)

  expect(findNewBlog.title).toContain('testing new blog 4')
  expect(findNewBlog.user).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
}, 100000) //incase the tests takes longer than the default (5000ms)