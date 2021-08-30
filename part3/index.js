const express = require('express')
const app = express()
require('dotenv').config()
const Note = require('./models/note')

app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)



app.get('/', (req, res) => {
    res.send(`WELCOMEE`)
})

app.get('/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res, next) => {
    Note.findById(req.params.id).then(note => {
        if (note) {
            res.json(note)
        } else {
            res.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

/* const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
} */

app.post('/api/notes', (req, res, next) => {
    const body = req.body
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        res.json(savedNote)
    })
        .catch(err => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server listening on port ${PORT}`)