import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationMessageStyle, setNotificationStyle] = useState('')

  const blogFormRef = useRef()

  console.log(blogs)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      // setBlogs( blogs )
      setBlogs(blogs.sort((a,b) => a.likes-b.likes).reverse())
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogAppUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      // console.log(user)
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setNotificationMessage(`Welcome back ${user.name}!`)
      setNotificationStyle('success')
      setUsername('')
      setPassword('')
      setTimeout( () => {
        setNotificationMessage('')
      }, 5000)
    }
    catch (exception) {
      console.log('Something went wrong when logging in: ', exception)
      setNotificationMessage('Wrong Credentials')
      setNotificationStyle('error')
      setTimeout( () => {
        setNotificationMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUser')
    // window.location.reload() //refresh page after logging out
    setUser(null)
    setNotificationMessage('User has logged out!')
    setNotificationStyle('success')
    setTimeout( () => {
      setNotificationMessage('')
    }, 5000)
  }

  const deleteBlog = (blogId) => {
    blogService
      .destroy(blogId)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== blogId))
        setNotificationMessage('Blog deleted!')
        setNotificationStyle('success')
        setTimeout( () => {
          setNotificationMessage('')
        }, 5000)
      })
      .catch(() => {
        setNotificationMessage('Only owners of the blog can delete')
        setNotificationStyle('error')
        setTimeout( () => {
          setNotificationMessage('')
        }, 5000)
      })
  }

  const addNewBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try{
      blogService.create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNotificationMessage('A new blog created!')
          setNotificationStyle('success')
          setTimeout( () => {
            setNotificationMessage('')
          }, 5000)
        })
        .catch( () => {
          setNotificationMessage('Blog could not be created! Make sure all inputs are filled!')
          setNotificationStyle('error')
          setTimeout( () => {
            setNotificationMessage('')
          }, 5000)
        })
    }
    catch (exception) {
      console.log('Something went wrong when adding a new note: ', exception)
      setNotificationMessage('Blog could not be created!')
      setNotificationStyle('error')
      setTimeout( () => {
        setNotificationMessage('')
      }, 5000)
    }
  }

  if (user === null){
    return (
      <div>
        { notificationMessage !== '' && <Notification message={notificationMessage} style={notificationMessageStyle}/>}
        <h2>Blogs Application</h2>
        <h3>Please log in to the application</h3>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='username'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}>
            </input>
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}>
            </input>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }
  else {
    return (
      <div>
        { notificationMessage !== '' && <Notification message={notificationMessage} style={notificationMessageStyle}/>}
        <h3>{user.name} logged-in</h3> <button onClick={handleLogout}>Logout</button>
        <h3>All blogs</h3>
        {blogs
          .map(blog =>
            <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
          )}
        <h3>Create new blog</h3>
        <Togglable buttonLabel='newBlog' ref={blogFormRef} showInTheBeginning={false}>
          <BlogForm createNewBlog={addNewBlog}/>
        </Togglable>
      </div>
    )
  }
}

export default App
