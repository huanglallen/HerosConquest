import portraits from "../../hooks/portraits";
import "./SingleMonster.css";

const SingleMonster = ({ monster }) => {
    return (
        <div className="singlemonster-wrapper">
            <div className="singlemonster-header">
                <p>{monster.name}</p>
            </div>
            <div className="singlemonster-body">
                {portraits(monster.name)}
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
