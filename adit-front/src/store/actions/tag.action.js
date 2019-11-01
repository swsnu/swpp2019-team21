import * as actionTypes from './actionTypes';
import axios from 'axios'

const base_url = '/api';

export const getTag_ = (tag) => {
    return {
        type: actionTypes.GET_TAG,
        all_tags : tag
    };
};

export const getTag = () => {
    return dispatch => {
        return axios
            .get(base_url + '/tag/search/')
            .then(res => dispatch(getTag_(res.data)))
            .catch(error => {
                console.log('getting tag failed');
            });
    };
};