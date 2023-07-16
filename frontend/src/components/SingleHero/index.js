import { useModal } from "../../context/Modal";
import UpdateNameModal from "../HeroesIndex/UpdateNameModal";
import "./SingleHero.css";

const SingleHero = ({ hero, classImg }) => {
    //modal items
    const { setModalContent } = useModal();
    const openUpdateNameModal = () => {
        setModalContent(<UpdateNameModal />)
    };

    return (
        <div className="singlehero-wrapper">
            <div className="singlehero-footer">
                <p>{hero.name}</p>
                <p>{hero.level}</p>
            </div>
            <div>Class Portrait Here</div>
            <button
            onClick={openUpdateNameModal}>
                update Name
            </button>
        </div>
    );
};

export default SingleHero;
