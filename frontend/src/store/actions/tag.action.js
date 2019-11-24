import * as actionTypes from './actionTypes';
import axios from 'axios';

const baseUrl = '/api';
export const tagActions = {
    getAllTag,
    getRecentTag,
    postTag
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
                    type: actionTypes.GET_ALL_TAG
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
            .get(baseUrl + '/tag/recent/')
            .then(response => {
                var data = response.data.map(item => {
                    return { id: item.id, name: item.content };
                });
                dispatch({
                    type: actionTypes.GET_RECENT_TAG,
                    all_tags: data
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
