import actionTypes from '../actions/actionTypes';

const initialState = {
    submitted : false
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_RECEPTION:
            return { ...state, submitted : true };
    }
    return state;
};
