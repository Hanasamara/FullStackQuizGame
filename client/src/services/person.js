import axios from 'axios'
const baseURL = '/api/people'

const getPeople = () => {
  const request = axios.get(baseURL)
  return request.then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
}

const getPerson = (personId) => {
  const request = axios.get(`${baseURL}/${personId}`)
  return request.then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
}

const addPerson = (newPerson) => {
  const request =  axios.post(baseURL, newPerson)
  return request.then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error.response.data.error);
    });
}

// const removePerson = (personId) => {
//   const request = axios.delete(`${baseURL}/${personId}`)
//   return request.then(response => response.data)
// }

export default { getPeople, getPerson, addPerson }