import React from 'react';
import ArticleSearch from './ArticleSearch';
import { history } from '../../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../../test/utils/mockStore';
import { adpostActions } from '../../../store/actions';

const stubInitialState = {
    adpost_items: {
        test: {
            is_loading: false,
            list: []
        }
    }
};

const mockStore = getMockStore(stubInitialState);
describe('<ArticleSearch />', () => {
    let articlesearch, spyHistoryPush, mockList;
    const props = {
        match: { params: { query: 'test', query_type: 'test_type' } },
    };
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('updated', 'false');
        localStorage.setItem('logged_in', 'true');
        articlesearch = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => <ArticleSearch {...props} />}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyHistoryPush = jest
            .spyOn(history, 'push')
            .mockImplementation(() => {});
        mockList = jest
            .spyOn(adpostActions, 'getAdpostList')
            .mockImplementation(() => {
                return dispatch => null;
            });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(articlesearch);
        const wrapper = component.find('ArticleSearch');
        expect(wrapper.length).toBe(1);
    });
});
