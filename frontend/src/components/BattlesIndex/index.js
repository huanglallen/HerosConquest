import { useHistory } from "react-router-dom";
import "./BattlesIndex.css";


const BattlesIndex = () => {
    const history = useHistory();

    const handleNewBattle = () => {
        history.push('/battles/new')
    };

    const handleContinue = () => {
        history.push(`battles/fight/`)
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
