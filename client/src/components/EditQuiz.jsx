import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import AddQuestionForm from "./AddQuestionForm";
import EditQuestionForm from './EditQuestionForm';


function EditQuiz({quiz , onReturnToList, onDeleteQuestion, onAddQuestion, onUpdateQuiz }) {
  const [questions, setQuestions] = useState(quiz.questions);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  const handleDelete = (questionId) => {
    const updatedQuestions = questions.filter(question =>  question.id !== questionId);
    setQuestions(updatedQuestions);

    // Update the quiz in the state with the updated questions
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    onDeleteQuestion(updatedQuiz);
  };

  const handleEdit = (questionId) => {
    setEditingQuestionId(questionId);
  };

  const handleSaveEdit = (editedQuestion) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === editedQuestion.id) {
        return editedQuestion;
      }
      return question;
    });
    setQuestions(updatedQuestions);
    setEditingQuestionId(null); 

    // Update the quiz in the state with the updated questions
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    onUpdateQuiz(updatedQuiz);
  };

  const handleAddQuestion = (newQuestion) => {
    newQuestion.id = uuidv4();
    setQuestions([...questions, newQuestion]);
    onAddQuestion(quiz.id, newQuestion);
  };

  return (
    <div className='editquizdiv'>
      <h1>Edit {quiz.name} Quiz</h1>
      {questions.map((question, index) => (
        <div key={question.id} className='questionseditdiv'>
          {editingQuestionId === question.id ? (
            <EditQuestionForm
              key={question.id}
              questionData={question}
              onSave={handleSaveEdit}
            />
          ) : (
            <div>
              <div className='questionsedittitle'>
                <p>{index+1}. {question.question}</p>
                <div className='questionsediticons'>
                  <FaEdit className='delicon' onClick={() => handleEdit(question.id)} />
                  <RiDeleteBin6Line className='edicon' onClick={() => handleDelete(question.id)} />
                </div>
              </div>
              <div className='optionseditdiv'>
                <ul className='optionseditlist'>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex} className='optionedit'>{option}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
      <AddQuestionForm onAddQuestion={handleAddQuestion}/>    
      <button className='return' onClick={onReturnToList}>Return to Quiz Game</button>
    </div>
  );
}

export default EditQuiz;
