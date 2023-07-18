import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserHeroes } from "../../store/heroes";
import "./AllHeroes.css";
import portraits from "../../hooks/portraits";

const AllHeroes = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const heroesObj = useSelector(state => state.heroes.userHeroes);
    const userHeroes = Object.values(heroesObj);

    useEffect(() => {
        dispatch(getUserHeroes(user.id));
    }, [dispatch, user]);

    if(!user || !userHeroes) return null;

    return (
        <div className="allheroes-wrapper">
            {userHeroes && userHeroes.map(hero => {
                <div className="hero-wrapper">
                    <div className="hero-header">
                        <p>{hero.name}</p>
                        <p>lvl {hero.level}</p>
                    </div>
                    <div className="hero-img">
                        {portraits(hero.heroClass)}
                    </div>
                    <div className="hero-footer"></div>
                </div>
            })}
        </div>
    );
};

export default AllHeroes;
