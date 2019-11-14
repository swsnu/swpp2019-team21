import React from 'react';
import { shallow } from 'enzyme';
import Redirect from './Redirect';
import { history } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../test/utils/mockStore';
import { adreceptionActions } from '../../store/actions/adreception.action';

const stubInitialState = {
    ad_link: ''
};

const mockStore = getMockStore(stubInitialState);
describe('<Redirect />', () => {
    let redirect, mockRedir;
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
        mockRedir = jest
            .spyOn(adreceptionActions, 'postRedirect')
            .mockImplementation(() => {
                return dispatch => null;
            });
    });
    it('should render without errors', () => {
        const component = mount(redirect);
        const wrapper = component.find('Redirect');
        expect(wrapper.length).toBe(1);
    });
});
