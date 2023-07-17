import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserHeroes } from "../../store/heroes";
import SingleHero from "../SingleHero";
import "./HeroesIndex.css";


const HeroesIndex = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id);
    const heroesObj = useSelector(state => state.heroes.userHeroes);
    const userHeroes = Object.values(heroesObj)

    useEffect(() => {
        dispatch(getUserHeroes(userId))
    }, [dispatch, userId]);

    return (
        <div className="heroes-wrapper">
            <h2 className="heroes-header">Select Your Hero</h2>
            <div className="heroes-holder">
                {userHeroes && userHeroes.map(hero => {
                    return <SingleHero key={hero.id} hero={hero} heroClass={hero.heroClass} />
                })}
            </div>
            <Link to="/heroes/create">Create New Hero</Link>
        </div>
    );
};

export default HeroesIndex;
