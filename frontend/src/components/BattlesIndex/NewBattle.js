import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserHeroes } from "../../store/heroes";
import { getMonsters } from "../../store/monsters";
import { createBattle } from "../../store/battles";
import SingleMonster from "../SingleMonster";
import "./NewBattle.css";
import SingleHeroMini from "./SingleHeroMini";

const NewBattle = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [battleHero, setBattleHero] = useState({});
    const [battleMonster, setBattleMonster] = useState({});

    // console.log("[BATLLE_HERO]", battleHero)
    // console.log("[BATLLE_Monster]", battleMonster)

    const user = useSelector(state => state.session.user);
    const heroesObj = useSelector(state => state.heroes.userHeroes);
    const userHeroes = Object.values(heroesObj);
    const monstersObj = useSelector(state => state.monsters.monsters);
    const monsters = Object.values(monstersObj);

    useEffect(() => {
        dispatch(getUserHeroes(user.id));
        dispatch(getMonsters());
    }, [dispatch, user]);

    const handleBattleClick = async () => {
        const newBattle = {
            heroId: battleHero.id,
            monsterId: battleMonster.id,
            heroHp: battleHero.hp,
            monsterHp: battleMonster.hp
        };
        const createdBattle = await dispatch(createBattle(newBattle));
        history.push(`/battles/fight/${createdBattle.id}`);
    };

    if(!user) return null;

    return (
        <div id="battles">
            <h2 className="battles-title">
                Select your monster to battle:
            </h2>
            <div className="battles-header">
                sprite display
                <p>{battleHero.name}</p>
                <p>{battleMonster.name}</p>
            </div>
            <div className="battles-body">
                <div className="heroes-container">
                    {userHeroes && userHeroes.map(hero => (
                        <div
                        className="heromini-container"
                        key={hero.id}
                        onClick={() => setBattleHero(hero)}
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
                            <div className="monstermini-container"
                            key={monster.id}
                            onClick={() => setBattleMonster(monster)}
                            >
                                <SingleMonster monster={monster} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div
            className="battles-create"
            onClick={handleBattleClick}
            >Battle Now</div>
        </div>
    );
};

export default NewBattle;
