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

function getAllTag() {
    return dispatch => {
        return axios
            .get('/api/tag/')
            .then(res => {
                dispatch(
                    getAllTag_(
                        res.data.map(item => {
                            return { id: item.id, name: item.content };
                        })
                    )
                );
            })
            .catch(error => {
                console.log(error);
            });
    };
}

const postTag_ = tag => {
    return {
        type: actionTypes.POST_TAG,
        tag: tag
    };
};

function postTag(tag) {
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
}
