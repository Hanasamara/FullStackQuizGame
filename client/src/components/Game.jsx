import quizzesJson from '/data/quiz.json';
import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuizzes, addQuiz, deleteQuiz, updateQuiz } from '../reducers/quizReducer';
import {setSelectedQuiz,clearSelectedQuiz} from '../reducers/selectedQuizReducer';
import QuizList from './QuizList';
import CreateQuiz from './CreateQuiz';
import EditQuiz from './EditQuiz'
import PlayQuiz from './PlayQuiz';
import QuizServices from '../services/QuizzesService';
import personServices from '../services/person';
import browserServices from '../services/browser';
import { setPerson, logoutPerson, storeCookie, getCookie } from '../reducers/personReducer'
import QuizzesService from '../services/QuizzesService';



function Game() {

  const [action, setAction] = useState(null);
  const currentUser = useSelector(state => state.person);
  const quizzes = useSelector(state => state.quizzes);
  const selectedQuiz = useSelector(state => state.selectedQuiz);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCookie())
  }, [])
//performed once user login
  useEffect(() => {
    if(currentUser)
    {
      personServices.getPerson(currentUser.id)
        .then(data => {
          const userQuizzes = data.quizes; 
          dispatch(setQuizzes(userQuizzes));
          dispatch(clearSelectedQuiz());
        })
        .catch(error => {
          console.error('Error fetching quizzes:', error);
        });
      }
    
  }, [currentUser,dispatch]);

  console.log(quizzes)

  const handleDeleteQuiz = (e,quizid) => {
    e.preventDefault()
    console.log(quizid);
    // should add code to update json file after deletion
    // const newQuizlist = quizzes.filter(quiz => quiz.id !== quizid)
    // setQuizzes(newQuizlist);
    dispatch(deleteQuiz(quizid));
    QuizServices.deleteQuizzes(currentUser.id,quizid);
    

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

    console.log(updatedQuizzes);
    dispatch(setQuizzes(updatedQuizzes));

    const updatedQuizData = { highest_score: newHighestScore };
    QuizServices.editQuiz(quizId,updatedQuizData);

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
    // QuizServices.

    
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


  const handleCreateQuiz = async (newQuiz) => {
    console.log(newQuiz)
    
    const addedQuiz = await QuizServices.addQuiz(currentUser.id,newQuiz);
    dispatch(addQuiz(addedQuiz));
    const newQuizlist = [...quizzes, addedQuiz]
    console.log(newQuizlist);

    const selectedQuizData = {
      quizzes: newQuizlist,
      quizId: addedQuiz.id
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