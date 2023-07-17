import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import "./NavButtons.css";

const NavButtons = () => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="NavButtons">
            <div>Home</div>
            <NavLink to={`/heroes/all/${sessionUser.id}`}>Heroes</NavLink>
            <div>Battles</div>
        </div>
    );
};

export default NavButtons;
