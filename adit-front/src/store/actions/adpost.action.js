import actionTypes from '../actions/actionTypes';
import axios from 'axios';

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

function getArticleList_(data) {
    return {
        type: actionTypes.GET_LISTED_ARTICLE,
        adpost_list_item: data
    };
}

export const getArticleList = tag_list => {
    return dispatch => {
        tag_list.forEach(tag => {
            axios
                .get(makeUrl(tag))
                .then(res => {
                    var data = {
                        list_tag: tag,
                        adpost_items: res.data
                    };
                    dispatch(getArticleList_(data));
                })
                .catch(e => {
                    console.log(e);
                });
        });
    };
};

function getArticleDetail_(data) {
    return {
        type: actionTypes.GET_DETAILED_ARTICLE,
        adpost_detailed_item: data
    };
}

function getArticleDetail(article_id) {
    return dispatch => {
        axios
            .get('/adpost/' + article_id)
            .then(res => {
                dispatch(getArticleDetail_(res.data));
            })
            .catch(e => {
                console.log(e);
            });
    };
}
