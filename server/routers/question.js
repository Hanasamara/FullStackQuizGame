const express = require('express')
const questionRouter = express.Router()

/**
 * Import mongoose models
 */
const Quiz = require('../models/quiz')
const Question = require('../models/question')

/**
 * @receives a GET request to the URL: http://localhost:3001/api/question/about
 * @returns a basic message
 */
questionRouter.get('/about', async (request, response) => {
  response.json({
    message: 'First endpoint for question router'
  })
})

/**
 * @receives a request to the URL: http://localhost:3001/api/question
 * @returns bulk questions list as a JSON
 */
questionRouter.get('/', async (request, response) => {
  const questions = await Question.find({})
  response.json(questions)
})

/**
 * @receives a GET:id request to the URL: http://localhost:3001/api/question/:id
 * @returns a specific question 
 */
questionRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const question = await Question.findById(id)
  response.json(question)
})

/**
 * @receives a POST request to the URL: http://localhost:3001/api/question/:id
 * Note: The :id required is the id of the Quiz the question should belong to
 * @returns the newly created question
 */
questionRouter.post('/:id', async (request, response) => {
  // Get fields
  const quizId = request.params.id
  const { questionName, options, correct_answer, points } = request.body
  // Error handling
  if (!questionName || options.length === 0 || !correct_answer || !points) {
    return response.status(400).send({
      error: 'missing content in body'
    })
  }
  const quiz = await Quiz.findById(quizId)
  if (!quiz) {
    return response.status(400).send({
      error: 'no such quiz exists to add the questions to'
    })
  }
  // Create the question and save it 
  const question = new Question({
    questionName, options, correct_answer, points
  })
  const savedQuestion = await question.save()
  // Add the question to the quiz
  quiz.questions = quiz.questions.concat(savedQuestion._id)
  await quiz.save()
  // Return the saved question
  return response.status(201).json(savedQuestion)
})

/**
 * @receives a DELETE request to the URL: http://localhost:3001/api/question/:id
 * Note: The :id required is the id of the Question we want to delete
 * You should pass the Quiz id in the request body
 * @returns an appropriate status code
 */
questionRouter.delete('/:id', async (request, response) => {
  // Get fields
  const questionId = request.params.id
  const { quizId } = request.body

  // Check if the quiz exists
  const quiz = await Quiz.findById(quizId)
  if (!quiz) {
    return response.status(400).send({
      error: 'no such quiz exists to remove the question from'
    })
  }

  // Remove the question on its own and from the quiz
  await Question.findByIdAndDelete(questionId)
  quiz.questions = quiz.questions.filter(id => id.toJSON() !== questionId)
  await quiz.save()
  //add sednd status to make sure successfylly delete happend
  response.status(204).send()
})

/**
 * @receives a PUT request to the URL: http://localhost:3001/api/question/:id
 * Note: The :id required is the id of the Question we want to delete
 * You should pass the Quiz id in the request body
 * @returns an appropriate status code
 */
questionRouter.put('/:id', async (request, response) => {
  try {
    // Get fields
    const questionId = request.params.id;
    const { quizId, updatedQuestionData } = request.body;

    // Check if the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return response.status(400).send({
        error: 'No such quiz exists to update the question in'
      });
    }

    // Update the question
    const updatedQuestion = await Question.findByIdAndUpdate(questionId, updatedQuestionData, { new: true });

    if (!updatedQuestion) {
      return response.status(404).send({
        error: 'Question not found'
      });
    }

    response.status(200).send(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    response.status(500).send({
      error: 'Internal server error'
    });
  }
});



module.exports = questionRouter