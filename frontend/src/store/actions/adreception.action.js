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
                alert('Please Sign-in to Participate!');
            });
    };
};


