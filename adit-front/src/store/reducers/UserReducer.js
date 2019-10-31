import actionTypes from '../actions/actionTypes';

const initialState = {
    logged_in: false,
    user: {
        first_name: null,
        last_name: null,
        nickname: null,
        email: null,
        interested_tags: []
    }
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN:
            return { ...state, user: action.user, logged_in: action.logged_in };
        case actionTypes.SIGN_OUT:
            return { ...initialState, logged_in: action.logged_in };
        default:
            break;
    }
    return state;
};
