import { adreception_reducer } from './adreception.reducer';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    submitted: false,
    is_participated: false,
    views: 0,
    unique_link: null,
    ad_link: null,
    byuser_list: []
};

describe('Adreception Reducer', () => {
    it('Post reception', () => {
        const action = {
            type: actionTypes.POST_RECEPTION,
            data: {
                views: 1,
                unique_link: 'mocklink'
            }
        };
        var prevState = initialState;
        var nextState = adreception_reducer(prevState, action);
        expect(nextState).toEqual({
            ...prevState,
            submitted: true,
            is_participated: true,
            views: 1,
            unique_link: 'mocklink'
        });
    });

    it('Get reception', () => {
        const action = {
            type: actionTypes.GET_RECEPTION,
            data: {
                views: 1,
                ad_link: 'mocklink'
            }
        };
        var prevState = initialState;
        var nextState = adreception_reducer(prevState, action);
        expect(nextState).toEqual({
            ...prevState,
            submitted: true,
            is_participated: true,
            views: 1,
            ad_link: 'mocklink'
        });
    });

    it('Get ad participate', () => {
        const action = {
            type: actionTypes.GET_RECEPTION,
            data: {
                views: 1,
                unique_link: 'mocklink'
            }
        };
        var prevState = initialState;
        var nextState = adreception_reducer(prevState, action);
        expect(nextState).toEqual({
            ...prevState,
            is_participated: true,
            views: 1,
            unique_link: 'mocklink'
        });
    });
});
