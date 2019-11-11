import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './SignIn';
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
describe('<Sign In />', () => {
    let signin, spyOnSignIn, spyHistoryPush;
    beforeEach(() => {
        signin = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={SignIn} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyOnSignIn = jest
            .spyOn(actionCreators, 'signIn')
            .mockImplementation(() => {
                return dispatch => {};
            });
        spyHistoryPush = jest
            .spyOn(history, 'push')
            .mockImplementation(() => {});
    });
    it('should render without errors', () => {
        const component = mount(signin);
        const wrapper = component.find('.sign-in');
        expect(wrapper.length).toBe(1);
    });
});
