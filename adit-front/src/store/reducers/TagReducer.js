import * as actionTypes from '../actions/actionTypes';

const initialState = {
    all_tags: []
};

export const tag_reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TAG:
            return { ...state, all_tags: action.all_tags };
        default:
            break;
    }
    return state;
};
