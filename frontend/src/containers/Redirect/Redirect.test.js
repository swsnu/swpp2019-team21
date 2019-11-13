import React from 'react';
import { shallow } from 'enzyme';
import Redirect from './Redirect';
import { history } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../test/utils/mockStore';

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
describe('<Redirect />', () => {
    let redirect;
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('updated', 'false');
        localStorage.setItem('logged_in', 'true');
        redirect = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={Redirect} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });
    it('should render without errors', () => {
        const component = mount(redirect);
        const wrapper = component.find('Redirect');
        expect(wrapper.length).toBe(1);
    });
});
