import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import "./NavButtons.css";


const NavButtons = () => {
    const sessionUser = useSelector(state => state.session.user);

    return (
      <div className="NavButtons">
        {sessionUser ? (
          <>
            <NavLink to='/home' className="navlink">Home</NavLink>
            <NavLink to='/heroes' className="navlink">Heroes</NavLink>
            <NavLink to='/battles' className="navlink">Battle</NavLink>
          </>
        ) : (
          <>
            <div className='navdisabled'>Home</div>
            <div className='navdisabled'>Heroes</div>
            <div className='navdisabled'>Battle</div>
          </>
        )}
      </div>
    );
  };

export default NavButtons;
