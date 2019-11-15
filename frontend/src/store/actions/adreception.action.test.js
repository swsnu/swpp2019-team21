import { adreceptionActions } from './adreception.action';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import * as actionTypes from './actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
var store = mockStore({ all_tags: [] });

var localStorageMock = (function() {
    var store = {};
    return {
        getItem: function(key) {
            return store[key];
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        },
        removeItem: function(key) {
            delete store[key];
        }
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Adreception Actions', () => {
    beforeEach(() => {
        store = mockStore({ all_tags: [] });
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });

    it('Post Reception', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: 'payload'
            });
        });
        const expectedActions = [
            { type: actionTypes.POST_RECEPTION, data: 'payload' }
        ];
        const mockReception = 'payload';
        return store
            .dispatch(adreceptionActions.postReception(mockReception))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('Get Reception', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: 'payload'
            });
        });

        const expectedActions = [
            { type: actionTypes.GET_PARTICIPATED, data: 'payload' }
        ];

        return store.dispatch(adreceptionActions.getReception(0)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('Get Adreception by user', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: 'payload'
            });
        });

        const expectedActions = [
            { type: actionTypes.GET_BYUSER, data: 'payload' }
        ];

        return store
            .dispatch(adreceptionActions.getReceptionByUser(0))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('Post Redirect', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    ad_link: 'payload'
                }
            });
        });

        const expectedActions = [
            { type: actionTypes.POST_RECEPTION, data: { ad_link: 'payload' } }
        ];
        const mockData = {};

        return store
            .dispatch(adreceptionActions.postRedirect(mockData))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    describe('API Failure', () => {
        beforeEach(() => {
            store = mockStore({});
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 403
                });
            });
        });

        it('Failed post reception', () => {
            const expectedActions = [
                {
                    type: '@@router/CALL_HISTORY_METHOD',
                    payload: {
                        args: ['/signin/'],
                        method: 'push'
                    }
                }
            ];
            const mockData = {};
            return store
                .dispatch(adreceptionActions.postReception(mockData))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Failed post redirection', () => {
            const expectedActions = [
                {
                    type: '@@router/CALL_HISTORY_METHOD',
                    payload: {
                        args: ['/home'],
                        method: 'push'
                    }
                }
            ];
            const mockData = {};
            return store
                .dispatch(adreceptionActions.postRedirect(mockData))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Failed get reception', () => {
            const expectedActions = [
                {
                    type: actionTypes.NOT_PARTICIPATED
                }
            ];

            return store
                .dispatch(adreceptionActions.getReception(0))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });
});
