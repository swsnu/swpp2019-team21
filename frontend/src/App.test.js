import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import { history } from './store';
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
    it('should render', () => {
        const component = mount(app);
        expect(component.find('.App').length).toBe(1);
    });
});
