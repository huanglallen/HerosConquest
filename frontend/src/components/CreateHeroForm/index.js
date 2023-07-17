import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createHero } from "../../store/heroes";
import "./CreateHeroForm.css";

const CreateHeroForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.session.user.id);
    const [name, setName] = useState('');
    const [heroClass, setHeroClass] = useState('');
    // const [hp, setHp] = useState('');
    // const [att, setAtt] = useState('');
    // const [def, setDef] = useState('');
    // const [spd, setSpd] = useState('');
    const [validationErrors, setvalidationErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        const errors = {};
        if(!name) errors.name = "Name is required";
        if(name.length > 12) errors.name = "Name must be less than 13 characters";
        setvalidationErrors(errors);

        const newHero = {
            ownerId: userId,
            name,
            heroClass,
            level: 1,
            xp: 0,
            hp: 10,
            att: 10,
            def: 10,
            spd: 10,
            attSpd: 2
        };
        dispatch(createHero(newHero));
        history.push(`/heroes/${userId}`);
    };

    return (
        <div className="createhero-wrapper">
            <h2 className="createhero-header">Create Your Hero</h2>
            <div className="createhero-box">
                <div className="createhero-left">
                    <div className="createhero-name">
                        <h3>What's your name?</h3>
                        <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="createhero-class">
                        <h3>Choose your class</h3>
                        <div className="createhero-class-holder">
                            <div
                            onClick={e => setHeroClass('knight')}
                            >knight holder</div>
                            <div
                            onClick={e => setHeroClass('hunter')}
                            >hunter holder</div>
                            <div
                            onClick={e => setHeroClass('mage')}
                            >mage holder</div>
                            <div
                            onClick={e => setHeroClass('naruto')}
                            >naruto holder</div>
                        </div>
                    </div>
                </div>
                <div className="createhero-middle">
                    <p>className if selected</p>
                    <p>hero image</p>
                    <button
                    onClick={handleSubmit}
                    >Create</button>
                </div>
                <div className="createhero-right">
                    <div>stats</div>
                </div>

            </div>
        </div>
    );
};

export default CreateHeroForm;
