const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://vitorio00:${password}@cluster0.gkvm0.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  if (process.argv[3] === undefined || process.argv[4] === undefined) {
    Person
      .find({})
      .then(persons => {
        persons.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
  }

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
});
