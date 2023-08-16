import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBattle, getBattle } from "../../store/battles";
import "./BattlesIndex.css";


const BattlesIndex = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(state => state.session.user.id)
  const battle = useSelector(state => state.battles.battle);

  useEffect(() => {
    if(userId) {
      dispatch(getBattle(userId));
    }
    }, [dispatch]);

  const handleNewBattle = () => {
    if(Object.keys(battle).length) {
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
      className={battle.id ? "bi-continue" : "bi-continue-d"}
      onClick={handleContinue}
      disabled={!battle.id}
      >Continue</button>
    </div>
    );
};

export default BattlesIndex;
