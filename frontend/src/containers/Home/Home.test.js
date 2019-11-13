import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import { history } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../test/utils/mockStore';
import * as actionCreators from '../../store/actions/user.action';

const stubInitialState = {
    logged_in: false,
    user: {
        user_id: null,
        first_name: null,
        last_name: null,
        nickname: null,
        email: null,
        point: null,
        tags: []
    }
};

const mockStore = getMockStore(stubInitialState);
describe('<Home />', () => {
    let home, spyHistoryPush;
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
            afterEach(() => { jest.clearAllMocks() });
        });
    it('should render without errors', () => {
        const component = mount(home);
        const wrapper = component.find('Home');
        expect(wrapper.length).toBe(1);
    });
    it('should render without errors when not logged_in', () => {
        localStorage.setItem('logged_in', 'false')
        const component = mount(home);
        const wrapper = component.find('Home');
        expect(wrapper.length).toBe(1);
    });
});
