import React from 'react';
import { shallow, mount } from 'enzyme';
import EventItemList from './EventItemList';

const mockedState = {
    title: 'Mock Title',
    content: 'Mock content'
};

const mockedItem = [
    {
        id: 0,
        url: 'Mock Url1',
        title: 'Mock Title1'
    },
    {
        id: 1,
        url: 'Mock Url2',
        title: 'Mock Title2'
    },
    {
        id: 2,
        url: 'Mock Url3',
        title: 'Mock Title3'
    }
];

describe('<EventItemList />', () => {
    it('should render without errors', () => {
        const component = shallow(<EventItemList eventItems={mockedItem} />);
        const wrapper = component.find('.EventItemList');
        expect(wrapper.length).toBe(1);
    });
    it('should alert when clicked', () => {
        window.alert = jest.fn();
        const component = shallow(<EventItemList eventItems={mockedItem} />);
        const wrapper = component.find('.EventItemListItem');
        wrapper.at(0).simulate('click');
        expect(window.alert).toHaveBeenCalledTimes(1);
    });
});
