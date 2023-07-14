import { csrfFetch } from "./csrf"

const GET_USERS_HEROES = 'heroes/GET_USERS_HEROES';

const loadUserHeroes = heroes => ({
    type: GET_USERS_HEROES,
    payload: heroes
});

//THUNK

export const getUserHeroes = userId => async dispatch => {
    const res = csrfFetch(`/api/heroes/${userId}`);

    if(res.ok) {
        const data = await res.json();
        dispatch(loadUserHeroes(data))
    }
};

//REDUCER

const initialState = {
    userHeroes: []
}
