import knight from "../images/portraits/knight.png"
import hunter from "../images/portraits/hunter.png"
import mage from "../images/portraits/mage.png"
import berserker from "../images/portraits/berserker.png"

import zombie from "../images/portraits/zombie.png"
import deathknight from "../images/portraits/deathknight.png"
import lurker from "../images/portraits/lurker.png"

const portraits = (type) => {
    if(type === 'Knight') return <img className="portrait" alt={type} src={knight}/>;
    if(type === 'Hunter') return <img className="portrait" alt={type} src={hunter}/>;
    if(type === 'Mage') return <img className="portrait" alt={type} src={mage}/>;
    if(type === 'Berserker') return <img className="portrait" alt={type} src={berserker}/>;
    if(type === 'zombie') return <img className="portrait" alt={type} src={zombie}/>;
    if(type === 'Death Knight') return <img className="portrait" alt={type} src={deathknight}/>;
    if(type === 'The Lurker') return <img className="portrait" alt={type} src={lurker}/>;
    return 'No Class found';
};

export default portraits;
