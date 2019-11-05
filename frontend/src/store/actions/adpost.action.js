import * as actionTypes from '../actions/actionTypes';
import { push } from 'connected-react-router';
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
                console.log(res.data);
                dispatch(getCustomList_(res.data));
            })
            .catch(e => {
                console.log(e);
            });
    };
};

function getUserOwnList_(data) {
    return {
        type: actionTypes.GET_OWN_ARTICLE,
        adpost_list_item: data
    };
}

export const getUserOwnList = () => {
    return dispatch => {
        axios
            .get('/api/adpost/by-userid/')
            .then(res => {
                console.log(res.data);
                dispatch(getUserOwnList_(res.data));
            })
            .catch(e => {
                console.log(e);
            });
    };
};

function getUserParticipatedList_(data) {
    return {
        type: actionTypes.GET_PARTICIPATED_ARTICLE,
        adpost_list_item: data
    };
}

export const getUserParticipatedList = () => {
    return dispatch => {
        axios
            .get('/api/adpost/by-partid/')
            .then(res => {
                console.log(res.data);
                dispatch(getUserParticipatedList_(res.data));
            })
            .catch(e => {
                console.log(e);
            });
    };
};

function postAdpost_(data) {
    return {
        type: actionTypes.POST_ARTICLE,
        adpost_list_item: data
    };
}

export const postAdpost = data => {
    return dispatch => {
        axios
            .post('/api/adpost/', data)
            .then(res => {
                dispatch(postAdpost_(res.data));
                dispatch(push('/article/' + res.data.id));
            })
            .catch(e => {
                alert('Post failed...');
                console.log(e);
            });
    };
};

function getAdpost_(data) {
    return {
        type: actionTypes.GET_DETAILED_ARTICLE,
        adpost_detailed_item: data
    };
}

export const getAdpost = id => {
    return dispatch => {
        axios
            .get('/api/adpost/' + id + '/')
            .then(res => {
                dispatch(getAdpost_(res.data));
            })
            .catch(e => {
                alert('Get failed...');
                console.log(e);
            });
    };
};

function getSearchList_(data) {
    return {
        type: actionTypes.GET_SEARCH_ARTICLE,
        adpost_list_item: data
    };
}

export const getSearchList = str => {
    return dispatch => {
        console.log(str);
        axios
            .get(`/api/adpost/search/${str}`)
            .then(res => {
                console.log(res.data);
                dispatch(getSearchList_(res.data));
            })
            .catch(e => {
                console.log(e);
            });
    };
};
