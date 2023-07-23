import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBattle, getBattle } from "../../store/battles";
import "./BattlesIndex.css";


const BattlesIndex = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  const battleArr = useSelector(state => state.battles?.battles?.battle);
  const [battle] = battleArr || [];

  useEffect(() => {
      dispatch(getBattle());
    }, [dispatch]);

  useEffect(() => {
    if (!battle) {
      setDisabled(true);
    } else {
       setDisabled(false);
      }
  }, [battle]);

  const handleNewBattle = () => {
    if(battle) {
      dispatch(deleteBattle(battle.id));
    }
      history.push('/battles/new')
  };

  const handleContinue = () => {
      history.push(`battles/fight/${battle.id}`)
  };

  return (
    <div id="battleindex">
      <h2 className="bi-title">START YOUR BATTLE</h2>
      <button
      className="bi-new"
      onClick={handleNewBattle}>New Battle</button>
      <button
      className={battle ? "bi-continue" : "bi-continue-d"}
      onClick={handleContinue}
      disabled={disabled}
      >Continue</button>
    </div>
    );
};

export default BattlesIndex;
