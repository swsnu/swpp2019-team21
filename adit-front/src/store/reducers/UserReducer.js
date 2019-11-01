import * as actionTypes from '../actions/actionTypes';

const initialState = {
    logged_in: false,
    user: {
        user_id: null,
        first_name: null,
        last_name: null,
        nickname: null,
        email: null,
        interested_tags: []
    }
};

export const user_reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN:
            localStorage.setItem('logged_in', 'true');
            return { ...state };
        case actionTypes.SIGN_OUT:
            localStorage.setItem('logged_in', 'false');
            return { ...state, logged_in: false };
        case actionTypes.GET_USER:
            return { ...state, user: action.user };
        case actionTypes.PUT_USER:
            return { ...state };
        default:
            break;
    }
    return state;
};
