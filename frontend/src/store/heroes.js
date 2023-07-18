import { csrfFetch } from "./csrf"

const GET_USERS_HEROES = 'heroes/GET_USERS_HEROES';
const CREATE_HERO = 'heroes/CREATE_HERO';
const UPDATE_HERO = 'heroes/UPDATE_HERO';
const DELETE_HERO = 'heroes/DELETE_HERO';

const LOAD_USER_PLAYINGS = 'playing/LOAD_PLAYINGS';
const CREATE_PLAYING = 'playing/CREATE_PLAYING';
const DELETE_PLAYING = 'playing/DELETE_PLAYING';

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

const loadUserPlayings = playing => ({
    type: LOAD_USER_PLAYINGS,
    payload: playing
})

const makePlaying = playing => ({
    type: CREATE_PLAYING,
    payload: playing
});

const removePlaying = playingId => ({
    type: DELETE_PLAYING,
    payload: playingId
});

//THUNK

export const getUserHeroes = userId => async (dispatch) => {
    const res = await csrfFetch(`/api/heroes/${userId}`);
    if(res.ok) {
        const data = await res.json();
        dispatch(loadUserHeroes(data));
        return data;
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
};

export const getUserPlayings = userId => async dispatch => {
    const res = await csrfFetch(`/api/heroes/playing/${userId}`);
    if(res.ok) {
        const data = res.json();
        dispatch(loadUserPlayings(data));
        return data;
    };
};

export const createPlaying = playing => async dispatch => {
    const res = await csrfFetch(`/api/heroes/playing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playing)
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(makePlaying(data));
        return data;
    };
};

export const deletePlaying = playingId => async dispatch => {
    const res = await csrfFetch(`/api/heroes/${playingId}`, {
        method: 'DELETE'
    });
    if(res.ok) {
        dispatch(removePlaying(playingId));
    };
};

//REDUCER
const initialState = {
    userHeroes: {},
    playing: {}
};

const heroesReducer = (state = initialState, action) => {
    let heroState = {};
    let playingState = {};
    switch(action.type) {
        case GET_USERS_HEROES:
            heroState = {...state,
                userHeroes: { ...state.userHeroes },
                playing: { ...state.playing}
            };
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
            const { [action.payload]: deletedHero, ...remainingHeroes } = state.heroes.userHeroes;
            return {
              ...state,
              userHeroes: remainingHeroes
            };
        case LOAD_USER_PLAYINGS:
            playingState = {
                ...state,
                playing: { ...state.playing }
            };
            return playingState;
        case CREATE_PLAYING:
            return {
                ...state,
                playing: action.payload
            };
        case DELETE_PLAYING:
            const {[action.payload]: deletedPlaying, ...remainingPlaying } = state.heroes.playing;
            return { ...state, playing:{...remainingPlaying}}
        default:
            return state;
    };
};

export default heroesReducer;
