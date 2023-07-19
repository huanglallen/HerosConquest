import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateBattle, deleteBattle } from "../../store/battles";
import "./BattleField.css";

const BattleField = ({hero, monster}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { battleId } = useParams();
    const battles = useSelector(state => state.battles.battles);

    const handleAttack = (e) => {
        e.preventDefault();
        dispatch(updateBattle());
    };

    const handleRun = (e) => {
        e.preventDefault();
        dispatch(deleteBattle(battleId));
        history.push('/battles/new');
    };

    return (
        <div id="field">
            <div className="field-body">

            </div>
            <div className="field-footer">
                <p>heroHp: {} / {hero.hp}</p>
                <p>monsterHp: {} / {monster.hp}</p>
            </div>
        </div>
    );
};

export default BattleField;
