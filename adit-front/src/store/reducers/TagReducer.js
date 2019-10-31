import actionTypes from '../actions/actionTypes';

const initialState = {
    all_tags: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_TAG:
            return { ...state, all_tags: action.all_tags };
    }
    return state;
};
