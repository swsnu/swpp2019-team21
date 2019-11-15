import { user_reducer } from './user.reducer';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    logged_in: false,
    user: {
        user_id: null,
        first_name: null,
        last_name: null,
        nickname: null,
        email: null,
        point: null,
        tags: []
    }
};

describe('User Reducer', () => {
    it('User sign in', () => {
        const action = {
            type: actionTypes.SIGN_IN
        };
        var prevState = initialState;
        var nextState = user_reducer(prevState, action);
        expect(nextState).toEqual({
            ...prevState
        });
    });

    it('User sign out', () => {
        const action = {
            type: actionTypes.SIGN_OUT
        };
        var prevState = initialState;
        var nextState = user_reducer(prevState, action);
        expect(nextState).toEqual({
            ...prevState
        });
    });

    it('Get user', () => {
        const action = {
            type: actionTypes.GET_USER,
            user: 'mockuser'
        };
        var prevState = initialState;
        var nextState = user_reducer(prevState, action);
        expect(nextState).toEqual({
            ...prevState,
            user: 'mockuser',
            logged_in: true
        });
    });

    it('Put user', () => {
        const action = {
            type: actionTypes.PUT_USER,
            user: 'mockuser'
        };
        var prevState = initialState;
        var nextState = user_reducer(prevState, action);
        expect(nextState).toEqual({
            ...prevState,
            user: 'mockuser'
        });
    });

    it('Put point', () => {
        const action = {
            type: actionTypes.PUT_POINT,
            point: 'mockpoint'
        };
        var prevState = initialState;
        var nextState = user_reducer(prevState, action);
        expect(nextState).toEqual({
            ...prevState,
            user: {
                ...initialState.user,
                point: 'mockpoint'
            }
        });
    });
});
