import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserHeroes } from "../../store/heroes";
import SingleHero from "../SingleHero";
import "./HeroesIndex.css";


const HeroesIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.session.user.id);
    const heroesObj = useSelector(state => state.heroes.userHeroes);
    const userHeroes = Object.values(heroesObj);


    useEffect(() => {
        dispatch(getUserHeroes(userId));
    }, [dispatch, userId]);

    if(!userId) return null;

    return (
        <div className="heroes-wrapper">
            <h2 className="heroes-header">Select Your Hero:</h2>
               <div className="heroes-holder">
                    {userHeroes && userHeroes.map(hero => (
                        <SingleHero key={hero.id} hero={hero} />
                    ))}
                <Link className="heroes-create" to="/heroes/create">
                    <div className="hc-head">Create New Hero</div>
                <i className="fa-regular fa-square-plus"></i>
                </Link>
            </div>
        </div>
    );
};

export default HeroesIndex;
