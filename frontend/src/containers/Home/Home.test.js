import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import { history } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../test/utils/mockStore';
import { adpostActions } from '../../store/actions';

const stubInitialState = {
    adpost_home_list: [],
    suggested_tags: [],
    recent_tags: []
};

const stubInitialState_null = {
    adpost_home_list: [],
    suggested_tags: [],
    recent_tags: []
};

const mockStore = getMockStore(stubInitialState);
const mockStore_null = getMockStore(stubInitialState_null);
describe('<Home />', () => {
    let home, spyHistoryPush, mockList, mockCustom;
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('updated', 'false');
        localStorage.setItem('logged_in', 'true');
        home = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyHistoryPush = jest
            .spyOn(history, 'push')
            .mockImplementation(() => {});
        mockList = jest
            .spyOn(adpostActions, 'getHomeAdpostList')
            .mockImplementation(() => {
                return dispatch => null;
            });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(home);
        const wrapper = component.find('Home');
        expect(wrapper.length).toBe(1);
    });
    it('should render without errors when not logged_in', () => {
        localStorage.setItem('logged_in', 'false');
        const component = mount(home);
        const wrapper = component.find('Home');
        expect(wrapper.length).toBe(1);
    });
    it('should render without errors when adpost_items exists', () => {
        home = (
            <Provider store={mockStore_null}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

        const component = mount(home);
        const wrapper = component.find('Home');
        expect(wrapper.length).toBe(1);
    });
});
