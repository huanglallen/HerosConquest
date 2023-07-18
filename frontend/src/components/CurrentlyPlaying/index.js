import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePlaying } from "../../store/heroes";
import "./CurrentlyPlaying.css";

const CurrentlyPlaying = (hero) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const playing = useSelector(state => state.heroes.playing);
    const currPlaying = playing.find(play => play.heroId === hero.id);
    const handleSwitch = () => {
        dispatch(deletePlaying(currPlaying));
        history.push(`/heroes/${user.id}`)
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
