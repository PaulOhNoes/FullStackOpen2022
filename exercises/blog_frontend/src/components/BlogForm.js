import { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // const handleChange = (event) => {
  //   setNewBlog(event.target.value)
  // }

  console.log(JSON.parse(window.localStorage.getItem('blogAppUser')).username)

  const addNewBlog = (event) => {
    event.preventDefault()

    createNewBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addNewBlog}>
      <div>
        title:
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}>
        </input>
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}>
        </input>
      </div>
      <div>
        url:
        <input
          type='url'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}>
        </input>
      </div>
      <button type='submit'>Create a new blog</button>
    </form>
  )
}

export default BlogForm