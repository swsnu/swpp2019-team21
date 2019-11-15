import { tagActions } from './tag.action';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import * as actionTypes from './actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
var store = mockStore({ all_tags: [] });

const mockTagList = [...Array(10).keys()].map(index => {
    return {
        tag_id: index,
        content: 'MOCK_TAG_' + index.toString(),
        usercount: index,
        postcount: index
    };
});

const mockTagListResponse = [...Array(10).keys()].map(index => {
    return {
        id: undefined,
        name: 'MOCK_TAG_' + index.toString()
    };
});

const mockTag = {
    tag_id: 9999,
    content: 'MOCK_TAG_9999',
    usercount: 9999,
    postcount: 9999
};

const mockTagResponse = { id: undefined, name: 'MOCK_TAG_9999' };

describe('Tag Actions', () => {
    beforeEach(() => {
        store = mockStore({ all_tags: [] });
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });

    it('Get All Tags', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: mockTagList
            });
        });

        const expectedActions = [
            {
                type: actionTypes.GET_ALL_TAG,
                all_tags: mockTagListResponse
            }
        ];
        return store.dispatch(tagActions.getAllTag()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('Post Tags', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: mockTagList.concat(mockTag)
            });
        });

        const expectedActions = [
            {
                type: actionTypes.POST_TAG,
                all_tags: mockTagListResponse.concat(mockTagResponse)
            }
        ];

        return store.dispatch(tagActions.postTag('mock')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
