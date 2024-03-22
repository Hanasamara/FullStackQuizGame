const { makeConnection, closeConnection } = require('../config/mongodb');
const Person = require('../models/person');
const Quiz = require('../models/quiz');
const Question = require('../models/question');

const initializeTestData = async () => {
  // Define initial data for testing
  const initialPeople = [
    { name: 'Person 1', password: 'password1' },
    { name: 'Person 2', password: 'password2' },
  ];

  const initialQuizzes = [
    { name: 'Quiz 1' },
    { name: 'Quiz 2'},
  ];

  const initialQuestions = [
    {
      questionName: 'Question 1',
      options: ['Option 1', 'Option 2', 'Option 3'],
      correct_answer: 'Option 1',
      points: 10
    },
    {
      questionName: 'Question 2',
      options: ['Option A', 'Option B', 'Option C'],
      correct_answer: 'Option C',
      points: 5
    },
  ];

  // Insert initial people
  await Person.insertMany(initialPeople);

  // Insert initial quizzes
  await Quiz.insertMany(initialQuizzes);

  // Insert initial questions
  await Question.insertMany(initialQuestions);

};

const cleanupTestData = async () => {
    // Clean up test data
    await Person.deleteMany({});
    await Quiz.deleteMany({});
    await Question.deleteMany({});
  };

module.exports = { initializeTestData, cleanupTestData };
