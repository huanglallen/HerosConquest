import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateBattle, deleteBattle, getBattle } from "../../store/battles";
import "./BattleField.css";
import { useEffect } from "react";
import { getUserHeroes } from "../../store/heroes";
import { getMonsters } from "../../store/monsters";

const BattleField = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { battleId } = useParams();
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

    // console.log('[btl_FIELD]', battle)
    // console.log('[btl_heroes]', hero)
    // console.log('[btl_monsters]', monster)


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
            <div className="field-body">
                current battle
            </div>
            <div className="field-footer">
                <p>heroHp: {battle.heroHp} / {hero.hp}</p>
                <p>monsterHp: {battle.monsterHp} / {monster.hp}</p>
            </div>
            <div className="field-actions">
                <div
                className="field-attack"
                onClick={handleAttack}
                >Attack</div>
                <div
                className="field-run"
                onClick={handleRun}
                >
                    Run
                </div>
            </div>
        </div>
    );
};

export default BattleField;
