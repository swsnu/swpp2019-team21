import React from 'react';
import TopMenu from './TopMenu';
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

const stubInitialState_loggedin = {
    logged_in: true,
    user: {
        user_id: 1,
        first_name: 'mocked first name',
        last_name: 'mocked last name',
        nickname: 'mocked nickname',
        email: 'mocked email',
        point: 11,
        tags: ['mocked tag']
    }
};
const mockStore = getMockStore(stubInitialState);
const mockStore_loggedin = getMockStore(stubInitialState_loggedin);
describe('<TopMenu/>', () => {
    let topmenu,
        spyOnSignOut,
        spyHistoryPush,
        spyOnGetUser,
        spyAlert,
        topmenu_loggedin;
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('logged_in', 'false');
        topmenu = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={TopMenu} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        topmenu_loggedin = (
            <Provider store={mockStore_loggedin}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={TopMenu} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyOnSignOut = jest
            .spyOn(userActions, 'signOut')
            .mockImplementation(() => {
                return dispatch => {};
            });
        spyHistoryPush = jest
            .spyOn(history, 'push')
            .mockImplementation(() => {});
        spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(topmenu);
        const wrapper = component.find('.TopMenu');
        expect(wrapper.length).toBe(1);
    });
    it('should search', () => {
        const component = mount(topmenu);
        const confirm_wrapper = component.find('#search-confirm-button');
        confirm_wrapper.simulate('click');
        expect(spyAlert).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledTimes(0);
        const search_wrapper = component.find('#ad-search-input');
        search_wrapper.simulate('change', { target: { value: 'iluvswpp' } });
        confirm_wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
        search_wrapper.simulate('keyPress', { charCode: 13 });
        expect(spyHistoryPush).toHaveBeenCalledTimes(2);
        search_wrapper.simulate('keyPress', { charCode: 14 });
        expect(spyHistoryPush).toHaveBeenCalledTimes(2);
    });
    it('should go to sign-in page if clicked', () => {
        const component = mount(topmenu);
        const signin_wrapper = component.find('#sign-in-btn');
        signin_wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it('should go to home page if clicked', () => {
        const component = mount(topmenu);
        const title_wrapper = component.find('#AditTitle');
        title_wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it('should be rendered when logged_in', () => {
        localStorage.setItem('logged_in', true);
        const component = mount(topmenu_loggedin);
        const wrapper = component.find('#pop-up-menu');
        expect(wrapper.length).toBe(1);
        const btn_wrapper = component.find('#ad-add-btn');
        expect(btn_wrapper.length).toBe(1);
    });
    it('should go to different page when button clicked', () => {
        localStorage.setItem('logged_in', true);
        const component = mount(topmenu_loggedin);
        let btn_wrapper = component.find('#ad-add-btn');
        btn_wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);

        let popup_wrapper = component.find('#pop-up-menu');
        popup_wrapper.props().mypageHandler();
        expect(spyHistoryPush).toHaveBeenCalledTimes(2);

        popup_wrapper.props().signOutHandler();
        expect(spyOnSignOut).toHaveBeenCalledTimes(1);
    });
});
