import { adpostActions } from './adpost.action';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import * as actionTypes from './actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
    error_code: null,
    adpost_items: {},
    adpost_post: { is_loading: false },
    adpost_detailed_item: null
};

const mockAdpostList = [...Array(10).keys()].map(index => {
    return {
        id: index
    };
});

var store = null;

describe('Adpost Actions', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });

    it('Get Adpost by tag', () => {
        const query = 'mocktag',
            query_type = 'tag';
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: mockAdpostList
            });

            const expectedActions = [
                {
                    type: actionTypes.GET_ADLIST_PENDING,
                    query: query
                },
                {
                    type: actionTypes.GET_ADLIST_SUCCESS,
                    query: query,
                    query_type: query_type,
                    payload: mockAdpostList
                }
            ];

            return store
                .dispatch(adpostActions.getAdpostList(query, query_type))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                })
                .catch(error => {
                    console.log('non');
                    expect(true).toBe(false);
                });
        });
    });
});
