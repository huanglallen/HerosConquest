import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateBattle, deleteBattle, getBattle } from "../../store/battles";
import "./BattleField.css";
import { useEffect } from "react";
import { getUserHeroes } from "../../store/heroes";
import { getMonsters } from "../../store/monsters";
import portraits from "../../hooks/portraits";
import sprites from "../../hooks/sprites";
import { useModal } from "../../context/Modal";
import BattleCompleted from "./BattleCompleted";
import BattleChat from "../BattleChat";

const BattleField = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { battleId } = useParams();
    const { setModalContent } = useModal();
    const [isBattleUpdated, setIsBattleUpdated] = useState(false);

    const userId = useSelector(state => state.session.user?.id)
    const battle = useSelector(state => state.battles?.battle);

    const heroesObj = useSelector(state => state.heroes?.userHeroes);
    const userHeroes = Object.values(heroesObj);
    const hero = userHeroes.find(hero => hero.id === battle?.heroId);

    const monstersObj = useSelector(state => state.monsters?.monsters);
    const monsters = Object.values(monstersObj);
    const monster = monsters.find(monster => monster.id === battle?.monsterId);


    useEffect(() => {
        dispatch(getBattle(userId));
        dispatch(getUserHeroes(userId));
        dispatch(getMonsters());
    }, [dispatch, userId]);

    useEffect(() => {
        if (isBattleUpdated) {
          // Fetch updated battle data
          dispatch(getBattle(userId));
          setIsBattleUpdated(false); // Reset the state after refetching
        }
      }, [dispatch, isBattleUpdated]);

      //Battle finished
      useEffect(() => {
        if((battle && battle.heroHp <= 0) || (battle && battle.monsterHp <= 0)) {
            setModalContent(<BattleCompleted battle={battle} type={battle.heroHp <= 0 ? monster.name : hero.name}/>)
        }
      }, [battle])

    const handleAttack = async (e) => {
        e.preventDefault();
        const updatedBattle = {
            id: battle.id,
            userId: userId,
            heroId: battle.heroId,
            monsterId: battle.monsterId,
            heroHp: battle.heroHp - 5,
            monsterHp: battle.monsterHp - 5
        }
        await dispatch(updateBattle(updatedBattle));
        setIsBattleUpdated(true);
    };

    const handleRun = (e) => {
        e.preventDefault();
        dispatch(deleteBattle(battleId));
        history.push('/battles/new');
    };

    if (!battle || !hero || !monster) return null;

    return (
        <div id="field">
            <body className="field-body">
            <header className="field-header">
            <div className="field-hero">
                {portraits(hero.heroClass)}
                <div className="field-hero-info">
                    <p className="field-name">{hero.name}</p>
                    <div className="hp-bar">
                        <div className={`hp-text ${battle.heroHp <= 0 ? 'red' : ''}`}>
                            {battle.heroHp}
                        </div>
                        <div
                        className={`hp-bar-inner ${battle.heroHp <= 0 ? 'red' : ''}`}
                        style={{ width: `${(battle.heroHp / hero.hp) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="field-monster">
                <div className="field-monster-info">
                    <p className="field-name">{monster.name}</p>
                    <div className="hp-bar">
                        <div className={`hp-text ${battle.monsterHp <= 0 ? 'red' : ''}`}>
                            {battle.monsterHp}
                        </div>
                        <div
                            className={`hp-bar-inner ${battle.monsterHp <= 0 ? 'red' : ''}`}
                            style={{ width: `${(battle.monsterHp / monster.hp) * 100}%` }}
                        ></div>
                    </div>
                </div>
                {portraits(monster.name)}
            </div>
            </header>
                <div className="field-fight">
                    <div className="field-hero-sprite">
                        {sprites(hero.heroClass)}
                    </div>
                    <div className="field-monster-sprite">
                        {sprites(monster.name)}
                    </div>
                </div>
                <footer className="field-footer">
                    <button
                    className="field-attack"
                    onClick={handleAttack}
                    >Attack</button>
                    <button
                    className="field-run"
                    onClick={handleRun}
                    >
                        Run
                    </button>
                </footer>
            </body>
            <div className="field-chat">
                <BattleChat battle={battle} />
            </div>
        </div>
    );
};

export default BattleField;
