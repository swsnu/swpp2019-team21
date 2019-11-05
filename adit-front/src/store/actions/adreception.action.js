import * as actionTypes from './actionTypes';
import axios from 'axios';

const base_url = '/api';

export const postReception_ = data => {
    return {
        type: actionTypes.POST_RECEPTION,
        data: data
    };
};

export const postReception = data => {
    return dispatch => {
        return axios
            .post(base_url + '/adreception/', data)
            .then(res => dispatch(postReception_(res.data)))
            .catch(error => {
                console.log('posting reception failed');
                alert('post failed...');
            });
    };
};

export const postRedirect_ = data => {
    return {
        type: actionTypes.POST_RECEPTION,
        data: data
    };
};

export const postRedirect = data => {
    return dispatch => {
        return axios
            .get(base_url + '/adreception/redirectto='+data+'/')
            .then(res => dispatch(postReception_(res)))
            .catch(error => {
                console.log('redirect failed');
                alert('closed or non-exist ad');
            });
    };
};