import * as actionTypes from './actionTypes';
import axios from 'axios';
import {history} from '../../store'

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
                history.push('/signin/')
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
            .then(res => {
                dispatch(postReception_(res.data))
                console.log(res.data)
                window.location.assign(res.data.ad_link);
            })
            .catch(error => {
                console.log('redirect failed');
                alert('closed or non-exist ad');
            });
    };
};

export const getReception_ = (data) => {
    return {
        type: actionTypes.GET_PARTICIPATED,
        data: data
    };
}

export const getReception = (id) => {
    return dispatch => {
        return axios
            .get(base_url + '/adreception/by-post/'+id)
            .then(res => {
                console.log(res.data);
                dispatch(getReception_(res.data))
            })
            .catch(error => {
                dispatch({type:actionTypes.NOT_PARTICIPATED})
            })
    }
}
