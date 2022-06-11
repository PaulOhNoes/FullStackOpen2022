const PhonebookRecord = ({person, terminateRecord}) =>{
    return (
        <li>
            {person.name} {person.number} <button 
                onClick={terminateRecord}>
                delete</button>    
        </li>
    )
}

export default PhonebookRecord