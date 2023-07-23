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

const BattleField = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { battleId } = useParams();
    const { setModalContent } = useModal();
  const [isBattleUpdated, setIsBattleUpdated] = useState(false);

    const userId = useSelector(state => state.session.user.id)
    const battleArr = useSelector(state => state.battles?.battles?.battle);
    const [battle] = battleArr || [];
    const heroesObj = useSelector(state => state.heroes?.userHeroes);
    const userHeroes = Object.values(heroesObj);
    const hero = userHeroes.find(hero => hero.id === battle?.heroId)

    const monstersObj = useSelector(state => state.monsters?.monsters);
    const monsters = Object.values(monstersObj);
    const monster = monsters.find(monster => monster.id === battle?.monsterId);


    useEffect(() => {
        dispatch(getBattle());
        dispatch(getUserHeroes(userId));
        dispatch(getMonsters());
    }, [dispatch, userId]);

    useEffect(() => {
        if (isBattleUpdated) {
          // Fetch fresh battle data
          dispatch(getBattle());
          setIsBattleUpdated(false); // Reset the state after refetching
        }
      }, [dispatch, isBattleUpdated]);

      //Battle finished
      useEffect(() => {
        if(battle && battle.heroHp <= 0 || battle && battle.monsterHp <= 0) {
            setModalContent(<BattleCompleted battle={battle} type={battle.heroHp <= 0 ? monster.name : hero.name}/>)
        }
      }, [battle])

    const handleAttack = async (e) => {
        e.preventDefault();
        const updatedBattle = {
            id: battle.id,
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
                        <p>{hero.name}: {battle.heroHp} / {hero.hp}</p>
                    </div>
                    <div className="field-monster">
                        <p>{monster.name}: {battle.monsterHp} / {monster.hp}</p>
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
                BattleText coming soon...
            </div>
        </div>
    );
};

export default BattleField;
