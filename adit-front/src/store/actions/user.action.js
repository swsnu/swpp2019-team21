const base_url = '/api';

export const signIn_ = data => {
    return {
        type: actionTypes.SIGN_IN,
        user: data
    };
};

export const signIn = user => {
    return dispatch => {
        return axios
            .post(base_url + '/sign-in/', user)
            .then(res => dispatch(signIn_(res.data)))
            .catch(error => {
                console.log('sign in failed');
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
