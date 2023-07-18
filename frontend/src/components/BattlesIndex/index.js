import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserHeroes } from "../../store/heroes";
import { getMonsters } from "../../store/monsters";
import SingleMonster from "../SingleMonster";
import "./BattlesIndex.css";
import SingleHeroMini from "./SingleHeroMini";

const BattlesIndex = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const heroesObj = useSelector(state => state.heroes.userHeroes);
    const userHeroes = Object.values(heroesObj);
    const monstersObj = useSelector(state => state.monsters.monsters);
    const monsters = Object.values(monstersObj);

    useEffect(() => {
        dispatch(getUserHeroes(user.id));
        dispatch(getMonsters());
    }, [dispatch, user]);

    if(!user) return null;

    return (
        <div id="battles">
            <h2 className="battles-title">
                Select your monster to battle:
            </h2>
            <div className="battles-header">
                sprite display
            </div>
            <div className="battles-body">
                <div className="heroes-container">
                    {userHeroes && userHeroes.map(hero => (
                        <SingleHeroMini key={hero.id} hero={hero} />
                    ))}
                </div>
                <div className="battles-center">
                    center here
                </div>
                <div className="monster-holder">
                    {monsters && monsters.map(monster => {
                        return (
                            <SingleMonster key={monster.id} monster={monster} />
                        )
                    })}
                </div>
            </div>
            <div className="battles-create">Battle Now</div>
        </div>
    );
};

export default BattlesIndex;
