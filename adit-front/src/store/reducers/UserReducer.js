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
            return { ...state, user: action.user, logged_in: true };
        case actionTypes.SIGN_OUT:
            return { ...initialState, logged_in: false };
        default:
            break;
    }
    return state;
};
