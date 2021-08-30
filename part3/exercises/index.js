const express = require('express')
const app = express()
const moment = require('moment')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/mongo')

app.use(express.json())

app.use(cors())

morgan.token('type', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})

app.use(morgan(':method :url :status :type'))

app.get('/', (req, res) => {
  res.send('WELCOMEE')
})

app.get('/api/people', (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
  })
})

app.get('/info', (req, res) => {
  var timestamps = moment().format()
  Person.count({}, function (error, numOfDocs) {
    console.log('I have ' + numOfDocs + ' documents in my collection')
    const html = `
        Phonebook has info for ${numOfDocs} people<br><br>
        ${timestamps}
        `
    res.send(html)
  })

})

app.get('/api/people/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
    .catch(err => next(err))
    /* const id = Number(req.params.id)
    const person = people.find(x => x.id === id)
    if (person) {
        res.json(person)
    } else {
        res.send(400).end()
    } */
})

app.delete('/api/people/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/people', (req, res, next) => {
  //const id = Math.random().toString(36).slice(2);
  const body = req.body
  console.log(body.content)

  if (!body.hasOwnProperty('name')) {
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
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(err => next(err))
})

app.put('/api/people/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedNumber => {
      res.json(updatedNumber)
    })
    .catch(err => next(err))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})