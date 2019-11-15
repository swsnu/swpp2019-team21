import React from 'react';
import TopMenuPopUp from './TopMenuPopUp';
import { mount } from 'enzyme';


const mockuser = {
    user_id: 1,
    first_name: 'mocked first name',
    last_name: 'mocked last name',
    nickname: 'mocked nickname',
    email: 'mocked email',
    point: 11,
    tags: ['mocked tag'],
    pic: null
};

const mockuser_picnotnull = {
    user_id: 1,
    first_name: 'mocked first name',
    last_name: 'mocked last name',
    nickname: 'mocked nickname',
    email: 'mocked email',
    point: 11,
    tags: ['mocked tag'],
    pic: 'mocked_pic'
};

describe('<TopMenuPopUp/>', () => {
    it('should render without errors if user picture is not given', () => {
        const component = mount(<TopMenuPopUp user={mockuser} />);
        const wrapper = component.find('#user-popup');
        expect(wrapper.length).toBe(4); // because of four contents
    });
    it('should render without errors if user picture is given', () => {
        const component = mount(<TopMenuPopUp user={mockuser_picnotnull} />);
        const wrapper = component.find('#user-popup');
        expect(wrapper.length).toBe(4); // because of four contents
    });
});
