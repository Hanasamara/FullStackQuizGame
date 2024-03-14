import quizzesJson from '/data/quiz.json';
import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuizzes, addQuiz, deleteQuiz, updateQuiz } from '../reducers/quizReducer';
import {setSelectedQuiz,clearSelectedQuiz} from '../reducers/selectedQuizReducer';
import QuizList from './QuizList';
import CreateQuiz from './CreateQuiz';
import EditQuiz from './EditQuiz'
import PlayQuiz from './PlayQuiz';
import fetchData from '../services/QuizzesService';


function Game() {

  const [action, setAction] = useState(null);
  // const [quizzes, setQuizzes] = useState([]);
  const quizzes = useSelector(state => state.quizzes);
  // const [selectedQuiz, setSelectedQuiz] = useState(null);
  const selectedQuiz = useSelector(state => state.selectedQuiz);
  const dispatch = useDispatch();

  // const path = '/data/quiz.json'

  useEffect(() => {
    dispatch(setQuizzes(quizzesJson));
    dispatch(clearSelectedQuiz());
  }, [dispatch]); 

  const handleDeleteQuiz = (e,quizid) => {
    e.preventDefault()
    console.log(quizid);
    // should add code to update json file after deletion
    // const newQuizlist = quizzes.filter(quiz => quiz.id !== quizid)
    // setQuizzes(newQuizlist);
    dispatch(deleteQuiz(quizid));
  };

  const handlePlayQuiz = (e,quizid) => {
    e.preventDefault()
    console.log(quizid);
    // const newQuizlist = quizzes.find(quiz => quiz.id === quizid)
    const selectedQuizData = {
      quizzes: quizzes,
      quizId: quizid
    };
    // console.log(setSelectedQuiz(selectedQuizData));
    dispatch(setSelectedQuiz(selectedQuizData));
    setAction('play');
  };

  const handleUpdateHighestScore = (quizId, newHighestScore) => {
    console.log("Updating highest score for quizId:", quizId);
    console.log("New highest score:", newHighestScore);

    const updatedQuizzes = quizzes.map(quiz => {
      if (quiz.id === quizId) {
        return { ...quiz, highest_score: newHighestScore };
      }
      return quiz;
    });

    dispatch(setQuizzes(updatedQuizzes));

    const selectedQuizData = {
      quizzes: updatedQuizzes,
      quizId: quizId
    };
    dispatch(setSelectedQuiz(selectedQuizData));
  };

  const handleEditQuiz = (e,quizid) => {
    e.preventDefault()
    console.log(quizid);
    // should add code to update json file after edit it
    // const newQuizlist = quizzes.find(quiz => quiz.id === quizid)
    const selectedQuizData = {
      quizzes: quizzes,
      quizId: quizid
    };
    dispatch(setSelectedQuiz(selectedQuizData));
    setAction('edit');
  };

  const handleReturnToList = () => {
    setAction(null);
    dispatch(clearSelectedQuiz());
  };

  const handelDeletedQuestion = (updatedQuiz) => {
    // const updatedQuizzes = quizzes.map(quiz => (quiz.id === updatedQuiz.id ? updatedQuiz : quiz));
    dispatch(updateQuiz(updatedQuiz));
    
  };

  const handleAddQuestionToQuiz = (quizId, newQuestion) => {
    const updatedQuizzes = quizzes.map(quiz => {
      if (quiz.id === quizId) {
        return {
          ...quiz,
          questions: [...quiz.questions, newQuestion]
        };
      }
      return quiz;
    });
    dispatch(setQuizzes(updatedQuizzes));
  };

  const onUpdateQuiz = (updatedQuiz) => {
    // Update the quiz after eding question
    console.log(updatedQuiz)
    // const updatedQuizzes = quizzes.map(quiz => (quiz.id === updatedQuiz.id ? updatedQuiz : quiz));
    dispatch(updateQuiz(updatedQuiz));
  };


  const handleCreateQuiz = (newQuiz) => {
    console.log(newQuiz)
    dispatch(addQuiz(newQuiz));
    
    // const newQuizlist = [...quizzes, newQuiz].find(quiz => quiz.id === newQuiz.id)
    // console.log(newQuizlist);

    const selectedQuizData = {
      quizzes: [...quizzes, newQuiz],
      quizId: newQuiz.id
    };
    dispatch(setSelectedQuiz(selectedQuizData));
    
    setAction('edit');
  };

  const handleSaveQuiz = (e,quizId) => {
    e.preventDefault();
    const quizToSave = quizzes.find((quiz) => quiz.id === quizId);
    localStorage.setItem(quizId, JSON.stringify(quizToSave));
    alert(`${quizToSave.name} saved to local storage!`);
  };

  return (
    <div className='game'>
        {action === 'play' && selectedQuiz && (
          <PlayQuiz 
            quiz={selectedQuiz}
            onReturnToList={handleReturnToList}
            onUpdateHighestScore={handleUpdateHighestScore}
          />
        )}

        {action === 'edit' && selectedQuiz && (
          <EditQuiz 
            quiz={selectedQuiz}
            onReturnToList={handleReturnToList}
            onDeleteQuestion={handelDeletedQuestion}
            onAddQuestion={handleAddQuestionToQuiz}
            onUpdateQuiz={onUpdateQuiz}
          />
        )}

        {action === null && (
          <div className="quiz-game-content">
            <QuizList 
              quizzes={quizzes}
              onDeleteQuiz={handleDeleteQuiz}
              onPlayQuiz={handlePlayQuiz}
              onEditQuiz={handleEditQuiz}
              onSaveQuiz={handleSaveQuiz}
            />
            <CreateQuiz
            onCreateQuiz={handleCreateQuiz}
            />
          </div>
        )}
      
      
    </div>
  );
}

export default Game;