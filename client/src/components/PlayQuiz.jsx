import React, { useState } from 'react';

function PlayQuiz({ quiz, onReturnToList ,onUpdateHighestScore}) {
  const [showResults, setShowResults] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  console.log(quiz);
  const handleAnswerSelect = (index,answer) => {

      const updatedSelectedAnswers = [...selectedAnswers];
      updatedSelectedAnswers[index] = answer;
      setSelectedAnswers(updatedSelectedAnswers);
      console.log(selectedAnswers);

  };

  const handleSubmit = (quizId) => {
    //check if there is any question is not answered
    if (selectedAnswers.includes(null)) {
      alert('Please answer all questions before submitting.');
    }

    else{
      setShowResults(true);

      let total = 0;
      selectedAnswers.forEach((selectedAnswer, index) => {
        if (selectedAnswer === quiz.questions[index].correct_answer) {
          total += quiz.questions[index].points;
        }
      });

      setCurrentScore(total);

      if (total > quiz.highest_score){
        onUpdateHighestScore(quizId,total);

      }
    }
  };

  const handlePlayAgain = () => {
    setShowResults(false);
    setCurrentScore(0);
    setSelectedAnswers([]);
    
  };

  return (
    <div className='quizPlaydiv' >
      <h2>{quiz.name}</h2>
      <div className='questionsresults'>
        <div className='questionsdiv'>
          {/* I will use question index to handle answer for each question */}
          {quiz.questions.map((question,indexQ) => (
            <div className='question' key={question.id}>
              <p>{indexQ+1}. {question.question}</p>
              <ul className="options" key={question.id}>
                {question.options.map((option,index) => (
                  <li className='option' key={index}>
                    <label>
                      <input
                        type="radio"
                        value={option}
                        onChange={() => handleAnswerSelect(indexQ,option)}
                        checked={selectedAnswers[indexQ] === option}
                        disabled={showResults && option}//to disable selection after submession
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            
        
          ))}
          <button className='submit' onClick={() => handleSubmit(quiz.id)} disabled={showResults}>Submit</button>
          <button className='return' onClick={onReturnToList}>Return to Quiz Game</button>
        </div>
        <div className='resultdiv'>
          {showResults ? (
            <div className='results'>
              <h3>Results:</h3>
              <p>Highest Score: {quiz.highest_score}</p>
              <p>Current Score: {currentScore}</p>
              <button className='playAgainButton' onClick={handlePlayAgain}>Play Again</button>
            </div>
          ):
          (
            <div className='results'>
              <h3>Results:</h3>
              <p>Highest Score: {quiz.highest_score}</p>
              <p>Current Score: {currentScore}</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default PlayQuiz;
