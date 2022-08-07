import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, []) //empty array means the effect is only executed only when the component is rendered for the first time

  // console.log('render', notes.length, 'notes')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      //saves the user information in the browser. Javascripts object have to turn into a json object
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      noteService.setToken(user.token)
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception){
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  // const noteForm = () => (
  //   <Togglable buttonLabel='newNote' ref={noteFormRef}>
  //     <NoteForm createNote={addNote}/>
  //   </Togglable>
  // )

  const notesToShow = showAll
    ? notes //if condition true
    : notes.filter(note => note.important === true) //if conditon is false

  const toggleImportanceOF = (id) => {
    // const url = `http://localhost:3001/notes/${id}`
    // eslint-disable-next-line eqeqeq
    const note = notes.find(n => n.id == id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note: returnedNote))
      })
      .catch (error =>  {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notificationMessage = () => (
    <Notification message={errorMessage} />
  )

  return (
    <div>
      <h1>Notes</h1>

      {errorMessage !== '' && notificationMessage()}

      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>:
        <div>
          <p>{user.name} logged in</p>
          {/* {noteForm()} */}
          <Togglable buttonLabel='newNote' ref={noteFormRef}>
            <NoteForm createNote={addNote}/>
          </Togglable>
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOF(note.id)}
          />
        )}
      </ul>

      <h1>By Paul A. Osorio</h1>
    </div>
  )
}

export default App