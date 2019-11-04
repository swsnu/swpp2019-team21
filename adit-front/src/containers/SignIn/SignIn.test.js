import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './SignIn';

const mockedArticles = [{}];

const mockedListName = 'Mock List';

describe('<Sign In />', () => {
    it('should render without errors', () => {
        const component = shallow(<SignIn />);
        const wrapper = component.find('.sign-in');
        expect(wrapper.length).toBe(1);
    });
});
