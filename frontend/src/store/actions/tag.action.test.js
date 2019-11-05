import { tagActions } from './tag.action';
import axios from 'axios';

const mockTagList = [...Array(10).keys()].map(index => {
    return {
        tag_id: index,
        content: 'mocktag' + index.toString(),
        usercount: index,
        postcount: index
    };
});

describe('Tag Actions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Get All Tags', () => {
        const spy = jest.spyOn(axios, 'get').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                return mockTagList;
            });
        });
        tagActions.getAllTag();
    });
});
