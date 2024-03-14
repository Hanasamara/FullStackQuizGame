import React from 'react';
import { BsFillFilePlayFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { MdSave } from "react-icons/md";


function QuizList({quizzes, onDeleteQuiz, onPlayQuiz, onEditQuiz, onSaveQuiz }) {
  return (
    <div className='quizListDiv'>
      {/* <h2>List Page</h2> */}
      
      <ul className='quizListUL'>
        {quizzes.map((quiz) => (
          <li key={quiz.id} className='quizListLI'>
            <span className='quizname'>{quiz.name}</span>
            < BsFillFilePlayFill className='icon' onClick={(e) => onPlayQuiz(e,quiz.id)} />
            < FaEdit className='icon' onClick={(e) => onEditQuiz(e,quiz.id)} />
            < RiDeleteBin6Line className='icon' onClick={(e) => onDeleteQuiz(e,quiz.id)} />
            <MdSave className='icon' onClick={(e) => onSaveQuiz(e,quiz.id)} />
          </li>
        ))}
      </ul>

    </div>
  );
}

export default QuizList;