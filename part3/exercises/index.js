const express = require('express')
const app = express()
const moment = require('moment')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/mongo')

app.use(express.json())

app.use(cors())

morgan.token('type', function (req, res) {
    if(req.method==='POST'){
        return JSON.stringify(req.body)
    }
})

app.use(morgan(':method :url :status :type'))

app.get('/', (req, res) => {
    res.send(`WELCOMEE`)
})

app.get('/api/people', (req, res) => {
    Person.find({}).then(person => {
        res.json(person)
      })
})

app.get('/info', (req, res) => {
    var timestamps = moment().format()
    const html = `
    Phonebook has info for ${people.length} people<br><br>
    ${timestamps}
    `
    res.send(html)
})

app.get('/api/people/:id', (req, res) => {
    Person.findById(req.params.id).then(person=>{
        res.json(person)
    })
    /* const id = Number(req.params.id)
    const person = people.find(x => x.id === id)
    if (person) {
        res.json(person)
    } else {
        res.send(400).end()
    } */
})

app.delete('/api/people/:id', (req, res) => {
    const id = Number(req.params.id)
    people = people.filter(x => x.id !== id)
    res.send(204).end()
})

app.post('/api/people', (req, res) => {
    //const id = Math.random().toString(36).slice(2);
    const body = req.body
    console.log(body.content)

    if (!body.hasOwnProperty("name")) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

   /*  const duplicatedName = people.find(x => x.name === newPerson.name)
    if (duplicatedName) {
        return res.status(400).json({
            error: 'The name is already existing in the phonebook!'
        })
    } */
    person.save().then(savedPerson=>{
        res.json(savedPerson)
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})