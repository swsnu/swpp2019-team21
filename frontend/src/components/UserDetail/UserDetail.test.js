import React from 'react';
import { mount } from 'enzyme';
import UserDetail from './UserDetail';
import { history } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../test/utils/mockStore';
import { tagActions, userActions } from '../../store/actions';
const stubInitialState = {
    all_tags: ['tag', 'snu'],
    user: {
        user_id: 2,
        first_name: 'SW',
        last_name: 'PP',
        nickname: 'iluvswpp',
        email: 'software@swpp.kr',
        point: 1123,
        tags: ['test', 'test2'],
        pic: ''
    }
};
const stubInitialStateWithPic = {
    all_tags: ['tag', 'snu'],
    user: {
        user_id: 2,
        first_name: 'SW',
        last_name: 'PP',
        nickname: 'iluvswpp',
        email: 'software@swpp.kr',
        point: 1123,
        tags: [],
        pic: '1'
    }
};
const mockStore = getMockStore(stubInitialState);
const mockStoreWithPic = getMockStore(stubInitialStateWithPic);
describe('<UserDetail/>', () => {
    let userdetail,
        userdetailwithpic,
        userdetailnotloaded,
        spyChangePW,
        spyHistoryPush,
        spyOnTagReload,
        spyPutUser,
        spyReloadUser,
        spySignOut,
        spyUpdatePoint;
    beforeEach(() => {
        const promise = () =>
            new Promise((resolve, reject) => resolve(stubInitialState));
        localStorage.clear();
        localStorage.setItem('logged_in', 'true');
        spyReloadUser = jest
            .spyOn(userActions, 'getUser')
            .mockImplementation(() => {
                return dispatch => promise();
            });
        spyPutUser = jest
            .spyOn(userActions, 'putUser')
            .mockImplementation(user => {
                return dispatch => {};
            });
        spyChangePW = jest
            .spyOn(userActions, 'changePW')
            .mockImplementation(pw => {
                return dispatch => {};
            });

        spyUpdatePoint = jest
            .spyOn(userActions, 'updatePoint')
            .mockImplementation(point => {
                return dispatch => {};
            });
        spySignOut = jest
            .spyOn(userActions, 'signOut')
            .mockImplementation(() => {
                return dispatch => {};
            });
        spyOnTagReload = jest
            .spyOn(tagActions, 'getAllTag')
            .mockImplementation(() => {
                return dispatch => {};
            });
        spyHistoryPush = jest
            .spyOn(history, 'push')
            .mockImplementation(() => {});
        userdetail = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={UserDetail} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        userdetailwithpic = (
            <Provider store={mockStoreWithPic}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={UserDetail} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        userdetailnotloaded = (
            <Provider store={getMockStore({})}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={UserDetail} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(userdetail);
        const wrapper = component.find('.UserDetail');
        expect(wrapper.length).toBe(1);
    });
    it('should render(with pic) without errors', () => {
        const component = mount(userdetailwithpic);
        const wrapper = component.find('.UserDetail');
        expect(wrapper.length).toBe(1);
    });
    it('should change password, charge point', async done => {
        const component = mount(userdetail);
        setTimeout(() => {
            done();
        }, 1000);
        await component.update();
        console.log('test start2');
        const wrapper = component.find('ListGroupItem');
        wrapper.at(1).simulate('click');
        const modalWrapper = component.find('Modal');
        const passwordInput = component.find('#password');
        passwordInput.simulate('change', {
            target: { value: '123' }
        });
        const newpasswordInput = component.find('#new-password');
        newpasswordInput.simulate('change', {
            target: { value: '1234' }
        });
        const checkpasswordInput = component.find('#new-password-check');
        checkpasswordInput.simulate('change', {
            target: { value: '1234' }
        });
        const passwordConfirmButton = component.find('#password-confirm');
        passwordConfirmButton.at(1).simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
        wrapper.at(0).simulate('click');
        const detailinstance = component
            .find(UserDetail.WrappedComponent)
            .instance();
        expect(detailinstance.state.showChargePoint).toEqual(true);
        const chargeInput = component.find('#chargepoint');
        chargeInput.simulate('change', {
            target: { value: '123' }
        });
        const chargeConfirmButton = component.find('#charge-confirm');
        window.alert = jest.fn();
        window.location.reload = jest.fn();
        chargeConfirmButton.at(1).simulate('click');
        expect(spyUpdatePoint).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledTimes(1);
        expect(window.location.reload).toHaveBeenCalledTimes(1);
        window.alert = jest.fn();
        window.location.reload = jest.fn();
        wrapper.at(2).simulate('click');
        expect(window.alert).toHaveBeenCalledTimes(1);
        expect(window.location.reload).toHaveBeenCalledTimes(1);
    });
    it('should change name, nickname, tags, and withdrawal', async done => {
        const component = mount(userdetail);
        setTimeout(() => {
            done();
        }, 1000);
        await component.update();
        const nickname_input = component.find('#nickname');
        const firstname_input = component.find('#fname');
        const lastname_input = component.find('#lname');
        nickname_input.simulate('change', {
            target: { value: 'Software' }
        });
        firstname_input.simulate('change', {
            target: { value: 'S' }
        });
        lastname_input.simulate('change', {
            target: { value: 'W' }
        });
        const detailinstance = component
            .find(UserDetail.WrappedComponent)
            .instance();
        detailinstance.deleteTagHandler(1);
        detailinstance.addTagHandler('tag');
        const withdrawal = component.find('#withdrawal');
        window.alert = jest.fn();
        withdrawal.simulate('click');
        expect(window.alert).toHaveBeenCalledTimes(1);
    });
    it('should not render when not loaded',()=>{
        const component = mount(userdetailnotloaded);
        expect(component.find('#point').text()).toBe("")
    })
});
