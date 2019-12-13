import React from 'react';
import ArticleDetail from './ArticleDetail';
import { history } from '../../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../../test/utils/mockStore';
import { adpostActions, adreceptionActions } from '../../../store/actions';

const stubInitialState = {
    adpost_detailed_item: {
        tags: [('acc', 'cur', 'i')],
        is_loading: false,
        view_by_date: '{"date":"2019-11-30","view":84}, {"date":"2019-11-30","view":84}, {"date":"2019-11-30","view":84}'
    },
    views: 0,
    unique_link: 'test',
    is_participated: false
};

const stubInitialState_owner = {
    adpost_detailed_item: {
        tags: [],
        is_loading: false,
        is_owner: true,
        view_by_date: '{"date":"2019-11-30","view":84}, {"date":"2019-11-30","view":84}, {"date":"2019-11-30","view":84}'
    },
    views: 0,
    unique_link: 'test',
    is_participated: false
};

const stubInitialState_loading = {
    adpost_detailed_item: {
        tags: [],
        is_loading: true,
        is_owner: true,
        view_by_date: '{"date":"2019-11-30","view":84}, {"date":"2019-11-30","view":84}, {"date":"2019-11-30","view":84}'
    },
    views: 0,
    unique_link: 'test',
    is_participated: false
};

const stubInitialState_participate = {
    adpost_detailed_item: {
        tags: [],
        is_loading: false,
        is_owner: false,
        view_by_date: '{"date":"2019-11-30","view":84}, {"date":"2019-11-30","view":84}, {"date":"2019-11-30","view":84}'
    },
    views: 0,
    unique_link: 'test',
    is_participated: true
};

const mockStore = getMockStore(stubInitialState);
const mockStore_owner = getMockStore(stubInitialState_owner);
const mockStore_loading = getMockStore(stubInitialState_loading);
const mockStore_participate = getMockStore(stubInitialState_participate);
describe('<ArticleDetail />', () => {
    let articledetail,
        articledetail_owner,
        articledetail_loading,
        articledetail_participate,
        spyHistoryPush,
        mockPost,
        mockReceptGet,
        mockReceptPost;
    const props = {
        match: { params: { id: '0' } },
        history: {
            push: () => {}
        }
    };
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('updated', 'false');
        localStorage.setItem('logged_in', 'true');
        articledetail = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => <ArticleDetail {...props} />}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        articledetail_participate = (
            <Provider store={mockStore_participate}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => <ArticleDetail {...props} />}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        articledetail_loading = (
            <Provider store={mockStore_loading}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => <ArticleDetail {...props} />}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        articledetail_owner = (
            <Provider store={mockStore_owner}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => <ArticleDetail {...props} />}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyHistoryPush = jest
            .spyOn(history, 'push')
            .mockImplementation(() => {});
        mockReceptGet = jest
            .spyOn(adreceptionActions, 'getReception')
            .mockImplementation(() => {
                return dispatch => null;
            });
        mockReceptPost = jest
            .spyOn(adreceptionActions, 'postReception')
            .mockImplementation(() => {
                return dispatch => null;
            });
        mockPost = jest
            .spyOn(adpostActions, 'getAdpost')
            .mockImplementation(() => {
                return dispatch => null;
            });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(articledetail);
        const wrapper = component.find('ArticleDetail');
        expect(wrapper.length).toBe(1);
    });
    it('should react to participate button click', () => {
        const component = mount(articledetail);
        const wrapper = component.find('#participate-button');
        wrapper.at(1).simulate('click');
        expect(wrapper.length).toBe(2);
    });
    it('should react to edit button click', () => {
        const component = mount(articledetail_owner);
        const wrapper = component.find('#post-edit-button');
        wrapper.at(1).simulate('click');
        expect(wrapper.length).toBe(2);
    });
    it('should render without error when participated', () => {
        const component = mount(articledetail_participate);
        const wrapper1 = component.find('.share-window-participant');
        const wrapper2 = component.find('.user-earn-view');
        expect(wrapper1.length).toBe(1);
        expect(wrapper2.length).toBe(1);
    });
    it('should render without errors when owner', () => {
        const component = mount(articledetail_owner);
        const wrapper = component.find('ArticleDetail');
        expect(wrapper.length).toBe(1);
    });
    it('should render loading window without errors', () => {
        const component = mount(articledetail_loading);
        const wrapper = component.find('ArticleDetail');
        expect(wrapper.length).toBe(1);
    });
});
