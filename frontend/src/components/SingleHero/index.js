import "./SingleHero.css";

const SingleHero = ({ hero }) => {
    return (
        <div className="singlehero-wrapper">
            <p>{hero.name}</p>
            <p>{hero.level}</p>
        </div>
    )
};

export default SingleHero;
