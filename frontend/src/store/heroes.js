import { csrfFetch } from "./csrf"

const GET_USERS_HEROES = 'heroes/GET_USERS_HEROES';
const CREATE_HERO = 'heroes/CREATE_HERO';
const UPDATE_HERO = 'heroes/UPDATE_HERO';
const DELETE_HERO = 'heroes/DELETE_HERO';

const loadUserHeroes = heroes => ({
    type: GET_USERS_HEROES,
    payload: heroes
});

const makeHero = hero => ({
    type: CREATE_HERO,
    payload: hero
});

const editHero = hero => ({
    type: UPDATE_HERO,
    payload: hero
});

const removeHero = heroId => ({
    type: DELETE_HERO,
    payload: heroId
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

export const updateHero = hero => async dispatch => {
    const res = await csrfFetch(`/api/heroes/${hero.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero)
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(editHero(data));
        return data;
    }
};

export const deleteHero = heroId => async dispatch => {
    const res = await csrfFetch(`/api/heroes/${heroId}`, {
        method: 'DELETE'
    });
    if(res.ok) {
        dispatch(removeHero(heroId));
    }
}

//REDUCER
const initialState = {
    userHeroes: {}
};

const heroesReducer = (state = initialState, action) => {
    let heroState = {};
    switch(action.type) {
        case GET_USERS_HEROES:
            heroState = {...state, userHeroes: { ...state.userHeroes }};
            action.payload.userHeroes.forEach(hero => {
                heroState.userHeroes[hero.id] = hero
            });
            return heroState;
        case CREATE_HERO:
            return {
                ...state,
                userHeroes: action.payload
            };
        case UPDATE_HERO:
            const updatedHero = action.payload;
            const updatedUserHeroes = {
              ...state.userHeroes,
              [updatedHero.id]: updatedHero
            };
            return {
              ...state,
              userHeroes: updatedUserHeroes
            };
        case DELETE_HERO:
            return {
                ...state,
                userHeroes: state.userHeroes.filter(hero => hero.id !== action.payload)
            };
        default:
            return state;
    };
};

export default heroesReducer;
