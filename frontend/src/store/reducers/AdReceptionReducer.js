import * as actionTypes from '../actions/actionTypes';

const initialState = {
    submitted: false,
    is_participated: false,
    views: 0,
    unique_link: null
};

export const adreception_reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_RECEPTION:
            return {
                ...state,
                submitted: true,
                is_participated: true,
                views: action.data.views,
                unique_link: action.data.unique_link
            };
            case actionTypes.GET_RECEPTION:
                return {
                    ...state,
                    submitted: true,
                    is_participated: true,
                    views: null,
                    unique_link: action.ad_link
                };
        default:
            break;
    }
    return state;
};
