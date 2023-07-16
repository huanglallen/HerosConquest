import { useModal } from "../../context/Modal";
import UpdateNameModal from "./UpdateNameModal";
import DeleteHeroModal from "./DeleteHeroModal";
import "./SingleHero.css";

const SingleHero = ({ hero, classImg }) => {
    //modal items
    const { setModalContent } = useModal();
    const openUpdateNameModal = () => {
        setModalContent(<UpdateNameModal hero={hero} />)
    };
    const openDeleteHeroModal = () => {
        setModalContent(<DeleteHeroModal hero={hero} />)
    };

    return (
        <div className="singlehero-wrapper">
            <div className="singlehero-footer">
                <p>{hero.name}</p>
                <p>{hero.level}</p>
            </div>
            <div>Class Portrait Here</div>
            <button onClick={openUpdateNameModal}>
                updateName icon
            </button>
            <button onClick={openDeleteHeroModal}>
                deleteHero icon
            </button>
        </div>
    );
};

export default SingleHero;
