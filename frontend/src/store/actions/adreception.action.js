import * as actionTypes from './actionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';

const base_url = '/api';

export const adreceptionActions = {
    postReception,
    postRedirect,
    getReception,
    getReceptionByUser
};

function postReception(data) {
    return dispatch => {
        return axios
            .post(base_url + '/adreception/', data)
            .then(response =>
                dispatch({
                    type: actionTypes.POST_RECEPTION,
                    data: response.data
                })
            )
            .catch(error => {
                // TODO: do not use alert, use modal
                // console.log('reception failed', error);
                dispatch(push('/signin/'));
            });
    };
}

function postRedirect(data) {
    return dispatch => {
        return axios
            .get(base_url + `/adreception/redirectto=${data}/`)
            .then(response => {
                dispatch({
                    type: actionTypes.POST_RECEPTION,
                    data: response.data
                });
                window.location.assign(response.data.ad_link);
            })
            .catch(error => {
                // TODO: do not use alert, use modal
                // console.log('redirect failed', error);
                dispatch(push('/home'));
            });
    };
}

function getReception(id) {
    return dispatch => {
        return axios
            .get(base_url + `/adreception/by-post/${id}`)
            .then(response => {
                dispatch({
                    type: actionTypes.GET_PARTICIPATED,
                    data: response.data
                });
            })
            .catch(error => {
                dispatch({ type: actionTypes.NOT_PARTICIPATED });
            });
    };
}

function getReceptionByUser() {
    return dispatch => {
        return axios
            .get(base_url + '/adreception/')
            .then(response => {
                // console.log('meme', response.data);
                dispatch({
                    type: actionTypes.GET_BYUSER,
                    data: response.data
                });
            })
            .catch(error => {
                // console.log('Server error', error);
            });
    };
}
