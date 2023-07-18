import portraits from "../../hooks/portraits";
import "./SingleHeroMini.css";

const SingleHeroMini = ({ hero }) => {
    return (
        <div className="hero-wrapper">
            <div className="hero-header">
                <p>{hero.name}</p>
                <p>{hero.level}</p>
            </div>
            <div className="hero-body">
                {portraits(hero.heroClass)}
            </div>
        </div>
    );
};

export default SingleHeroMini;
