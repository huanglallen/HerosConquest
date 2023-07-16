import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateHero } from "../../store/heroes";
import { useModal } from "../../context/Modal";

const UpdateNameModal = ({ hero }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [name, setName] = useState(hero.name);

    const editNameHandler = () => {
        hero.name = name;
        dispatch(updateHero(hero));
        closeModal();
    };

    return (
        <div className="updatehero-wrapper">
            <h3>Would you like to update {hero.name}'s name?</h3>
            <input
            type="text"
            onChange={e => setName(e.target.value)}
            />
            <button
            onClick={editNameHandler}
            >Update Now</button>
            <button onClick={closeModal}>Close</button>
        </div>
    )
};

export default UpdateNameModal;
