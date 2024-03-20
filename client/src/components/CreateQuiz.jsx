import { v4 as uuidv4 } from 'uuid';
import React,{ useState} from 'react';

function CreateQuiz({onCreateQuiz}) {
  const [quizName, setQuizName] = useState('');

  const handleCreateQuiz = () => {
    if (quizName.trim() === '' ) {
      alert('Please enter a quiz name.');
      return;
    }

    const newQuiz = {
      id: uuidv4(),
      name: quizName,
      questions: [],
      highest_score: 0
    };

    onCreateQuiz(newQuiz);
  };

  // ChatGPT helped me to write this function
  const handleLoadQuiz = () => {
    if (quizName.trim() === '' ) {
      alert('Please enter a quiz name.');
      return;
    }

    let newQuiz = {};
    let flag = false;

    //search if input entered exist in local storage
    for (let i = 0; i < localStorage.length; i++) 
    {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        console.log(value.name.toLowerCase());
        if(value.name.toLowerCase() === quizName.toLowerCase())
        {
          console.log(value);
          newQuiz = {
            id: uuidv4(),
            name: value.name,
            questions: value.questions,
            highest_score: value.highest_score
          };
          flag =true;
          break;
        } 
    }

    //No quiz found with that name
    if(!flag){
      alert('Quiz not found in local storage.');
      return; 
    }

    onCreateQuiz(newQuiz);
  };

  return (
    <div className='creatediv' >
      <h3>Create New Quiz</h3>
      <div>
        <label>
          Quiz Name:
          <input
          type="text"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />
        </label>
        <button onClick={handleCreateQuiz}>Create</button>
        {/* <button onClick={handleLoadQuiz} >LoadQuiz</button> */}
      </div>
    </div>
  );
}

export default CreateQuiz;