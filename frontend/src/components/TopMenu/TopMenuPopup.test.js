import React from 'react';
import { shallow } from 'enzyme';
import TopMenuPopUp from './TopMenuPopUp';
import { history } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../test/utils/mockStore';
import { userActions } from '../../store/actions';

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
