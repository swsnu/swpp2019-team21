import * as actionTypes from '../actions/actionTypes';

// state.adpost

const initialState = {
    error_code: null,
    adpost_items: {},
    adpost_detailed_item: {
        is_loading: false,
        id: null,
        owner_id: null,
        title: null,
        subtitle: null,
        content: null,
        thumbnail: null,
        ad_link: null,
        closed: false,
        image: [],
        target_views: null,
        total_views: null,
        upload_date: null,
        expiry_date: null,
        tags: [],
        is_owner: false,
        info_aditee: { is_participating: false, unique_url: null, views: null },
        // Should be added at latter..
        info_aditor: { statistics: null }
    },
    adpost_post: { is_loading: false },
    adpost_home_list: []
};

export const adpost_reducer = (state = initialState, action = null) => {
    switch (action.type) {
        case actionTypes.GET_ADLIST_PENDING:
            return {
                ...state,
                error_code: null,
                adpost_items: {
                    query: action.query,
                    query_type: action.query_type,
                    data: []
                }
            };
        case actionTypes.GET_ADLIST_SUCCESS:
            return {
                ...state,
                error_code: null,
                adpost_items: {
                    query: action.query,
                    query_type: action.query_type,
                    data: action.payload
                }
            };
        case actionTypes.GET_ADLIST_FAILURE:
            return {
                ...state,
                error_code: action.error
            };
        case actionTypes.GET_DETAILED_ADPOST_PENDING:
            return {
                ...state,
                error_code: null,
                adpost_detailed_item: null
            };
        case actionTypes.GET_DETAILED_ADPOST_SUCCESS:
            return {
                ...state,
                error_code: null,
                adpost_detailed_item: {
                    ...action.detailed_item
                }
            };
        case actionTypes.GET_DETAILED_ADPOST_FAILURE:
            return {
                ...state,
                error_code: action.error
            };
        case actionTypes.POST_ADPOST_PENDING:
            return {
                ...state,
                error_code: null
            };
        case actionTypes.POST_ADPOST_SUCCESS:
            return {
                ...state
            };
        case actionTypes.POST_ADPOST_FAILURE:
            return {
                ...state,
                error_code: action.error
            };
        case actionTypes.GET_ADLIST_HOME_PENDING:
            return {
                ...state,
                error_code: null,
                adpost_home_list: []
            };
        case actionTypes.GET_ADLIST_HOME_SUCCESS:
            return {
                ...state,
                adpost_home_list: state.adpost_home_list.concat(action.payload)
            };
        case actionTypes.GET_ADLIST_HOME_FAILURE:
            return {
                ...state,
                error_code: action.error
            };
        default:
            return state;
    }
};
