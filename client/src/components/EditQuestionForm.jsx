import React, { useState } from 'react';

function EditQuestionForm({ questionData, onSave }) {
  const [editedQuestion, setEditedQuestion] = useState({ ...questionData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedQuestion({
      ...editedQuestion,
      [name]: value
    });
  };

  const handleOptionChange = (optionIndex, newValue) => {
    const updatedOptions = [...editedQuestion.options];
    updatedOptions[optionIndex] = newValue;
    setEditedQuestion({
      ...editedQuestion,
      options: updatedOptions
    });
  };

  const handleSave = () => {
    onSave(editedQuestion);
  };

  return (
    <div className="edit-question-form">
        <div className="question-section">
        <label className="label-question">Question:</label>
        <input
            className="question-input"
            type="text"
            name="questionName"
            value={editedQuestion.questionName}
            onChange={handleChange}
        />
        </div>
  
        <div className="options-section">
        <label className="label-options">Options:</label>
        <div className="option-input">
            {editedQuestion.options.map((option, index) => (
            <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            ))}
        </div>
        </div>
  
        <div className="other-details">
        <label className="label-correct-answer">Correct Answer:</label>
        <input
            type="text"
            name="correct_answer"
            value={editedQuestion.correct_answer}
            onChange={handleChange}
        />
        </div>
  
        <div className="points-input">
        <label className="label-points">Points:</label>
        <input
            type="number"
            name="points"
            value={editedQuestion.points}
            onChange={handleChange}
        />
        </div>
  
        <button className='saveEdit' onClick={handleSave}>Save</button>
    </div>
  

  );
}

export default EditQuestionForm;
