import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserHeroes } from "../../store/heroes";
import SingleHero from "../SingleHero";
import { useParams } from "react-router-dom";
import "./HeroesIndex.css";

const HeroesIndex = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const heroesObj = useSelector(state => state.heroes.userHeroes);
    const userHeroes = Object.values(heroesObj)

    useEffect(() => {
        dispatch(getUserHeroes(userId))
    }, [dispatch, userId]);

    return (
        <div className="heroes-wrapper">
            <h2>Select Your Hero</h2>
            {userHeroes.map(hero => {
                return <SingleHero key={hero.id} hero={hero} />
            })}
        </div>
    )
};

export default HeroesIndex;
