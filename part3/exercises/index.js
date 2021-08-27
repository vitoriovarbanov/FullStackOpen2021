const express = require('express')
const app = express()
const moment = require('moment')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())

app.use(cors())

morgan.token('type', function (req, res) {
    if(req.method==='POST'){
        return JSON.stringify(req.body)
    }
})

app.use(morgan(':method :url :status :type'))

let people = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "00-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send(`WELCOMEE`)
})

app.get('/api/people', (req, res) => {
    res.json(people)
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
    const id = Number(req.params.id)
    const person = people.find(x => x.id === id)
    if (person) {
        res.json(person)
    } else {
        res.send(400).end()
    }
})

app.delete('/api/people/:id', (req, res) => {
    const id = Number(req.params.id)
    people = people.filter(x => x.id !== id)
    res.send(204).end()
})

app.post('/api/people', (req, res) => {
    const id = Math.random().toString(36).slice(2);
    const body = req.body
    console.log(body.content)

    if (!body.hasOwnProperty("name")) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const newPerson = { ...req.body, id }

    const duplicatedName = people.find(x => x.name === newPerson.name)
    if (duplicatedName) {
        return res.status(400).json({
            error: 'The name is already existing in the phonebook!'
        })
    }

    people = people.concat(newPerson)
    res.json(newPerson)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})