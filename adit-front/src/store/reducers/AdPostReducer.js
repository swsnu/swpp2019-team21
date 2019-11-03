import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

const initialState = {
    loaded: false,
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
    adpost_hottest_item: [
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
    ],
    adpost_recent_item: [
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
    ],
    adpost_detailed_item: {
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
    }
};

export const adpost_reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GRID_ARTICLE:
            return { ...state, adpost_list_item: [action.adpost_list_item] };
        case actionTypes.GET_HOTTEST_ARTICLE:
            return {
                ...state,
                adpost_hottest_item: {
                    adpost_item: action.adpost_list_item
                }
            };
        case actionTypes.GET_RECENT_ARTICLE:
            return {
                ...state,
                loaded: true,
                adpost_recent_item: {
                    adpost_item: action.adpost_list_item
                }
            };
        case actionTypes.GET_LISTED_ARTICLE:
            return {
                ...state,
                adpost_list_item: state.adpost_list_item.concat(
                    action.adpost_list_item
                )
            };
        case actionTypes.GET_DETAILED_ARTICLE:
            return {
                ...state,
                adpost_detailed_item: action.adpost_detailed_item,
                loaded: true
            };
        case actionTypes.GET_CUSTOM_ARTICLE:
            return {
                ...state,
                adpost_list_item: [action.adpost_list_item]
            };
        default:
            break;
    }
    return state;
};
