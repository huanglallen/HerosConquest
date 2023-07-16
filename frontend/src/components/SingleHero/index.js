import "./SingleHero.css";

const SingleHero = ({ hero, classImg }) => {
    return (
        <div className="singlehero-wrapper">
            <div className="singlehero-footer">
                <p>{hero.name}</p>
                <p>{hero.level}</p>
            </div>
            <div>Class Portrait Here</div>
        </div>
    );
};

export default SingleHero;
