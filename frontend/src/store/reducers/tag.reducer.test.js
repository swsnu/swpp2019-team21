import { tag_reducer } from './tag.reducer';
import * as actionTypes from '../actions/actionTypes';

const initialState = { all_tags: [] };

describe('Tag Reducer Test', () => {
    it('Get all tag', () => {
        const action = {
            type: actionTypes.GET_ALL_TAG,
            all_tags: ['mocktag']
        };
        const nextState = tag_reducer(initialState, action);
        expect(nextState).toEqual({ all_tags: ['mocktag'] });
    });

    it('Post tag', () => {
        const action = {
            type: actionTypes.POST_TAG,
            tag: 'mocktag'
        };
        const nextState = tag_reducer(initialState, action);
        expect(nextState).toEqual({ all_tags: ['mocktag'] });
    });
});
