import React from 'react';
import PreviewGrid from './PreviewGrid';
import { history } from '../../store';
import { mount } from 'enzyme';

describe('<PreviewGrid />', () => {
    let previewgrid;
    const articles = [
        {
            title: 'Mock Title',
            subtitle: 'Mock Subtitle',
            day: 10,
            thumbnail: 'Mock Image URI',
            acheive_rate: 50,
            expiry_date: '2019-11-12'
        }
    ];
    beforeEach(() => {
        previewgrid = <PreviewGrid articles={articles} />;
    });
    it('should render without errors', () => {
        const component = mount(previewgrid);
        const wrapper = component.find('PreviewGrid');
        expect(wrapper.length).toBe(1);
    });
    it('should react to click', () => {
        const component = mount(previewgrid);
        const wrapper = component.find('Preview');
        expect(wrapper.length).toBe(1);
        const mockhandler = jest
            .spyOn(history, 'push')
            .mockImplementation(null);
        wrapper.simulate('click');
        expect(mockhandler).toHaveBeenCalled();
    });
});
