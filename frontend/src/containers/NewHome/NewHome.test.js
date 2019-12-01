import React from 'react';
import { shallow } from 'enzyme';
import NewHome from './NewHome';
import { history } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../test/utils/mockStore';
import { adpostActions } from '../../store/actions';

const stubInitialState = {
    adpost_items: {
        test: {
            is_loading: false,
            list: []
        }
    }
};

const stubInitialState_null = {};

const mockStore = getMockStore(stubInitialState);
const mockStore_null = getMockStore(stubInitialState_null);
describe('<NewHome />', () => {
    let newhome, spyHistoryPush, mockList, mockCustom;
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('updated', 'false');
        localStorage.setItem('logged_in', 'true');
        newhome = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={NewHome} />
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
        mockCustom = jest
            .spyOn(adpostActions, 'getCustomList')
            .mockImplementation(() => {
                return dispatch => null;
            });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(newhome);
        const wrapper = component.find('NewHome');
        expect(wrapper.length).toBe(1);
    });
    it('should render without errors when not logged_in', () => {
        localStorage.setItem('logged_in', 'false');
        const component = mount(newhome);
        const wrapper = component.find('NewHome');
        expect(wrapper.length).toBe(1);
    });
    it('should render without errors when adpost_items exists', () => {
        newhome = (
            <Provider store={mockStore_null}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={NewHome} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

        const component = mount(newhome);
        const wrapper = component.find('NewHome');
        expect(wrapper.length).toBe(1);
    });
});
