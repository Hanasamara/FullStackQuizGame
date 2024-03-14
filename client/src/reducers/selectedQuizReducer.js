import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const selectedQuizSlice = createSlice({
  name: 'selectedQuiz',
  initialState,
  reducers: {
    setSelectedQuiz(state, action) {
      const quizzes = action.payload.quizzes;
      const quizId = action.payload.quizId
      return quizzes.find(quiz => quiz.id === quizId);
    },
    clearSelectedQuiz(state) {
      return null;
    },
  },
});

export const { setSelectedQuiz, clearSelectedQuiz } = selectedQuizSlice.actions;

export default selectedQuizSlice.reducer;
