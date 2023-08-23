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
    const [attBtn, setAttBtn] = useState(false);
    const [battleFinished, setBattleFinished] = useState(false);

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
            return setModalContent(<BattleCompleted battle={battle} type={battle.heroHp <= 0 ? monster.name : hero.name}/>)
        }
      }, [battle])

      const handleAttack = async (e) => {
        e.preventDefault();

        if (battle.monsterHp <= 0) {
            return;
        }

        // prevent att button spam
        setAttBtn(true);
        setTimeout(() => {
            setAttBtn(false);
        }, 2000);

        const updatedMonsterBattle = {
            ...battle,
            monsterHp: battle.monsterHp - 5,
        };

        await dispatch(updateBattle(updatedMonsterBattle));
        setIsBattleUpdated(true);

        if (updatedMonsterBattle.monsterHp > 0) {
            setTimeout(async () => {
                // Check if monster's HP is still greater than 0 before attacking
                if (updatedMonsterBattle.monsterHp > 0) {
                    const updatedHeroBattle = {
                        ...updatedMonsterBattle,
                        heroHp: updatedMonsterBattle.heroHp - 5,
                    };

                    if (updatedMonsterBattle.monsterHp > 0) {
                        await dispatch(updateBattle(updatedHeroBattle));
                        setIsBattleUpdated(true);
                    }
                }
            }, 1500);
        }
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
                            {battle.heroHp} / {hero.hp}
                        </div>
                        <div className="hp-bar-inner-wrapper">
                            <div
                            className={`hp-bar-inner ${battle.heroHp <= 0 ? 'red' : ''}`}
                            style={{ width: `${(battle.heroHp / hero.hp) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="field-monster">
                <div className="field-monster-info">
                    <p className="field-name">{monster.name}</p>
                    <div className="hp-bar">
                        <div className={`hp-text ${battle.monsterHp <= 0 ? 'red' : ''}`}>
                            {battle.monsterHp} / {monster.hp}
                        </div>
                        <div className="hp-bar-inner-wrapper">
                            <div
                            className={`hp-bar-inner ${battle.monsterHp <= 0 ? 'red' : ''}`}
                            style={{ width: `${(battle.monsterHp / monster.hp) * 100}%` }}
                            ></div>
                        </div>
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
                    className={!attBtn ? 'field-att' : 'field-att-d'}
                    onClick={handleAttack}
                    disabled={attBtn}
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
