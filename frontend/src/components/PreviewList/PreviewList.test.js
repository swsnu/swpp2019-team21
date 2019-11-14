import React from 'react';
import { shallow, mount } from 'enzyme';
import PreviewList from './PreviewList';
import { history } from '../../store';

const mockPriview = {
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    day: 10,
    thumbnail: 'Mock Image URI',
    acheive_rate: 50,
    expiry_date: '2019-11-12'
};
const mockedArticles = [{ id: 1, preview: mockPriview }];
const mockedListName = 'Mock List';

describe('<PreviewList />', () => {
    let spyHistoryPush;
    beforeEach(() => {
        spyHistoryPush = jest
            .spyOn(history, 'push')
            .mockImplementation(() => {});
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = shallow(
            <PreviewList list_name={mockedListName} articles={mockedArticles} />
        );
        const wrapper = component.find('.PreviewList');
        expect(wrapper.length).toBe(1);
    });
    it('should load article when clicked', () => {
        const component = shallow(
            <PreviewList list_name={mockedListName} articles={mockedArticles} />
        );
        const wrapper = component.find('#search-more');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it('should load list of articles when clicked', () => {
        const component = shallow(
            <PreviewList
                compact={false}
                list_name={mockedListName}
                articles={mockedArticles}
            />
        );
        const wrapper = component.find('Preview');
        const id = wrapper.props().preview.id;
        wrapper.props().clickPreview(id);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it('should have no Previews when no article exists', () => {
        const component = shallow(
            <PreviewList
                compact={true}
                list_name={mockedListName}
                articles={null}
            />
        );
        const wrapper = component.find('Preview');
        expect(wrapper.length).toBe(0);
    });
});
