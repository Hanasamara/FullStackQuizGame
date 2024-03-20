import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * Necessary for adding redux toolkit
 */
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

/**
 * Importing reducers
 */

import quizReducer from './reducers/quizReducer.js'
import selectedQuizReducer from './reducers/selectedQuizReducer.js'
import personReducer from './reducers/personReducer.js'



/**
 * Creating the store w/reducers
 */
const store = configureStore({
  reducer: {
    person: personReducer,
    quizzes: quizReducer,
    selectedQuiz: selectedQuizReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
