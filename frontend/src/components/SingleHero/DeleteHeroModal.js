import { useDispatch } from "react-redux";
import { deleteHero } from "../../store/heroes";
import { useModal } from "../../context/Modal";
import "./DeleteHeroModal.css";

const DeleteHeroModal = ({ hero }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteHeroHandler = () => {
        dispatch(deleteHero(hero.id));
        closeModal();
    };
    return (
        <div className="deletehero-wrapper">
            <h3 className="deletehero-title">Are you sure you want to delete {hero.name}?</h3>
            <div className="deletehero-button-holder">
                <button onClick={deleteHeroHandler}>Delete</button>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default DeleteHeroModal;
