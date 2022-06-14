import {useState, useEffect} from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  console.log('render', notes.length, 'notes')

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) =>{
    event.preventDefault() //prevents the default action of submitting form (not reload page)
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    //append data to the json server
    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const notesToShow = showAll
    ? notes //if condition true
    : notes.filter(note => note.important === true) //if conditon is false

  const toggleImportanceOF = (id) => {
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id == id)
    const changedNote = {...note, important: !note.important }
    
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

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
      <form onSubmit={addNote}>
          <input
           value={newNote}
           onChange={handleNoteChange}
           />
          <button type="submit">save</button>
      </form>
      <h1>By Paul A. Osorio</h1>
    </div>
  )
}

export default App