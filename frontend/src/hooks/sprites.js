import knight from "../images/sprites/knight-s.png";
import hunter from "../images/sprites/hunter-s.png";
import mage from "../images/sprites/mage-s.png";
import berserker from "../images/sprites/berserker-s.png";
import zombie from "../images/sprites/zombie-s.png";
import deathknight from "../images/sprites/deathknight-s.png";
import lurker from "../images/sprites/lurker-s.png";

const sprites = (type) => {
    if(type === 'Knight') return <img className="sprite" alt={type} src={knight}/>;
    if(type === 'Hunter') return <img className="sprite" alt={type} src={hunter}/>;
    if(type === 'Mage') return <img className="sprite" alt={type} src={mage}/>;
    if(type === 'Berserker') return <img className="sprite" alt={type} src={berserker}/>;
    if(type === 'zombie') return <img className="sprite" alt={type} src={zombie}/>;
    if(type === 'Death Knight') return <img className="sprite" alt={type} src={deathknight}/>;
    if(type === 'The Lurker') return <img className="sprite" alt={type} src={lurker}/>;
    return <i className="fa-regular fa-circle-question" ></i>;
};

export default sprites;
