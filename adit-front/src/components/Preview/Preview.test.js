import React from 'react';
import { shallow } from 'enzyme';
import Preview from './Preview';

const mockPriview = {
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    day: 10,
    thumbnail: 'Mock Image URI',
    acheive_rate: 50
};

const mockClickHandler = jest.fn();

describe('<Preview />', () => {
    it('should render without errors', () => {
        const component = shallow(
            <Preview preview={mockPriview} clickPriview={mockClickHandler} />
        );
        const wrapper = component.find('.Preview');
        expect(wrapper.length).toBe(1);
    });

    it('should reflect props', () => {
        const component = shallow(
            <Preview preview={mockPriview} clickPriview={mockClickHandler} />
        );
        const instance = component.instance();
        expect(instance.props.preview.title).toEqual(mockPriview.title);
        expect(instance.props.preview.subtitle).toEqual(mockPriview.subtitle);
        expect(instance.props.preview.date).toEqual(mockPriview.date);
        expect(instance.props.preview.thumbnail).toEqual(mockPriview.thumbnail);
        expect(instance.props.preview.acheive_rate).toEqual(
            mockPriview.acheive_rate
        );
    });
});
