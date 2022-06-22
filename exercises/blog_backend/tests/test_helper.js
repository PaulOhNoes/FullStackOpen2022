const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'test blog 1',
    author: 'admin',
    url: 'https://www.google.com',
    likes: 3
  },
  {
    title: 'test blog 2',
    author: 'admin',
    url: 'https://www.google.com',
    likes: 5
  },
  {
    title: 'test blog 3',
    author: 'admin',
    url: 'https://www.google.com',
    likes: 32
  },
]

const nonExisitingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'fale author',
    url: 'nowhere.com',
    likes: 0,
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, nonExisitingId, usersInDb
}