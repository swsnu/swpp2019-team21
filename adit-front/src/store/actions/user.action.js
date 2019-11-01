import * as actionTypes from '../actions/actionTypes';
import { push } from 'connected-react-router';
import axios from 'axios';

const base_url = '/api';

export const signIn_ = user => {
    return {
        type: actionTypes.SIGN_IN
    };
};

export const signIn = user => {
    return dispatch => {
        return axios
            .post(base_url + '/sign-in/', user)
            .then(res => {
                dispatch(getUser());
                dispatch(signIn_());
                dispatch(push('/home'));
            })
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
            .then(res => {
                dispatch(signOut_());
                dispatch(push('/signin'));
            })
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
            .post(base_url + '/sign-up/', user)
            .then(res => dispatch(signUp_()))
            .catch(error => {
                console.log('sign up failed');
                console.log(error);
            });
    };
};

export const getUser_ = user => {
    return {
        type: actionTypes.GET_USER,
        user: user
    };
};

export const getUser = user => {
    return dispatch => {
        return axios
            .get(base_url + '/user/')
            .then(res => dispatch(getUser_(res.data)))
            .catch(error => {
                console.log('getUser failed');
            });
    };
};

export const putUser_ = () => {
    return {
        type: actionTypes.PUT_USER
    };
};

export const putUser = user => {
    return dispatch => {
        return axios
            .put(base_url + '/user/', user)
            .then(res => dispatch(putUser_()))
            .catch(error => {
                console.log('put user failed');
            });
    };
};
