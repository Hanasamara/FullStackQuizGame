const mongoose = require('mongoose')

// Question schema
const questionSchema = new mongoose.Schema({
  questionName: String,
  options: [
    {
        type: String
    }
  ],
  correct_answer: String,
  points: Number
})

questionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question