import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import "./NavButtons.css";


const NavButtons = () => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="NavButtons">
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/heroes'>Heroes</NavLink>
            <NavLink to='/battles'>Battle</NavLink>
        </div>
    );
};

export default NavButtons;
