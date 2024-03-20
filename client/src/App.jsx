import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import React,{ useState, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';

/**
 * Importing other components
 */
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import Game from './components/Game'
import Contact from './components/Contact'
import Login from './components/LoginForm';
import { setPerson, logoutPerson, storeCookie, getCookie } from './reducers/personReducer'
import browserServices from './services/browser';

const App = () => {
  const dispatch = useDispatch()
  const person = useSelector((store) => store.person)

  useEffect(() => {
    dispatch(getCookie())
  }, [])

  return (
    <Router>
      <div className='App'>
        <Header />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL.
            Furthermore, notice how the content above always renders? On each page? */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/quizgame" element={person ? <Game /> : <Login />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
