const fetchData = async (path) => {
  try {
    const request = await fetch(`${path}`);
    const jsonData = await response.json();
    return request.then(response => response.json());
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// async function deleteQuiz(updatedQuizzes) {
//   try {
//     await fetch(`your_api_endpoint/${id}`, {
//       method: 'DELETE',
//     });
//     return await response.json();
//   } catch (error) {
//     throw new Error(`Error deleting quiz: ${error.message}`);
//   }
// }

export default {fetchData};

