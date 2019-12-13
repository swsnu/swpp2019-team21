import React from 'react';
import { mount, shallow } from 'enzyme';
import UserInfo from './UserInfo';
import { history } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../test/utils/mockStore';
import {
    userActions,
    adpostActions,
    adreceptionActions
} from '../../store/actions';

const mockPriview = {
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    day: 10,
    thumbnail: 'Mock Image URI',
    acheive_rate: 50,
    expiry_date: '2019-11-12'
};
const stubInitialState = {
    logged_in: true,
    user: {
        user_id: 2,
        first_name: 'SW',
        last_name: 'PP',
        nickname: 'iluvswpp',
        email: 'software@swpp.kr',
        point: 1123,
        tags: ['test']
    },
    adpost_home_list: [],
    byuser_list: []
};
const stubInitialStateN = {
    logged_in: false,
    reception_list: [],
    adpost_items: {
        owner: { is_loading: true, list: [{ id: 1, preview: mockPriview }] },
        participant: {
            is_loading: true,
            list: [{ id: 2, preview: mockPriview }]
        }
    },
    byuser_list: []
};
jest.mock('../../components/UserDetail/UserDetail', () => {
    return jest.fn(props => {
        return <div className="UserDetail" />;
    });
});
const mockStore = getMockStore(stubInitialState);
const mockStoreN = getMockStore(stubInitialStateN);
describe('<UserInfo/>', () => {
    let userinfo,
        userinfoN,
        spyOnSignOut,
        spyHistoryPush,
        spyReloadUser,
        spyOnGetOwnList,
        spyOnGetParticipantedList,
        spyOnGetReceptionList;
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('logged_in', 'true');
        userinfo = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={UserInfo} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        userinfoN = (
            <Provider store={mockStoreN}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={UserInfo} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyOnSignOut = jest
            .spyOn(userActions, 'signOut')
            .mockImplementation(() => {
                return dispatch => {};
            });
        spyReloadUser = jest
            .spyOn(userActions, 'getUser')
            .mockImplementation(() => {
                return dispatch => {};
            });
        spyOnGetOwnList = jest
            .spyOn(adpostActions, 'getAdpostList')
            .mockImplementation(() => {
                return dispatch => {};
            });
        spyOnGetParticipantedList = jest
            .spyOn(adpostActions, 'getAdpostList')
            .mockImplementation(() => {
                return dispatch => {};
            });
        spyOnGetReceptionList = jest
            .spyOn(adreceptionActions, 'getReceptionByUser')
            .mockImplementation(() => {
                return dispatch => {
                    return new Promise((resolve, reject) =>
                        resolve(stubInitialState)
                    );
                };
            });
        spyHistoryPush = jest
            .spyOn(history, 'push')
            .mockImplementation(() => {});
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(userinfo);
        const temp = component.find('UserInfo');
        temp.setState({ user_loaded: true, reception_loaded: true });
        const wrapper = component.find('.UserInfo');
        expect(wrapper.length).toBe(1);
    });
    it('should not render when some values are missing', () => {
        localStorage.setItem('logged_in', 'false');
        const component = mount(userinfoN);
    });
});
