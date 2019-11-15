import React from 'react';
import ResetPW from './ResetPW';
import { history } from '../../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../../test/utils/mockStore';

const stubInitialState = {};
const mockStore = getMockStore(stubInitialState);
describe('<ResetPW />', () => {
    let resetpw, spyHistoryPush;
    const props = {
        match: { params: { str: 'user' } }
    };
    beforeEach(() => {
        localStorage.clear();
        resetpw = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => <ResetPW {...props} />}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyHistoryPush = jest
            .spyOn(history, 'push')
            .mockImplementation(() => {});
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(resetpw);
        const wrapper = component.find('ResetPW');
        expect(wrapper.length).toBe(1);
    });
    it('should react to input changes', () => {
        const component = mount(resetpw);
        var wrapper = [
            component.find('#new-pw-input'),
            component.find('#new-pw-input-check')
        ];
        wrapper.map(btn => btn.simulate('change', 'test'));
        component.find('ResetPW').update();
        component.find('#confirm-reset').simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});
