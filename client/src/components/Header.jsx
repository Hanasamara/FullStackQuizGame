
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPerson, logoutPerson, storeCookie, getCookie } from '../reducers/personReducer'
import browserServices from '../services/browser';


function Header() {
  const user = useSelector(state => state.person);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutPerson());
  }

  return (
    <header className='header-nav'>
      <nav>
        <ul className='navlist'>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/quizgame">QuizGame</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {/* Conditionally render user name and logout button */}
          <li className='user-info'>
          {user ? (
              <>
                <span>UserName: {user.name}</span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </>
            ) : null}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
