import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateHero } from "../../store/heroes";
import { useModal } from "../../context/Modal";
import "./UpdateNameModal.css";

const UpdateNameModal = ({ hero }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [name, setName] = useState(hero.name);
    const [validationErrors, setValidationErrors] = useState({});

    const editNameHandler = async e => {
        e.preventDefault();

        const errors = {};
        if (!name || name.length === 0) errors.name = "Name is required";
        if (name && name.length > 15) errors.name = "Name must be less than 16 characters";
        setValidationErrors(errors);

        if(Object.keys(errors).length === 0) {
            await dispatch(updateHero({ ...hero, name: name }));
            closeModal();
        }
    };

    return (
        <div className="updatehero-wrapper">
            <h3 className="updatehero-title">Would you like to update {hero.name}'s name?</h3>
            {validationErrors.name &&
            <span className="updatehero-errors">
                {validationErrors.name}
            </span>}
            <input
            className="updatehero-input"
            type="text"
            placeholder="Name"
            onChange={e => setName(e.target.value)}
            value={name}
            />
            <div className="updatehero-button-holder">
                <button
                onClick={editNameHandler}
                >Update Now</button>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    )
};

export default UpdateNameModal;
