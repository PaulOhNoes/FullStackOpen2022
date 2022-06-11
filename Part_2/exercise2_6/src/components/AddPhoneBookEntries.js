import { useState } from 'react'
import personsService from '../services/Persons'
const AddPhonebookEntries = ({persons, setPersons, setNotificationMessage, setNotificationMessageStyle}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
  
    const addNewPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber,
      }
  
      // Checks if a name already exist and alerts the user
      if (persons.some( (person) => person.name === newName)){

        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const duplicatePerson = persons.find(person => person.name === newName)
          const changePerson = {...duplicatePerson, number: newNumber}

          personsService.update(duplicatePerson.id, changePerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== duplicatePerson.id ? p: returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNotificationMessageStyle('error')
            setNotificationMessage(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout( () => {
              setNotificationMessage(null)
            }, 5000)
          })
        }
      }
      else {

        personsService.create(personObject)
        .then(returnedPersons => {

          setNotificationMessageStyle('success')
          setNotificationMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)

          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewNumber('')
        })
      }
    }
  
    const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
    }
  
    const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
    }
  
    return (
      <div>
        <h2>Add a new person</h2>
        <form onSubmit={addNewPerson}>
          <div>
            name: <input 
                    value={newName}
                    onChange={handleNameChange}
                  />
          </div>
          <div>
            number: <input 
                    value={newNumber}
                    onChange={handleNumberChange}
                  />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }

export default AddPhonebookEntries