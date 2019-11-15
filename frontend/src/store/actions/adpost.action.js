import * as actionTypes from '../actions/actionTypes';
import { push } from 'connected-react-router';
import axios from 'axios';

const SPECIAL = 'special';
const STRING = 'string';
const TAG = 'tag';

const baseUrl = '/api';

export const adpostActions = {
    getAdpostList,
    getCustomList,
    getAdpost,
    postAdpost
};

function makeUrl(query, query_type) {
    switch (query_type) {
        case SPECIAL:
            if (query === 'hottest') {
                return '/adpost/hottest';
            } else if (query === 'recent') {
                return '/adpost/recent';
            } else if (query === 'custom') {
                return '/adpost/custom';
            } else if (query === 'participant') {
                return '/adpost/by-partid';
            } else if (query === 'owner') {
                return '/adpost/by-userid';
            } else {
                return null;
            }
        case STRING:
            return '/adpost/search/' + query;
        case TAG:
            return '/adpost/by-tag/' + query;
        default:
            return null;
    }
}

function getAdpostList(query, query_type) {
    return dispatch => {
        dispatch({ type: actionTypes.GET_ADLIST_PENDING, query: query });
        var url = makeUrl(query, query_type);
        return axios
            .get(baseUrl + url)
            .then(response => {
                dispatch({
                    type: actionTypes.GET_ADLIST_SUCCESS,
                    query: query,
                    query_type: query_type,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.GET_ADLIST_FAILURE,
                    error_code: error
                });
            });
    };
}

function getCustomList() {
    return dispatch => {
        dispatch({ type: actionTypes.GET_ADLIST_PENDING, query: 'hottest' });
        return axios
            .get(baseUrl + '/adpost/custom/')
            .then(res => {
                for (var key in res.data) {
                    dispatch({
                        type: actionTypes.GET_ADLIST_SUCCESS,
                        query: key,
                        query_type: TAG,
                        payload: res.data[key]
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.GET_ADLIST_FAILURE,
                    error_code: error
                });
            });
    };
}

function getAdpost(id) {
    return dispatch => {
        dispatch({ type: actionTypes.GET_DETAILED_ADPOST_PENDING });
        return axios
            .get(baseUrl + `/adpost/${id}/`)
            .then(response => {
                dispatch({
                    type: actionTypes.GET_DETAILED_ADPOST_SUCCESS,
                    detailed_item: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.GET_DETAILED_ADPOST_FAILURE,
                    error_code: error
                });
            });
    };
}

function postAdpost(data) {
    return dispatch => {
        var id;

        return axios
            .post(baseUrl + '/adpost/', data.adpost)
            .then(response => {
                id = response.data.id;
                dispatch({ type: actionTypes.POST_ADPOST_PENDING });
                return axios.put(baseUrl + '/user/point/', data.points);
            })
            .then(response => {
                dispatch({ type: actionTypes.POST_ADPOST_SUCCESS });
                dispatch(push(`/article/${id}`));
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.POST_ADPOST_FAILURE,
                    error: error
                });
            });
    };
}
