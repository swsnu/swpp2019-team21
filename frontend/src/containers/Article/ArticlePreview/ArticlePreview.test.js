import React from 'react';
import ArticlePreview from './ArticlePreview';
import { history } from '../../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../../test/utils/mockStore';

const stubInitialState = {};

const mockStore = getMockStore(stubInitialState);
describe('<ArticlePreview />', () => {
    let articlepreview, articlepreview_participate, spyHistoryPush;
    const props = {
        article: {
            tags: [('acc', 'cur', 'i')],
            thumbnail: null,
            title: 'test_title',
            subtitle: 'test_subtitle',
            ad_link:
                'this should be over 404 characteresfekwlafnewjkalnfuekulwabgvwekalbgwai',
            expiry_date: 'test_date',
            is_owner: false,
            content: 'test_content',
            pic: 'aaa'
        },
        views: -1,
        is_participated: false
    };
    const props_less = {
        article: {
            tags: [('acc', 'cur', 'i')],
            thumbnail: null,
            title: 'test_title',
            subtitle: 'test_subtitle',
            ad_link: 'abcd',
            expiry_date: 'test_date',
            is_owner: false,
            content: 'test_content'
        },
        views: -1,
        is_participated: false
    };
    beforeEach(() => {
        localStorage.clear();
        articlepreview = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => <ArticlePreview {...props} />}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        articlepreview_participate = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => (
                                <ArticlePreview
                                    {...{ ...props, is_participated: true }}
                                />
                            )}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyHistoryPush = jest
            .spyOn(history, 'push')
            .mockImplementation(() => {});
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(articlepreview);
        const wrapper = component.find('ArticlePreview');
        expect(wrapper.length).toBe(1);
    });
    it('should render without errors when participated', () => {
        const component = mount(articlepreview_participate);
        const wrapper = component.find('ArticlePreview');
        expect(wrapper.length).toBe(1);
    });
    it('should render when less props given', () => {
        const component = mount(articlepreview);
        const wrapper = component.find('ArticlePreview');
        expect(wrapper.length).toBe(1);
    });
});
