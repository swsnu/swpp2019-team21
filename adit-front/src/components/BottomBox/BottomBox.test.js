import React from 'react';
import { shallow } from 'enzyme';
import BottomBox from './BottomBox';

const mockedState = {
    title: 'Mock Title',
    content: 'Mock content'
};

describe('<BottomBox />', () => {
    it('should render without errors', () => {
        const component = shallow(<BottomBox />);
        const wrapper = component.find('.BottomBox');
        expect(wrapper.length).toBe(1);
    });

    it('should reflect state', () => {
        const component = shallow(<BottomBox />);
        const instance = component.instance();
        instance.setState(mockedState);
        expect(instance.state.title).toEqual(mockedState.title);
        expect(instance.state.content).toEqual(mockedState.content);
    });
});
