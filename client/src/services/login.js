import axios from 'axios'
const baseURL = '/api/login'

const login = (person) => {
  const request =  axios.post(baseURL, person)
  return request.then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error.response.data.error);
    });
};

export default login