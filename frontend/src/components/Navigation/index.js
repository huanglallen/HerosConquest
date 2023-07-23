import React from 'react';
import icon from '../../images/icons/icon.png'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav id='nav'>
      <ul className='navitems'>
        <li className='nav-icon'>
          <img src={icon} alt='icon'/>
        </li>
        <li className='nav-title'>HERO'S CONQUEST</li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
