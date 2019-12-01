import { adpost_reducer } from './adpost.reducer';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error_code: null,
    adpost_items: null,
    adpost_detailed_item: {
        is_loading: false,
        id: null,
        owner_id: null,
        title: null,
        subtitle: null,
        content: null,
        thumbnail: null,
        ad_link: null,
        closed: false,
        image: [],
        target_views: null,
        total_views: null,
        upload_date: null,
        expiry_date: null,
        tags: [],
        is_owner: false,
        info_aditee: { is_participating: false, unique_url: null, views: null },
        // Should be added at latter..
        info_aditor: { statistics: null }
    }
};

describe('Adpost Reducer Test', () => {
    it('Get Adlist Success', () => {
        const actions = [
            {
                type: actionTypes.GET_ADLIST_PENDING,
                query: 'mockquery',
                query_type: 'mocktype'
            },
            {
                type: actionTypes.GET_ADLIST_SUCCESS,
                query: 'mockquery',
                query_type: 'mocktype',
                payload: 'payload'
            }
        ];
        var prevState = initialState;
        var nextState = adpost_reducer(prevState, actions[0]);
        expect(nextState).toEqual({
            ...prevState,
            adpost_items: {
                query: 'mockquery',
                query_type: 'mocktype',
                data: []
            }
        });

        prevState = nextState;
        nextState = adpost_reducer(nextState, actions[1]);
        expect(nextState).toEqual({
            ...prevState,
            adpost_items: {
                query: 'mockquery',
                query_type: 'string',
                data: 'payload'
            }
        });
    });

    it('Get Adlist Failure', () => {
        const actions = [
            {
                type: actionTypes.GET_ADLIST_PENDING,
                query: 'mockquery',
                query_type: 'mocktype'
            },
            {
                type: actionTypes.GET_ADLIST_FAILURE,
                error: 'mockerror'
            }
        ];
        var prevState = initialState;
        var nextState = adpost_reducer(prevState, actions[0]);
        expect(nextState).toEqual({
            ...prevState,
            adpost_items: {
                query: 'mockquery',
                query_type: 'mocktype',
                data: []
            }
        });

        prevState = nextState;
        nextState = adpost_reducer(nextState, actions[1]);
        expect(nextState).toEqual({
            ...prevState,
            error_code: 'mockerror'
        });
    });

    it('Get detailed adpost success', () => {
        const actions = [
            {
                type: actionTypes.GET_DETAILED_ADPOST_PENDING
            },
            {
                type: actionTypes.GET_DETAILED_ADPOST_SUCCESS,
                detailed_item: { item: 'mockitem' }
            }
        ];

        var prevState = initialState;
        var nextState = adpost_reducer(prevState, actions[0]);
        expect(nextState).toEqual({
            ...prevState,
            adpost_detailed_item: null,
            error_code: null
        });

        prevState = nextState;
        nextState = adpost_reducer(nextState, actions[1]);
        expect(nextState).toEqual({
            ...prevState,
            adpost_detailed_item: { item: 'mockitem', is_loading: false }
        });
    });

    it('Get detailed adpost failure', () => {
        const actions = [
            {
                type: actionTypes.GET_DETAILED_ADPOST_PENDING
            },
            {
                type: actionTypes.GET_DETAILED_ADPOST_FAILURE,
                error: 'mockerror'
            }
        ];

        var prevState = initialState;
        var nextState = adpost_reducer(prevState, actions[0]);
        expect(nextState).toEqual({
            ...prevState,
            adpost_detailed_item: { is_loading: true }
        });

        prevState = nextState;
        nextState = adpost_reducer(nextState, actions[1]);
        expect(nextState).toEqual({
            ...prevState,
            error_code: 'mockerror',
            adpost_detailed_item: { is_loading: false }
        });
    });

    it('Post adpost success', () => {
        const actions = [
            {
                type: actionTypes.POST_ADPOST_PENDING
            },
            {
                type: actionTypes.POST_ADPOST_SUCCESS
            }
        ];

        var prevState = initialState;
        var nextState = adpost_reducer(prevState, actions[0]);
        expect(nextState).toEqual({
            ...prevState,
            adpost_post: { is_loading: true }
        });

        prevState = nextState;
        nextState = adpost_reducer(nextState, actions[1]);
        expect(nextState).toEqual({
            ...prevState,
            adpost_post: { is_loading: false }
        });
    });

    it('Post adpost failure', () => {
        const actions = [
            {
                type: actionTypes.POST_ADPOST_PENDING
            },
            {
                type: actionTypes.POST_ADPOST_FAILURE,
                error: 'mockerror'
            }
        ];

        var prevState = initialState;
        var nextState = adpost_reducer(prevState, actions[0]);
        expect(nextState).toEqual({
            ...prevState,
            adpost_post: { is_loading: true }
        });

        prevState = nextState;
        nextState = adpost_reducer(nextState, actions[1]);
        expect(nextState).toEqual({
            ...prevState,
            error_code: 'mockerror',
            adpost_post: { is_loading: false }
        });
    });
});
