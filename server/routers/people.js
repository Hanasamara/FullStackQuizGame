const bcrypt = require('bcryptjs')
const express = require('express')
const peopleRouter = express.Router()

/**
 * Import mongoose models
 */
const Person = require('../models/person')
const Quiz = require('../models//quiz')
const Question = require('../models/question')

/**
 * @receives a GET request to the URL: http://localhost:3001/api/people/about
 * @returns a basic message
 */
peopleRouter.get('/about', async (request, response) => {
  response.json({
    message: 'First endpoint for people router'
  })
})

/**
 * @receives a request to the URL: http://localhost:3001/api/people
 * @returns bulk person list as a JSON
 */
peopleRouter.get('/', async (request, response) => {
  const people = await Person.find({})
  response.json(people)
})

/**
 * @receives a GET:id request to the URL: http://localhost:3001/api/people/:id
 * @returns a specific person 
 */
peopleRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const person = await Person.findById(id).populate({
    path: 'quizes',
    populate: { path: 'questions' } // Populate questions within quizzes
  });
   // Check if person exists
   if (!person) {
    return response.status(404).send({
      error: 'person not found'
    });
  }
  response.json(person)
})

/**
 * @receives a POST request to the URL: http://localhost:3001/api/people
 * @returns the newly created person
 */
peopleRouter.post('/', async (request, response) => {
  // Get fields
  const { name, password } = request.body
  // Error handling
  if (!name || !password) {
    return response.status(400).send({
      error: 'missing content in body'
    })
  }
  // Check if person already exists
  const duplicateCount = await Person.countDocuments({ name }).exec()
  if (duplicateCount !== 0) {
    return response.status(400).send({
      error: 'name not available'
    })
  }
  // Perform hash
  const passwordHash = await bcrypt.hash(password, 10)
  // Create new person
  const person = new Person({
    name, passwordHash
  })
  // Update people and return resource
  const personResponse = await person.save()
  response.status(201).send(personResponse)
})

/**
 * @receives a DELETE request to the URL: http://localhost:3001/api/people/:id
 * Note: The :id required is the id of the PERSON we want to delete
 * @returns an appropriate status code
 */
peopleRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  // Get person by id
  const person = await Person.findById(id);

  // Check if person exists
  if (!person) {
    return response.status(404).send({
      error: 'person not found'
    });
  }

  // Get Quizes to delete
  const quizIds = (await Person.findById(id)).quizes.map(id => id.toJSON())
  
  // Get Questions to delete
  const quizes = await Promise.all(quizIds.map(id => Quiz.findById(id)))
  const questions = quizes.map(quiz => quiz.questions)

  // because each person has array of quizes and each quiz has array of question we need to flat it 
  const questionIds = questions.flat().map(id => id.toJSON())

  // Perform deletions (person, quizes, questions)
  await Person.findByIdAndDelete(id)
  await Promise.all(questionIds.map(id => Quiz.findByIdAndDelete(id)))
  await Promise.all(questionIds.map(id => Question.findByIdAndDelete(id)))
  response.status(200).send()
})



module.exports = peopleRouter