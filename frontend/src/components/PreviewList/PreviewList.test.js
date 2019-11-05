import React from 'react';
import { shallow } from 'enzyme';
import PreviewList from './PreviewList';

const mockedArticles = [{}];

const mockedListName = 'Mock List';

describe('<PreviewList />', () => {
    it('should render without errors', () => {
        const component = shallow(
            <PreviewList list_name={mockedListName} articles={mockedArticles} />
        );
        const wrapper = component.find('.PreviewList');
        expect(wrapper.length).toBe(1);
    });
});
