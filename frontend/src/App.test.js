import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';
import { history } from './store';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { getMockStore } from './test/utils/mockStore';


describe('App', () => {
    let app;
    beforeEach(() => {
        app = (
            <Provider store={getMockStore({})}>
                <App history={history}/>
            </Provider>
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    const promise = () => new Promise(resolve => resolve());
    it('should render', () => {
        const component = mount(app);
        expect(component.find('.App').length).toBe(1);
    });
});
