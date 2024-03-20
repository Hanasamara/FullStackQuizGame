import axios from 'axios'
const baseURL = '/api/quizes'

const getQuizzes = () => {
  const request = axios.get()
  return request.then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
}

const getQuiz = (quizId) => {
  const request = axios.get(`${baseURL}/${quizId}`)
  return request.then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
}

const addQuiz = (userId, newQuiz) => {
  const request = axios.post(`${baseURL}/${userId}`, newQuiz)
  return request.then(response => response.data)
}

const deleteQuizzes = (personId, quizId) => {
  const request = axios.delete(`${baseURL}/${quizId}`,
    {data: {personId: personId}});
  return request.then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
}

const editQuiz = (quizId, updatedQuizData) => {
  const request = axios.put(`${baseURL}/${quizId}`, updatedQuizData);
  return request.then(response => {
    return response.data;
  }).catch(error => {
    console.log(error.response.data.error);
    throw error; // Re-throwing the error to propagate it to the caller
  });
};





export default {getQuizzes,getQuiz,addQuiz,deleteQuizzes,editQuiz};

