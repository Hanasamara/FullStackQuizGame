const express = require('express')
const quizRouter = express.Router()

/**
 * Import mongoose models
 */
const Person = require('../models/person')
const Quiz = require('../models/quiz')
const Question = require('../models/question')

/**
 * @receives a GET request to the URL: http://localhost:3001/api/quizes/about
 * @returns a basic message
 */
quizRouter.get('/about', async (request, response) => {
  response.json({
    message: 'First endpoint for quizes router'
  })
})

/**
 * @receives a request to the URL: http://localhost:3001/api/quizes
 * @returns bulk quizes list as a JSON
 */
quizRouter.get('/', async (request, response) => {
  const quizes = await Quiz.find({})
  response.json(quizes)
})

/**
 * @receives a GET:id request to the URL: http://localhost:3001/api/quizes/:id
 * @returns a specific basket 
 */
quizRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const quiz = await Quiz.findById(id).populate('questions')
  response.json(quiz)
})

/**
 * @receives a POST request to the URL: http://localhost:3001/api/quiz:id
 * Note: The :id required is the id of the PERSON the quiz should belong to
 * @returns the newly created Quiz
 */
quizRouter.post('/:id', async (request, response) => {
  // Get fields
  const personId = request.params.id
  const { name } = request.body
  const highest_score = 0
  console.log(name,highest_score)
  // Error handling
  if (name == undefined) {
    return response.status(400).send({
      error: 'missing content in body'
    })
  }
  const user = await Person.findById(personId)
  if (!user) {
    return response.status(400).send({
      error: 'no such user exists to add the quiz to'
    })
  }
  // Create new Quiz and save it
  const quiz = new Quiz({
    name,
    highest_score
  })
  const savedQuiz = await quiz.save()
  // Add the quiz to the user
  user.quizes = user.quizes.concat(savedQuiz._id)
  await user.save()
  // Return the saved quiz
  response.status(201).send(savedQuiz)
})

/**
 * @receives a DELETE request to the URL: http://localhost:3001/api/quiz/:id
 * Note: The :id required is the id of the Quiz we want to delete
 * You should pass the person id in the request body
 * @returns an appropriate status code
 */
quizRouter.delete('/:id', async (request, response) => {
  // Get fields
  const quizId = request.params.id
  const { personId } = request.body

  if (!personId) {
    return response.status(400).send({
      error: 'personId not define'
    })
  }

  // Check if the person exists
  const person = await Person.findById(personId)
  if (!person) {
    return response.status(400).send({
      error: 'no such person exists to remove the quiz from'
    })
  }

  // remove questions the remove quizes
  // Get the questions we need to remove and remove them
  const questionIds = (await Quiz.findById(quizId)).questions.map(id => id.toJSON())
  // will handle all promises requests
  await Promise.all(questionIds.map(id => Question.findByIdAndDelete(id)))

  // Remove the Quiz on its own and from the user
  await Quiz.findByIdAndDelete(quizId)
  person.quizes = person.quizes.filter(id => id.toJSON() !== quizId)
  await person.save()
  response.status(200).send()
})

module.exports = quizRouter