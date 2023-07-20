import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBattle } from "../../store/battles";
import "./BattlesIndex.css";


const BattlesIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [disabled, setDisabled] = useState(false);
    const battleArr = useSelector(state => state.battles?.battles?.battle);
    const [battle] = battleArr || [];


    useEffect(() => {
        dispatch(getBattle())
        if(!battle) {
            setDisabled(true);
        }
    }, [dispatch, battle]);

    const handleNewBattle = () => {
        history.push('/battles/new')
    };

    const handleContinue = () => {
        history.push(`battles/fight/${battle.id}`)
    };

    return (
        <div id="battleindex">
            <h2>Start your battle</h2>
            <div onClick={handleNewBattle}>New Battle</div>
            <div
            onClick={handleContinue}
            disabled={disabled}
            >Continue</div>
        </div>
    );
};

export default BattlesIndex;
