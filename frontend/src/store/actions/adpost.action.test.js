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

function generateExpect(query, query_type) {
    return [
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
}

describe('Adpost Actions', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });

    describe('Get Adpost List', () => {
        beforeEach(() => {
            store = mockStore(initialState);
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: mockAdpostList
                });
            });
        });

        it('Get Adpost by tag', () => {
            const query = 'mocktag',
                query_type = 'tag';
            const expectedActions = generateExpect(query, query_type);
            return store
                .dispatch(adpostActions.getAdpostList(query, query_type))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                })
                .catch(error => {
                    expect(true).toBe(false);
                });
        });

        it('Get Adpost by string', () => {
            const query = 'mockstring',
                query_type = 'string';
            const expectedActions = generateExpect(query, query_type);
            return store
                .dispatch(adpostActions.getAdpostList(query, query_type))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                })
                .catch(error => {
                    expect(true).toBe(false);
                });
        });

        it('Get Adpost by special', () => {
            const query = 'hottest',
                query_type = 'special';
            const expectedActions = generateExpect(query, query_type);
            return store
                .dispatch(adpostActions.getAdpostList(query, query_type))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                })
                .catch(error => {
                    expect(true).toBe(false);
                });
        });

        it('Get Adpost by Custom', () => {
            const expectedActions = null;
            return store.dispatch(adpostActions.getCustomList()).then(() => {
                // expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    describe('Get Adpost List Failed', () => {
        beforeEach(() => {
            store = mockStore(initialState);
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.reject({
                    status: 403,
                    response: { message: 'problem' }
                });
            });
        });

        it('Get Adpost by tag', () => {
            const query = 'mocktag',
                query_type = 'tag';
            const expectedActions = [
                {
                    type: actionTypes.GET_ADLIST_PENDING,
                    query: query,
                    query_type: query_type
                },
                {
                    type: actionTypes.GET_ADLIST_FAILURE,
                    error_code: {
                        response: {
                            data: undefined,
                            message: 'problem'
                        },
                        status: 403
                    }
                }
            ];
            return store
                .dispatch(adpostActions.getAdpostList(query, query_type))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    it('Get detailed adpost', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: 'payload'
            });
        });
        const expectedActions = [
            { type: actionTypes.GET_DETAILED_ADPOST_PENDING },
            {
                type: actionTypes.GET_DETAILED_ADPOST_SUCCESS,
                detailed_item: 'payload'
            }
        ];

        return store
            .dispatch(adpostActions.getAdpost(0))
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    // it('Post detailed Adpost', () => {
    //     moxios
    //         .wait(() => {
    //             const requestFirst = moxios.requests.mostRecent();
    //             requestFirst.respondWith({
    //                 status: 200,
    //                 response: {
    //                     id: 1,
    //                     point: 1
    //                 }
    //             });
    //         })
    //         .wait(() => {
    //             const requestFirst = moxios.requests.mostRecent();
    //             requestFirst.respondWith({
    //                 status: 200,
    //                 response: {
    //                     id: 1,
    //                     point: 1
    //                 }
    //             });
    //         });
    //     const expectedActions = [];
    //     const data = {
    //         adpost: 'payload'
    //     };
    //     return store
    //         .dispatch(adpostActions.postAdpost(data))
    //         .then(() => expect(store.getActions()).toEqual(expectedActions));
    // });
});
