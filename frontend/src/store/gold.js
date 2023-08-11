import { csrfFetch } from "./csrf";

//REDUCER
const initialState = {
    userGold: {}
};

const goldReducer = (state = initialState, action) => {
    switch(action.type) {

        default:
            return state;
    }
};

export default goldReducer;
