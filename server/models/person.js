const mongoose = require('mongoose')


const personSchema = new mongoose.Schema({
  name: String,
  passwordHash: String,
  quizes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    }
  ]
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // password hash should not be returned
    delete returnedObject.passwordHash
  }
})

const Person = mongoose.model('Person', personSchema)
module.exports = Person