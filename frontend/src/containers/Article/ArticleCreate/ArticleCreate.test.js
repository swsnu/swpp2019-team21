import React from 'react';
import { shallow } from 'enzyme';
import ArticleCreate from './ArticleCreate';
import { history } from '../../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../../test/utils/mockStore';
import { userActions, adpostActions, tagActions } from '../../../store/actions';

const stubInitialState = {
    tags: {
        all_tags: []
    },
    user: {
        nowpoint: 1000
    }
};
const mockStore = getMockStore(stubInitialState);

function MockFile() {}

MockFile.prototype.create = function(name, size, mimeType) {
    name = name || 'mock.txt';
    size = size || 1024;
    mimeType = mimeType || 'plain/txt';

    function range(count) {
        var output = '';
        for (var i = 0; i < count; i++) {
            output += 'a';
        }
        return output;
    }

    var blob = new Blob([range(size)], { type: mimeType });
    blob.lastModifiedDate = new Date();
    blob.name = name;

    return blob;
};

describe('<ArticleCreate/>', () => {
    let articleCreate,
        spyOnGetUser,
        spyOnGetAllTag,
        spyOnPostAdPost,
        spyHistoryPush,
        spyOnAlert;
    beforeEach(() => {
        articleCreate = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={ArticleCreate} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyOnGetUser = jest
            .spyOn(userActions, 'getUser')
            .mockImplementation(() => {
                return dispatch => {
                    const res = { user: { point: 10000 } };
                    return Promise.resolve(res);
                };
            });
        spyOnAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(articleCreate);
        const wrapper = component.find('.article-create');
        expect(wrapper.length).toBe(1);
    });
    it('should not be confirmed if something is empty', () => {
        const component = mount(articleCreate);
        const wrapper = component.find('#confirm-button');
        wrapper.simulate('click');
        expect(spyOnAlert).toHaveBeenCalledTimes(1);

        const title_wrapper = component.find('#post-title-input');
        title_wrapper.simulate('change', {
            target: { value: 'Sample_title' }
        });

        wrapper.simulate('click');
        expect(spyOnAlert).toHaveBeenCalledTimes(2);

        const subtitle_wrapper = component.find('#post-subtitle-input');
        subtitle_wrapper.simulate('change', {
            target: { value: 'Sample_subtitle' }
        });

        wrapper.simulate('click');
        expect(spyOnAlert).toHaveBeenCalledTimes(3);

        const explain_wrapper = component.find('#post-explain-input');
        explain_wrapper.simulate('change', {
            target: { value: 'Sample_Description' }
        });

        wrapper.simulate('click');
        expect(spyOnAlert).toHaveBeenCalledTimes(4);

        const mock = new MockFile();
        const file = mock.create('mocked_image.jpg', 65535, 'image/jpeg');
        const thumbnail_wrapper = component.find('#post-thumbnail-input');
        thumbnail_wrapper.simulate('change', {
            target: { files: [file] }
        });

        wrapper.simulate('click');
        expect(spyOnAlert).toHaveBeenCalledTimes(5);

        const url_wrapper = component.find('#post-url-input');
        url_wrapper.simulate('change', {
            target: { value: 'Sample_url' }
        });

        wrapper.simulate('click');
        expect(spyOnAlert).toHaveBeenCalledTimes(6);

        url_wrapper.simulate('change', {
            target: { value: 'https://www.naver.com' }
        });

        wrapper.simulate('click');
        expect(spyOnAlert).toHaveBeenCalledTimes(7);

        const goal_wrapper = component.find('#post-goal-input');
        goal_wrapper.simulate('change', {
            target: { value: 'a' }
        });
        goal_wrapper.simulate('change', {
            target: { value: '1' }
        });

        wrapper.simulate('click');
        expect(spyOnAlert).toHaveBeenCalledTimes(8);
    });
});
