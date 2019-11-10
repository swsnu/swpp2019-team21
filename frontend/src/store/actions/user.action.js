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
                console.log(error);
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
            .then(res => {
                dispatch(signUp_());
                dispatch(push('/signin'));
            })
            .catch(error => {
                alert('User name duplicated');
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
                localStorage.setItem('logged_in', 'false');
                console.log('getUser failed');
            });
    };
};

export const putUser_ = (user) => {
    return {
        type: actionTypes.PUT_USER,
        user: user
    };
};

export const putUser = user => {
    return dispatch => {
        return axios
            .put(base_url + '/user/', user)
            .then(res => 
                dispatch(putUser_(user))
            )
            .catch(error => {
                console.log('put user failed');
                alert('Put user failed zz');
            });
    };
};

export const changePW_ = () => {
    return {
        type: actionTypes.PUT_USER,
    };
};

export const changePW = pw => {
    return dispatch => {
        return axios
            .put(base_url + '/user/pw/', pw)
            .then(res => 
                dispatch(changePW_())
            )
            .catch(error => {
                console.log('change PW failed');
                alert('Input correct PW');
            });
    };
};

export const updatePoint_ = () => {
    return {
        type: actionTypes.PUT_USER,
    };
};

export const updatePoint = point => {
    return dispatch => {
        return axios
            .put(base_url + '/user/point/', point)
            .then(res => 
                {console.log(res)
                dispatch(updatePoint_())}
            )
            .catch(error => {
                console.log('update Point failed');
                alert('Input correct Point');
            });
    };
};
