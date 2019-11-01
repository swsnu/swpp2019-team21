import * as actionTypes from './actionTypes';
import axios from 'axios';

export const tagActions = {
    getAllTag,
    postTag
};

const getAllTag_ = tag => {
    return {
        type: actionTypes.GET_ALL_TAG,
        all_tags: tag
    };
};

const getAllTag = () => {
    return dispatch => {
        return axios
            .get('/api/tag/search/')
            .then(res => {
                dispatch(getAllTag_(res.data));
            })
            .catch(error => {
                console.log(error);
            });
    };
};

const postTag_ = tag => {
    return {
        type: actionTypes.POST_TAG,
        tag: tag
    };
};

const postTag = tag => {
    return dispatch => {
        return axios
            .post('/api/tag/search/' + tag)
            .then(res => {
                dispatch(postTag_(res.data));
            })
            .catch(error => {
                console.log(error);
            });
    };
};
