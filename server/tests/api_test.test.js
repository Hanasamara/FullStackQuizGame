const supertest = require('supertest');
const server = require('../server');
const {initializeTestData, cleanupTestData } = require('../utils/test_helper');
const {makeConnection ,closeConnection} = require('../config/mongodb')
const Person = require('../models/person');
const Quiz = require('../models/quiz');
const Question = require('../models/question');

// fix yml file

const api = supertest(server);

beforeAll(async () => {
  // Initialize test data
  await makeConnection();
  await initializeTestData();
  console.log("initilize data")
});

afterAll(async () => {
  await cleanupTestData();
  await closeConnection();
});

describe('GET tests', () => {
    test('GET /api/people should return all people', async () => {
      const response = await api.get('/api/people');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  
    test('GET /api/quizzes should return all quizzes', async () => {
      const response = await api.get('/api/quizes');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  
    test('GET /api/questions should return all questions', async () => {
      const response = await api.get('/api/question');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });
  
  describe('GET/:id tests', () => {
    test('GET /api/people/:id should return a specific person', async () => {
      const people = await Person.find({});
      const response = await api.get(`/api/people/${people[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Person 1');
    });
  
    test('GET /api/quizzes/:id should return a specific quiz', async () => {
      const quizzes = await Quiz.find({});
      const response = await api.get(`/api/quizes/${quizzes[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Quiz 1');
    });
  
    test('GET /api/questions/:id should return a specific question', async () => {
      const questions = await Question.find({});
      const response = await api.get(`/api/question/${questions[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body.questionName).toBe('Question 1');
    });
  });
