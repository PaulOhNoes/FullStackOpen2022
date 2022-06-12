// Phonebook Exercise 2.6-2.11, 2.15-2.18
import { useState, useEffect } from 'react'
import personsService from './services/Persons'
import AddPhonebookEntries from './components/AddPhoneBookEntries'
import FilterInput from './components/FilterInput'
import PhonebookResults from './components/PhoneBookResults'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationMessageStyle, setNotificationStyle] = useState('success')

  useEffect(() => {
    console.log('Start of the useEffect')
    personsService.getAll()
    .then((returnedPersons) => {
      setPersons(returnedPersons)
      console.log("Promise fulfilled. Data from json server retrived")
    })
  },[])

  
  console.log("Render component first. UseEffect after.")

  // Returns a new array either the full phone book or a filter one
  const filterPersons = newFilter
    ? persons.filter(person => person.name.includes(newFilter)) //If true return this array
    : persons //If false return this array

  return (
    <div>
      <Notification message={notificationMessage} style={notificationMessageStyle}/>
      <FilterInput newFilter={newFilter} setNewFilter={setNewFilter}/>

      <AddPhonebookEntries persons={persons}
        setPersons={setPersons}
        setNotificationMessage={setNotificationMessage}
        setNotificationMessageStyle={setNotificationStyle}/>

      <PhonebookResults filterPersons={filterPersons}
      persons={persons}
      setPersons={setPersons}
      setNotificationMessage={setNotificationMessage}
      setNotificationMessageStyle={setNotificationStyle}/>

      <h1>Made by Paul A. Osorio</h1>

    </div>
  )
}

export default App