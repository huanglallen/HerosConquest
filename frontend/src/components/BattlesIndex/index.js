import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMonsters } from "../../store/monsters";
import SingleMonster from "../SingleMonster";

const BattlesIndex = () => {
    const dispatch = useDispatch();
    const monstersObj = useSelector(state => state.monsters.monsters);
    const monsters = Object.values(monstersObj);

    console.log('[monsters]', monsters)

    useEffect(() => {
        dispatch(getMonsters());
    }, [dispatch]);

    return (
        <div id="battles">
            <h2 className="battles-header">
                Select your monster to battle:
            </h2>
            <div className="battles-holder">
                {monsters && monsters.map(monster => {
                    return (
                        <SingleMonster key={monster.id} monster={monster} />
                    );
                })};
            </div>
        </div>
    );
};

export default BattlesIndex;
