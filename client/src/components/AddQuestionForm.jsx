import React, { useState } from 'react';
import Option from './Option';

function AddQuestionForm({ onAddQuestion }) {
  const [newQuestion, setNewQuestion] = useState({
    questionName: '',
    options: [''],
    correct_answer: '',
    points: 1,
  });

  const handleNewQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({
      ...newQuestion,
      [name]: value
    });
    console.log(newQuestion);
  };

  const handleOptionChange = (value, index) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion({
      ...newQuestion,
      options: newOptions
    });
  };

  const handleAddOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, '']
    });
  };


  const handleRemoveOption = (index) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions.splice(index, 1);
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions
    });
  };

  const handleAddQuestion = () => {
    // Validation: Check if any field is empty
    if (
        newQuestion.questionName.trim() === '' ||
        newQuestion.options.some(option => option.trim() === '') ||
        newQuestion.correct_answer.trim() === ''
      ) {
        alert('Please fill in all input fields to add new question to your quiz.');
        return;
      }
      
    onAddQuestion(newQuestion);
    setNewQuestion({
      questionName: '',
      options: [''],
      correct_answer: '',
      points: 1,
    });
  };

  return (
    <form className="add-question-form">

      <label className='questionform'>
        Question:
        <input
          type="text"
          name='questionName'
          value={newQuestion.questionName}
          onChange={handleNewQuestionChange}
        />
      </label >

      <div className='optionadddiv'>
      {newQuestion.options.map((option, optionIndex) => (
        <Option
            key={optionIndex}
            option={option}
            index={optionIndex}
            onChange={(value,optionIndex) => handleOptionChange(value, optionIndex)}
            onRemove={() => handleRemoveOption(optionIndex)}
          />
      ))}
      </div>
      <div className='addoptionbutton'>
            <button className='addOptionButtonItem' type="button" onClick={handleAddOption}>Add Option</button>
      </div>

      <label>
        Correct Answer:
        <input
          type="text"
          name="correct_answer"
          value={newQuestion.correct_answer}
          onChange={handleNewQuestionChange}
        />
      </label>

      <label>
        Points:
        <input
          type="number"
          name="points"
          value={newQuestion.points}
          onChange={handleNewQuestionChange}
        />
      </label>
      <div>
      <button className='addQuestionButtonItem' type="button" onClick={handleAddQuestion}>Add Question</button>
      </div>
    </form>
  );
}

export default AddQuestionForm;
