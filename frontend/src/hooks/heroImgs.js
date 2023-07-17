import knight from "../images/portraits/knight.png"
import hunter from "../images/portraits/hunter.png"
import mage from "../images/portraits/mage.png"
import naruto from "../images/portraits/naruto.png"

export const portraits = (heroClass) => {
    if(heroClass === 'knight') return <img className="hero-portrait" alt={heroClass} src={knight}/>;
    if(heroClass === 'hunter') return <img className="hero-portrait" alt={heroClass} src={hunter}/>;
    if(heroClass === 'mage') return <img className="hero-portrait" alt={heroClass} src={mage}/>;
    if(heroClass === 'naruto') return <img className="hero-portrait" alt={heroClass} src={naruto}/>;
    return 'No Class found'
};
