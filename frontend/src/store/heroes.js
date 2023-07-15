import { csrfFetch } from "./csrf"

const GET_USERS_HEROES = 'heroes/GET_USERS_HEROES';
const CREATE_HERO = 'heroes/CREATE_HERO';

const loadUserHeroes = heroes => ({
    type: GET_USERS_HEROES,
    payload: heroes
});

const makeHero = hero => ({
    type: CREATE_HERO,
    payload: hero
});

//THUNK

export const getUserHeroes = userId => async (dispatch) => {
    const res = await csrfFetch(`/api/heroes/${userId}`);
    if(res.ok) {
        const data = await res.json();
        dispatch(loadUserHeroes(data))
    }
};

export const createHero = hero => async dispatch => {
    const res = await csrfFetch(`/api/heroes/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero)
    });
    if(res.ok) {
        const data = res.json();
        dispatch(makeHero(data));
        return data;
    };
};

//REDUCER
const initialState = {
    userHeroes: {},
    playing: {}
};

const heroesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS_HEROES:
            const heroState = {...state, userHeroes: {}}
            action.payload.userHeroes.forEach(hero => {
                heroState.userHeroes[hero.id] = hero
            });
            console.log("REDUCER", action.payload)
            return heroState;
        default:
            return state;
    }
};

export default heroesReducer;
