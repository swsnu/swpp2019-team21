import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

const base_url = '/api';

export const signIn_ = user => {
    return {
        type: actionTypes.SIGN_IN,
        user: user
    };
};

export const signIn = user => {
    return dispatch => {
        return axios
            .post(base_url + '/sign-in/', user)
            .then(res => dispatch(signIn_(res.data)))
            .catch(error => {
                console.log('sign in failed');
                alert('Email or password is wrong');
            });
    };
};

export const signOut_ = () => {
    return {
        type: actionTypes.SIGN_OUT
    };
};

export const signOut = () => {
    return dispatch => {
        return axios
            .get(base_url + '/sign-out/')
            .then(res => dispatch(signOut_()))
            .catch(error => {
                console.log('sign out failed');
            });
    };
};

export const signUp_ = () => {
    return {
        type: actionTypes.SIGN_UP
    };
};

export const signUp = user => {
    return dispatch => {
        return axios
            .post('/api/sign-up/', user)
            .then(res => dispatch(signUp_()))
            .catch(error => {
                console.log('sign up failed');
                console.log(error);
            });
    };
};
