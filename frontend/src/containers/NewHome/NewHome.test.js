import React from 'react';
import { shallow } from 'enzyme';
import NewHome from './NewHome';
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
describe('<NewHome />', () => {
    let newhome;
    beforeEach(() => {
        localStorage.clear();
        newhome = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={NewHome} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(newhome);
        const wrapper = component.find('NewHome');
        expect(wrapper.length).toBe(1);
    });
});
