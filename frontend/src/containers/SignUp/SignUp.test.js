import React from 'react';
import { shallow } from 'enzyme';
import SignUp from './SignUp';
import { history } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../test/utils/mockStore';
import { userActions } from '../../store/actions';
import { sign } from 'crypto';

const stubInitialState = {
    all_tags: []
};

const mockStore = getMockStore(stubInitialState);
describe('<SignUp />', () => {
    let signup, spyHistoryPush, mockSignup;
    beforeEach(() => {
        localStorage.clear();
        signup = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={SignUp} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyHistoryPush = jest
            .spyOn(history, 'push')
            .mockImplementation(() => {});
        mockSignup = jest
            .spyOn(userActions, 'signUp')
            .mockImplementation(() => {
                return dispatch => null;
            });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(signup);
        const wrapper = component.find('SignUp');
        expect(wrapper.length).toBe(1);
    });
    it('should react to input changes', () => {
        const component = mount(signup);
        const cls = component.find('SignUp');
        const email = component.find('#email-input');
        const pw = component.find('#pw-input');
        const pw_check = component.find('#pw-check');
        const fname = component.find('#fname');
        const lname = component.find('#lname');
        const nickname = component.find('#nickname');
        const deltag = component.find('SignUp').instance().deleteTagHandler;
        const addtag = component.find('SignUp').instance().addTagHandler;
        const done = component.find('#signup-button');
        var change = (target, to, content) => {
            target.simulate('change', { target: { value: content } });
            cls.update();
            expect(cls.instance().state[to]).toBe(content);
        };
        var no_verify = () => {
            done.simulate('click');
            expect(mockSignup).toHaveBeenCalledTimes(0);
        };

        var verify = () => {
            done.simulate('click');
            expect(mockSignup).toHaveBeenCalled();
            expect(spyHistoryPush).toHaveBeenCalled();
        };

        change(email, 'email', 'TEST');
        change(pw, 'password', 'TEST');
        change(pw_check, 'password_check', 'TEST');
        change(fname, 'fname', 'TEST');
        change(lname, 'lname', 'TEST');
        change(nickname, 'nickname', 'TEST');
        no_verify();
        change(pw, 'password', 'TEST_same');
        change(pw_check, 'password_check', 'TEST_notsame');
        no_verify();
        change(pw_check, 'password_check', 'TEST_same');
        change(fname, 'fname', '');
        no_verify();
        change(fname, 'fname', 'TEST');
        change(nickname, 'nickname', '');
        no_verify();
        addtag('test_tag');
        change(nickname, 'nickname', 'TEST');
        verify();
        addtag('test_tag');
        deltag(0);
        cls.setState({
            ...cls.state,
            valid: { email: false, password_check: false, nickname: false }
        });
        cls.update();
    });
});
