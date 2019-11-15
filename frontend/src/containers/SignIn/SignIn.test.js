import React from 'react';
import SignIn from './SignIn';
import { history } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../test/utils/mockStore';
import { userActions } from '../../store/actions';

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
        localStorage.clear();
        localStorage.setItem('logged_in', 'false');
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
            .spyOn(userActions, 'signIn')
            .mockImplementation(() => {
                return dispatch => {};
            });
        spyHistoryPush = jest
            .spyOn(history, 'push')
            .mockImplementation(() => {});
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(signin);
        const wrapper = component.find('.sign-in');
        expect(wrapper.length).toBe(1);
    });
    it('should call sign in action', () => {
        const component = mount(signin);
        const email_wrapper = component.find('#email-input');
        const pw_wrapper = component.find('#pw-input');
        email_wrapper.simulate('change', {
            target: { value: 'swpp@snu.ac.kr' }
        });
        pw_wrapper.simulate('change', { target: { value: 'iluvswpp' } });
        const submit_wrapper = component.find('#signin-button');
        submit_wrapper.simulate('click');
        expect(spyOnSignIn).toHaveBeenCalledTimes(1);
    });
    it('should render home when logged_in', () => {
        localStorage.setItem('logged_in', true);
        const component = mount(signin);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it('should push signup page when signup-link is clicked', () => {
        const component = mount(signin);
        const wrapper = component.find('#signup-link');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});
