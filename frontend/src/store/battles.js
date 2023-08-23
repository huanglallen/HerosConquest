import { csrfFetch } from "./csrf";

const GET_BATTLE = 'battles/GET_BATTLE';
const CREATE_BATTLE = 'battles/CREATE_BATTLE';
const UPDATE_BATTLE = 'battles/UPDATE_BATTLE';
const DELETE_BATTLE = 'battles/DELETE_BATTLE';

const loadBattle = battle => ({
    type: GET_BATTLE,
    payload: battle
});

const makeBattle = battle => ({
    type: CREATE_BATTLE,
    payload: battle
});

const editBattle = battle => ({
    type: UPDATE_BATTLE,
    payload: battle
});

const removeBattle = battleId => ({
    type: DELETE_BATTLE,
    payload: battleId
});


//THUNK

export const getBattle = userId => async dispatch => {
    const res = await csrfFetch(`/api/battles/${userId}`);
    if(res.ok) {
        const data = await res.json();
        dispatch(loadBattle(data));
        return data;
    }
};

export const createBattle = battle => async dispatch => {
    const res = await csrfFetch(`/api/battles/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(battle)
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(makeBattle(data));
        return data;
    };
};

export const updateBattle = battle => async dispatch => {
    const res = await csrfFetch(`/api/battles/fight/${battle.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(battle)
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(editBattle(data));
        return data;
    };
};

export const deleteBattle = battleId => async dispatch => {
    const res = await csrfFetch(`/api/battles/${battleId}`, {
        method: 'DELETE'
    });
    if(res.ok) {
        dispatch(removeBattle(battleId));
    };
};

//REDUCER

const initialState = {
    battle: {}
};

const battlesReducer = (state = initialState, action) => {
    let battleState = {};
    switch(action.type) {
        case GET_BATTLE:
            return { ...state, ...action.payload};
        case CREATE_BATTLE:
            return { ...state, ...action.payload };
        case UPDATE_BATTLE:
            return { ...state, battle: action.payload };
        case DELETE_BATTLE:
            return { ...state, battle: {}};
        default:
            return state;
    };
};

export default battlesReducer;
