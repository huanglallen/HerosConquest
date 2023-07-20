import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./BattlesIndex.css";
import { useDispatch, useSelector } from "react-redux";
import { getBattle } from "../../store/battles";


const BattlesIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const battleArr = useSelector(state => state.battles?.battles?.battle);
    const [battle] = battleArr || [];


    useEffect(() => {
        dispatch(getBattle())
    }, [dispatch]);

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
            <div onClick={handleContinue}>Continue</div>
        </div>
    );
};

export default BattlesIndex;
