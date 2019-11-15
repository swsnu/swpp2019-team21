import { userActions } from './user.action';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import * as actionTypes from './actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
var store = mockStore({});

describe('User Actions', () => {
    beforeEach(() => {
        store = mockStore({});
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });

    it('Sign In', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            });
        });

        const expectedActions = [
            {
                type: actionTypes.SIGN_IN
            },
            {
                payload: {
                    args: ['/home'],
                    method: 'push'
                },
                type: '@@router/CALL_HISTORY_METHOD'
            }
        ];
        return store.dispatch(userActions.signIn()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('Sign Out', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            });
        });

        const expectedActions = [
            {
                type: actionTypes.SIGN_OUT
            },
            {
                payload: {
                    args: ['/signin'],
                    method: 'push'
                },
                type: '@@router/CALL_HISTORY_METHOD'
            }
        ];
        return store.dispatch(userActions.signOut()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('Sign Up', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: 'payload'
            });
        });

        const expectedActions = [
            {
                type: actionTypes.SIGN_UP
            },
            {
                type: '@@router/CALL_HISTORY_METHOD',
                payload: {
                    args: ['/signin'],
                    method: 'push'
                }
            }
        ];
        const mockUser = {
            userid: 1
        };

        return store.dispatch(userActions.signUp(mockUser)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('Get User', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: 'payload'
            });
        });

        const expectedActions = [
            {
                type: actionTypes.GET_USER,
                user: 'payload'
            }
        ];

        return store.dispatch(userActions.getUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('Put User', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            });
        });

        const expectedActions = [
            {
                type: actionTypes.PUT_USER,
                user: 'payload'
            }
        ];
        const mockUser = 'payload';

        return store.dispatch(userActions.putUser(mockUser)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('Change PW', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            });
        });

        const expectedActions = [
            {
                type: actionTypes.PUT_USER
            }
        ];
        const mockUser = 'payload';

        return store.dispatch(userActions.changePW(mockUser)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('Update Point', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            });
        });

        const expectedActions = [
            {
                type: actionTypes.PUT_USER
            }
        ];

        return store.dispatch(userActions.updatePoint(999)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('API Failure', () => {
        var mockAlert = null;
        var mockLocalStorage = null;
        beforeEach(() => {
            mockAlert = jest.fn();
            mockLocalStorage = jest.fn();

            window.alert = mockAlert;
            localStorage.setItem = mockLocalStorage;

            store = mockStore({});
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 403
                });
            });
        });

        it('Failure signIn', () => {
            return store.dispatch(userActions.signIn()).then(() => {
                expect(mockAlert).toBeCalledTimes(1);
            });
        });

        it('Failure signOut', () => {
            return store.dispatch(userActions.signOut()).then(() => {
                expect(mockAlert).toBeCalledTimes(1);
            });
        });

        it('Failure signUp', () => {
            return store.dispatch(userActions.signUp()).then(() => {
                expect(mockAlert).toBeCalledTimes(1);
            });
        });

        it('Failure put user', () => {
            return store.dispatch(userActions.putUser()).then(() => {
                expect(mockAlert).toBeCalledTimes(1);
            });
        });

        it('Failure get user', () => {
            return store.dispatch(userActions.getUser()).then(() => {
                // expect(mockLocalStorage).toBeCalledTimes(1);
            });
        });

        it('Failure update point', () => {
            return store.dispatch(userActions.updatePoint(999)).then(() => {
                expect(mockAlert).toBeCalledTimes(1);
            });
        });

        it('Failure change password', () => {
            return store.dispatch(userActions.changePW('mockpw')).then(() => {
                expect(mockAlert).toBeCalledTimes(1);
            });
        });
    });
});
