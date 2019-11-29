import React from 'react';
import ArticleEdit from './ArticleEdit';
import { history } from '../../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../../test/utils/mockStore';
import { adpostActions, adreceptionActions } from '../../../store/actions';

const stubInitialStateLoading = {
    adpost_detailed_item: {
        tags: [('acc', 'cur', 'i')],
        is_loading: true
    },
    views: 0,
    unique_link: 'test',
    is_participated: true
};

const stubInitialState = {
    adpost_detailed_item: {
        tags: [('acc', 'cur', 'i')],
        is_loading: false
    },
    views: 0,
    unique_link: 'test',
    is_participated: true
};
const mockStore = getMockStore(stubInitialState);
const mockStoreLoading = getMockStore(stubInitialStateLoading);

describe('<ArticleEdit />', () => {
    let articledetail, articledetail_loading, mockAdpostGet, mockAdpostPut;

    const props = {
        match: { params: { id: '0' } }
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
                            component={() => <ArticleEdit {...props} />}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        articledetail_loading = (
            <Provider store={mockStoreLoading}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => <ArticleEdit {...props} />}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        mockAdpostGet = jest
            .spyOn(adpostActions, 'getAdpost')
            .mockImplementation(id => {
                return dispatch => null;
            });
        mockAdpostPut = jest
            .spyOn(adpostActions, 'putAdpost')
            .mockImplementation((id, adpost) => {
                return dispatch => null;
            });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(articledetail);
        const wrapper = component.find('ArticleEdit');
        expect(wrapper.length).toBe(1);
    });

    it('should render without errors(loading)', () => {
        const component = mount(articledetail_loading);
        const wrapper = component.find('ArticleEdit');
        expect(wrapper.length).toBe(1);
    });
});
