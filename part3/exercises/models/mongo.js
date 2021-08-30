const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, unique: true },
  number: { type: Number, minlength: 8 ,required: true },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

/* const db = mongoose.connection;
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
}); */

module.exports = mongoose.model('Person', personSchema)