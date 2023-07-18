import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePlaying } from "../../store/heroes";

const CurrentlyPlaying = (hero) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const playing = useSelector(state => state.heroes.playing);
    const currPlaying = playing.find(play => play.heroId === hero.id);
    const handleSwitch = () => {
        dispatch(deletePlaying(currPlaying))
    };

    return (
        <div className="playing-wrapper">
            <h2 className="playing-header">Currently Playing As:</h2>
            <div>{hero.name} level{hero.level}</div>
            <div onClick={handleSwitch}>Switch</div>
        </div>
    );
};

export default CurrentlyPlaying;
