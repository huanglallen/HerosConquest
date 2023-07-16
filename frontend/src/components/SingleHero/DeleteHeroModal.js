import { useDispatch } from "react-redux";
import { deleteHero } from "../../store/heroes";
import { useModal } from "../../context/Modal";

const DeleteHeroModal = ({ hero }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteHeroHandler = () => {
        dispatch(deleteHero(hero.id));
        closeModal();
    };
    return (
        <div className="deletehero-wrapper">
            <h3>Are you sure you want to delete {hero.name}?</h3>
            <button onClick={deleteHeroHandler}>Delete</button>
            <button onClick={closeModal}>Close</button>
        </div>
    );
};

export default DeleteHeroModal;
