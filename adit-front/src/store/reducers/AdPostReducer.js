import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

const initialState = {
    adpost_list_item: [
        {
            list_tag: null,
            adpost_items: [
                {
                    adpost_id: null,
                    owner_id: null,
                    title: null,
                    subtitle: null,
                    content: null,
                    closed: false,
                    target_views: null,
                    total_views: null,
                    upload_date: null,
                    expire_date: null,
                    interest_tags: []
                }
            ]
        }
    ],
    adpost_detailed_item: {
        id: null,
        owner_id: null,
        title: null,
        subtitle: null,
        content: null,
        closed: false,
        image: [],
        target_views: null,
        total_views: null,
        upload_date: null,
        expire_date: null,
        interest_tags: [],
        is_owner: false,
        info_aditee: { is_participating: false, unique_url: null, views: null },
        // Should be added at latter..
        info_aditor: { statistics: null }
    }
};

export const adpost_reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LISTED_ARTICLE:
            return { ...state, adpost_list_item: action.adpost_list_item };
        case actionTypes.GET_DETAILED_ARTICLE:
            return {
                ...state,
                adpost_detailed_item: action.adpost_detailed_item
            };
        default:
            break;
    }
    return state;
};
