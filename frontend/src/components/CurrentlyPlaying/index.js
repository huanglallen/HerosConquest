import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePlaying } from "../../store/heroes";
import "./CurrentlyPlaying.css";

const CurrentlyPlaying = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const heroesObj = useSelector(state => state.heroes.userHeroes);
    const userHeroes = Object.values(heroesObj);
    const playing = useSelector(state => state.heroes.playing);
    const hero = userHeroes.find(hero => hero.id === playing.heroId)

    console.log('[PLAYING!?]', playing)

    const handleSwitch = () => {
        dispatch(deletePlaying(playing.id));
        history.push(`/heroes`)
    };

    if(!hero) return null;

    return (
        <div className="playing-wrapper">
            <h2 className="playing-header">Currently Playing As:</h2>
            <div>{hero.name} level {hero.level}</div>
            <div onClick={handleSwitch}>Switch</div>
        </div>
    );
};

export default CurrentlyPlaying;
