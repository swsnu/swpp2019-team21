import * as actionTypes from '../actions/actionTypes';

const initialState = {
    all_tags: []
};

export const tag_reducer = (state = initialState, action = null) => {
    switch (action.type) {
        case actionTypes.GET_ALL_TAG:
            return { ...state, all_tags: action.all_tags };
        case actionTypes.POST_TAG:
            return { ...state, all_tags: state.all_tags.concat(action.tag) };
        case actionTypes.GET_RECENT_TAG:
            return { ...state, all_tags: action.all_tags };
        default:
            break;
    }
    return state;
};
