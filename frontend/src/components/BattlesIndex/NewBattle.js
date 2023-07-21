import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserHeroes } from "../../store/heroes";
import { getMonsters } from "../../store/monsters";
import { createBattle } from "../../store/battles";
import "./NewBattle.css";
import sprites from "../../hooks/sprites";
import portraits from "../../hooks/portraits";

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
                Select your hero and monster to start the battle:
            </h2>
            <div className="battles-header">
                <h3 className="battles-versus">
                    <p>{battleHero.name}</p>
                    <p>VERSUS</p>
                    <p>{battleMonster.name}</p>
                </h3>
            </div>
            <div className="battles-body">
                <div className="battles-hero">
                    <div className="battles-hero-s">
                        {sprites(battleHero.heroClass)}
                    </div>
                    <div className="heroes-container">
                    {userHeroes && userHeroes.map(hero => (
                        <div
                        className="heromini-container"
                        key={hero.id}
                        onClick={() => setBattleHero(hero)}
                        >
                        {portraits(hero.heroClass)}
                        </div>
                    ))}
                    </div>
                </div>
                <div className="battles-monster">
                    <div className="battles-monster-s">
                        {sprites(battleMonster.name)}
                    </div>
                    <div className="monster-holder">
                    {monsters && monsters.map(monster => {
                        return (
                            <div className="monstermini-container"
                            key={monster.id}
                            onClick={() => setBattleMonster(monster)}
                            >
                            {portraits(monster.name)}
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
            <div
            className="battles-create"
            onClick={handleBattleClick}
            >Start</div>
        </div>
    );
};

export default NewBattle;
