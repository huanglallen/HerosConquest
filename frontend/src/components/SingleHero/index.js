import { useModal } from "../../context/Modal";
import UpdateNameModal from "./UpdateNameModal";
import DeleteHeroModal from "./DeleteHeroModal";
import { portraits } from "../../hooks/heroImgs";
import "./SingleHero.css";

const SingleHero = ({ hero, heroClass }) => {
    //modal items
    const { setModalContent } = useModal();
    const openUpdateNameModal = () => {
        setModalContent(<UpdateNameModal hero={hero} />)
    };
    const openDeleteHeroModal = () => {
        setModalContent(<DeleteHeroModal hero={hero} />)
    };

    return (
        <div id="singlehero-wrapper">
            <div className="singlehero-header">
                <p>{hero.name}</p>
                <p>lvl {hero.level}</p>
            </div>
            <div className="singlehero-body">{portraits(heroClass)}</div>
            <div className="singlehero-footer">
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
