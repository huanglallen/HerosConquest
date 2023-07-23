import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createHero } from "../../store/heroes";
import "./CreateHeroForm.css";
import portraits from "../../hooks/portraits";
import sprites from "../../hooks/sprites";

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
    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        const errors = {};
        if (!name) errors.name = "Name is required";
        if (name && name.length > 15) errors.name = "Name must be less than 16 characters";
        if (!heroClass) errors.heroClass = "Select your class";
        setValidationErrors(errors);

        if (Object.keys(errors).length === 0) {
          const newHero = {
            ownerId: userId,
            name,
            heroClass,
            level: 1,
            xp: 0,
            hp: 22,
            att: 10,
            def: 10,
            spd: 10,
            attSpd: 2
          };
          await dispatch(createHero(newHero));
          history.push(`/heroes`);
        }
      };

    return (
        <div className="createhero-wrapper">
            <h2 className="createhero-header">Create Your Hero:</h2>
            <div className="createhero-box">
                <div className="createhero-left">
                    <div className="createhero-name">
                        <h3 className="hc-name-head">What's your name?</h3>
                        {validationErrors.name && <span className="createhero-errors">{validationErrors.name}</span>}
                        <input
                        className="name-input"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="createhero-class">
                        <h3>Choose your class</h3>
                        {validationErrors.heroClass && <span className="createhero-errors">{validationErrors.heroClass}</span>}
                        <div className="createhero-class-holder">
                            <div
                            onClick={e => setHeroClass('Knight')}
                            >{portraits('Knight')}</div>
                            <div
                            onClick={e => setHeroClass('Hunter')}
                            >{portraits('Hunter')}</div>
                            <div
                            onClick={e => setHeroClass('Mage')}
                            >{portraits('Mage')}</div>
                            <div
                            onClick={e => setHeroClass('Berserker')}
                            >{portraits('Berserker')}</div>
                        </div>
                    </div>
                </div>
                <div className="createhero-middle">
                    <p className="hc-heroname">{heroClass}</p>
                    <p className="hc-hero-sprite">{sprites(heroClass)}</p>
                    <button
                    onClick={handleSubmit}
                    >Create</button>
                </div>
                <div className="createhero-right">
                    <div className="hc-right-header">stats coming soon...</div>
                </div>

            </div>
        </div>
    );
};

export default CreateHeroForm;
