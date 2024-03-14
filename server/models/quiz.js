const mongoose = require('mongoose')

// Quiz schema
const quizSchema = new mongoose.Schema({
  name: String,
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  ],
  highest_score: Number
})

quizSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz