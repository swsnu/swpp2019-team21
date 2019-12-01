import * as actionTypes from './actionTypes';
import axios from 'axios';
import { userActions } from './user.action';

const baseUrl = '/api';
export const tagActions = {
    getAllTag,
    getRecentTag,
    postTag,
    getSuggestedTags,
    addTag
};

function getAllTag() {
    return dispatch => {
        return axios
            .get(baseUrl + '/tag/')
            .then(response => {
                var data = response.data.map(item => {
                    return { id: item.id, name: item.content };
                });
                dispatch({
                    type: actionTypes.GET_ALL_TAG,
                    all_tags: data
                });
            })
            .catch(error => {
                // TODO: error handling
                // console.log(error);
            });
    };
}

function getRecentTag() {
    return dispatch => {
        return axios
            .get(baseUrl + '/tag/recommend/by-recent/')
            .then(response => {
                var data = response.data.map(item => {
                    return { id: item.id, name: item.content };
                });
                dispatch({
                    type: actionTypes.GET_RECENT_TAG,
                    recent_tags: data
                });
            })
            .catch(error => {
                // TODO: error handling
                // console.log(error);
            });
    };
}

function postTag(tag) {
    return dispatch => {
        return axios
            .post(baseUrl + `/tag/search/${tag}`)
            .then(response => {
                var data = response.data.map(item => {
                    return { id: item.id, name: item.content };
                });
                dispatch({
                    type: actionTypes.POST_TAG,
                    all_tags: data
                });
            })
            .catch(error => {
                // TODO: error handling
                // console.log(error);
            });
    };
}

function getSuggestedTags(tag) {
    return dispatch => {
        return axios
            .get(baseUrl + `/tag/recommend/by-user`)
            .then(response => {
                var data = response.data.map((item, index) => {
                    return { id: index, name: item };
                });
                dispatch({
                    type: actionTypes.GET_SUGGESTED_TAGS,
                    suggested_tags: data
                });
            })
            .catch(error => {});
    };
}

function addTag(tag) {
    return dispatch => {
        return axios
            .post(baseUrl + `/tag/add/`, { content: tag })
            .then(response => {
                dispatch(userActions.getUser());
            });
    };
}
