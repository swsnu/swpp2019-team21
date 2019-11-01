import * as actionTypes from '../actions/actionTypes';
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

function getHottestList_(data) {
    return {
        type: actionTypes.GET_HOTTEST_ARTICLE,
        adpost_list_item: data
    };
}

export const getHottestList = () => {
    return dispatch => {
        axios
            .get('/api/adpost/hottest/')
            .then(res => {
                dispatch(getHottestList_(res.data));
            })
            .catch(e => {
                console.log(e);
            });
    };
};

function getRecentList_(data) {
    return {
        type: actionTypes.GET_RECENT_ARTICLE,
        adpost_list_item: data
    };
}

export const getRecentList = () => {
    return dispatch => {
        axios
            .get('/api/adpost/recent/')
            .then(res => {
                dispatch(getRecentList_(res.data));
            })
            .catch(e => {
                console.log(e);
            });
    };
};

function getCustomList_(data) {
    return {
        type: actionTypes.GET_CUSTOM_ARTICLE,
        adpost_list_item: data
    };
}

export const getCustomList = () => {
    return dispatch => {
        axios
            .get('/api/adpost/custom/')
            .then(res => {
                dispatch(getRecentList_(res.data));
            })
            .catch(e => {
                console.log(e);
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
            .get('/api/adpost/' + article_id)
            .then(res => {
                dispatch(getArticleDetail_(res.data));
            })
            .catch(e => {
                console.log(e);
            });
    };
}
