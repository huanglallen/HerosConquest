import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import "./NavButtons.css";


const NavButtons = () => {
    const sessionUser = useSelector(state => state.session.user);
    const heroPlaying = useSelector(state => state.heroes.playing);

    return (
        <div className="NavButtons">
            <NavLink to='/home'>Home</NavLink>
            <NavLink to={heroPlaying ? '/heroes/playing':'/heroes'}>Heroes</NavLink>
            <div>Battles</div>
        </div>
    );
};

export default NavButtons;
