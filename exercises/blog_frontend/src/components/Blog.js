import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, deleteBlog }) => {
  const [visible, setVisible] = useState(true)
  const [likes, setLikes] = useState(Number(blog.likes))

  const username = JSON.parse(window.localStorage.getItem('blogAppUser')).username

  const displayRemoveButton = () => {
    if(username === blog.user.username){
      return (
        <p>
          <button onClick={removeBlog}>remove</button>
        </p>
      )
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }

  const addOneLike = (event) => {
    event.preventDefault()

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
    }
    blogService
      .update(blogObject, blog.id)
      .then(returnedBlog => setLikes(Number(returnedBlog.likes)))
      .catch(err => {
        console.log('The blog data: ', blog, ' and the response data: ', err)
      })

  }

  if (visible){
    return(
      <div className='blogStyle'>
        <p>{blog.title} - {blog.author} <button onClick={toggleVisibility}>view</button></p>
      </div>
    )
  }
  else{
    return(
      <div className='blogStyle'>
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {likes} <button onClick={addOneLike}>like</button></p>
        <p>{blog.author}</p>
        {console.log('blog username: ', blog.user.username, 'user: ', JSON.parse(window.localStorage.getItem('blogAppUser')).username)}
        {displayRemoveButton()}
      </div>
    )
  }
}

export default Blog