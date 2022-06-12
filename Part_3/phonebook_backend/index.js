//exercises 3.1 - 3.7
const express = require('express')
let morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))



// generates an id between 0 and 1000
const generateId = () => {
    const newId = Math.floor(Math.random() * 1000)
    console.log(newId)
    return newId
}

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]
app.get('/info', (request, response) => {
    const numOfPeople = persons.length
    const date = new Date()
    
    console.log(numOfPeople, date)

    const template = `<h1>Phonebook has info for ${numOfPeople} people.</h1>
                    <h1>${date}</h1>`

    response.send(template)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if(!person){
        response.status(404).end()
    }
    else {
        response.json(person)
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log("hello")
    
    if (!body.name && !body.number) {
        return response.status(400).json ({
            error: 'content missing'
        })
    }

    console.log(body)

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number, 
    }

    console.log(person)

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(202).end()
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Phonebook backend application is running on port ${PORT}!`)
})