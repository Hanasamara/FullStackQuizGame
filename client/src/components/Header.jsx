
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
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
        </ul>
      </nav>
    </header>
  );
}

export default Header;
