const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(allBlogs)
})

blogsRouter.post('/',  async (request, response) => {
  const body = request.body
  // const token = tokenExtractor(request)
  // console.log('Is there a token?', request.token)
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // TokenExtraction is being done by the middlware 

  if(!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user
  
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes,
  })

  // console.log('the new blog object: ', newBlog)

  // checks if the body has a title and a url
  if(Object.prototype.hasOwnProperty.call(body, 'title') && Object.prototype.hasOwnProperty.call(body, 'url')){
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
  else {
    response.status(400).end()
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const oneBlogs = await Blog.findById(request.params.id)
  response.json(oneBlogs)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { ...body, likes: body.likes }, { new: true })
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  // const body = request.body
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  // console.log('Blog Object', blog)
  // console.log('User Object', user)

  if(blog.user._id.toString() === user._id.toString()){
    // console.log('blog was deleted')
    blog.delete()
    return response.status(204).end()
  }
  else{
    // console.log('blog was not deleted')
    return response.status(401).json({ error: 'Only the owner can delete this blog' })
  }
})

module.exports = blogsRouter