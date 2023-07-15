import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateHero = () => {
    const [name, setName] = useState('');
    const [heroClass, setHeroClass] = useState('');
    const [hp, setHp] = useState('');
    const [att, setAtt] = useState('');
    const [def, setDef] = useState('');
    const [spd, setSpd] = useState('');
    const [validationErrors, setvalidationErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        const errors = {};
        if(!name) errors.name = "Name is required";
        if(name.length > 12) errors.name = "Name must be less than 13 characters";
        
    }
};

export default CreateHero;
