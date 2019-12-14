import * as actionTypes from '../actions/actionTypes';
import { push } from 'connected-react-router';
import axios from 'axios';
import { ls } from '../../store';

const base_url = '/api';

export const userActions = {
    signIn,
    signOut,
    signUp,
    getUser,
    putUser,
    changePW,
    updatePoint
};

function signIn(user, remember) {
    return dispatch => {
        return axios
            .post(base_url + '/sign-in/', user)
            .then(async response => {
                if (remember) {
                    try {
                        await ls.set('useremail', user.email);
                        await ls.set('userpw', user.password);
                    } catch (error) {
                        // Error removing
                    }
                } else {
                    try {
                        await ls.remove('useremail');
                        await ls.remove('userpw');
                    } catch (error) {
                        // Error removing
                    }
                }
                dispatch(getUser());
                dispatch({ type: actionTypes.SIGN_IN });
                dispatch(push('/home'));
            })
            .catch(error => {
                alert('Signin error');
            });
    };
}

function signOut() {
    return dispatch => {
        return axios
            .get(base_url + '/sign-out/')
            .then(response => {
                dispatch({ type: actionTypes.SIGN_OUT });
                dispatch(push('/signin'));
            })
            .catch(error => {
                //console.log(error);
                alert('failed signout');
            });
    };
}

function signUp(user) {
    return dispatch => {
        return axios
            .post(base_url + '/sign-up/', user)
            .then(response => {
                dispatch({ type: actionTypes.SIGN_UP });
                dispatch(push('/signin'));
            })
            .catch(error => {
                alert('Sign up error');
            });
    };
}

function getUser() {
    return dispatch => {
        return axios
            .get(base_url + '/user/')
            .then(response =>
                dispatch({
                    type: actionTypes.GET_USER,
                    user: response.data
                })
            )
            .catch(error => {
                //console.log('getUser failed');
                localStorage.setItem('logged_in', 'false');
            });
    };
}

function putUser(user) {
    return dispatch => {
        return axios
            .put(base_url + '/user/', user)
            .then(response =>
                dispatch({
                    type: actionTypes.PUT_USER,
                    user: user
                })
            )
            .catch(error => {
                //console.log('put user failed');
                window.alert('Put user failed');
            });
    };
}

function changePW(pw) {
    return dispatch => {
        return axios
            .put(base_url + '/user/pw/', pw)
            .then(response => dispatch({ type: actionTypes.PUT_USER }))
            .catch(error => {
                //console.log('change PW failed');
                alert('Input correct PW');
            });
    };
}

function updatePoint(point) {
    return dispatch => {
        return axios
            .put(base_url + '/user/point/', point)
            .then(response => {
                dispatch({ type: actionTypes.PUT_USER });
            })
            .catch(error => {
                //console.log('update Point failed');
                alert('Update point error');
                //console.log(error);
            });
    };
}
