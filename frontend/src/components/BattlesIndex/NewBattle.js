import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserHeroes } from "../../store/heroes";
import { getMonsters } from "../../store/monsters";
import { createBattle, updateBattle } from "../../store/battles";
import SingleMonster from "../SingleMonster";
import "./NewBattle.css";
import SingleHeroMini from "./SingleHeroMini";

const NewBattle = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [battleHero, setBattleHero] = useState('');
    const [battleMonster, setBattleMonster] = useState('');

    const user = useSelector(state => state.session.user);
    const heroesObj = useSelector(state => state.heroes.userHeroes);
    const userHeroes = Object.values(heroesObj);
    const monstersObj = useSelector(state => state.monsters.monsters);
    const monsters = Object.values(monstersObj);

    useEffect(() => {
        dispatch(getUserHeroes(user.id));
        dispatch(getMonsters());
    }, [dispatch, user]);

    const handleBattleClick = () => {
        const newBattle = {

        };
        dispatch(updateBattle(newBattle))
        history.push(`/battles/fight/`)
    };

    if(!user) return null;

    return (
        <div id="battles">
            <h2 className="battles-title">
                Select your monster to battle:
            </h2>
            <div className="battles-header">
                sprite display
                <p>{battleHero}</p>
                <p>{battleMonster}</p>
            </div>
            <div className="battles-body">
                <div className="heroes-container">
                    {userHeroes && userHeroes.map(hero => (
                        <div
                        className="heromini-container"
                        key={hero.id}
                        >
                            <SingleHeroMini hero={hero} />
                        </div>
                    ))}
                </div>
                <div className="battles-center">
                    center here

                </div>
                <div className="monster-holder">
                    {monsters && monsters.map(monster => {
                        return (
                            <div className="monstermini-container" key={monster.id}>
                                <SingleMonster monster={monster} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="battles-create">Battle Now</div>
        </div>
    );
};

export default NewBattle;
