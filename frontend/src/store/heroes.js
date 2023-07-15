import { csrfFetch } from "./csrf"

const GET_USERS_HEROES = 'heroes/GET_USERS_HEROES';

const loadUserHeroes = heroes => ({
    type: GET_USERS_HEROES,
    payload: heroes
});

//THUNK

export const getUserHeroes = userId => async (dispatch) => {
    const res = await csrfFetch(`/api/heroes/${userId}`);
    if(res.ok) {
        const data = await res.json();
        dispatch(loadUserHeroes(data))
    }
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
