import PhonebookRecord from "./PhoneBookRecord"
import personsService from '../services/Persons'
// import terminateRecord from "../App"

const PhonebookResults = ({filterPersons, persons, setPersons, setNotificationMessage, setNotificationMessageStyle}) => {
  const terminateRecord = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      personsService.terminate(person.id)
      .then(setPersons(persons.filter( p=> p.id !== person.id )))
      .catch(error => {
        setNotificationMessageStyle('error')
        setNotificationMessage(
          `Information of ${person.name} has already been removed from server`
        )
        setTimeout( () => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
    
  }

    return (
      <div>
        <h2>Numbers</h2>
        <ul>
          {filterPersons.map(person =>
              <PhonebookRecord key={person.id} person={person} terminateRecord={() => terminateRecord(person)}/> 
            )}
        </ul>
      </div>
      
    )
  }

export default PhonebookResults