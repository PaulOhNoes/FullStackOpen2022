const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log(`Please provide the password as an argument: node mongo.js <password>`)
    process.exit(1)
}

const password = process.argv[2]
const database = 'test'
const url = `mongodb+srv://PaulOhNoes:${password}@cluster0.al55m.mongodb.net/${database}?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model(`Note`, noteSchema)

// mongoose.connect(url).then((result) => {
//     console.log('connected')

//     const note = new Note({
//         content: `Cheese is really cool`,
//         date: new Date(),
//         important: false,
//     })

//     return note.save()
// }).then(() => {
//     console.log('note saved!')
//     return mongoose.connection.close()
// }).catch((err) => {
//     console.log(err)
// })

mongoose.connect(url).then(result => {
    console.log(`connected!`)

    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}).then(() => {
    console.log(`disconnected!`)
}).catch(err => {
    console.log(`error!`)
})




