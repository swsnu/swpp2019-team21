import React from 'react';
import TagSelector from './TagSelector';
import { getMockStore } from '../../test/utils/mockStore';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { mount } from 'enzyme';
import { history } from '../../store';

const stubInitialState = {
    allTags: ['mock1', 'mock2', 'mock3']
};
const mockStore = getMockStore(stubInitialState);
describe('<TagSelector />', () => {
    const props = {
        match: { params: { id: '0' } },
        history: {
            push: () => {}
        }
    };
    var tagSelector;
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('updated', 'false');
        localStorage.setItem('logged_in', 'true');
        tagSelector = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => <TagSelector {...props} />}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render properly', () => {
        const component = mount(tagSelector);
        const wrapper = component.find('#tag-selector');
        expect(wrapper.length).toBe(1);
    });
});
