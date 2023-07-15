import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserHeroes } from "../../store/heroes";
import SingleHero from "../SingleHero";
import { useParams } from "react-router-dom";

const HeroesIndex = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    console.log("[userID]", user)
    const { userId } = useParams();
    const userHeroes = useSelector(state => state.heroes.userHeroes);
    console.log("[USER_HEROES]", userHeroes)

    useEffect(() => {
        dispatch(getUserHeroes(userId))
    }, [dispatch, userId]);

    return (
        <div className="heroes-wrapper">
            {userHeroes.map(hero => {
                return <SingleHero key={hero.id} hero={hero} />
            })}
        </div>
    )
};

export default HeroesIndex;
