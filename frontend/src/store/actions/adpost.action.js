import * as actionTypes from '../actions/actionTypes';
import { push } from 'connected-react-router';
import axios from 'axios';

const SPECIAL = 'special';
const STRING = 'string';
const TAG = 'tag';

const baseUrl = '/api';

export const adpostActions = {
    getAdpostList,
    getAdpost,
    postAdpost,
    putAdpost,
    getHomeAdpostList,
    getUserAdpostList,
    postReportEmail
};

function makeUrl(query, query_type) {
    query = query.toLowerCase();
    query_type = query_type.toLowerCase();

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

function getUserAdpostList() {
    return dispatch => {
        //console.log('controlled');
        const url = [
            makeUrl('owner', 'special'),
            makeUrl('participant', 'special')
        ];
        dispatch({ type: actionTypes.GET_ADLIST_HOME_PENDING });
        return axios
            .get(baseUrl + url[0])
            .then(response => {
                const payload_data = [
                    {
                        data: response.data,
                        query: 'owner',
                        query_type: 'special'
                    }
                ];
                dispatch({
                    type: actionTypes.GET_ADLIST_HOME_SUCCESS,
                    payload: payload_data
                });
                return axios.get(baseUrl + url[1]);
            })
            .then(response => {
                const payload_data = [
                    {
                        data: response.data,
                        query: 'participant',
                        query_type: 'special'
                    }
                ];
                dispatch({
                    type: actionTypes.GET_ADLIST_HOME_SUCCESS,
                    payload: payload_data
                });
            });
    };
}

function getHomeAdpostList() {
    return dispatch => {
        const url = [
            makeUrl('hottest', 'special'),
            makeUrl('recent', 'special'),
            makeUrl('custom', 'special')
        ];
        dispatch({ type: actionTypes.GET_ADLIST_HOME_PENDING });
        return axios
            .get(baseUrl + url[0])
            .then(response => {
                const payload_data = [
                    {
                        data: response.data,
                        query: 'Hottest',
                        query_type: 'special'
                    }
                ];
                dispatch({
                    type: actionTypes.GET_ADLIST_HOME_SUCCESS,
                    payload: payload_data
                });
                return axios.get(baseUrl + url[1]);
            })
            .then(response => {
                const payload_data = [
                    {
                        data: response.data,
                        query: 'Recent',
                        query_type: 'special'
                    }
                ];
                dispatch({
                    type: actionTypes.GET_ADLIST_HOME_SUCCESS,
                    payload: payload_data
                });
                return axios.get(baseUrl + url[2]);
            })
            .then(response => {
                const payload_data = Object.keys(response.data).map(query => {
                    return {
                        data: response.data[query],
                        query: query,
                        query_type: 'tag'
                    };
                });
                dispatch({
                    type: actionTypes.GET_ADLIST_HOME_SUCCESS,
                    payload: payload_data
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.ADPOST_FAILURE,
                    error: error,
                    from: 'GET_ADLIST_HOME'
                });
            });
    };
}

function getAdpostList(query, query_type) {
    return dispatch => {
        dispatch({
            type: actionTypes.GET_ADLIST_PENDING,
            query: query,
            query_type: query_type
        });
        var url = makeUrl(query, query_type) + '/';
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
                    type: actionTypes.ADPOST_FAILURE,
                    error: error,
                    from: 'GET_ADLIST'
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
                    error: error,
                    type: actionTypes.ADPOST_FAILURE,
                    from: 'GET_DETAILED_ADPOST'
                });
            });
    };
}

function postAdpost(data) {
    return dispatch => {
        console.log(data.adpost);
        var id;
        return axios
            .post(baseUrl + '/adpost/', data.adpost)
            .then(response => {
                console.log(response.data)
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
                    error: error,
                    type: actionTypes.ADPOST_FAILURE,
                    from: 'POST_ADPOST'
                });
            });
    };
}

function putAdpost(id, data) {
    return dispatch => {
        console.log(data);
        return axios.put(baseUrl + `/adpost/${id}/`, data).then(response => {
            console.log(response.data)
            id = response.data.id;
            dispatch(push(`/article/${id}`));
        });
    };
}

function postReportEmail(email) {
    return dispatch => {
        console.log(email);
        return axios.post(baseUrl + '/report/', email).then(response => {});
    };
}
