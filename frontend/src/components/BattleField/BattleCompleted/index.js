import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deleteBattle } from "../../../store/battles";
import "./BattleCompleted.css"


const BattleCompleted = ({ battle, type }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleClose = e => {
        e.preventDefault();
        closeModal();
        dispatch(deleteBattle(battle.id))
        history.push('/battles/new');
    };

    return (
        <div className="battle-completed">
            <p>{type} has won the battle!</p>
            <button onClick={handleClose}>
                Close
            </button>
        </div>
    );
};

export default BattleCompleted;
