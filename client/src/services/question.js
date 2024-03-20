import axios from 'axios'
const baseURL = '/api/question'

const getQuestions = () => {
  const request = axios.get()
  return request.then(response => {
    response.data;
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
}

const getQuestion = (questionId) => {
  const request = axios.get(`${baseURL}/${questionId}`)
  return request.then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
}

const addQuestion = (quizId, newQuestion) => {
  const request = axios.post(`${baseURL}/${quizId}`, newQuestion)
  return request.then(response => response.data)
}

const deleteQuestion = (quizId, questionId) => {
  const request = axios.delete(`${baseURL}/${questionId}`,{
    data: {quizId: quizId}
  });
  return request.then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
}

const updateQuestion = (questionId, updatedData) => {
  return axios.put(`${baseURL}/${questionId}`, updatedData)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error updating question:', error);
      throw error;
    });
};

export default {getQuestion,getQuestions,addQuestion,deleteQuestion, updateQuestion};

