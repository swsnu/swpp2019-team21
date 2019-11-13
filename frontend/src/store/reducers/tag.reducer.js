import * as actionTypes from '../actions/actionTypes';

const initialState = {
    all_tags: []
};

export const tag_reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_TAG:
            return { ...state, all_tags: action.all_tags };
        case actionTypes.POST_TAG:
            return { ...state, all_tag: state.all_tag.concat(action.tag) };
        default:
            break;
    }
    return state;
};
