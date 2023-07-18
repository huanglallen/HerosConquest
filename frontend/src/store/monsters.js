import { csrfFetch } from "./csrf";

const GET_MONSTERS = 'monsters/GET_MONSTERS';

const loadMonsters = monsters => ({
    type: GET_MONSTERS,
    payload: monsters
});

//THUNK

export const getMonsters = monsters => async dispatch => {
    const res = await csrfFetch(`/api/monsters`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadMonsters(data));
        return data;
    }
};

//REDUCER
const initialState = {monsters: {}}

const monstersReducer = (state = initialState, action) => {
    let monsterState = {};
    switch(action.type) {
        case GET_MONSTERS:
            monsterState = {...state, monsters:{...state.monsters}}
            action.payload.monsters.forEach(monster => {
                monsterState.monsters[monster.id] = monster
            });
            return monsterState;
        default:
            return state;
    };
};

export default monstersReducer;
