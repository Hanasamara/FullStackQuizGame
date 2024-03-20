import { createSlice } from '@reduxjs/toolkit';
import quizzesJson from '/data/quiz.json';

const initialState = [];

const quizSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    setQuizzes(state, action) {
      return action.payload;
    },
    addQuiz(state, action) {
      state.push(action.payload);
    },
    deleteQuiz(state, action) {
      console.log(action);
      return state.filter(quiz => quiz.id !== action.payload);
    },
    updateQuiz(state, action) {
      console.log(action.payload)
      return state.map(quiz =>
        quiz.id === action.payload.id ? action.payload : quiz
      );
    },
  },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz } = quizSlice.actions;

export default quizSlice.reducer;
