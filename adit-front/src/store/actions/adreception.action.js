import * as actionTypes from './actionTypes';
import axios from 'axios';

const base_url = '/api';

export const postReception_ = () => {
    return {
        type: actionTypes.POST_RECEPTION
    };
};

export const postReception = req => {
    return dispatch => {
        return axios
            .post(base_url + '/adpost/' + req.id + '/adreception/')
            .then(res => dispatch(postReception_()))
            .catch(error => {
                console.log('posting reception failed');
            });
    };
};
