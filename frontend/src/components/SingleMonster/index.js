
import "./SingleMonster.css";

const SingleMonster = ({ monster }) => {
    return (
        <div className="singlemonster-wrapper">
            <div className="singlemonster-header">
                <p>{monster.name}</p>
            </div>
            <div className="singlemonster-body">
                image here
            </div>
            <div className="singlemonster-footer">
                <div>
                    Battle btn
                </div>
            </div>
        </div>
    );
};

export default SingleMonster;
