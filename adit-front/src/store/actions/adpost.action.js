import actionTypes from '../actions/actionTypes';
import axios from 'axios';

const base_url = '/api';

function getListArticle_(data) {
    return {
        type: actionTypes.GET_LISTED_ARTICLE,
        adpost_list_item: data
    };
}

function makeUrl(tag) {
    switch (tag) {
        case 'hottest':
            return '/adpost/hottest';
        case 'recent':
            return '/adpost/recent';
        default:
            return '/adpost/by-tag/' + tag;
    }
}

export const getListArticle = tag_list => {
    return dispatch => {
        var chain = axios.get(base_url + makeUrl(tag_list[0]));
        var data = [];

        for (var i = 1; i < tag_list.length; i++) {
            chain = chain.then(res => {
                data.concat({
                    list_tag: tag_list[i - 1],
                    adpost_items: res.data
                });
                return axios.get(base_url + makeUrl(tag_list[i]));
            });
        }
        chain.then(res => {
            data.concat({
                list_tag: tag_list[tag_list.length - 1],
                adpost_items: res.data
            });
            dispatch(getListArticle_(data));
        });
    };
};
