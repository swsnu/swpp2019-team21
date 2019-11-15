import { adreceptionActions } from './adreception.action';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import * as actionTypes from './actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
var store = mockStore({ all_tags: [] });

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
            { type: actionTypes.GET_DETAILED_ADPOST_PENDING }
        ];
        const mockReception = 'payload';
        return store
            .dispatch(adreceptionActions.postReception(mockReception))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
