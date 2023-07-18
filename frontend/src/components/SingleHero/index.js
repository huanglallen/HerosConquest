import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import UpdateNameModal from "./UpdateNameModal";
import DeleteHeroModal from "./DeleteHeroModal";
import { createPlaying } from "../../store/heroes";
import { portraits } from "../../hooks/heroImgs";
import "./SingleHero.css";

const SingleHero = ({ hero, heroClass }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.session.user.id)

    //modal items
    const { setModalContent } = useModal();
    const openUpdateNameModal = () => {
        setModalContent(<UpdateNameModal hero={hero} />)
    };
    const openDeleteHeroModal = () => {
        setModalContent(<DeleteHeroModal hero={hero} />)
    };
    const handlePlay = () => {
        const newPlaying = {
            userId,
            heroId: hero.id
        };
        dispatch(createPlaying(newPlaying));
        history.push('/heroes/playing');
    };

    return (
        <div id="singlehero-wrapper">
            <div className="singlehero-header">
                <p>{hero.name}</p>
                <p>lvl {hero.level}</p>
            </div>
            <div className="singlehero-body">{portraits(heroClass)}</div>
            <div className="singlehero-footer">
                <div onClick={handlePlay}>Play Now</div>
                <div onClick={openUpdateNameModal}>
                <i className="fa-solid fa-pen-to-square"/>
                </div>
                <div onClick={openDeleteHeroModal}>
                    <i className="fa-solid fa-trash-can"/>
                </div>
            </div>
        </div>
    );
};

export default SingleHero;
