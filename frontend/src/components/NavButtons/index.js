import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import "./NavButtons.css";


const NavButtons = () => {
    const sessionUser = useSelector(state => state.session.user);

    return (
      <div className="NavButtons">
        {sessionUser ? (
          <>
            <NavLink to='/' className="navlink">Home</NavLink>
            <NavLink to='/heroes' className="navlink">Heroes</NavLink>
            <NavLink to='/battles' className="navlink">Battle</NavLink>
            <NavLink to='/chat' className="navlink">Chat</NavLink>
          </>
        ) : (
          <>
            <NavLink to='/' className="navlink">Home</NavLink>
            <div className='navdisabled'>Heroes</div>
            <div className='navdisabled'>Battle</div>
            <div className='navdisabled'>Chat</div>
          </>
        )}
      </div>
    );
  };

export default NavButtons;
